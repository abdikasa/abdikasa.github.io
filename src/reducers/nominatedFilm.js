export default (state = {}, action) => {
  switch (action.type) {
    case "NOM_FILM":
      return { ...state, [action.payload.imdbID]: action.payload };
    case "DELETE_MOVIE":
      delete state[action.payload];
      return { ...state };
    case "FETCH_ALL":
      /**
       * State will be some object like {name: 'Billy', age: 10, id: 127}
       * We want to store this data with the key as the id,
       * {127: {name: 'Billy', age: 10, id: 127}, 128: Amanda: {...etc}}
       */
      const nested = {};
      action.payload.forEach((movie) => {
        nested[movie.imdbID] = movie;
      });
      return { ...state, ...nested };
    default:
      return state;
  }
};
