import React from "react";
import { Route, Router } from "react-router-dom";
import MovieList from "./CRUD/MovieList";
import history from "../history";
import Header from "./Header";

const App = () => {
  return (
    <div className="ui container">
      <Header></Header>
      <Router history={history}>
        <Route path="/movies" component={MovieList} exact></Route>
      </Router>
    </div>
  );
};

export default App;
