import React from "react";
import { saveMovies, deleteMovie } from "../actions";
import { connect } from "react-redux";

class MovieButton extends React.Component {
  state = { status: "Nominate" };

  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem("nominatedMovies")));
    if (!JSON.parse(localStorage.getItem("nominatedMovies"))) {
      return;
    }

    const localMovies = localStorage.getItem("nominatedMovies");

    if (
      JSON.parse(localMovies).find(
        (movie) => movie.Title === this.props.movie.Title
      ) &&
      !Object.values(this.props.reduxMovies).every((movie) => {
        return movie.Title !== this.props.movie.Title;
      })
    ) {
      this.setState({ status: "Nominated" });
      this.props.saveMovies(this.props.movie);
    }
  }

  onClickHandler = () => {
    console.log(this.props.movie);
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
    return (
      <div className="center">
        <div
          className={`ui toggle button ${nominatedColor}`}
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
