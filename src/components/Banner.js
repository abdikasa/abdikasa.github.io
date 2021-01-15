import React from "react";
import { connect } from "react-redux";

/**
 * Banner can be more reusable with props, but for the sake of this project, it does the job.
 * Checks if user has already submitted 5 movie nominations and displays a message if so.
 */
class Banner extends React.Component {
  render() {
    const nomMovies = this.props.totalNoms.reduce((acc, curr) => {
      if (curr.id === this.props.isSignedIn) {
        acc += 1;
      }
      return acc;
    }, 0);

    if (nomMovies < 5) {
      return null;
    }

    if (this.props.isSignedIn === null) {
      return null;
    }

    return (
      <div
        className="ui center aligned grid banner"
        style={{ position: "sticky", top: "0", zIndex: "1000" }}
      >
        <div
          className="ui column banner test ad"
          data-text="You have reached the maximum number of nominations (5)."
          style={{ backgroundColor: "#252a4d" }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalNoms: Object.values(state.nominatedFilm),
    isSignedIn: state.signInId.id,
  };
};

export default connect(mapStateToProps)(Banner);
