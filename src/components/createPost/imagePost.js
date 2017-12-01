import React, { Component } from "react";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";

const updateButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear"
};

class TextPost extends Component {
    constructor(props) {
        super(props);

        this.dataService = new DataService();
        this.redirect = new RedirectionService();

        this.state = {
            imagePostContent: "",
            uploadedImage: "",
            successfulUpload: false
        };

        this.bindInit();
    }

    bindInit() {
        this.createImagePost = this.createImagePost.bind(this);
        this.getImagePost = this.getImagePost.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    getImagePost(event) {
        let imagePostContent = event.target.value;

        this.setState({
            imagePostContent
        });
    }

    createImagePost() {
        let imagePostBody = {};
        if (!this.state.imagePostContent) {
            imagePostBody = {
                imageUrl: this.state.uploadedImage,
            };
            console.log(imagePostBody);
        } else {
            imagePostBody = {
                imageUrl: this.state.imagePostContent,
            };
        }
        this.props.onPostCreate(imagePostBody, "image");
    }

    uploadImage() {
        const file = document.querySelector("input[type=file]").files[0];
        this.dataService.uploadImage(file, (response) => {
            this.setState({
                uploadedImage: response.data,
                successfulUpload: true
            });
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="This is an image post" rows="5" className="updateProfileForm form-control" onChange={this.getImagePost} required />
                {this.state.successfulUpload ? <p>Image successfully uploaded!</p> : ""}
                <input type="button" value="Post" className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} name="imagePost" onClick={this.createImagePost} />
                <input type="file" />
                <input type="button" onClick={this.uploadImage} value="Upload" />
                <p>{this.state.isThereError ? `Error ${this.state.error}` : ""}</p>
            </div>
        );
    }
}

export default TextPost;