import React from "react";
import MovieButton from "./MovieButton";

class ReusableMovieList extends React.Component {
  renderMovieHelper = (movie, options = null) => {
    return (
      <div className="ui dimmer ">
        <div className="content">
          <MovieButton movie={movie} options={options}></MovieButton>
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

  render() {
    return this.renderMovies();
  }
}

export default ReusableMovieList;
