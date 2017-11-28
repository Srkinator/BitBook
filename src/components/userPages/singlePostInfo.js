import React, { Component } from "react";

import DataService from "../../services/dataService";

class SinglePostInfo extends Component {
    constructor(props) {
        super(props);


        this.state = {
            error: false,
            isThereError: false,
            singlePostInfo: {}
        };

        this.DataService = new DataService();
        this.processVideoUrl = this.processVideoUrl.bind(this);
    }

    componentDidMount() {
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
                console.log(response);
                this.setState({
                    singlePostInfo: response
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

    processVideoUrl(video) {
        const videoEndPart = video.split("=")[1];
        return (
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoEndPart}`} frameBorder="0" allowFullScreen></iframe>
        );
    }

    render() {
        const singlePost = this.state.singlePostInfo;

        return (
            <div>
                <h1>{singlePost.userDisplayName}</h1>
                <p>{singlePost.dateCreated}</p>
                <p>{singlePost.text ? <p>{singlePost.text}</p> : singlePost.imageUrl ? <img src={singlePost.imageUrl} /> : singlePost.videoUrl ? this.processVideoUrl(singlePost.videoUrl) : "no content detected"}</p>
            </div>
        );
    }
}

export default SinglePostInfo;