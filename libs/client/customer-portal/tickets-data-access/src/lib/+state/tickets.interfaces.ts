import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { FEATURE_TICKETS } from './tickets.reducer';
import { EntityState } from '@ngrx/entity';

export interface TicketsState extends EntityState<Ticket> {
  selectedId: number;
  loading: boolean;
  error: any;
}

/**
 * When injecting a store instance, we specify type of state
 * it manages, here we define a 'partial' state only concerned
 * with Project and ProjectItems
 */
export interface PartialAppState {
  [FEATURE_TICKETS]: TicketsState;
}
