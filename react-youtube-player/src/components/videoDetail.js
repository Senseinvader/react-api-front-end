import React from 'react';

// class VideoDetail extends Component {
//   constructor(props) {
//     super(props);
//     // this.video = this.getVideo;
//     // this.videoId = this.video.id.videoId;
//     // this.url = `https://www.youtube.com/embed/${this.videoId}`;
//     this.state = {
//       video: null,
//     }
//     this.getVideo = this.getVideo.bind(this);
//   }
//   async componentDidMount() {
//     let readyVideo = await this.getProps();
//     this.setState({ video: readyVideo });
//     this.videoId = readyVideo.id.videoId;
//     this.url = `https://www.youtube.com/embed/${this.videoId}`;
//   }
//   getProps() {
//     return this.props.video;
//   }

//   render() {
//     return (
//       <div className="video-detail col-md-8">
//         <div className="embedresponsive embedresponsive-16by9">
//           <iframe className="embed-responsive-item" src={this.url} title="video"></iframe>
//         </div>
//         <div className="details">
//           {/* <div>{this.video.snippet.title}</div>
//           <div>{this.video.snippet.description}</div> */}
//         </div>
        
//       </div>
//     );
//   }
// }


const VideoDetail = (props) => {
  const video = props.video;
  if (!video) {
    return <div>Loading...</div>
  }
  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-8">
        <div className="embedresponsive embedresponsive-16by9">
          <iframe className="embed-responsive-item video-window" src={url} title="video"></iframe>
        </div>
        <div className="details">
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
        
      </div>
  );
};


export default VideoDetail;


