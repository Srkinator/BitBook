import React from "react";
import { Link } from "react-router-dom";

import AuthenticationService from "../../services/authenticationService";
import Feed from "../userPages/feed";

const loginButton = {
    borderRadius: "5px",
    position: "absolute", 
    right: "35px", 
    bottom: "30px" ,
    transition: "width 0.5s",
    transitionTimingFunction: "linear"
};

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailInput: "",
            passInput: "",
            errorMessage: "The password has to have at least 4 characters",
            isThereError: false,
            isDisabled: true,
            error: "",
            isThereRealError: false
        };

        this.authService = new AuthenticationService();

        this.bindInit();
    }

    bindInit() {
        this.getEmailInput = this.getEmailInput.bind(this);
        this.getPassInput = this.getPassInput.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    getEmailInput(event) {
        const emailInput = event.target.value;

        this.setState({
            emailInput
        });
    }


    getPassInput(event) {
        const passInput = event.target.value;

        this.setState({
            passInput,
            isThereRealError: false
        });

        if (passInput.length < 4) {
            this.setState({
                isThereError: true,
                isDisabled: true
            });
        } else {
            this.setState({
                isThereError: false,
                isDisabled: false
            });
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleLoginRequest(e) {
        e.preventDefault();

        const emailInput = this.state.emailInput;
        const passInput = this.state.passInput;

        if (this.validateEmail(emailInput) && passInput.length >= 4) {
            const userData = {
                username: emailInput,
                password: passInput
            };

            this.authService.login(userData, (error) =>{
                this.setState({
                    isThereRealError: true,
                    error: error.response.code
                });
            });

            this.setState({
                emailInput: "",
                passInput: ""
            });


        }
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.handleLoginRequest(e);
        }
    }

    render() {
        const clName = this.state.isDisabled ? "disabled" : "";

        return (
            <div>
                <form onSubmit={this.handleLoginRequest}>
                    <label htmlFor="loginEmail" className="labelStyle" ><b>Email</b></label>
                    <br />
                    <input type="email" id="loginEmail" onChange={this.getEmailInput} onKeyPress={this.handleKeyPress} value={event.target.value} placeholder="Email" className="form-control form-control-lg" style={{ marginBottom: "5px", width: "100%" }} />
                    <br />
                    <label htmlFor="loginPass" className="labelStyle" ><b>Password</b></label>
                    <br />
                    <input type="password" id="loginPass" onChange={this.getPassInput} onKeyPress={this.handleKeyPress} value={event.target.value} placeholder="Password" className="form-control form-control-lg"  style={{ marginBottom: "15px", width: "100%" }} />
                    <br />
                    <button className={`btn btn-primary btn-lg entryPageButton ${clName}`} id="loginButton" style={loginButton}>Login</button>
                    <p id="error"> {this.state.isThereError ? this.state.errorMessage : ""} </p>
                    <p>{this.state.isThereRealError ? this.state.error : ""}</p>

                </form>
            </div>
        );
    }
}

export default Login;