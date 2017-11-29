import React, { Component } from "react";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";
import Comment from "../userPages/comment";

const cardStyle = {
    textAlign: "center",
    borderRadius: "2em",
    backgroundColor: "rgba(116, 162, 208, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)",
    marginTop: "50px",
    padding: "40px 0"

};

const imgStyle = {
    borderRadius: "50px",
    width: "60%",
    margin: "10px auto",
    padding: "10px",
    border: "1px solid rgba(178,215,251,0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

const videoStyle = {
    padding: "10px",
    border: "1px solid rgba(178,215,251,0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

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
            <iframe width="90%" height="415" style={videoStyle} src={`https://www.youtube.com/embed/${videoEndPart}`} frameBorder="0" allowFullScreen></iframe>
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
            <div className="container">
                <div className="row">
                    <div className="mx-auto col-12">
                        <div className="card " style={cardStyle}>
                            <div>
                                <h1 className="card-title profileName ">{singlePost.userDisplayName}</h1>
                                <p>{singlePost.dateCreated}</p>
                                <p>{singlePost.text ? <p>{singlePost.text}</p> : singlePost.imageUrl ? <img src={singlePost.imageUrl} style={imgStyle} /> : singlePost.videoUrl ? this.processVideoUrl(singlePost.videoUrl) : "no content detected"}</p>
                                {this.renderDeleteButton()}
                                <Comment />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SinglePostInfo;