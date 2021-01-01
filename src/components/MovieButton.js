import React from "react";

class MovieButton extends React.Component {
  state = { test: "Nominate" };

  onClickHandler = () => {
    if (this.state.test === "Nominated") {
      this.setState({ test: "Nominate" });
    } else {
      this.setState({ test: "Nominated" });
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

export default MovieButton;
