import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTicketsFacade } from './application/search-tickets.facade';

@NgModule({
  imports: [CommonModule],
  providers: [SearchTicketsFacade]
})
export class TicketsManagementDomainModule {}
