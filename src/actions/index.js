import axios from "axios";
import LocalStorageHelper from "../localStorageHelper";

export const signIn = (id) => {
  return {
    type: "SIGN_IN",
    id,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const searchMovies = (q) => async (dispatch) => {
  /**
   * when a movie or a word is typed in, we want to run this action creator.
   * We return a lower case version of the query, pass it to the API
   * if there is a Search property, the movie exists, else it's an error.
   */
  q = q.toLowerCase().trim();
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=b3c713a5&s=${q}&type=movie`
  );

  if (response.data.Search) {
    dispatch({ type: "SEARCH_MOVIE", payload: response.data });
  } else {
    dispatch({ type: "SEARCH_MOVIE_U", payload: response.data.Error });
  }
};

export const fetchStatus = (callback) => async (dispatch, getState) => {
  //1. Get the GAuth object and update its status
  //when the sign in/out button is pressed.

  await dispatch(getGoogleAuth());
  //2. Get the initial status of the user and show it on the screen.
  const auth = getState().auth;
  callback(auth.isSignedIn.get());

  //3. Update the status of auth and store it in the store.
  dispatch({ type: "FETCH_GSTATUS", payload: auth.isSignedIn.get() });

  // 4. attach a listener to whenever the isSignedIn property changes.
  // 5. Update the store and by doing so, the component too.
  auth.isSignedIn.listen(() => {
    callback(auth.isSignedIn.get());
    dispatch({ type: "FETCH_GSTATUS", payload: auth.isSignedIn.get() });
  });
};

export const getGoogleAuth = () => async (dispatch) => {
  /**
   * The load function takes a callback, which we can use async/await or extends with .then.
   * So i used a dummy resolve and awaited the promise to completion.
   */
  await new Promise((resolve, reject) => {
    window.gapi.load("client:auth2", resolve);
  });

  /**
   * when the load function is completed, we now have access to the client.init function.
   * This function helps us initialize and authorize the application's use of their API.
   * The scope refers to what data we wish to use.
   * Upon completing this project, I now realize I only needed the 'email' scope.
   */
  await window.gapi.client.init({
    clientId:
      "966761145318-lchet6c8rli1o5jk7k82nrug9fpqe8og.apps.googleusercontent.com",
    scope: "profile",
  });

  const auth = window.gapi.auth2.getAuthInstance();
  dispatch({ type: "FETCH_GAUTH", payload: auth });
};

export const saveMovies = (movie) => async (dispatch, getState) => {
  //what do i want to happen
  //I want user to have their movie saved in the server
  //use part of their sign in id
  //auth2.currentUser.get().getBasicProfile() for the names of the user.
  //their id in the server can be: take first five letters of their given name in between the first 5 and
  //last 5 numbers.

  const { signInId, auth } = getState();

  const myFavMovie = {
    ...movie,
  };

  /**
   * This code snippet below is used to prevent duplicates being stored in the user's browser.
   */
  if (
    LocalStorageHelper.get("nominatedMovies").every(
      (movie) => movie.Title !== myFavMovie.Title
    )
  ) {
    LocalStorageHelper.add(myFavMovie);
  }

  dispatch({ type: "NOM_FILM", payload: myFavMovie });
};

export const deleteMovie = (id) => async (dispatch, getState) => {
  //take the deleted movies id and use it to delete the fil off nominated list
  LocalStorageHelper.removeItem("nominatedMovies", id);
  dispatch({ type: "DELETE_MOVIE", payload: id });
};

export const fetchNominatedMovies = () => {
  //get the movies inside localStorage
  return {
    type: "FETCH_ALL",
    payload: LocalStorageHelper.get("nominatedMovies"),
  };
};

export const fetchNominatedMoviesRS = () => async (dispatch, getState) => {
  await dispatch(fetchNominatedMovies());

  const nominatedMoviesFromRS = getState().nominatedFilm;

  return {
    type: "FETCH_ALL_RS",
    payload: nominatedMoviesFromRS,
  };
};
