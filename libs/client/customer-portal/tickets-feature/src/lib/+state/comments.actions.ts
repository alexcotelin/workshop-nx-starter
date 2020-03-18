import { createAction, props } from '@ngrx/store';

export const addComment = createAction(
  '[Ticket Details] Add Comment',
  props<{ comment: string }>()
);
