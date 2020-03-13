import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  TicketService,
  UserService
} from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { of } from 'rxjs';

interface SearchResult {
  id: number;
  message: string;
  status: string;
}

@Component({
  selector: 'tuskdesk-suite-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsComponent {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();
  searchResults$: Observable<SearchResult[]>;
  users$: Observable<string[]> = this.assignedToUser.valueChanges.pipe(
    debounceTime(230),
    distinctUntilChanged(),
    filter(value => value.length > 0),
    switchMap(searchTerm =>
      searchTerm
        ? this.userService
            .users(searchTerm)
            .pipe(map(users => users.map(x => x.fullName)))
        : of([])
    )
  );

  constructor(
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  submit() {
    this.searchResults$ = this.ticketService.searchTickets(
      this.searchTerm.value,
      this.assignedToUser.value
    );
  }
}
