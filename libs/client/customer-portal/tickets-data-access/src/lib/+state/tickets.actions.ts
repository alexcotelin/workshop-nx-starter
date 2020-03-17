import { createAction, props } from '@ngrx/store';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';

export const loadAllTickets = createAction('[Tickets] Load All Tickets');
export const allTicketsLoadError = createAction(
  '[Tickets] Error Loading All Tickets',
  props<{ error: any }>()
);
export const allTicketsLoaded = createAction(
  '[Tickets] All Tickets Loaded',
  props<{ tickets: Ticket[] }>()
);
export const loadTicket = createAction(
  '[Tickets] Load Ticket by Id',
  props<{ ticketId: number }>()
);
export const ticketLoaded = createAction(
  '[Tickets] Ticket Loaded',
  props<{ ticket: Ticket }>()
);
export const ticketLoadError = createAction(
  '[Tickets] Error Loading Ticket by Id',
  props<{ error: any }>()
);

export const routerLoadTicket = createAction(
  '[Tickets] Load Ticket from Router Navigation',
  props<{ ticketId: number }>()
);

export const selectTicket = createAction(
  '[Tickets] Select Ticket by Id',
  props<{ selectedId: number }>()
);

export const routerSearchTickets = createAction(
  '[Tickets] Search Tickets from Router Navigation',
  props<{ searchTerm: string; assignedToUser: null | string }>()
);
export const searchTickets = createAction(
  '[Tickets] Search tickets',
  props<{ searchTerm: string; assignedToUser: null | string }>()
);
export const ticketsSearched = createAction(
  '[Tickets] Tickets Searched',
  props<{ tickets: Ticket[] }>()
);
export const ticketsSearchError = createAction(
  '[Tickets] Error Searching Tickets',
  props<{ error: any }>()
);
