import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketsManagementDomainModule } from '@tuskdesk-suite/tickets-management/domain';
import { ClientSharedTuskdeskApiDataAccessModule } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';

import { SearchTicketsContainerComponent } from './containers/search-tickets-container/search-tickets.component';
import { UiMaterialModule } from './ui-material.module';
import { SearchTicketsComponent } from './components/search-tickets/search-tickets.component';

@NgModule({
  imports: [
    CommonModule,
    TicketsManagementDomainModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UiMaterialModule,
    RouterModule,
    ClientSharedTuskdeskApiDataAccessModule
  ],
  declarations: [SearchTicketsContainerComponent, SearchTicketsComponent],
  exports: [SearchTicketsContainerComponent]
})
export class TicketsManagementFeatureSearchTicketsModule {}
