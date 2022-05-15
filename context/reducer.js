import {
  CLOSE_SEARCH_BAR,
  GET_DAILY_WEATHER,
  GET_TODAYS_WEATHER,
  OPEN_SEARCH_BAR,
} from "./reducerIndex";

const reducer = (state = initialState, { type, payload }) => {
  if (type === CLOSE_SEARCH_BAR) {
    return { ...state, showSearchBar: false };
  }

  if (type === OPEN_SEARCH_BAR) {
    return { ...state, showSearchBar: true };
  }

  if (type === GET_TODAYS_WEATHER) {
    return { ...state, todaysWeather: payload };
  }

  if (type === GET_DAILY_WEATHER) {
    let arr = [];
    if (!state.dailyWeather) {
      arr.push(payload);
    } else {
      arr = state.dailyWeather;
      arr.push(payload);
    }
    return { ...state, dailyWeather: arr };
  }
  return state;
};
export default reducer;
