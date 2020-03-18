import { createAction, props } from '@ngrx/store';

export const updateTicketMessage = createAction(
  '[Ticket Details] Update Ticket Message',
  props<{ message: string }>()
);
