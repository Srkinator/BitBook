import React, { Component } from "react";

class EnlargeImage extends Component {
    constructor(props) {
        super(props);

        this.state ={
            visibility: ""
        };

        this.closeImg = this.closeImg.bind(this);
    }

    closeImg(){
        this.setState({
            visibility: "hidden"
        });
        this.props.resetHiddenPic();
    }

    render() {
        console.log(this.props);
        if (!this.props.imgSrc) {
            return <div></div>;
        } else {
            let isItVisible = this.props.visibility ? this.state.visibility : "";
            return (
                <div onClick ={this.closeImg} id="imgEnlarger" className="col-12 " style={{ visibility: isItVisible, position: "fixed", top: 0, bottom: 0, left: 0, right: 0,  zIndex: "10", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div style={{ display: "table", width:"100%", height:"100%"}}>
                        <div  style={{display:"table-cell" , textAlign:"center", verticalAlign:"middle"}}>
                            <img onClick={event.preventDefault()} src={this.props.imgSrc} width="70%"/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default EnlargeImage;