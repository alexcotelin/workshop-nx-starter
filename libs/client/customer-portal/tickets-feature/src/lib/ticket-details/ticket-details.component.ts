import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TicketsFacade } from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { Comment } from '@tuskdesk-suite/shared/comment-utils';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import { TicketTimerService } from '../ticket-timer.service';

@Component({
  selector: 'tuskdesk-suite-ticket-details',
  templateUrl: './ticket-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket> = this.ticketsFacade.selectedTicket$;
  comments$: Observable<Comment[]>;
  ticketMessage = new FormControl();
  timer$: Observable<number>;
  private id$ = this.route.params.pipe(map(params => +params['id']));
  onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private ticketTimerService: TicketTimerService,
    private ticketsFacade: TicketsFacade
  ) {}

  ngOnInit() {}

  switchToEdit() {}

  cancelEdit() {}

  saveEdit() {}

  startTimer() {
    this.timer$ = this.ticketTimerService.timer$;
  }

  markToWork(ticketId: number) {
    this.ticketTimerService.addTicketToWork(ticketId);
  }
}
