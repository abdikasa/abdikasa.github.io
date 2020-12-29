import React, { Component } from "react";
import TypedJs from "../TypedJs";
import "../../css/MovieList.css";

class MovieList extends Component {
  render() {
    return (
      <div className="ui center aligned grid typed-container">
        <div className="sixteen wide column">
          <span className="prefix-typed">FIND YOUR</span>
          <TypedJs
            strings={["<strong>MOVIE</strong>"]}
            className="typed_string"
          ></TypedJs>
        </div>

        <div className="ten wide column search-container">
          <h1>Search</h1>
          <div className="ui large transparent fluid input">
            <input
              type="text"
              placeholder="Type here..."
              id="transparent-input"
              className="ui center aligned"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
