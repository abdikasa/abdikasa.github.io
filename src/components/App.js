import React from "react";
import { Route, Router } from "react-router-dom";
import MovieList from "./pages/MovieList";
import history from "../history";
import Header from "./Header";
import MyMovieList from "./pages/MyMovieList";

/**
 * In hindsight upon completing the project, I didn't need to pass the history object manually.
 * It already keeps track of it but just in case i ever want to redirect the user, I can call
 * the historys function and import it wherever in my project.
 */
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header></Header>
        <Route path="/movies" component={MovieList} exact></Route>
        <Route path="/movies/show" component={MyMovieList} exact></Route>
      </Router>
    </div>
  );
};

export default App;
