import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import Banner from "./Banner";

const Header = () => {
  return (
    <div className="ui container">
      <Banner></Banner>
      <div className="ui secondary menu">
        <Link to="/movies" className="item">
          Shoppies
        </Link>
        <div className="right menu">
          <GoogleAuth></GoogleAuth>
        </div>
      </div>
    </div>
  );
};

export default Header;
