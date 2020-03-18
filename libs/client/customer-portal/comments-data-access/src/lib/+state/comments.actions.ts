import { createAction, props } from '@ngrx/store';
import { Comment } from '@tuskdesk-suite/shared/comment-utils';

export const loadCommentsForTicket = createAction(
  '[Comments/API] Load Comments for Ticket ID',
  props<{ ticketId: number }>()
);

export const commentsForTicketLoaded = createAction(
  '[Comments/API] Comments for Ticket Loaded',
  props<{ comments: Comment[] }>()
);

export const loadCommentsForTicketError = createAction(
  '[Comments/API] Load Comments Error',
  props<{ error: any }>()
);

export const addCommentForTicket = createAction(
  '[Comments/API] Add Comment for Ticket ID',
  props<{ comment: string; ticketId: number }>()
);

export const commentForTicketAdded = createAction(
  '[Comments/API] Comment for Ticket Added',
  props<{ comment: Comment }>()
);

export const addCommentForTicketError = createAction(
  '[Comments/API] Add Comment Error',
  props<{ error: any }>()
);
