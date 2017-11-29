import React, { Component } from "react";
import Modal from "react-modal";
import { Switch, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";
import CommunicationService from "../../services/communicationService";
import TextPost from "../createPost/textPost";
import ImagePost from "../createPost/imagePost";
import VideoPost from "../createPost/videoPost";
import SinglePostInfo from "../userPages/singlePostInfo";

const rowStyle = {
    maxHeight: "200px"
};

const videoStyle = {
    padding: "10px",
    border: "1px solid rgba(178,215,251,0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

const imgStyle = {
    borderRadius: "50px",
    width: "60%",
    margin: "10px auto",
    padding: "10px",
    border: "1px solid rgba(178,215,251,0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

const modalStyle = {
    content: {
        height: "90%",
        overlfow: "scroll",
        backgroundImage: "url(https://wallpaperlayer.com/img/2015/6/gaussian-blur-wallpaper-3225-3429-hd-wallpapers.jpg)",
        maxWidth: "80%",
        margin: "0 auto"
    }
};

const modalCardStyle = {
    backgroundColor: "rgba(116, 162, 208, 0.3)",
    padding: "30px",
    margin: "50px 0",
    borderRadius: "10px 10px 10px 10px",
    positon: "relative"
};

const updateButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear",

};

const closeButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear",
   

};

const dropdownStyle = {

    width: "85%",
    height: "95%",
    padding: "20px",
    margin: "10px 0 0 0",
    textAlign: "center",


};

const cardStyle = {
    textAlign: "center",
    borderRadius: "2em",
    backgroundColor: "rgba(116, 162, 208, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)",

};

const formStyle = {
    fontWeight: "bold",
    padding: "5px",
    borderRadius: "5px",
    width: "90%",
    height: "50px",
    textAlign: "center",
    margin: "90px 10px 20px 0",
    color: "rgba(255, 255, 255, 0.9)",
    


};

const createButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear",
    // width: "3.5%",
    borderRadius: "35px",
    position: "fixed",
    bottom: "25px",
    right: "25px",
    height: "70px",

};

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            textPosts: []
        };

        this.bindInit();

        this.getData = new DataService();
        this.redirect = new RedirectionService();
        this.request = new CommunicationService();
    }

    bindInit() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterPostAction = this.afterPostAction.bind(this);
        this.processVideoUrl = this.processVideoUrl.bind(this);
    }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    // }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        this.getData.getPosts((posts) => {
            console.log(posts);
            this.setState({
                posts
            });
        }, (error) => {
            console.log(error);
        });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
        this.redirect.redirect("feed");
    }

    afterPostAction(post, postTypeName) {
        let postType;

        if (postTypeName === "image") {
            postType = "ImagePosts";
        } else if (postTypeName === "text") {
            postType = "TextPosts";
        } else if (postTypeName === "video") {
            postType = "VideoPosts";
        }

        this.getData.createPost(postType, post, () => {
            this.closeModal();
            this.getPosts();
        }, (error) => {
            this.setState({
                error: error.response,
                isThereError: true
            });
        });
    }

    processVideoUrl(video) {
        const videoEndPart = video.split("=")[1];
        return (
            <iframe width="90%" height="315" style={videoStyle} src={`https://www.youtube.com/embed/${videoEndPart}`} frameBorder="0" allowFullScreen></iframe>
        );
    }

    showText() {
        let textPostsArray = [];

        this.state.posts.map((post) => {
            if (post.type === "text") {
                textPostsArray.push(post);
            }

        });
        this.setState({
            textPosts: textPostsArray
        });
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12" >
                        <div className="dropdown" style={{ marginTop: "30px", marginBottom: "10px" }}>
                            <button className="btn btn-info  dropdown-toggle m-auto ml-xl-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ display: "block" }}  >
                                Filter Content
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <p className="dropdown-item" onClick={this.showText} >Text Posts</p>
                                <p className="dropdown-item" onClick={this.showImages} >Image Posts</p>
                                <p className="dropdown-item" onClick={this.showVideos} >Video Posts</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" >
                    {this.state.posts.map((post) => {
                        return (

                            <div key={post.id} className="col-12 col-xl-8 offset-xl-2" style={{ paddingBottom: "60px" }}>
                                <div style={cardStyle} >
                                    <Link to={`/${post.type}/${post.id}`} >
                                        <h2>{post.userDisplayName}</h2>
                                    </Link>
                                    {post.text ? <p>{post.text}</p> : post.imageUrl ? <img src={post.imageUrl} style={imgStyle} /> : post.videoUrl ? this.processVideoUrl(post.videoUrl) : "no content detected"}
                                    <h4>{new Date(post.dateCreated).toLocaleDateString()} at {new Date(post.dateCreated).toLocaleTimeString()}</h4>
                                    <p>{post.type} post</p>
                                </div>
                            </div>
                        );
                    }
                    )}
                </div>

                <input type="button" className="feedUpdateButton btn btn-info btn-lg" name="createPost" value="+" onClick={this.openModal} style={createButtonStyle} />


                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Sample"
                    style={modalStyle}
                >
                    <nav className="navbar navbar-expand-lg navbar-light modalNavColor">
                        <h2 className="updateProfileHeading">Create New Post</h2>
                    </nav>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col" style={modalCardStyle} >
                            <form>
                                <input type="button" value="Close" onClick={this.closeModal} className="updateProfileCloseButton btn btn-success btn-lg" style={closeButtonStyle} />
                                <div className="row" >
                                    <Redirect from="/feed" to="/feed/text" />
                                    <div  className="col-12 col-md-4 col-lg-4">
                                        <Link to="/feed/text"><button className="btn  btn-info feedModalButton " style={formStyle}>Text Post</button></Link>
                                    </div>

                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Link to="/feed/image"><button className="btn  btn-info feedModalButton " style={formStyle}>Image Post</button></Link>
                                    </div>

                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Link to="/feed/video"><button className="btn  btn-info feedModalButton " style={formStyle}>Video Post</button></Link>
                                    </div>
                                </div>
                                <Switch>
                                    <Route
                                        path="/feed/text"
                                        render={() => (<TextPost onPostCreate={this.afterPostAction} />)}
                                    />
                                    <Route
                                        path="/feed/image"
                                        render={() => (<ImagePost onPostCreate={this.afterPostAction} />)}
                                    />
                                    <Route
                                        path="/feed/video"
                                        render={() => (<VideoPost onPostCreate={this.afterPostAction} />)}
                                    />
                                </Switch>
                            </form>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Feed;