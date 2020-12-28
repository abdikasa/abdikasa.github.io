import { combineReducers } from "redux";
import movieReducers from "./movieReducers";
import fetchAuth from "./fetchAuth";
import fetchStatus from "./fetchStatus";
import getId from "./getId";

export default combineReducers({
  dummy: () => "some dummy code here, nothing much going on",
  queryResults: movieReducers,
  auth: fetchAuth,
  isSignedIn: fetchStatus,
  signInId: getId,
});
