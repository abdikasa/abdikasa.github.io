import React from "react";
import "../css/GoogleAuth.css";
import { connect } from "react-redux";
import { fetchStatus, signIn, signOut } from "../actions";

/**
 * This applicaton requires user to have a gmail account. Sorry not sorry.
 * The account will be used to store the nominated movies.
 * When user signs out, the searched movies will not have action buttons.
 */

class GoogleAuth extends React.Component {
  /**
   * When component mounts, call the action creator and get the user's google auth2 object.
   * The callback is used because Google gives us a convenient 'listen' method on
   * when user signs in and out.
   */
  componentDidMount() {
    this.props.fetchStatus(this.onAuthChange);
  }

  onAuthChange = (isSignedIn) => {
    /**
     * The listen function will detect when a change occurs, and when such change occurs,
     * we want to check if user is signed in already (get the id associated with the user),
     * else, sign out.
     */
    if (isSignedIn) {
      this.props.signIn(this.props.current.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  signUserIn = () => {
    /**
     * Current is the gapi auth2 object, we call its SI/SO functions.
     */
    this.props.current.signIn();
  };

  signUserOut = () => {
    /**
     * Current is the gapi auth2 object, we call its SI/SO functions.
     */
    this.props.current.signOut();
  };

  renderAuthButtons = () => {
    /**
     * If user is signed in, create a sign out button.
     */
    if (this.props.isSignedIn === true) {
      return (
        <button
          className="negative ui button so-button"
          onClick={this.signUserOut}
        >
          Sign Out
        </button>
      );
      /**
       * If user is signed out, create a sign in button.
       */
    } else if (this.props.isSignedIn === false) {
      return (
        <button
          onClick={this.signUserIn}
          className="positive ui button so-button"
        >
          Sign In
        </button>
      );
    }
    //when component is first rendered, return null to avoid issues.
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
