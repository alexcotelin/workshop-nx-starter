import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';

import { TicketsFacade } from '@tuskdesk-suite/client/customer-portal/tickets-data-access/src';
import { addCommentForTicket } from '@tuskdesk-suite/client/customer-portal/comments-data-access/src/lib/+state/comments.actions';
import * as CommentsActions from './comments.actions';

@Injectable()
export class CommentsEffects {
  // Enricher Transformer Effect
  addComment$ = createEffect(() =>
    this.actions.pipe(
      ofType(CommentsActions.addComment),
      map(action => action.comment),
      withLatestFrom(this.ticketsFacade.selectedTicket$),
      map(([comment, ticket]) =>
        addCommentForTicket({ comment, ticketId: ticket.id })
      )
    )
  );

  constructor(private actions: Actions, private ticketsFacade: TicketsFacade) {}
}
