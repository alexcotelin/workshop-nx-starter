import { async, TestBed } from '@angular/core/testing';
import { TicketsManagementDomainModule } from './tickets-management-domain.module';

describe('TicketsManagementDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TicketsManagementDomainModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TicketsManagementDomainModule).toBeDefined();
  });
});
