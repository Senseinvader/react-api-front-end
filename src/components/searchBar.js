import React, { Component } from 'react';

export class SearchBar extends Component {
constructor(props) {
  super(props);
  this.state = {term: ''};
  this.onInputChange = this.onInputChange.bind(this);
}

onInputChange(e) {
  this.setState({term: e.target.value});
}

  render() {
    return (
      <div>
        <input type="text"
          value = { this.state.term }
          onChange = { this.onInputChange }
        />
      </div>
    )
  }
}

export default SearchBar;
