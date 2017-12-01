import React, { Component } from "react";
import Modal from "react-modal";
import { Switch, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import InfiniteScroll from "react-infinite-scroll-component";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";
import CommunicationService from "../../services/communicationService";
import TextPost from "../createPost/textPost";
import ImagePost from "../createPost/imagePost";
import VideoPost from "../createPost/videoPost";
import SinglePostInfo from "../userPages/singlePostInfo";
import { POSTS_PER_PAGE } from "../../constants";
import EnlargeImage from "../userPages/enlargeImage";

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
        overflow: "scroll",
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
    position: "relative"
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
    margin: "10px",
    color: "rgba(255, 255, 255, 0.9)",
};

const createButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear",
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
            textPosts: [],
            imagePosts: [],
            videoPosts: [],
            isTextFilterOn: false,
            isImageFilterOn: false,
            isVideoFilterOn: false,
            activePage: 0,
            totalPostsCount: 0,
            newTop: 0,
            hasMore: true,
            visibility: "hidden",
            enlargeImage: ""
        };

        this.bindInit();

        this.dataService = new DataService();
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
        this.showPosts = this.showPosts.bind(this);
        this.filterAllPosts = this.filterAllPosts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.toggleBackToTopButton = this.toggleBackToTopButton.bind(this);
        this.enlargeImage = this.enlargeImage.bind(this);
    }
    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        this.dataService.getPosts(0, POSTS_PER_PAGE, (posts) => {
            this.setState({
                posts
            });
        }, (error) => {
            console.log(error);
        });

        this.dataService.getPostCount((response) => {
            this.setState({
                totalPostsCount: response
            });
        }, (error) => {
            console.log(error);
        });
    }

    // Get posts for PAGINATION

    // getPosts() {
    //     this.dataService.getPosts(0, (posts) => {
    //         this.setState({
    //             posts
    //         });
    //     }, (error) => {
    //         console.log(error);
    //     });

    //     this.dataService.getPostCount((response) => {
    //         this.setState({
    //             totalPostsCount: response
    //         });
    //     }, (error) => {
    //         console.log(error);
    //     });
    // }

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

        this.dataService.createPost(postType, post, () => {
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

    showPosts(posts) {
        return (
            <div className="row mx-auto" style={{ width: "100%" }}>
                {posts.map((post) => {
                    return (
                        <div key={post.id} className="col-12 col-xl-8 offset-xl-2" style={{ paddingBottom: "60px" }}>
                            <div style={cardStyle}>
                                <Link to={`/profile/${post.userId}`} >
                                    <h2>{post.userDisplayName}</h2>
                                </Link>
                                {this.getConcretePostTypeComponent(post)}
                                <Link to={`/${post.type}/${post.id}`} >
                                    <h4>{new Date(post.dateCreated).toLocaleDateString()} at {new Date(post.dateCreated).toLocaleTimeString()}</h4>
                                    <p>{post.type} post</p>
                                </Link>
                            </div>
                        </div>
                    );
                }
                )}
            </div>
        );
    }

    filterAllPosts() {
        this.setState({
            isTextFilterOn: false,
            isImageFilterOn: false,
            isVideoFilterOn: false,
        });

        this.showPosts(this.state.posts);
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
            return (
                <div id="bigPicDiv">
                    <img src={post.imageUrl} style={imgStyle} onClick={this.enlargeImage} />;
                </div>
            );
        }

        return this.processVideoUrl(post.videoUrl);
    }

    enlargeImage(event) {
        let img = event.target;
        let bigDiv = document.querySelector("#bigPicDiv");

        this.setState({
            enlargeImg: img,
            visibility: ""
        });

        bigDiv.setAttribute("position", "absolute");
        bigDiv.setAttribute("width", "80%");

        // let()
    }

    renderPosts() {
        if (this.state.isTextFilterOn) {
            return this.showPosts(this.state.textPosts);
        }

        if (this.state.isImageFilterOn) {
            return this.showPosts(this.state.imagePosts);
        }

        if (this.state.isVideoFilterOn) {
            return this.showPosts(this.state.videoPosts);
        }

        return this.showPosts(this.state.posts);
    }

    //  Infinite Scroll Handler

    handlePageChange() {
        this.dataService.getPostsForInfiniteScroll(this.state.newTop + 5, (posts) => {
            this.setState({
                posts: posts,
                newTop: this.state.newTop + 5
            });
        }, (error) => {
            console.log(error);
        });

        if (this.state.posts.length == this.state.totalPostsCount) {
            this.setState({
                hasMore: false
            });
        }
    }

    // Pagination handler

    // handlePageChange(pageNumber) {
    //     this.dataService.getPosts((POSTS_PER_PAGE*(pageNumber - 1)), (posts) => {
    //         this.setState({
    //             posts: posts,
    //             activePage: pageNumber
    //         });
    //     }, (error) => {
    //         console.log(error);
    //     });
    // }

    toggleBackToTopButton() {
        this.setState({
            visibility: "hidden"
        });

        if (window.scrollY > 100) {
            this.setState({
                visibility: ""
            });
        }
    }

    backToTop() {
        document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <div className="container-fluid">
                <EnlargeImage imgsrc={this.state.enlargeImage} visibility={this.state.visibility} />
                <div className="row">
                    <div className="col-12" style={{ marginTop: "30px", marginBottom: "10px" }}>
                        <button className="btn btn-info dropdown-toggle m-auto ml-xl-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ display: "block" }} >
                            Filter Content
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <p className="dropdown-item" onClick={this.filterAllPosts} name="text">All Posts</p>
                            <p className="dropdown-item" onClick={this.filterTextPosts} name="text">Text Posts</p>
                            <p className="dropdown-item" onClick={this.filterImagePosts} name="image">Image Posts</p>
                            <p className="dropdown-item" onClick={this.filterVideoPosts} name="video">Video Posts</p>
                        </div>
                    </div>
                    <InfiniteScroll
                        refreshFunction={this.refresh}
                        next={this.handlePageChange}
                        onScroll={this.toggleBackToTopButton}
                        hasMore={this.state.hasMore}
                        pullDownToRefreshContent={
                            <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                        }
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }>
                        {/* <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={POSTS_PER_PAGE}
                        totalItemsCount={this.state.totalPostsCount}
                        onChange={this.handlePageChange}
                    /> */}
                    </InfiniteScroll>
                    {this.renderPosts()}
                    <input type="button" className="feedUpdateButton btn btn-info btn-lg" name="createPost" value="+" onClick={this.openModal} style={createButtonStyle} />
                    <input value="Back to Top" type="button" onClick={this.backToTop} style={{ visibility: this.state.visibility, position: "fixed", bottom: "0" }} />
                </div>

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
                                <div className="row">
                                    <div className="col-12">
                                        <input type="button" value="Close" onClick={this.closeModal} className="updateProfileCloseButton btn btn-success btn-lg" style={closeButtonStyle} />
                                    </div>
                                </div>

                                <div className="row mx-auto" >
                                    <Redirect from="/feed" to="/feed/text" />
                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Link to="/feed/text"><button className="btn  btn-primary feedModalButton " style={formStyle}>Text Post</button></Link>
                                    </div>

                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Link to="/feed/image"><button className="btn  btn-primary feedModalButton " style={formStyle}>Image Post</button></Link>
                                    </div>

                                    <div className="col-12 col-md-4 col-lg-4">
                                        <Link to="/feed/video"><button className="btn  btn-primary feedModalButton " style={formStyle}>Video Post</button></Link>
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