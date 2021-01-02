import React, { Component } from "react";
import TypedJs from "../TypedJs";
import "../../css/MovieList.css";
import Search from "../Search";
import { connect } from "react-redux";
import { searchMovies } from "../../actions";
import MovieButton from "../MovieButton";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.label = React.createRef();
    this.hoverImg = React.createRef();
  }

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
    }, 400);
  };

  renderMovieHelper = (movie) => {
    return (
      <div className="ui dimmer ">
        <div className="content">
          <MovieButton movie={movie}></MovieButton>
        </div>
      </div>
    );
  };

  renderMovies = () => {
    const { movies } = this.props;
    const { signInID } = this.props;
    const hideButton =
      signInID === null
        ? (data) => {
            return "";
          }
        : this.renderMovieHelper;

    console.log(movies);
    if (movies.error) {
      if (movies.error === "Incorrect IMDb ID." && this.state.term === "") {
        return "";
      }
      return movies.error;
    }
    return Object.values(movies).map((movie) => {
      return (
        <div
          className="eight wide mobile four wide tablet three wide computer column stretched"
          key={movie.imdbID}
        >
          <div className="ui special cards">
            <div className="eq-card ui card fluid">
              <div
                className="blurring dimmable image"
                ref={() => {
                  window.$(".special.cards .image").dimmer({
                    on: "hover",
                  });
                }}
              >
                {movie.Poster !== "N/A" ? (
                  <img src={movie.Poster} className="poster-img"></img>
                ) : (
                  <img
                    src="https://placehold.it/300x200"
                    srcSet="https://placehold.it/300x200 300w"
                    sizes="100vw"
                    alt="Placeholder"
                  />
                )}
                {hideButton(movie)}
              </div>
              <div className="content">
                <a className="header">{movie.Title}</a>
                <div className="meta">
                  <span className="date">Created in {movie.Year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
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
        <div className="ui centered align grid">{this.renderMovies()}</div>
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { movies: state.queryResults, signInID: state.signInId.id };
};

export default connect(mapStateToProps, { searchMovies })(MovieList);
