import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PartialAppState } from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { addComment } from './comments.actions';

@Injectable()
export class AddCommentFacade {
  constructor(private readonly store: Store<PartialAppState>) {}

  addComment(comment: string) {
    this.store.dispatch(addComment({ comment }));
  }
}
