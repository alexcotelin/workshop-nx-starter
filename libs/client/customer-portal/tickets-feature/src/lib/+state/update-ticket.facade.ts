import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PartialAppState } from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { updateTicketMessage } from './tickets.actions';

@Injectable()
export class UpdateTicketFacade {
  constructor(private readonly store: Store<PartialAppState>) {}

  updateTicketMessage(message: string) {
    this.store.dispatch(updateTicketMessage({ message }));
  }
}
