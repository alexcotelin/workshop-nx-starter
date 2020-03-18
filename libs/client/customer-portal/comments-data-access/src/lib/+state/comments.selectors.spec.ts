import { CommentsEntity } from './comments.models';
import { State, commentsAdapter, initialState } from './comments.reducer';
import * as CommentsSelectors from './comments.selectors';

describe('Comments Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCommentsId = it => it['id'];
  const createCommentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as CommentsEntity);

  let state;

  beforeEach(() => {
    state = {
      comments: commentsAdapter.addAll(
        [
          createCommentsEntity('PRODUCT-AAA'),
          createCommentsEntity('PRODUCT-BBB'),
          createCommentsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Comments Selectors', () => {
    it('getAllComments() should return the list of Comments', () => {
      const results = CommentsSelectors.getAllComments(state);
      const selId = getCommentsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CommentsSelectors.getSelected(state);
      const selId = getCommentsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCommentsLoaded() should return the current 'loaded' status", () => {
      const result = CommentsSelectors.getCommentsLoaded(state);

      expect(result).toBe(true);
    });

    it("getCommentsError() should return the current 'error' state", () => {
      const result = CommentsSelectors.getCommentsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
