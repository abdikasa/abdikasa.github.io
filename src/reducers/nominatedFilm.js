export default (state = {}, action) => {
  switch (action.type) {
    case "NOM_FILM":
      console.log("ADD MOVIE is called");
      return { ...state, [action.payload.imdbID]: action.payload };
    case "DELETE_MOVIE":
      console.log("DELETE MOVIE is called");

      delete state[action.payload];
      return { ...state };
    case "FETCH_ALL":
      /**
       * State will be some object like {name: 'Billy', age: 10, id: 127}
       * We want to store this data with the key as the id,
       * {127: {name: 'Billy', age: 10, id: 127}, 128: Amanda: {...etc}}
       */
      console.log("FETCH ALL is called");
      const nested = {};
      action.payload.forEach((movie) => {
        nested[movie.imdbID] = movie;
      });
      console.log({ ...state, ...nested });
      return { ...state, ...nested };
    default:
      return state;
  }
};
