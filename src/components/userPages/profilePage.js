import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";

const imgStyle = {
    height: "300px",
    border: "1px solid black",
    borderRadius: "150px",
    margin: "0 auto",
    marginTop: "30px"
};

const profileStyle = {
    float: "none",
    margin: "0 auto",
    maxWidth: "500px",
    border: "1px solid black",
    textAlign: "center",
    position: "relative"
};

const nameStyle = {
    textAlign: "center",
    color: "red"
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
            isThereError: false
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
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    componentDidMount() {
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
        this.state.newAvatarUrl ? newAvatarUrl = this.state.newAvatarUrl : newAvatarUrl = this.state.avatar;
        this.state.newAboutShort ? newAboutShort = this.state.newAboutShort : newAboutShort = this.state.aboutShort;
        this.state.newEmail ? newEmail = this.state.newEmail : newEmail = this.state.email;

        const newProfileData = {
            name: newName,
            about: newAbout,
            aboutShort: newAboutShort,
            avatarUrl: newAvatarUrl,
            email: newEmail
        };

        this.getData.updateProfileData(newProfileData, (error) => {
            console.log(error);
            this.setState({
                isThereError: true,
                error: error.response.status
            });
        });

    }

    render() {
        return (
            <div style={profileStyle}>
                <div className="row">
                    <img src={this.state.avatar} style={imgStyle} />
                </div>

                <div className="" style={nameStyle}>
                    <h2>{this.state.name}</h2>
                </div>

                <div>
                    <p>{this.state.aboutShort}</p>
                    <p>{this.state.about}</p>
                </div>

                <div className="">
                    <button>Posts: {this.state.posts}</button>
                    <button>Comments:  {this.state.comments}</button>
                </div>

                <br />

                <input type="button" id="editProfileData" onClick={this.openModal} value="Edit Profile" />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                >

                    <h2>Update Profile</h2>
                    <form>
                        <div>
                            <input type="text" value={this.state.name} onChange={this.collectFieldValue} name="name" placeholder="Please enter a new name" required />
                            <input type="text" value={this.state.email} onChange={this.collectFieldValue} name="email" placeholder={`Current email: ${this.state.email}`} required  />
                            <input type="text" value={this.state.aboutShort} onChange={this.collectFieldValue} name="aboutShort" placeholder="Please enter a short description" required  />
                            <input type="text" value={this.state.avatarUrl} onChange={this.collectFieldValue} name="avatarUrl" placeholder="Please enter new avatar url" required  />
                        </div>
                        <textarea value={this.state.about} onChange={this.collectFieldValue} name="about" placeholder="Please tell us something about yourself" rows="5" required ></textarea>
                        <input type="button" value="Update" onClick={this.updateProfile} />
                        <input type="button" value="Close" onClick={this.closeModal} />
                        <p>{this.state.isThereError ? `Error ${this.state.error}: All inputs must be filled` : ""}</p>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default UserProfile;