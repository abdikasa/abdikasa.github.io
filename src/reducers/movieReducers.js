export default (state = {}, action) => {
  console.log(action.type, state, action);
  switch (action.type) {
    case "SEARCH_MOVIE":
      return { ...action.payload.Search };
    case "SEARCH_MOVIE_U":
      return { error: action.payload };
    default:
      return state;
  }
};
