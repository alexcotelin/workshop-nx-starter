import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { TicketsFacade } from '@tuskdesk-suite/client/customer-portal/tickets-data-access/src';

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
export class SearchTicketsComponent implements OnInit {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();
  searchCriteria$ = this.ticketsFacade.searchCriteria$;
  searchResults$: Observable<SearchResult[]> = this.ticketsFacade.searchResult$;
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
    private userService: UserService,
    private ticketsFacade: TicketsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchCriteria$.subscribe(({ searchTerm, assignedToUser }) => {
      this.searchTerm.setValue(searchTerm);
      this.assignedToUser.setValue(assignedToUser);
    });
  }

  submit() {
    this.router.navigate([], {
      queryParams: this.createQueryParams(
        this.searchTerm.value,
        this.assignedToUser.value
      ),
      queryParamsHandling: 'merge'
    });
  }

  private createQueryParams(searchTerm?: string, assignedToUser?: string) {
    const queryParams: any = {};

    if (searchTerm) {
      queryParams.searchTerm = searchTerm;
    }
    if (assignedToUser) {
      queryParams.assignedToUser = assignedToUser;
    }

    return queryParams;
  }
}
