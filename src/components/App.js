import React from "react";
import { Route, Router } from "react-router-dom";
import MovieList from "./CRUD/MovieList";
import history from "../history";
import Header from "./Header";
import MyMovieList from "./CRUD/MyMovieList";

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
