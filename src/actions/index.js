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
  q = q.toLowerCase().trim();
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=b3c713a5&s=${q}&type=movie`
  );

  if (response.data.Search) {
    console.log("we have search results with that query");
    dispatch({ type: "SEARCH_MOVIE", payload: response.data });
  } else {
    console.log("we dont have search results with that query");
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

  //3. Update the status of auth and store it int he store'
  dispatch({ type: "FETCH_GSTATUS", payload: auth.isSignedIn.get() });

  // 4. attach a listener to whenever the isSignedIn property changes.
  // 5. Update the store and the component.
  auth.isSignedIn.listen(() => {
    console.log("the listened function was called.");
    callback(auth.isSignedIn.get());
    dispatch({ type: "FETCH_GSTATUS", payload: auth.isSignedIn.get() });
  });
};

export const getGoogleAuth = () => async (dispatch) => {
  await new Promise((resolve, reject) => {
    window.gapi.load("client:auth2", resolve);
  });

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
  console.log(getState());
  let firsthalf = signInId.id.split("").splice(0, 5).join("");
  let secondhalf = signInId.id
    .split("")
    .splice(signInId.id.length - 5)
    .join("");
  const uniqueName = `${firsthalf}${auth.currentUser
    .get()
    .getBasicProfile()
    .getGivenName()}${secondhalf}`;

  const myFavMovie = {
    ...movie,
  };

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
  console.log("id", id);
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
