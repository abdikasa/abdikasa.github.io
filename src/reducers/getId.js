export default (state = { isSignedIn: null, id: null }, action) => {
  switch (action.type) {
    case "SIGN_IN":
      //if is their gmail id associated with their account.
      return { ...state, isSignedIn: true, id: action.id };
    case "SIGN_OUT":
      //rewrite isSignedIn and id if user signs out of our app.
      return { ...state, isSignedIn: false, id: null };
    default:
      return state;
  }
};
