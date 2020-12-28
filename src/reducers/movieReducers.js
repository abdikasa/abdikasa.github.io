export default (state = {}, action) => {
  console.log("state and action are: ", state, action);
  switch (action.type) {
    case "SEARCH_MOVIE":
      console.log({ ...state, ...action.payload.Search });
      return { ...state, ...action.payload.Search };
    default:
      return state;
  }
};
