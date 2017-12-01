import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";

const commentStyle = {
    width: "90%",
    margin: "20px auto"
};

class CreateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ""
        };


        this.dataService = new DataService();
        this.redirectionService = new RedirectionService();

        this.bindInit();

    }

    bindInit() {
        this.postComment = this.postComment.bind(this);
        this.collectCommentContent = this.collectCommentContent.bind(this);
    }

    postComment() {
        const body = {
            body: this.state.comment,
            postId: this.props.postId
        };

        const currentUrl = this.props.currentUrl.slice(1);

        this.dataService.postComment(body, (response) => {
            this.setState({
                comment: ""
            });
            this.props.notifyAboutComment();
        }, (error) => {
            console.log(error);
        });

    }

    collectCommentContent(e) {
        const comment = e.target.value;
        this.setState({
            comment
        });
    }

    render() {
        return (
            <div>
                <textarea onChange={this.collectCommentContent} value={this.state.comment} rows="3" cols="100" placeholder="Enter your comment here" className="form-control" style={commentStyle}></textarea>
                <input type="button" value="Submit" onClick={this.postComment} className="btn btn-info btn-lg" />
            </div>
        );
    }
}

export default CreateComment;