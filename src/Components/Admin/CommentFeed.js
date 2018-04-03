import React from 'react';
import {connect} from 'react-redux';
import {getAllFeedback, getFeedbackByParentId, postFeedback, resetFeedback} from '../../redux/actions/feedback';
import {Button, Textfield, Grid, Cell} from 'react-mdl';
import moment from 'moment';
import '../../Styles/CommentFeed.css';
import Gradient from "../Reusable/Gradient";

class CommentFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: {},
            offset: 5,
            getChildrenCalled: [],
        };
        this.getChildComments = this.getChildComments.bind(this);
        this.postComment = this.postComment.bind(this);
        this.getMoreResults = this.getMoreResults.bind(this);
        this.commentHandler = this.commentHandler.bind(this);
    }


    componentWillMount() {
        this.props.resetFeedback();
        this.props.getAllFeedback(0);
    }


    getChildComments(parent_id) {
        this.props.getFeedbackByParentId(parent_id);
    }


    postComment(feedback_id, text) {
        let commentObj = {
            comment: text,
            parent_id: feedback_id,
        };
        this.props.postFeedback(this.props.userInfo.firebase_id, commentObj)
        this.setState({comments: {}})
    }


    getMoreResults() {
        this.props.getAllFeedback(this.state.offset);
        this.setState({offset: this.state.offset + 5})
    }


    commentHandler(e, feedback_id) {
        this.setState({comments: {[feedback_id]: e.target.value}})
    }


    render() {
        let {allComments, userInfo, childGroups} = this.props;
        let {getChildrenCalled} = this.state;
        let theComments;

        if (allComments) {
            let sortedComments = allComments.sort(function (a, b) {
                return (a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0);
            });
            theComments = sortedComments.map((comment, i) => {
                let time = moment(comment.created_at).fromNow();

                if (childGroups && !childGroups[comment.feedback_id] && !getChildrenCalled.includes(comment.feedback_id)) {
                    let newArr = getChildrenCalled.concat(comment.feedback_id);
                    this.setState({getChildrenCalled: newArr});
                    this.getChildComments(comment.feedback_id)
                }
                return <div
                    key={i}
                >
                    <div className="parentContainer">
                        <div><strong>{comment.comment}</strong></div>
                        <div>
                            <span>- {comment.first_name} {comment.last_name}</span>
                            <span style={{float: "right", marginRight: "1.5em"}}>{time}</span>
                        </div>
                    </div>
                    <div className="childrenContainer">
                        {/*
                    1. if there are child comments, render
                    2. sort the comments by timestamp
                    3. map out comments
                     */}
                        {!childGroups[comment.feedback_id] ? "" : childGroups[comment.feedback_id].sort(function (a, b) {
                            return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
                        }).map(com => {
                            let time = moment(com.created_at).fromNow();

                            return <div className="childComment">
                                <div>
                                    <strong>{com.comment}</strong>
                                </div>
                                <div>
                                    <span>- {com.first_name} {com.last_name}</span>
                                    <span style={{float: "right"}}>{time}</span>
                                </div>
                            </div>
                        })
                        }
                        {/* conditionally renders comment form based on a logged in user*/}
                        {
                            (!userInfo.firebase_id) ? "" :
                                <form
                                    className="formContainer"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        this.postComment(comment.feedback_id, this.state.comments[comment.feedback_id]);
                                    }}
                                >
                                    <Grid>
                                        <Cell col={8} tablet={12} phone={12}>
                                            <Textfield
                                                id='signedInCommentField'
                                                className="textField"
                                                label="comment here"
                                                value={this.state.comments[comment.feedback_id] || ""}
                                                onChange={e => this.commentHandler(e, comment.feedback_id)}
                                            />
                                        </Cell>
                                        <Cell col={4} tablet={12} phone={12}>
                                            <Button
                                                className='commentSubmitButton'
                                                raised colored ripple mini
                                            >
                                                SUBMIT
                                            </Button>
                                        </Cell>
                                    </Grid>
                                </form>
                        }
                    </div>
                </div>
            })
        }
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className='commentCont'>
                    {theComments}
                    <div className='showMoreCommentsBtnCont'>
                        <Button className='showMoreCommentsButton' raised colored ripple onClick={this.getMoreResults}>
                            show more comments
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    allComments: state.feedback.allComments,
    userInfo: state.userProgress.currentUser,
    childGroups: state.feedback.parentId
});


const mapDispatchToProps = dispatch => {
    return {
        getAllFeedback: (offset) => {
            dispatch(getAllFeedback(offset));
        },
        postFeedback: (fb_id, commentObj) => {
            dispatch(postFeedback(fb_id, commentObj))
        },
        getFeedbackByParentId: (parent_id) => {
            dispatch(getFeedbackByParentId(parent_id))
        },
        resetFeedback: () => {
            dispatch(resetFeedback())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
