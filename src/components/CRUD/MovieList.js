import React, { Component } from "react";
import TypedJs from "../TypedJs";
import "../../css/MovieList.css";
import Search from "../Search";
import { connect } from "react-redux";
import { searchMovies } from "../../actions";

class MovieList extends Component {
  componentDidMount() {
    this.timer = null;
  }

  state = { term: "" };

  onChangeHandler = (e) => {
    clearTimeout(this.timer);
    this.setState({ term: e.target.value });
    this.timer = setTimeout(() => {
      if (e.target.value.trim().length === 0) {
        this.props.searchMovies("");
        return;
      }
      this.props.searchMovies(e.target.value);
    }, 600);
  };

  renderErrorMessage = () => {
    const { movies } = this.props;
    console.log(movies);
    if (movies.error) {
      if (movies.error === "Incorrect IMDb ID." && this.state.term === "") {
        return "";
      }
      return movies.error;
    }
    return Object.values(movies).map((movie) => {
      return (
        <React.Fragment key={movie.imdbID}>
          <h3>{movie.Title}</h3>
        </React.Fragment>
      );
    });
  };

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
            <Search
              cname="ui center aligned"
              id="transparent-input"
              value={this.state.term}
              onChange={this.onChangeHandler}
            ></Search>
          </div>
          {this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { movies: state.queryResults };
};

export default connect(mapStateToProps, { searchMovies })(MovieList);
