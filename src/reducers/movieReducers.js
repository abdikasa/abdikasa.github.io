export default (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE":
      //returns an array of movie objects spread in this new on-the-fly object.

      const searched = Object.values([...action.payload.movies.Search]).map(
        (movie) => {
          movie.id = action.payload.id;
          return movie;
        }
      );

      return { ...searched };
    case "SEARCH_MOVIE_U":
      //return error as an object, identical to a success call above.
      return { error: action.payload };
    default:
      return state;
  }
};
