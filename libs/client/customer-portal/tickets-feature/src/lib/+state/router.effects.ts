import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import {
  loadAllTickets,
  routerLoadTicket
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';

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

  constructor(private d: DataPersistence<any>) {}
}
