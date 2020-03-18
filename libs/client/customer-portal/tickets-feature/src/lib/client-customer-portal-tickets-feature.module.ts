import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchTicketsComponent } from './search-tickets/search-tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiMaterialModule } from './ui-material.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  ClientSharedTuskdeskApiDataAccessModule,
  BackendUserIdService,
  LoggedInUserInterceptor
} from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { TicketTimerService } from './ticket-timer.service';
import { ClientCustomerPortalTicketsDataAccessModule } from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router.effects';
import { ClientCustomerPortalCommentsDataAccessModule } from '@tuskdesk-suite/client/customer-portal/comments-data-access/src';
import { CommentsEffects } from './+state/comments.effects';
import { AddCommentFacade } from './+state/add-comment.facade';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggedInUserIdService } from './logged-in-user-id.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UiMaterialModule,
    ClientSharedTuskdeskApiDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: TicketListComponent
      },
      {
        path: 'ticket/:id',
        component: TicketDetailsComponent
      },
      {
        path: 'search',
        component: SearchTicketsComponent
      }
    ]),
    ClientCustomerPortalTicketsDataAccessModule,
    ClientCustomerPortalCommentsDataAccessModule,
    EffectsModule.forFeature([RouterEffects, CommentsEffects])
  ],
  declarations: [
    SearchTicketsComponent,
    TicketListComponent,
    TicketDetailsComponent
  ],
  providers: [
    TicketTimerService,
    AddCommentFacade,
    {
      provide: BackendUserIdService,
      useClass: LoggedInUserIdService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggedInUserInterceptor,
      multi: true
    }
  ]
})
export class ClientCustomerPortalTicketsFeatureModule {}
