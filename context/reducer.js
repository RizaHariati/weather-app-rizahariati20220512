import { CLOSE_SEARCH_BAR, OPEN_SEARCH_BAR } from "./reducerIndex";

const reducer = (state = initialState, { type, payload }) => {
  if (type === CLOSE_SEARCH_BAR) {
    return { ...state, showSearchBar: false };
  }
  if (type === OPEN_SEARCH_BAR) {
    return { ...state, showSearchBar: true };
  }

  return state;
};
export default reducer;
