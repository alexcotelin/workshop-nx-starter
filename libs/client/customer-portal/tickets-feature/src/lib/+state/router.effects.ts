import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import {
  loadAllTickets,
  routerLoadTicket,
  routerSearchTickets
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { SearchTicketsComponent } from '../search-tickets/search-tickets.component';

@Injectable()
export class RouterEffects {
  loadView_TicketList$ = createEffect(() =>
    this.d.navigation(TicketListComponent, {
      run: (a: ActivatedRouteSnapshot) => {
        // Load all available tickets...
        return loadAllTickets();
      }
    })
  );

  loadView_TicketDetails$ = createEffect(() =>
    this.d.navigation(TicketDetailsComponent, {
      run: (a: ActivatedRouteSnapshot) => {
        const ticketId = +a.paramMap.get('id');

        // Load ticket details
        return routerLoadTicket({ ticketId });
      }
    })
  );

  loadView_SearchTickets$ = createEffect(() =>
    this.d.navigation(SearchTicketsComponent, {
      run: (a: ActivatedRouteSnapshot) => {
        const searchTerm = a.queryParamMap.get('searchTerm');
        const assignedToUser = a.queryParamMap.get('assignedToUser');

        // Search ticket query details
        return routerSearchTickets({ searchTerm, assignedToUser });
      }
    })
  );

  constructor(private d: DataPersistence<any>) {}
}
