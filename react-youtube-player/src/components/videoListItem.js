import React, { Component } from 'react';

export class videoListItem extends Component {
  
  constructor(props) {
    super(props);
    this.video = this.props.video;
    this.onUserSelected = this.props.onUserSelected;
    this.imageUrl = this.video.snippet.thumbnails.default.url;
  }


  render() {
    return (
      <div>
      <li onClick={() => this.onUserSelected(this.video)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img src={this.imageUrl} alt={this.video.snippet.title} className="media-object"/>
        </div>
        <div className="media-body">
          <div className="media-heading">{this.video.snippet.title}</div>
        </div>
      </div>
    </li>
      </div>
    )
  };
}

export default videoListItem;
