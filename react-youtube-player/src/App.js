import React, { Component } from 'react';
import './App.css';
import VideoList from './components/videoList';
import SearchBar from './components/searchBar';
import VideoDetail from './components/videoDetail';
// import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyBYOluBSrsLsqs0xGpRPueAUsOujDYdECc';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      searchCriteria: ''
    };

  }

  // videoSearch(term) {
  //   YTSearch({key: API_KEY, term: term}, (data) => {
  //     console.log(data);
  //     this.setState({
  //       videos: data,
  //       selectedVideo: data[0]
  //     });
  //   });
  // }

  async componentDidMount() {
    this.getData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.shouldUpdate(prevState)) {
      this.getData();
    }
  }

  handleDelete = (videoEtag, event) => {
    event.stopPropagation();
    const videos = this.state.videos.filter(video => video.etag !== videoEtag);
    this.setState({ videos, selectedVideo: videos[0]});
  };

  getData = async() => {
    const result = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${this.state.searchCriteria}&part=snippet&maxResults=10&key=${API_KEY}`);
    const json = await result.json();
    this.setState({
      videos: json.items,
      selectedVideo: json.items[0]
    });
  }

  shouldUpdate = (prevState) => {
    return this.state.searchCriteria !== prevState.searchCriteria;
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar
          onUserSearch = {userInput => this.setState({searchCriteria: userInput})}/>
        <VideoDetail video = {this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect = {userSelected => this.setState({selectedVideo: userSelected})}
          onVideoDelete = {this.handleDelete}
          videos = {this.state.videos}/>
      </React.Fragment>
    );
  }
}

export default App;
