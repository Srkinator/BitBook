import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import DataService from "../../services/dataService";
import RedirectionService from "../../services/redirectionService";
import Search from "../common/search";

const imgStyle = {
    borderRadius: "50px",
    width: "60%",
    margin: "10px auto",
    padding: "10px",
    border: "1px solid rgba(178,215,251,0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

const cardStyle = {
    width: "95%",
    height: "95%",
    padding: "20px",
    margin: "10px",
    textAlign: "center",
    borderRadius: "10%",
    backgroundColor: "rgba(116, 162, 208, 0.2)",
    boxShadow: "-12px 11px 34px -1px rgba(44,62,80,0.34)"
};

class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            searchString: "",
            matchedUsers: []
        };

        this.getData = new DataService();
        this.redirect = new RedirectionService();

        this.initBind();
    }

    initBind() {
        this.catchSearch = this.catchSearch.bind(this);
        this.filterResults = this.filterResults.bind(this);
        this.getImg = this.getImg.bind(this);
    }

    componentDidMount() {
        this.getData.getUsersData((users) => {
            this.setState({
                users,
                matchedUsers: users
            });

        }, (error) => {
            console.log(error);
        });
    }

    catchSearch(searchString) {
        this.setState({
            searchString
        });
    }

    filterResults(searchedString) {
        const users = this.state.users;
        let matchedUsers = [];

        matchedUsers = users.filter((user) => {
            let userName = user.name.toLowerCase();
            let searchString = searchedString.toLowerCase();

            return userName.includes(searchString);
        });

        this.setState({
            matchedUsers
        });
    }

    getImg(avatarUrl) {
        if (!avatarUrl) {
            return "http://via.placeholder.com/318x318?text=No%20User%20Image";
        } else {
            return avatarUrl;
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <Search dispatch={this.catchSearch} filterResults={this.filterResults} />
                <div className="row">
                    {this.state.matchedUsers.map((user) => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4" key={user.id} >
                                <div className="card" style={cardStyle}>
                                    <img className="card-img-top userImg" style={imgStyle} src={this.getImg(user.avatarUrl)} alt="Card image cap" />
                                    <div className="card-body ">
                                        <Link to={`profile/${user.id}`} className="peopleCardBody">
                                            <h4 className="card-title">{user.name}</h4>
                                        </Link>
                                        <p>{user.aboutShort}</p>
                                    </div>
                                    <p className="card-text">{user.lastPostDate ? `Last post on ${new Date(user.lastPostDate).toLocaleDateString()} at ${new Date(user.lastPostDate).toLocaleTimeString()}` : "User has not posted anything yet"}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default People;