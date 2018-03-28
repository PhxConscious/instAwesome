import React from 'react';
import CommentFeed from '../Admin/CommentFeed';

const Forum = () => {

    return (
      <div>
        <div
          style={{display:"flex", justifyContent:"center"}}
        >
          <h3><strong>InstAwesome Forum</strong></h3>
        </div>
        <CommentFeed />
      </div>
    )

}

export default Forum;
