import React, { Component } from 'react';
import VideoListItem from './videoListItem';

export class VideoList extends Component {

  renderVideoItems () {
    return (
      <ul className='col-md-4 list-group'>
        {this.props.videos.map((video) => {
          return (
            <VideoListItem key = {video.etag} video = {video} />
            );
        })}
      </ul>
    );
  }
  

  render() {
    return (
      <div>
        { this.renderVideoItems()}
      </div>
    );
  }
}

export default VideoList;