import { createAction, props } from '@ngrx/store';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';

export const loadAllTickets = createAction('[Tickets/API] Load All Tickets');
export const allTicketsLoadError = createAction(
  '[Tickets/API] Error Loading All Tickets',
  props<{ error: any }>()
);
export const allTicketsLoaded = createAction(
  '[Tickets/API] All Tickets Loaded',
  props<{ tickets: Ticket[] }>()
);
export const loadTicket = createAction(
  '[Tickets/API] Load Ticket by Id',
  props<{ ticketId: number }>()
);
export const ticketLoaded = createAction(
  '[Tickets/API] Ticket Loaded',
  props<{ ticket: Ticket }>()
);
export const ticketLoadError = createAction(
  '[Tickets/API] Error Loading Ticket by Id',
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
  '[Tickets/API] Search tickets',
  props<{ searchTerm: string; assignedToUser: null | string }>()
);
export const ticketsSearched = createAction(
  '[Tickets/API] Tickets Searched',
  props<{ tickets: Ticket[] }>()
);
export const ticketsSearchError = createAction(
  '[Tickets/API] Error Searching Tickets',
  props<{ error: any }>()
);

export const updateTicket = createAction(
  '[Tickets/API] Update Ticket',
  props<{ ticketId: number; message: string }>()
);
export const ticketUpdated = createAction(
  '[Tickets/API] Ticket Updated',
  props<{ ticket: Ticket }>()
);
export const ticketUpdateError = createAction(
  '[Tickets/API] Error Updating Ticket',
  props<{ error: any }>()
);
