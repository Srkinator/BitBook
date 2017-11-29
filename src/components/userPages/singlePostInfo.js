import React, { Component } from "react";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";
import Comment from "../userPages/comment";

class SinglePostInfo extends Component {
    constructor(props) {
        super(props);


        this.state = {
            error: false,
            isThereError: false,
            singlePostInfo: {},
            myUserId: "",
            userId: "",
            postId: ""
        };


        this.redirectService = new RedirectionService();
        this.DataService = new DataService();


        this.processVideoUrl = this.processVideoUrl.bind(this);
        this.getMyId = this.getMyId.bind(this);
        this.isMyPost = this.isMyPost.bind(this);
        this.renderDeleteButton = this.renderDeleteButton.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        this.getMyId();
        let postType;
        const postId = this.props.match.params.id;

        if (this.props.match.params.type === "text") {
            postType = "TextPosts/" + postId;
        } else if (this.props.match.params.type === "image") {
            postType = "ImagePosts/" + postId;
        } else if (this.props.match.params.type === "video") {
            postType = "VideoPosts/" + postId;
        }

        this.DataService.getSinglePost(postType,
            (response) => {
                this.setState({
                    singlePostInfo: response,
                    userId: response.userId,
                    postId: response.id
                });
            },
            (error) => {
                this.setState({
                    error: false,
                    isThereError: false
                });
            }
        );

    }

    isMyPost() {
        return this.state.myUserId === this.state.userId;
    }

    getMyId() {
        this.DataService.getProfileData((response) => {
            this.setState({
                myUserId: response.userId
            });
        });
    }

    processVideoUrl(video) {
        const videoEndPart = video.split("=")[1];
        return (
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoEndPart}`} frameBorder="0" allowFullScreen></iframe>
        );
    }

    deletePost() {
        const postId = this.state.postId;
        this.DataService.deletePost(postId, (response) => {
            this.redirectService.redirect("feed");
        }, (error) => {
            console.log(error);
        });
    }

    renderDeleteButton() {
        if (this.isMyPost()) {
            return <input className="btn btn-success btn-lg profileButton" type="button" value="Delete Post" onClick={this.deletePost} />;
        }
    }

    render() {
        const singlePost = this.state.singlePostInfo;
        return (
            <div>
                <h1>{singlePost.userDisplayName}</h1>
                <p>{singlePost.dateCreated}</p>
                <p>{singlePost.text ? <p>{singlePost.text}</p> : singlePost.imageUrl ? <img src={singlePost.imageUrl} /> : singlePost.videoUrl ? this.processVideoUrl(singlePost.videoUrl) : "no content detected"}</p>
                {this.renderDeleteButton()}
                <Comment />
            </div>
        );
    }
}

export default SinglePostInfo;