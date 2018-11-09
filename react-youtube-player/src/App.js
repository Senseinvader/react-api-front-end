import React, { Component } from 'react';
import './App.css';
import VideoList from './components/videoList';
import SearchBar from './components/searchBar';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyBYOluBSrsLsqs0xGpRPueAUsOujDYdECc';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {videos: []};

    this.videoSearch('Puffy');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (data) => {
      this.setState({
        videos: data
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar/>
        <VideoList videos = {this.state.videos}/>
      </React.Fragment>
    );
  }
}

export default App;
