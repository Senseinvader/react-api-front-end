import React, { Component } from 'react';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {term: ''};
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({term: e.target.value});
    this.props.onUserSearch(e.target.value);
  }

  render() {
    return (
      <div className='search-bar'>
        <input
          value = {this.state.term}
          onChange = {this.onChangeHandler}
          placeholder = ' Search'
        />
      </div>
    );
  }
}

export default SearchBar;
