import React from "react";
import { connect } from "react-redux";
import { fetchStatus, signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    this.props.fetchStatus(this.onAuthChange);
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //later: get user id if signed in already.
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  signUserIn = () => {
    this.props.current.signIn();
  };

  signUserOut = () => {
    this.props.current.signOut();
  };

  renderAuthButtons = () => {
    if (this.props.isSignedIn === true) {
      return (
        <button className="negative ui button" onClick={this.signUserOut}>
          Sign Out
        </button>
      );
    } else if (this.props.isSignedIn === false) {
      return (
        <button onClick={this.signUserIn} className="positive ui button">
          Sign In
        </button>
      );
    }
    return null;
  };

  render() {
    return <React.Fragment>{this.renderAuthButtons()}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return { current: state.auth, isSignedIn: state.isSignedIn };
};
export default connect(mapStateToProps, { fetchStatus, signIn, signOut })(
  GoogleAuth
);
