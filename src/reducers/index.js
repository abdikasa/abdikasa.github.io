import { combineReducers } from "redux";
import movieReducers from "./movieReducers";
import fetchAuth from "./fetchAuth";
import fetchStatus from "./fetchStatus";
import getId from "./getId";
import nominatedFilm from "./nominatedFilm";

export default combineReducers({
  dummy: () => "some dummy code here, nothing much going on",
  queryResults: movieReducers,
  auth: fetchAuth,
  isSignedIn: fetchStatus,
  signInId: getId,
  nominatedFilm,
});
