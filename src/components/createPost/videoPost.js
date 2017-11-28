import React, { Component } from "react";

const updateButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear"
};


class VideoPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isThereError: false,
            videoPostContent: ""
        };

        this.bindInit();
    }

    bindInit() {
        this.createVideoPost = this.createVideoPost.bind(this);
        this.getVideoPost = this.getVideoPost.bind(this);
    }

    getVideoPost(event) {
        let videoPostContent = event.target.value;

        this.setState({
            videoPostContent
        });
    }

    createVideoPost() {
        const videoPostBody = {
            videoUrl: this.state.videoPostContent,
        };

        this.props.onPostCreate(videoPostBody, "video");
    }


    render() {
        return (
            <div>
                <input type="text" placeholder="This is a video post" onChange={this.getVideoPost} className="updateProfileForm form-control" required />
                <input type="button" value="Post" className="updateProfileUpdateButton btn btn-info btn-lg" name="videoPost" onClick={this.createVideoPost} style={updateButtonStyle} />
                <p>{this.state.isThereError ? `Error ${this.state.error}: Please enter the text of your post` : ""}</p>
            </div>
        );
    }
}

export default VideoPost;