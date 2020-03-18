import { TicketsState } from './tickets.interfaces';
import {
  allTicketsLoaded,
  ticketLoaded,
  selectTicket,
  ticketsSearched,
  searchTickets,
  updateTicket,
  ticketUpdated
} from './tickets.actions';
import { createReducer, on, Action, State } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { tick } from '@angular/core/testing';

export const FEATURE_TICKETS = 'tickets';

export const ticketsAdapter: EntityAdapter<Ticket> = createEntityAdapter<
  Ticket
>();

export const initialState: TicketsState = ticketsAdapter.getInitialState({
  searchCriteria: { searchTerm: '', assignedToUser: null },
  searchResult: null,
  selectedId: -1,
  loading: false,
  error: ''
});

const reducer = createReducer(
  initialState,
  on(allTicketsLoaded, (state, { tickets }) =>
    ticketsAdapter.setAll(tickets, state)
  ),
  // NOTE: ticketLoaded doesn't yet work for updating a ticket.... only adding one
  on(ticketLoaded, ticketUpdated, (state, { ticket }) =>
    ticketsAdapter.upsertOne(ticket, state)
  ),
  on(selectTicket, (state, { selectedId }) => ({ ...state, selectedId })),
  on(ticketsSearched, (state, { tickets }) => ({
    ...state,
    searchResult: tickets
  })),
  on(searchTickets, (state, { searchTerm, assignedToUser }) => ({
    ...state,
    searchCriteria: { searchTerm, assignedToUser }
  }))
);

export function ticketsReducer(
  state: TicketsState | undefined,
  action: Action
): TicketsState {
  return reducer(state, action);
}
