export default (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE":
      return { ...state, ...action.payload.Search };
    default:
      return state;
  }
};
