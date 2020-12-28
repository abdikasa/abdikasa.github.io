import axios from "axios";

export const signIn = () => {
  return {
    type: "SIGN_IN",
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const searchMovies = (q) => async (dispatch) => {
  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=b3c713a5&s=${q}&type=movie`
  );
  console.log("Response", response);
  dispatch({ type: "SEARCH_MOVIE", payload: response.data });
};

export const fetchStatus = (callback) => async (dispatch, getState) => {
  //1. Get the GAuth object and update its status
  //when the sign in/out button is pressed.

  await dispatch(getGoogleAuth());
  console.log(getState());
  //2. Get the initial status of the user and show it on the screen.
  const auth = getState().auth;
  console.log(auth);
  callback(auth.isSignedIn.get());

  //3. Update the status of auth and store it int he store'
  dispatch({ type: "FETCH_GSTATUS", payload: auth.isSignedIn.get() });

  //4. attach a listener to whenever the isSignedIn property changes.
  //5. Update the store and the component.
  auth.isSignedIn.listen(() => {
    callback(auth.isSignedIn.get());
    dispatch({ type: "FETCH_GSTATUS", payload: auth.isSignedIn.get() });
  });
};

export const getGoogleAuth = () => async (dispatch) => {
  await new Promise((resolve, reject) => {
    window.gapi.load("client:auth2", resolve);
  });

  window.gapi.client.init({
    clientId:
      "966761145318-lchet6c8rli1o5jk7k82nrug9fpqe8og.apps.googleusercontent.com",
    scope: "email",
  });

  const auth = window.gapi.auth2.getAuthInstance();
  console.log(auth);
  dispatch({ type: "FETCH_GAUTH", payload: auth });
};
