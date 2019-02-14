import React from "react";
import { connect } from "react-redux";
import Cardlist from "./components/Cardlist";
import ErrorBoundary from "./components/ErrorBoundary";
import SearchBox from "./components/SearchBox";
import Scroll from "./components/Scroll";
import { setSearchField, requestAvatars } from "./actions";
import "./App.css";

const mapStateToProps = state => {
  return {
    searchField: state.searchAvatars.searchField,
    avatars: state.requestAvatars.avatars,
    isPending: state.requestAvatars.isPending,
    error: state.requestAvatars.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestAvatars: () => dispatch(requestAvatars())
  };
};

class App extends React.Component {
  componentDidMount() {
    this.props.onRequestAvatars();
  }

  render() {
    const { searchField, onSearchChange, avatars, isPending } = this.props;
    const filteredAvatars = avatars.filter(avatar => {
      return avatar.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return isPending ? (
      <h1 className="tc">Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Avatar Search</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <Cardlist avatars={filteredAvatars} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
