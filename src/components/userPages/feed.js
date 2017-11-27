import React, { Component } from "react";
import Modal from "react-modal";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";
import CommunicationService from "../../services/communicationService";

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


const cardStyle = {
    width: "85%",
    height: "95%",
    padding: "20px",
    margin: "20px 10px",
    textAlign: "center",
    borderRadius: "10%",
    backgroundColor: "rgba(116, 162, 208, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        this.bindInit();

        this.getData = new DataService();
        this.redirect = new RedirectionService();
        this.request = new CommunicationService();
    }

    bindInit() {
        this.openTextModal = this.openTextModal.bind(this);
        this.closeTextModal = this.closeTextModal.bind(this);
        this.openImgModal = this.openImgModal.bind(this);
        this.closeImgModal = this.closeImgModal.bind(this);
        this.openVideoModal = this.openVideoModal.bind(this);
        this.closeVideoModal = this.closeVideoModal.bind(this);
    }

    componentDidMount() {
        this.getData.getPosts((posts) => {
            console.log(posts);
            this.setState({
                posts
            });
        }, (error) => {
            console.log(error);
        });
    }

    // openCreatePostModal() {
    //     return (

    //     );
    // }

    createPost() {
        this.request.postRequest();
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    // openImgModal() {
    //     this.setState({ imgModalIsOpen: true });
    // }

    // closeImgModal() {
    //     this.setState({ imgModalIsOpen: false });
    // }

    // openVideoModal() {
    //     this.setState({ videoModalIsOpen: true });
    // }

    // closeVideoModal() {
    //     this.setState({ videoModalIsOpen: false });
    // }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.state.posts.map((post) => {
                        return (
                            <div key={post.id} className="col-12" style={cardStyle}>
                                <h2>{post.userDisplayName}</h2>
                                <h4>{post.text}</h4>
                                <h6>{post.dateCreated}</h6>
                            </div>
                        );
                    })}
                </div>
                <input type="button" name="createTextPost" value="Create a Text Post" onClick={this.openTextModal} />
                <input type="button" name="createImgPost" value="Create a Image Post" onClick={this.openImgModal} />
                <input type="button" name="createVideoPost" value="Create a Video Post" onClick={this.openVideoModal} />


                <Modal
                    isOpen={this.state.textModalIsOpen}
                    onRequestClose={this.closeTextModal}
                    contentLabel="Example Modal"
                    style={modalStyle}
                >
                    <nav className="navbar navbar-expand-lg navbar-light modalNavColor">
                        <h2 className="updateProfileHeading">Write a Post</h2>
                    </nav>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col" style={modalCardStyle} >
                            <form>
                                <input type="button" value="Close" onClick={this.closeTextModal} className="updateProfileCloseButton btn btn-success btn-lg" style={updateButtonStyle} />
                                <textarea value={this.state.about} onChange={this.collectFieldValue} name="about" placeholder="Please enter the text of your post" rows="5" className="updateProfileForm form-control" required></textarea>
                                <input type="button" value="Post" onClick={this.createTextPost} className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} />
                                <p>{this.state.isThereError ? `Error ${this.state.error}: Please enter the text of your post` : ""}</p>
                            </form>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.imgModalIsOpen}
                    onRequestClose={this.closeImgModal}
                    contentLabel="Example Modal"
                    style={modalStyle}
                >
                    <nav className="navbar navbar-expand-lg navbar-light modalNavColor">
                        <h2 className="updateProfileHeading">Write a Post</h2>
                    </nav>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col" style={modalCardStyle} >
                            <form>
                                <input type="button" value="Close" onClick={this.closeImgModal} className="updateProfileCloseButton btn btn-success btn-lg" style={updateButtonStyle} />
                                <textarea value={this.state.about} onChange={this.collectFieldValue} name="about" placeholder="Please enter the text of your post" rows="5" className="updateProfileForm form-control" required></textarea>
                                <input type="button" value="Post" onClick={this.createTextPost} className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} />
                                <p>{this.state.isThereError ? `Error ${this.state.error}: Please enter the text of your post` : ""}</p>
                            </form>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.videoModalIsOpen}
                    onRequestClose={this.closeVideoModal}
                    contentLabel="Example Modal"
                    style={modalStyle}
                >
                    <nav className="navbar navbar-expand-lg navbar-light modalNavColor">
                        <h2 className="updateProfileHeading">Write a Post</h2>
                    </nav>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col" style={modalCardStyle} >
                            <form>
                                <input type="button" value="Close" onClick={this.closeVideoModal} className="updateProfileCloseButton btn btn-success btn-lg" style={updateButtonStyle} />
                                <textarea value={this.state.about} onChange={this.collectFieldValue} name="about" placeholder="Please enter the text of your post" rows="5" className="updateProfileForm form-control" required></textarea>
                                <input type="button" value="Post" onClick={this.createTextPost} className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} />
                                <p>{this.state.isThereError ? `Error ${this.state.error}: Please enter the text of your post` : ""}</p>
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