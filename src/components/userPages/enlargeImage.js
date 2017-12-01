import React, { Component } from "react";

class EnlargeImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: "hidden"
        };
    }

    render() {
        return (
            <div id="imgEnlarger" className="col-12 " style = {{position: "absolute" , height: "100%" , visibility: this.state.visibility}}>
             ahahha
            </div>
        );
    }
}

export default EnlargeImage;