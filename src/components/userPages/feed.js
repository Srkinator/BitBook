import React, { Component } from "react";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";

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
            <div>
                {this.state.posts.map((post) => {
                    return (
                        <div key ={post.id} >
                            <h4>{post.text}</h4>
                            <p>{post.userDisplayName}</p>
                            <p>{post.dateCreated}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Feed;