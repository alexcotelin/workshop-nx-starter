import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil
} from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SearchResult } from '@tuskdesk-suite/tickets-management/domain';
import { SearchCriteria } from '@tuskdesk-suite/client/customer-portal/tickets-data-access';

@Component({
  selector: 'tickets-management-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTicketsComponent implements OnInit, OnDestroy {
  @Input() set searchCriteria(searchCriteria: SearchCriteria) {
    this.searchTerm.setValue(searchCriteria.searchTerm);
    this.assignedToUser.setValue(searchCriteria.assignedToUser);
  }
  @Input() users: string[] = [];
  @Input() searchResults: SearchResult[] = [];

  @Output() search: EventEmitter<SearchCriteria> = new EventEmitter();
  @Output() searchUsers: EventEmitter<string> = new EventEmitter();

  searchTerm = new FormControl();
  assignedToUser = new FormControl();

  private destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.assignedToUser.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => this.searchUsers.emit(term));
  }

  submit() {
    this.search.emit({
      searchTerm: this.searchTerm.value,
      assignedToUser: this.assignedToUser.value
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
