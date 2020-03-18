import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TicketsFacade } from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { CommentsFacade } from '@tuskdesk-suite/client/customer-portal/comments-data-access';
import { Comment } from '@tuskdesk-suite/shared/comment-utils';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import { TicketTimerService } from '../ticket-timer.service';
import { AddCommentFacade } from '../+state/add-comment.facade';
import { UpdateTicketFacade } from '../+state/update-ticket.facade';

@Component({
  selector: 'tuskdesk-suite-ticket-details',
  templateUrl: './ticket-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket> = this.ticketsFacade.selectedTicket$;
  comments$: Observable<Comment[]> = this.commentsFacade.allComments$;
  ticketMessage = new FormControl();
  timer$: Observable<number>;
  //   private id$ = this.route.params.pipe(map(params => +params['id']));
  onDestroy$ = new Subject<void>();
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private ticketTimerService: TicketTimerService,
    private ticketsFacade: TicketsFacade,
    private commentsFacade: CommentsFacade,
    private addCommentFacade: AddCommentFacade,
    private updateTicketFacade: UpdateTicketFacade
  ) {}

  ngOnInit() {}

  switchToEdit() {
    this.ticket$
      .pipe(
        tap(() => (this.editMode = !this.editMode)),
        tap(ticket => this.ticketMessage.setValue(ticket.message)),
        take(1)
      )
      .subscribe();
  }

  cancelEdit() {
    this.editMode = false;
  }

  saveEdit() {
    this.editMode = false;
    this.updateTicketFacade.updateTicketMessage(this.ticketMessage.value);
  }

  startTimer() {
    this.timer$ = this.ticketTimerService.timer$;
  }

  markToWork(ticketId: number) {
    this.ticketTimerService.addTicketToWork(ticketId);
  }

  addComment(comment: string) {
    this.addCommentFacade.addComment(comment);
  }
}
