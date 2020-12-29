import React from "react";
import GoogleAuth from "./GoogleAuth";
import Link from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary menu">
      <a className="item">Shoppies</a>
      <div className="right menu">
        <GoogleAuth></GoogleAuth>
      </div>
    </div>
  );
};

export default Header;
