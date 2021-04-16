import {
  LOAD_PRODUCTS,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, error, id } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case LOAD_PRODUCTS + SUCCESS:
      return {
        ...state,
        entities: { ...state.entities, ...arrToMap(data) },
        loading: false,
        loaded: { ...state.loaded, [id]: true },
      };
    case LOAD_PRODUCTS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: { ...state.loaded, [id]: false },
        error,
      };
    default:
      return state;
  }
};
