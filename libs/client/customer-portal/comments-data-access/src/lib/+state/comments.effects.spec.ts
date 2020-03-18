import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CommentsEffects } from './comments.effects';
import * as CommentsActions from './comments.actions';

describe('CommentsEffects', () => {
  let actions: Observable<any>;
  let effects: CommentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CommentsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(CommentsEffects);
  });

  describe('loadComments$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CommentsActions.loadCommentsForTicket() });

      const expected = hot('-a-|', {
        a: CommentsActions.loadCommentsSuccess({ comments: [] })
      });

      expect(effects.loadComments$).toBeObservable(expected);
    });
  });
});
