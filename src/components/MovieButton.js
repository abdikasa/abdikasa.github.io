import React from "react";
import { saveMovies, deleteMovie } from "../actions";
import { connect } from "react-redux";

class MovieButton extends React.Component {
  /**
   * I opted to use class level state instead of redux.
   * It will keep track of whether a button has been pressed or not.
   */
  state = { status: "Nominate" };

  componentDidMount() {
    /**
     * When component gets rendered, check if localStorage has a clue about --
     * the nominated movies.
     */
    if (!JSON.parse(localStorage.getItem("nominatedMovies"))) {
      return;
    }

    const localMovies = localStorage.getItem("nominatedMovies");
    const isFound = JSON.parse(localMovies).find(
      (movie) => movie.Title === this.props.movie.Title
    );

    /**
     * This code is used to update the redux store with the movies stored in the user's browser.
     */
    if (isFound) {
      this.setState({ status: "Nominated" });
    }
  }

  onClickHandler = () => {
    /**
     * Simple onClick handler.
     * If the button has the text nominated and is clicked, change back to Nominate.
     * else, change to nominated and update ths store in both cases.
     */
    if (this.state.status === "Nominated") {
      this.setState({ status: "Nominate" });
      this.props.deleteMovie(this.props.movie.imdbID);
    } else {
      this.setState({ status: "Nominated" });
      this.props.saveMovies(this.props.movie);
    }
  };

  render() {
    /**
     * The toggle button didn't work for me on Semantic UI, so I used a work-around.
     * If status is nominated, change to green, else, use grey.
     * I tried using disabled as a state, but got re-render infinite issues, so I used a --
     * work-around; created a class with specific rules to mimic the desired effect.
     */
    let nominatedColor = this.state.status === "Nominated" ? "positive" : "";
    let disabledClass = {};
    if (
      this.state.status === "Nominate" &&
      Object.values(this.props.reduxMovies).length === 5
    ) {
      disabledClass = { pointerEvents: "none", opacity: "0.4" };
    }

    return (
      <div className="center">
        <div
          className={`ui toggle button ${nominatedColor}`}
          style={disabledClass}
          onClick={this.onClickHandler}
        >
          {this.state.status}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { reduxMovies: state.nominatedFilm };
};

export default connect(mapStateToProps, { saveMovies, deleteMovie })(
  MovieButton
);
