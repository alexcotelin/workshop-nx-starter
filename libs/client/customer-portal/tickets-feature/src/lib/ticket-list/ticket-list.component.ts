import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Observable } from 'rxjs/Observable';

import {
  allTicketsLoaded,
  loadAllTickets,
  TicketsFacade
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { TicketTimerService } from '../ticket-timer.service';

@Component({
  selector: 'tuskdesk-suite-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent {
  tickets$: Observable<Ticket[]> = this.ticketsFacade.allTickets$;
  loading$: Observable<boolean> = this.ticketsFacade.isLoading$;
  markedToWork$: Observable<number[]> = this.timerService.ticketsToWork$;

  constructor(
    private ticketsFacade: TicketsFacade,
    private timerService: TicketTimerService
  ) {}
}
