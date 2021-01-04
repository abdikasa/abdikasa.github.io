export default (state = {}, action) => {
  switch (action.type) {
    case "NOM_FILM":
      return { ...state, [action.payload.imdbID]: action.payload };
    case "DELETE_MOVIE":
      delete state[action.payload];
      return { ...state };
    case "FETCH_ALL":
      const nested = {};
      action.payload.forEach((movie) => {
        nested[movie.imdbID] = movie;
      });
      return { ...state, ...nested };
    default:
      return state;
  }
};
