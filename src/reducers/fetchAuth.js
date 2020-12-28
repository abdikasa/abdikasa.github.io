export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_GAUTH":
      return action.payload;
    default:
      return state;
  }
};
