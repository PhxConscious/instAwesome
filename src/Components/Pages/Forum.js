import React from 'react';
import CommentFeed from '../Admin/CommentFeed';
import Feedback from '../Forms/Feedback';
import '../../Styles/AdminDashboardStyles.css'

const Forum = () => {

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h3 className='forumTitle'>InstAwesome Forum</h3>
            </div>
            <Feedback/>
            <CommentFeed/>
        </div>
    )

}

export default Forum;
