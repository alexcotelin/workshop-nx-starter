import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { routerLoadTicket } from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import * as fromComments from './comments.reducer';
import * as CommentsActions from './comments.actions';

@Injectable()
export class CommentsEffects {
  routeAndLoad$ = createEffect(() =>
    this.actions.pipe(
      ofType(routerLoadTicket),
      map(({ ticketId }) => CommentsActions.loadCommentsForTicket({ ticketId }))
    )
  );

  loadComments$ = createEffect(() =>
    this.dataPersistence.fetch(CommentsActions.loadCommentsForTicket, {
      run: (
        action: ReturnType<typeof CommentsActions.loadCommentsForTicket>,
        state: fromComments.CommentsPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return this.ticketService
          .comments(action.ticketId)
          .pipe(
            map(comments =>
              CommentsActions.commentsForTicketLoaded({ comments })
            )
          );
      },

      onError: (
        action: ReturnType<typeof CommentsActions.loadCommentsForTicket>,
        error
      ) => {
        console.error('Error', error);
        return CommentsActions.loadCommentsForTicketError({ error });
      }
    })
  );

  addComment$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(
      CommentsActions.addCommentForTicket,
      {
        run: (
          action: ReturnType<typeof CommentsActions.addCommentForTicket>,
          state: fromComments.CommentsPartialState
        ) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.ticketService
            .addComment(action.ticketId, action.comment)
            .pipe(
              map(comment => CommentsActions.commentForTicketAdded({ comment }))
            );
        },

        onError: (
          action: ReturnType<typeof CommentsActions.addCommentForTicket>,
          error
        ) => {
          console.error('Error', error);
          return CommentsActions.addCommentForTicketError({ error });
        }
      }
    )
  );
  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<fromComments.CommentsPartialState>,
    private ticketService: TicketService
  ) {}
}
