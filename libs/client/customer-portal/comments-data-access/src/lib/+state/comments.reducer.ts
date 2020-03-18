import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Comment } from '@tuskdesk-suite/shared/comment-utils';

import * as CommentsActions from './comments.actions';

export const COMMENTS_FEATURE_KEY = 'comments';

export interface State extends EntityState<Comment> {
  selectedId?: string | number; // which Comments record has been selected
  loaded: boolean; // has the Comments list been loaded
  error?: string | null; // last none error (if any)
}

export interface CommentsPartialState {
  readonly [COMMENTS_FEATURE_KEY]: State;
}

export const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<
  Comment
>();

export const initialState: State = commentsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const commentsReducer = createReducer(
  initialState,

  on(CommentsActions.commentForTicketAdded, (state, { comment }) =>
    commentsAdapter.addOne(comment, { ...state, loaded: true })
  ),
  on(CommentsActions.commentsForTicketLoaded, (state, { comments }) =>
    commentsAdapter.setAll(comments, { ...state, loaded: true })
  ),
  on(
    CommentsActions.loadCommentsForTicket,
    CommentsActions.addCommentForTicket,
    state => ({
      ...state,
      loaded: false,
      error: null
    })
  ),
  on(
    CommentsActions.loadCommentsForTicketError,
    CommentsActions.addCommentForTicketError,
    (state, { error }) => ({
      ...state,
      error
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return commentsReducer(state, action);
}
