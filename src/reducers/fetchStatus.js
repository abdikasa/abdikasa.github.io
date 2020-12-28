export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_GSTATUS":
      return action.payload;
    default:
      return state;
  }
};
