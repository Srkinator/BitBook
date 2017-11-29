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
    transitionTimingFunction: "linear"
};

const dropdownStyle = {

    width: "85%",
    height: "95%",
    padding: "20px",
    margin: "10px 0 0 0",
    textAlign: "center",


};

const cardStyle = {
    width: "85%",
    height: "95%",
    padding: "20px",
    margin: "40px 0",
    textAlign: "center",
    borderRadius: "20%",
    backgroundColor: "rgba(116, 162, 208, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

const formStyle = {
    fontSize: "1.5em",
    padding: "5px",
    float: "left",
    borderRadius: "5px",
    width: "50%",
    height: "50px",
    textAlign: "center",
    margin: "10px 0",
    color: "rgba(46, 79, 96, 0.7)"
};

const createButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear",
    // width: "3.5%",
    borderRadius: "35px",
    position: "fixed",
    bottom: "25px",
    right: "25px",
    height: "70px"
};

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            textPosts: [],
            imagePosts: [],
            videoPosts: [],
            isTextFilterOn: false,
            isImageFilterOn: false,
            isVideoFilterOn: false
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
        this.filterTextPosts = this.filterTextPosts.bind(this);
        this.filterImagePosts = this.filterImagePosts.bind(this);
        this.filterVideoPosts = this.filterVideoPosts.bind(this);
        this.showAllPosts = this.showAllPosts.bind(this);
        this.showTextPosts = this.showTextPosts.bind(this);
        this.showImagePosts = this.showImagePosts.bind(this);
        this.showVideoPosts = this.showVideoPosts.bind(this);
        this.filterAllPosts = this.filterAllPosts.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        this.getData.getPosts((posts) => {
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

    showAllPosts() {
        return (
            this.state.posts.map((post) => {
                return (
                    <div key={post.id} className="col-8 mx-auto" style={cardStyle}>
                        <Link to={`/${post.type}/${post.id}`} >
                            <h2>{post.userDisplayName}</h2>
                        </Link>
                        {this.getConcretePostTypeComponent(post)}
                        <h4>{new Date(post.dateCreated).toLocaleDateString()} at {new Date(post.dateCreated).toLocaleTimeString()}</h4>
                        <p>{post.type} post</p>
                    </div>
                );
            }
            )
        );
    }

    showTextPosts() {
        return (
            this.state.textPosts.map((post) => {
                return (
                    <div key={post.id} className="col-8 mx-auto" style={cardStyle}>
                        <Link to={`/${post.type}/${post.id}`} >
                            <h2>{post.userDisplayName}</h2>
                        </Link>
                        {this.getConcretePostTypeComponent(post)}
                        <h4>{new Date(post.dateCreated).toLocaleDateString()} at {new Date(post.dateCreated).toLocaleTimeString()}</h4>
                        <p>{post.type} post</p>
                    </div>
                );
            }
            )
        );
    }

    showImagePosts() {
        return (
            this.state.imagePosts.map((post) => {
                return (
                    <div key={post.id} className="col-8 mx-auto" style={cardStyle}>
                        <Link to={`/${post.type}/${post.id}`} >
                            <h2>{post.userDisplayName}</h2>
                        </Link>
                        {this.getConcretePostTypeComponent(post)}
                        <h4>{new Date(post.dateCreated).toLocaleDateString()} at {new Date(post.dateCreated).toLocaleTimeString()}</h4>
                        <p>{post.type} post</p>
                    </div>
                );
            }
            )
        );
    }

    showVideoPosts() {
        return (
            this.state.videoPosts.map((post) => {
                return (
                    <div key={post.id} className="col-8 mx-auto" style={cardStyle}>
                        <Link to={`/${post.type}/${post.id}`} >
                            <h2>{post.userDisplayName}</h2>
                        </Link>
                        {this.getConcretePostTypeComponent(post)}
                        <h4>{new Date(post.dateCreated).toLocaleDateString()} at {new Date(post.dateCreated).toLocaleTimeString()}</h4>
                        <p>{post.type} post</p>
                    </div>
                );
            }
            )
        );
    }

    filterAllPosts() {
        this.setState({
            isTextFilterOn: false,
            isImageFilterOn: false,
            isVideoFilterOn: false,
        });

        this.showAllPosts();
    }

    filterTextPosts() {
        let textPostsArray = [];

        this.state.posts.map((post) => {
            if (post.type === "text") {
                textPostsArray.push(post);
            }

        });
        this.setState({
            textPosts: textPostsArray,
            isTextFilterOn: true,
            isImageFilterOn: false,
            isVideoFilterOn: false
        });
    }

    filterImagePosts() {
        let imagePostsArray = [];

        this.state.posts.map((post) => {
            if (post.type === "image") {
                imagePostsArray.push(post);
            }

        });
        this.setState({
            imagePosts: imagePostsArray,
            isImageFilterOn: true,
            isTextFilterOn: false,
            isVideoFilterOn: false
        });
    }

    filterVideoPosts() {
        let videoPostsArray = [];

        this.state.posts.map((post) => {
            if (post.type === "video") {
                videoPostsArray.push(post);
            }

        });
        this.setState({
            videoPosts: videoPostsArray,
            isVideoFilterOn: true,
            isTextFilterOn: false,
            isImageFilterOn: false
        });
    }

    getConcretePostTypeComponent(post) {
        if (post.type === "text") {
            return <p>{post.text}</p>;
        }

        if (post.type === "image") {
            return <img src={post.imageUrl} style={imgStyle} />;
        }

        return this.processVideoUrl(post.videoUrl);
    }

    renderPosts() {
        if(this.state.isTextFilterOn) {
            return this.showTextPosts();
        }
        
        if(this.state.isImageFilterOn) {
            return this.showImagePosts();
        }
         
        if(this.state.isVideoFilterOn) {
            return this.showVideoPosts();
        }
        
        return this.showAllPosts();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className=" col-8 dropdown mx-auto" style={dropdownStyle} >
                        <button className="btn btn-info  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                            Dropdown button
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <p className="dropdown-item" onClick={this.filterAllPosts} name="text">All Posts</p>
                            <p className="dropdown-item" onClick={this.filterTextPosts} name="text">Text Posts</p>
                            <p className="dropdown-item" onClick={this.filterImagePosts} name="image">Image Posts</p>
                            <p className="dropdown-item" onClick={this.filterVideoPosts} name="video">Video Posts</p>
                        </div>
                    </div>
                    {this.renderPosts()}
                </div>

                <input type="button" className="feedUpdateButton btn btn-info btn-lg" name="createPost" value="+" onClick={this.openModal} style={createButtonStyle} />

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Sample"
                    style={modalStyle}
                >
                    <nav className="navbar navbar-expand-lg navbar-light modalNavColor">
                        <h2 className="updateProfileHeading"></h2>
                    </nav>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col" style={modalCardStyle} >
                            <form>
                                <input type="button" value="Close" onClick={this.closeModal} className="updateProfileCloseButton btn btn-success btn-lg" style={updateButtonStyle} />
                                <div>
                                    <Redirect from="/feed" to="/feed/text" />
                                    <Link to="/feed/text"><h3 style={formStyle}>Create a Text Post</h3></Link>
                                    <Link to="/feed/image"><h3 style={formStyle}>Create an Image Post</h3></Link>
                                    <Link to="/feed/video"><h3 style={formStyle}>Create a Video Post</h3></Link>
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