import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromComments from './comments.reducer';
import * as CommentsSelectors from './comments.selectors';
import * as CommentsActions from './comments.actions';

@Injectable()
export class CommentsFacade {
  loaded$ = this.store.pipe(select(CommentsSelectors.getCommentsLoaded));
  allComments$ = this.store.pipe(select(CommentsSelectors.getAllComments));
  selectedComments$ = this.store.pipe(select(CommentsSelectors.getSelected));

  constructor(private store: Store<fromComments.CommentsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  addComment(comment: string, ticketId: number) {
    this.dispatch(CommentsActions.addCommentForTicket({ ticketId, comment }));
  }
}
