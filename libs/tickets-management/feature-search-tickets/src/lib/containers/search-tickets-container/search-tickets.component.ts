import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {
  TicketsFacade,
  SearchCriteria
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import {
  SearchResult,
  SearchTicketsFacade
} from '@tuskdesk-suite/tickets-management/domain';

@Component({
  selector: 'tickets-management-search-tickets-container',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsContainerComponent implements OnInit {
  searchCriteria$ = this.ticketsFacade.searchCriteria$;
  searchResults$: Observable<SearchResult[]> = this.ticketsFacade.searchResult$;
  users$ = this.searchTicketsFacade.users$;

  constructor(
    private ticketsFacade: TicketsFacade,
    private searchTicketsFacade: SearchTicketsFacade
  ) {}

  ngOnInit() {}

  searchUsers(name) {
    this.searchTicketsFacade.searchUsers(name);
  }
  submit(searchCriteria: SearchCriteria) {
    this.searchTicketsFacade.search(
      searchCriteria.searchTerm,
      searchCriteria.assignedToUser
    );
  }
}
