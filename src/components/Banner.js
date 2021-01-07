import React from "react";
import { connect } from "react-redux";

class Banner extends React.Component {
  render() {
    let marginTop = { marginTop: "2rem" };

    if (this.props.totalNoms.length < 5) {
      return null;
    }

    if (this.props.isSignedIn === null) {
      return null;
    }

    return (
      <div
        className="ui center aligned grid"
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
