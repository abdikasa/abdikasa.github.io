import React from "react";
import { connect } from "react-redux";
import { fetchStatus } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    this.props.fetchStatus(this.onAuthChange);
  }

  onAuthChange = (isSignedIn) => {
    console.log(isSignedIn);
  };

  render() {
    return <div>Google Auth</div>;
  }
}

export default connect(null, { fetchStatus })(GoogleAuth);
