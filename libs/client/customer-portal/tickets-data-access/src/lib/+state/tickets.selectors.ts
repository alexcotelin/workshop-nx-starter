import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { PartialAppState, TicketsState } from './tickets.interfaces';
import { FEATURE_TICKETS } from './tickets.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ticketsAdapter } from './tickets.reducer';

const { selectAll, selectEntities } = ticketsAdapter.getSelectors();

export namespace ticketsQuery {
  const selectTicketState = createFeatureSelector<TicketsState>(
    FEATURE_TICKETS
  );
  export const getIsLoading = createSelector(
    selectTicketState,
    state => state.loading
  );
  export const getError = createSelector(
    selectTicketState,
    state => state.error
  );
  export const getSelectedId = createSelector(
    selectTicketState,
    state => state.selectedId
  );
  export const getAllTickets = createSelector(selectTicketState, selectAll);
  export const getTicketsAsEntities = createSelector(
    selectTicketState,
    selectEntities
  );

  export const getSelectedTicket = createSelector(
    getTicketsAsEntities,
    getSelectedId,
    (tickets, id) => tickets[id]
  );
}
