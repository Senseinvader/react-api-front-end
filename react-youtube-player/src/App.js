import React, { Component } from 'react';
import './App.css';
import VideoList from './components/videoList';
import SearchBar from './components/searchBar';
import VideoDetail from './components/videoDetail';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyBYOluBSrsLsqs0xGpRPueAUsOujDYdECc';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Masta');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar/>
        <VideoDetail video = {this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect = {userSelected => this.setState({selectedVideo: userSelected})}
          videos = {this.state.videos}/>
      </React.Fragment>
    );
  }
}

export default App;
