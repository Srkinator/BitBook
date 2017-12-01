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
                <div className="row">
                    <div className="col-12">
                        <input type="text" placeholder="This is an image post" rows="5" className="updateProfileForm form-control" onChange={this.getImagePost} required />
                        {this.state.successfulUpload ? <p>Image successfully uploaded!</p> : ""}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-6">
                        <input type="file"  className="form-control-file" style={{width: "90%", margin: "10px auto"}} />
                    </div>

                    <div className="col-12 col-lg-6">
                        <input type="button" onClick={this.uploadImage} value="Upload" className="btn btn-info" style={{width: "90%", margin: "10px auto"}} />
                    </div>
                    <div className="col-12">
                        <p>{this.state.isThereError ? `Error ${this.state.error}` : ""}</p>
                    </div>
                </div>
                <div className="row">
                    <input type="button" value="Post" className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} name="imagePost" onClick={this.createImagePost} />
                </div>
            </div>
        );
    }
}

export default TextPost;