import React, { Component } from "react";

class GetComments extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const comments = this.props.comments;
        return (
            <div>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.authorName}</p>
                            <p>{comment.body}</p>
                            <p>{comment.dateCreated}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GetComments;