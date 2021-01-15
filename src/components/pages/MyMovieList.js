import React from "react";
import { connect } from "react-redux";
import { fetchNominatedMoviesRS } from "../../actions";
import ReusableMovieList from "../ReusableMovieList";

class MyMovieList extends React.Component {
  componentDidMount() {
    /**
     * Routes are independant of each other, so i need to dispatch the action creator below.
     * This action creator gets the movies stored inside the redux store, hence 'RS'.
     */
    this.props.fetchNominatedMoviesRS();
  }

  renderMovies = () => {
    /**
     * Check if the user is currently signed in,
     * if yes, show the movies (if any).
     * if no, show a helpful message.
     */
    if (this.props.signInID === null) {
      return <h4>Please sign in to see your nominated movies.</h4>;
    }

    const nomMovies = Object.values(this.props.myMovies).filter((movie) => {
      return movie.id === this.props.signInID;
    });

    return (
      <ReusableMovieList
        movies={nomMovies}
        signInID={this.props.signInID}
      ></ReusableMovieList>
    );
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui center aligned grid">
          <div className="column">
            <h3>My Nominated Picks</h3>
          </div>
        </div>
        <div className="ui centered align grid">{this.renderMovies()}</div>
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
