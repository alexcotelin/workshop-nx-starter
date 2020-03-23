import { async, TestBed } from '@angular/core/testing';
import { TicketsManagementFeatureSearchTicketsModule } from './tickets-management-feature-search-tickets.module';

describe('TicketsManagementFeatureSearchTicketsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TicketsManagementFeatureSearchTicketsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TicketsManagementFeatureSearchTicketsModule).toBeDefined();
  });
});
