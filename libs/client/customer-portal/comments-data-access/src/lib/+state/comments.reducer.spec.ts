import { CommentsEntity } from './comments.models';
import * as CommentsActions from './comments.actions';
import { State, initialState, reducer } from './comments.reducer';

describe('Comments Reducer', () => {
  const createCommentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as CommentsEntity);

  beforeEach(() => {});

  describe('valid Comments actions', () => {
    it('loadCommentsSuccess should return set the list of known Comments', () => {
      const comments = [
        createCommentsEntity('PRODUCT-AAA'),
        createCommentsEntity('PRODUCT-zzz')
      ];
      const action = CommentsActions.loadCommentsSuccess({ comments });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
