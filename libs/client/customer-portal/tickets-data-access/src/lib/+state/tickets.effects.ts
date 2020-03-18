import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { switchMap, map, withLatestFrom, filter } from 'rxjs/operators';

import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import {
  loadAllTickets,
  allTicketsLoaded,
  loadTicket,
  ticketLoaded,
  routerLoadTicket,
  allTicketsLoadError,
  selectTicket,
  ticketsSearched,
  searchTickets,
  routerSearchTickets,
  updateTicket,
  ticketUpdated,
  ticketUpdateError
} from './tickets.actions';
import { ticketsQuery } from './tickets.selectors';
import { PartialAppState } from './tickets.interfaces';

@Injectable()
export class TicketEffects {
  /**
   * Read-only accessor to ticket dictionary for fast lookups
   */
  readonly ticketRegistry$ = this.store.pipe(
    select(ticketsQuery.getTicketsAsEntities)
  );

  /**
   * Action Decider
   */

  routeAndLoad$ = createEffect(() =>
    this.actions.pipe(
      ofType(routerLoadTicket),
      map(action => action.ticketId),
      withLatestFrom(this.ticketRegistry$),
      switchMap(([ticketId, entities]) => {
        const selectTicketAction = selectTicket({ selectedId: ticketId });
        const loadTicketAction = loadTicket({ ticketId });
        const hasTicket = !!entities[ticketId];

        return hasTicket
          ? [selectTicketAction]
          : [loadTicketAction, selectTicketAction];
      })
    )
  );

  routeAndSearch$ = createEffect(() =>
    this.actions.pipe(
      ofType(routerSearchTickets),
      filter(
        ({ searchTerm, assignedToUser }) =>
          searchTerm !== null || assignedToUser !== null
      ),
      map(({ searchTerm, assignedToUser }) =>
        searchTickets({ searchTerm, assignedToUser })
      )
    )
  );

  loadAllTickets$ = createEffect(() =>
    this.d.fetch<ReturnType<typeof loadAllTickets>>(loadAllTickets, {
      run: (action, state: PartialAppState) => {
        return this.ticketService
          .getTickets()
          .pipe(map(tickets => allTicketsLoaded({ tickets })));
      },
      onError: (action, error) => allTicketsLoadError(error)
    })
  );

  ticketLoaded$ = createEffect(() =>
    this.d.fetch<ReturnType<typeof loadTicket>>(loadTicket, {
      run: (a, state: PartialAppState) => {
        return this.ticketService
          .ticketById(a.ticketId)
          .pipe(map(ticket => ticketLoaded({ ticket })));
      },
      onError: () => {}
    })
  );

  ticketsSearched$ = createEffect(() =>
    this.d.fetch<ReturnType<typeof searchTickets>>(searchTickets, {
      run: ({ searchTerm, assignedToUser }, state: PartialAppState) => {
        return this.ticketService
          .searchTickets(searchTerm, assignedToUser)
          .pipe(map(tickets => ticketsSearched({ tickets })));
      },
      onError: () => {}
    })
  );

  updateTicket$ = createEffect(() =>
    this.d.pessimisticUpdate(updateTicket, {
      run: (
        action: ReturnType<typeof updateTicket>,
        state: PartialAppState
      ) => {
        return this.ticketService
          .updateTicketMessage(action.ticketId, action.message)
          .pipe(map(ticket => ticketUpdated({ ticket })));
      },

      onError: (action: ReturnType<typeof updateTicket>, error) => {
        console.error('Error', error);
        return ticketUpdateError({ error });
      }
    })
  );

  constructor(
    private store: Store<any>,
    private actions: Actions,
    private ticketService: TicketService,
    private d: DataPersistence<PartialAppState>
  ) {}
}
