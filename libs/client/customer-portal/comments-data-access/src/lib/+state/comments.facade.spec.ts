import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CommentsEntity } from './comments.models';
import { CommentsEffects } from './comments.effects';
import { CommentsFacade } from './comments.facade';

import * as CommentsSelectors from './comments.selectors';
import * as CommentsActions from './comments.actions';
import {
  COMMENTS_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './comments.reducer';

interface TestSchema {
  comments: State;
}

describe('CommentsFacade', () => {
  let facade: CommentsFacade;
  let store: Store<TestSchema>;
  const createCommentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as CommentsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COMMENTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CommentsEffects])
        ],
        providers: [CommentsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CommentsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allComments$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(CommentsActions.loadCommentsForTicket());

        list = await readFirst(facade.allComments$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCommentsSuccess` to manually update list
     */
    it('allComments$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allComments$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          CommentsActions.loadCommentsSuccess({
            comments: [createCommentsEntity('AAA'), createCommentsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allComments$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
