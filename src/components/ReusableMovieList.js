import React from "react";
import MovieButton from "./MovieButton";

/**
 * I finally found an opportunity to actually create a reusable component.
 * I fist created MovieList and noticed when i was creating the component --
 * MyMovieList, the rendering of the movies would be the same. So i created --
 * this component to handle that.
 */

class ReusableMovieList extends React.Component {
  renderMovieButton = (movie, options = null) => {
    return (
      <div className="ui dimmer ">
        <div className="content">
          <MovieButton movie={movie} options={options}></MovieButton>
        </div>
      </div>
    );
  };

  renderMovies = () => {
    /**
     * We take the props that are passed in.
     */
    const { movies } = this.props;
    const { signInID } = this.props;

    /**
     * This is a workaround honestly, since my success call would return a function reference,
     * I also needed to create a dummy function for a failure case.
     * i kept getting re-render issues, and this bypasses that.
     */
    const hideButton =
      signInID === null
        ? (data) => {
            return "";
          }
        : this.renderMovieButton;

    /**
     * Semantic UI uses jQuery, I'm using REACt, so I can't use DOM.queryS.
     * I used a workaround and used Refs, not to get the element, but to have access
     * to the window object, otherwise I would get jquery is undefined or other errors.
     * */
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
