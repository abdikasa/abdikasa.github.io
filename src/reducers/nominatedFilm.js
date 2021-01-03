export default (state = {}, action) => {
  switch (action.type) {
    case "NOM_FILM":
      return { ...state, [action.payload.imdbID]: action.payload };
    case "DELETE_MOVIE":
      delete state[action.payload];
      return { ...state };
    default:
      return state;
  }
};
