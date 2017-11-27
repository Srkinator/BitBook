import React, { Component } from "react";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";


const cardStyle = {
    width: "85%",
    height: "95%",
    padding: "20px",
    margin: "20px 10px",
    textAlign: "center",
    borderRadius: "10%",
    backgroundColor: "rgba(116, 162, 208, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };


        this.getData = new DataService();
        this.redirect = new RedirectionService();

    }


    componentDidMount() {
        this.getData.getPosts((posts) => {
            this.setState({
                posts
            });
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.state.posts.map((post) => {
                        return (
                            <div key={post.id} className="col-12" style={cardStyle}>
                                <h2>{post.userDisplayName}</h2>
                                <h4>{post.text}</h4>
                                <h6>{post.dateCreated}</h6>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Feed;