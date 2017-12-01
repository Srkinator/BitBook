import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import PropTypes from "prop-types";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";

const imgStyle = {
    borderRadius: "50px",
    width: "60%",
    margin: "10px auto",
    padding: "10px",
    border: "1px solid rgba(178,215,251,0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"


};

const cardStyle = {
    minWidth: "100%",
    padding: "20px",
    margin: "60px 0",
    textAlign: "center",
    borderRadius: "2em",
    backgroundColor: "rgba(116, 162, 208, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

const loginStyle = {
    transitionProperty: "width",
    transitionDuration: "0.5s",
    transitionTimingFunction: "linear"
};

const modalStyle = {
    content: {
        height: "90%",
        overlfow: "scroll",
        backgroundImage: "url(../../assets/img/bg.jpg)",
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

const nameStyle = {
    textAlign: "center",
};

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            modalIsOpen: false,
            avatar: "",
            about: "",
            aboutShort: "",
            comments: 0,
            email: "",
            posts: "",
            newName: "",
            newAbout: "",
            newAboutShort: "",
            newEmail: "",
            newAvatarUrl: "",
            error: "",
            isThereError: false,
            uploadedImage: "",
            successfulUpload: false       
        };

        this.getData = new DataService();
        this.redirect = new RedirectionService();

        this.initBind();


    }

    initBind() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.collectFieldValue = this.collectFieldValue.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.displayEditProfileButton = this.displayEditProfileButton.bind(this);
        this.getMyProfile = this.getMyProfile.bind(this);
        this.getOtherProfile = this.getOtherProfile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillMount() {
        let userId = this.props.match.params.id;
        if (userId) {
            this.getOtherProfile(userId);
        }
        else {
            this.getMyProfile();
        }
    }

    getOtherProfile(id) {
        this.getData.getSingleUserData((user) => {
            this.setState({
                name: user.data.name,
                avatar: user.data.avatarUrl,
                about: user.data.about,
                aboutShort: user.data.aboutShort,
                commentsCount: user.data.commentsCount,
                email: user.data.email,
                postsCount: user.data.postsCount
            });
        }, id);
    }

    getMyProfile() {
        this.getData.getProfileData((profile) => {
            this.setState({
                name: profile.name,
                avatar: profile.avatarUrl,
                about: profile.about,
                aboutShort: profile.aboutShort,
                posts: profile.postsCount,
                comments: profile.commentsCount,
                email: profile.email
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        const userId = nextProps.match.params.id;
        if (userId) {
            this.getOtherProfile(userId);
        }
        else {
            this.getMyProfile();
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    collectFieldValue(e) {
        const value = e.target.value;
        const fieldName = e.target.name;

        this.setState({
            [fieldName]: value
        });
    }

    updateProfile() {
        let newName;
        let newAbout;
        let newAvatarUrl;
        let newAboutShort;
        let newEmail;

        this.state.newName ? newName = this.state.newName : newName = this.state.name;
        this.state.newAbout ? newAbout = this.state.newAbout : newAbout = this.state.about;
        this.state.newAvatarUrl ? newAvatarUrl = this.state.newAvatarUrl : this.state.uploadedImage ? newAvatarUrl = this.state.uploadedImage : newAvatarUrl = this.state.avatar;
        this.state.newAboutShort ? newAboutShort = this.state.newAboutShort : newAboutShort = this.state.aboutShort;
        this.state.newEmail ? newEmail = this.state.newEmail : newEmail = this.state.email;

        const newProfileData = {
            name: newName,
            about: newAbout,
            aboutShort: newAboutShort,
            avatarUrl: newAvatarUrl,
            email: newEmail
        };

        this.setState({
            successfulUpload: false
        });

        this.getData.updateProfileData(newProfileData, (error) => {
            console.log(error);
            this.setState({
                isThereError: true,
                error: error.response.status,
            });
        });

    }

    uploadImage() {
        const file = document.querySelector("#profileImgUpload").files[0];

        this.getData.uploadImage(file, (response) => {
            this.setState({
                uploadedImage: response.data,
                successfulUpload: true
            });
        }, (error) => {
            console.log(error);
        });
    }

    displayModal() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={modalStyle}
                >
                    <nav className="navbar navbar-expand-lg navbar-light modalNavColor">
                        <h2 className="updateProfileHeading">Update Profile</h2>
                    </nav>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col" style={modalCardStyle} >
                            <form>
                                <input type="button" value="Close" onClick={this.closeModal} className="updateProfileCloseButton btn btn-success btn-lg" style={updateButtonStyle} />
                                <div>
                                    <input type="text" value={this.state.name} onChange={this.collectFieldValue} name="name" placeholder="Please enter a new name" className="updateProfileForm form-control form-control-lg" required />
                                    <input type="email" value={this.state.email} onChange={this.collectFieldValue} name="email" placeholder={`Current email: ${this.state.email}`} className="updateProfileForm form-control form-control-lg" required />
                                    <input type="text" value={this.state.aboutShort} onChange={this.collectFieldValue} name="aboutShort" placeholder="Please enter a short description" className="updateProfileForm form-control form-control-lg" required />
                                    <input type="text" value={this.state.avatarUrl} onChange={this.collectFieldValue} name="avatar" placeholder="Please enter new avatar url or upload new avatar" className="updateProfileForm form-control form-control-lg" required />
                                </div>
                                <textarea value={this.state.about} onChange={this.collectFieldValue} name="about" placeholder="Please tell us something about yourself" rows="5" className="updateProfileForm form-control" required></textarea>
                                {this.state.successfulUpload ? <p>Image successfully uploaded!</p> : ""}
                                <input type="button" value="Update" onClick={this.updateProfile} className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} />
                                <input type="file" id="profileImgUpload" />
                                <input type="button" onClick={this.uploadImage} value="Upload" />
                                <p>{this.state.isThereError ? `Error ${this.state.error}: All inputs must be filled` : ""}</p>
                            </form>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    displayEditProfileButton() {
        return (
            <input type="button" value="Edit Profile " id="editProfileData" onClick={this.openModal} className="btn btn-info btn-lg loginProfileButton " style={loginStyle} />
        );
    }

    // showUserPosts() {

    // }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="mx-auto col-6">
                        <div className="card " style={cardStyle}>
                            <img src={this.state.avatar} className="card-img-top" style={imgStyle} />
                            <div className="card-block">
                                <h2 className="card-title profileName ">{this.state.name}</h2>
                                <p className="card-text">{this.state.aboutShort}</p>
                                <p className="card-text">{this.state.about}</p>
                                {this.props.match.params.id ? "" : this.displayEditProfileButton()}
                                <button className="btn btn-success btn-lg profileButton" onClick={this.showUserPosts} >Posts: {this.state.posts}</button>
                                <button className="btn btn-success btn-lg profileButton">Comments:  {this.state.comments}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.match.params.id ? "" : this.displayModal()}
            </div>
        );
    }
}
UserProfile.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

export default UserProfile;