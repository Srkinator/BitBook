import React, { Component } from "react";

import DataService from "../../services/dataService";

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
            <iframe width="90%" height="415" style={videoStyle} src={`https://www.youtube.com/embed/${videoEndPart}`} frameBorder="0" allowFullScreen></iframe>
        );
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SinglePostInfo;