import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';

import {
  TicketsFacade,
  updateTicket
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';

import * as TicketActions from './tickets.actions';

@Injectable()
export class TicketsEffects {
  // Enricher Transformer Effect
  updateTicketMessage$ = createEffect(() =>
    this.actions.pipe(
      ofType(TicketActions.updateTicketMessage),
      map(action => action.message),
      withLatestFrom(this.ticketsFacade.selectedTicket$),
      map(([message, ticket]) => updateTicket({ message, ticketId: ticket.id }))
    )
  );

  constructor(private actions: Actions, private ticketsFacade: TicketsFacade) {}
}
