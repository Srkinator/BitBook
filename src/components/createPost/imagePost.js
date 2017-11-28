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
            imagePostContent: ""
        };

        this.bindInit();
    }

    bindInit() {
        this.createImagePost = this.createImagePost.bind(this);
        this.getImagePost = this.getImagePost.bind(this);
    }

    getImagePost(event) {
        let imagePostContent = event.target.value;
        
        this.setState({
            imagePostContent
        });
    }

    createImagePost() {
        const imagePostBody = {
            imageUrl: this.state.imagePostContent,
        };
        this.props.onPostCreate(imagePostBody, "image");
    }

    render() {
        return (
            <div>
                <input type = "text" placeholder="This is an image post" rows="5" className="updateProfileForm form-control" onChange={this.getImagePost} required/>
                <input type="button" value="Post" className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} name="imagePost" onClick={this.createImagePost} />
                <p>{this.state.isThereError ? `Error ${this.state.error}` : ""}</p>
            </div>
        );
    }
}

export default TextPost;