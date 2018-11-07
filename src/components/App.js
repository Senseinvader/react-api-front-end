import React, {Component} from 'react';
import SearchBar from './searchBar';

const API_KEY = 'AIzaSyBYOluBSrsLsqs0xGpRPueAUsOujDYdECc';

export default class App extends Component {
  render() {
    return(
    <div>
      <h1>My React App</h1>
      <SearchBar/>
    </div>
    );
  }
}