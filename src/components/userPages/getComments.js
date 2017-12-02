import React, { Component } from "react";
import { Link } from "react-router-dom";

const cardStyle = {
    textAlign: "center",
    borderRadius: "1em",
    backgroundColor: "rgba(251, 251, 251, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)",
    padding: "40px 0",
    width: "90%",
    margin: "20px auto",
    color: "rgba(44, 62, 80, 0.9)"
};

class GetComments extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const comments = this.props.comments;
        console.log(comments);
        return (
            <div>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id} className="card-block row" style={cardStyle}>
                            <div className="col-4 col-lg-4">
                                <Link to={`/profile/${comment.authorId}`}>
                                    <p style={{fontSize: "1.2em", textAlign: "left", paddingLeft: "50px", marginBottom: "5px"}}>{comment.authorName}</p>
                                </Link>
                                <p style={{fontSize: "1em", textAlign: "left", paddingLeft: "50px"}}>{comment.dateCreated}</p>
                            </div>
                            <div className="col-4 col-lg-8">
                                <p style={{fontSize: "1.2em", textAlign: "left"}}> {comment.body}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GetComments;