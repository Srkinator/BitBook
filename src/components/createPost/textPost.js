import React, { Component } from "react";

import DataService from "../../services/dataService";

const updateButtonStyle = {
    transition: "width 0.5s",
    transitionTimingFunction: "linear"
};

class TextPost extends Component {
    constructor(props) {
        super(props);

        this.dataService = new DataService();

        this.state = {
            textPostContent: ""
        };

        this.bindInit();
    }

    bindInit() {
        this.createTextPost = this.createTextPost.bind(this);
        this.getTextPost = this.getTextPost.bind(this);
    }

    getTextPost(event) {
        let textPostContent = event.target.value;

        this.setState({
            textPostContent
        });
    }

    createTextPost() {
        const textPostBody = {
            text: this.state.textPostContent,
        };

        this.props.onPostCreate(textPostBody , "text");
    }

    render() {
        return (
            <div>
                <textarea placeholder="This is a text post" rows="5" className="updateProfileForm form-control" onChange={this.getTextPost} required></textarea>
                <input type="button" value="Post" className="updateProfileUpdateButton btn btn-info btn-lg" style={updateButtonStyle} name="textPost" onClick={this.createTextPost} />
                <div>{this.state.isThereError ? `Error ${this.state.error}` : ""}</div>
            </div>
        );
    }
}

export default TextPost;