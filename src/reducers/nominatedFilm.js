export default (state = {}, action) => {
  switch (action.type) {
    case "NOM_FILM":
      return { ...state, [action.payload.imdbID]: action.payload };
    default:
      return state;
  }
};
