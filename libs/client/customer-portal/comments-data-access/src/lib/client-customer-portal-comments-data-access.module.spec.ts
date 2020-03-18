import { async, TestBed } from '@angular/core/testing';
import { ClientCustomerPortalCommentsDataAccessModule } from './client-customer-portal-comments-data-access.module';

describe('ClientCustomerPortalCommentsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientCustomerPortalCommentsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientCustomerPortalCommentsDataAccessModule).toBeDefined();
  });
});
