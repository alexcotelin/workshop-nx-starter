import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';

import { SearchResult } from '../entities/search-result';
import { SearchResultDataService } from '../infrastructure/search-result.data.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map
} from 'rxjs/operators';

@Injectable()
export class SearchTicketsFacade {
  private userSearchNameSubject = new BehaviorSubject<string>('');
  //   searchResultList$ = this.userSearchNameSubject.asObservable();

  constructor(
    // private searchResultDataService: SearchResultDataService,
    private router: Router, // private userService: UserService
    private userService: UserService
  ) {}

  users$: Observable<string[]> = this.userSearchNameSubject.pipe(
    debounceTime(230),
    distinctUntilChanged(),
    filter(value => value.length > 0),
    switchMap(searchTerm =>
      searchTerm
        ? this.userService
            .users(searchTerm)
            .pipe(map(users => users.map(x => x.fullName)))
        : of(['test1', 'test2'])
    )
  );
  search(
    searchTerm: string | null = null,
    assignedToUser: string | null = null
  ) {
    this.router.navigate([], {
      queryParams: this.createQueryParams(searchTerm, assignedToUser),
      queryParamsHandling: 'merge'
    });
  }

  searchUsers(name: string) {
    this.userSearchNameSubject.next(name);
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
