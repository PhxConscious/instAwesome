import React from 'react';
import ReactPlayer from 'react-player';

export const VideoContent = ({title, video, description}) => {
  return (
    <div>
      <h6>title: {title}</h6>
      <ReactPlayer
        url={video}
        controls={true}
        width="500px"
        height="280px"
        playing={true}
      />
      <p>description: {description}</p>
    </div>
  )
}
