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
    this.label = React.createRef();
    this.hoverImg = React.createRef();
  }

  state = { term: "" };

  componentDidMount() {
    this.timer = null;
    this.props.fetchNominatedMovies();
  }

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
            <h1 ref={this.label}>Search</h1>
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
