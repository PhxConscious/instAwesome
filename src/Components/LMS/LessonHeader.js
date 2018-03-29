import React from 'react';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import '../../Styles/LessonHeaderStyles.css'

class LessonHeader extends React.Component {

    render() {
        let {book} = this.props;
        let {currentLessonObj, currentUnit, currentLesson, currentQuestion} = this.props.currentValues;

        if (currentLessonObj) {
            return (
                <div id="LessonHeaderContainer">
                    <div id="titleContainer">
                        {/*<div>Unit: {parseInt(currentUnit, 10) + 1}</div>*/}
                        <h4 id="title">{parseInt(currentUnit, 10) + 1} - {parseInt(currentLesson, 10) + 1} {currentLessonObj.title}</h4>
                    </div>

                    <div id="reactPlayerContainer">
                        <ReactPlayer
                            id="reactPlayer"
                            url={currentLessonObj.video}
                            controls={true}
                            width="auto"
                            min-height="auto"
                            playing={false}
                        />
                    </div>
                </div>
            )
        } else {
            return <div>loading lesson info...</div>
        }
    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
});

// const mapDispatchToProps = dispatch => ({
//
// })

export default connect(mapStateToProps, null)(LessonHeader);