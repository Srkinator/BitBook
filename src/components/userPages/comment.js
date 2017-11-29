import React, { Component } from "react";

class Comment extends Component {

    render() {
        return (
            <div>
                <textarea rows="3" cols="100" placeholder="Enter your comment here"></textarea>
            </div>
        );
    }
}

export default Comment;