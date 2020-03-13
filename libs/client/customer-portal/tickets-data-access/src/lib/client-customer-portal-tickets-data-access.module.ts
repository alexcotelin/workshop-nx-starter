import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  ticketsReducer,
  FEATURE_TICKETS,
  TicketEffects,
  TicketsFacade
} from './+state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_TICKETS, ticketsReducer),
    EffectsModule.forFeature([TicketEffects])
  ],
  providers: [TicketsFacade]
})
export class ClientCustomerPortalTicketsDataAccessModule {}
