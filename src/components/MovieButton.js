import React from "react";
import { saveMovies, deleteMovie } from "../actions";
import { connect } from "react-redux";

class MovieButton extends React.Component {
  state = { test: "Nominate" };

  onClickHandler = () => {
    console.log(this.props.movie);
    if (this.state.test === "Nominated") {
      this.setState({ test: "Nominate" });
      this.props.deleteMovie(this.props.movie.imdbID);
    } else {
      this.setState({ test: "Nominated" });
      this.props.saveMovies(this.props.movie);
    }
  };

  render() {
    let nominatedColor = this.state.test === "Nominated" ? "positive" : "";
    return (
      <div className="center">
        <div
          className={`ui toggle button ${nominatedColor}`}
          onClick={this.onClickHandler}
        >
          {this.state.test}
        </div>
      </div>
    );
  }
}

export default connect(null, { saveMovies, deleteMovie })(MovieButton);
