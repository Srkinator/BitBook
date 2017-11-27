import React, { Component } from "react";
import PropTypes from "prop-types";

const searchStyle = {
    margin: "40px auto",
    padding: "10px"
};

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: ""
        };

        this.searchValue = this.searchValue.bind(this);
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
    }
    
    searchValue(event) {
        this.setState({
            searchString: event.target.value
        });

        this.props.dispatch(event.target.value);
        this.props.filterResults(event.target.value);
    }


    handleSearchRequest() {
        this.props.dispatch(this.state.searchString);
    }

    render() {
        return (
            <div >
                <input type="text" value={this.state.searchString} onChange={this.searchValue} placeholder = "Search users" className="form-control mr-sm-2" style={searchStyle}/>
            </div>
        );
    }
}

Search.propTypes = {
    dispatch: PropTypes.func,
    filterResults: PropTypes.func
};

export default Search;