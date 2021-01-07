import React from "react";
import { connect } from "react-redux";
import { fetchNominatedMoviesRS } from "../../actions";
import ReusableMovieList from "../ReusableMovieList";

class MyMovieList extends React.Component {
  componentDidMount() {
    this.props.fetchNominatedMoviesRS();
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui center aligned grid">
          <div className="column">
            <h3>My Nominated Picks</h3>
          </div>
        </div>
        <div className="ui centered align grid">
          <ReusableMovieList
            movies={this.props.myMovies}
            signInID={this.props.signInID}
          ></ReusableMovieList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myMovies: Object.values(state.nominatedFilm),
    signInID: state.signInId.id,
  };
};

export default connect(mapStateToProps, { fetchNominatedMoviesRS })(
  MyMovieList
);
