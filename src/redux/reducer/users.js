import produce from 'immer';
import { ADD_REVIEW, LOAD_USERS, SUCCESS, REQUEST, FAILURE } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, data, review, userId, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      return {
        ...draft,
        loading: true,
        error: null,
      }
    case LOAD_USERS + SUCCESS:
      draft.entities = arrToMap(data);
      draft.loading = false;
      draft.loaded = true;
      return draft;
    case LOAD_USERS + FAILURE:
      draft.error = error;
      return draft;
    case ADD_REVIEW:
      const { name } = review;
      draft[userId] = { id: userId, name };
      break;
    default:
      return draft;
  }
});
