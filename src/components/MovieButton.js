import React from "react";
import { saveMovies, deleteMovie } from "../actions";
import { connect } from "react-redux";

class MovieButton extends React.Component {
  state = { status: "Nominate" };

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem("nominatedMovies"))) {
      return;
    }

    const localMovies = localStorage.getItem("nominatedMovies");
    const isFound = JSON.parse(localMovies).find(
      (movie) => movie.Title === this.props.movie.Title
    );

    //RS = redux store
    const isFoundInRS = !Object.values(this.props.reduxMovies).every(
      (movie) => movie.Title !== this.props.movie.Title
    );

    if (isFound && isFoundInRS) {
      this.setState({ status: "Nominated" });
      this.props.saveMovies(this.props.movie);
    }
  }

  onClickHandler = () => {
    if (this.state.status === "Nominated") {
      this.setState({ status: "Nominate" });
      this.props.deleteMovie(this.props.movie.imdbID);
    } else {
      this.setState({ status: "Nominated" });
      this.props.saveMovies(this.props.movie);
    }
  };

  render() {
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
