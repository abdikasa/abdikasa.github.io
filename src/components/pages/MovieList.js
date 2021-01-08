import React, { Component } from "react";
import TypedJs from "../TypedJs";
import "../../css/MovieList.css";
import Search from "../Search";
import { connect } from "react-redux";
import { searchMovies, fetchNominatedMovies } from "../../actions";
import ReusableMovieList from "../ReusableMovieList";

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  state = { term: "" };

  componentDidMount() {
    this.timer = null;
    this.props.fetchNominatedMovies();
  }

  /**
   * My attempt on debouncing or throttling the search speed.
   * when a key is pressed, get rid of the timeout and create a new one.
   * If this function is called within 400, create another timeout and wait for further response.
   */
  onChangeHandler = (e) => {
    clearTimeout(this.timer);
    this.setState({ term: e.target.value });
    this.timer = setTimeout(() => {
      if (e.target.value.trim().length === 0) {
        this.props.searchMovies("");
        return;
      }
      this.props.searchMovies(e.target.value);
    }, 400);
  };

  /**
   * For most movie searches, this will return 10 movies.
   * The first if clause is written to return an error to the screen.
   * Otherwise it will take the count of movies returned.
   */
  renderResultsFound = () => {
    const { movies } = this.props;
    const moviesArr = Object.values(movies);
    if (moviesArr.length === 1 && this.state.term.trim() !== "") {
      return moviesArr[0];
    }
    if (this.state.term.trim() === "") return null;
    return moviesArr.length + " results found!";
  };

  renderContent = () => {
    /**
     * On search, hide the typed container class, which will puch the search bar to the top
     * of the screen since by hiding the container class, we will also be removing the margin.
     */
    const labelClass = this.state.term.trim().length === 0 ? "show" : "hide";

    return (
      <div className="ui container">
        <div className="ui center aligned grid">
          <div className={`sixteen wide column ${labelClass} typed-container`}>
            <span className="prefix-typed">FIND YOUR</span>
            <TypedJs
              strings={["<strong>MOVIE</strong>"]}
              className="typed_string"
            ></TypedJs>
          </div>

          <div className={`ten wide column search-container ${labelClass}`}>
            <h1>Search</h1>
            <div className="ui large transparent fluid input">
              <Search
                cname="ui center aligned"
                id="transparent-input"
                value={this.state.term}
                onChange={this.onChangeHandler}
              ></Search>
            </div>
          </div>
        </div>
        <div
          className="ui grid"
          style={{ textAlign: "right", marginTop: "-1.25rem" }}
        >
          <div className="thirteen wide column">
            <span>{this.renderResultsFound()}</span>
          </div>
        </div>
        <div className="ui centered align grid">
          {
            <ReusableMovieList
              movies={this.props.movies}
              signInID={this.props.signInID}
            ></ReusableMovieList>
          }
        </div>
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.queryResults,
    signInID: state.signInId.id,
    nominatedFilms: state.nominatedFilm,
  };
};

export default connect(mapStateToProps, { searchMovies, fetchNominatedMovies })(
  MovieList
);
