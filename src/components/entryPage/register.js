import React from "react";

import AuthenticationService from "../../services/authenticationService";
import ValidationService from "../../services/validationService";
import RedirectionService from "../../services/redirectionService";

const registerButton = {
    borderRadius: "5px",
    transition: "width 0.5s",
    transitionTimingFunction: "linear",
    margin: "5px",
    float: "right"
};

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameString: "",
            emailString: "",
            passwordString: "",
            usernameString: "",
            confirmedPassword: "",
            isDisabled: true,
            error: "",
            isThereError: false            
        };

        this.bindInit();

        this.redirection = new RedirectionService();
        this.authentication = new AuthenticationService();
        this.validation = new ValidationService();
    }

    bindInit() {
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.allRegisterData = this.allRegisterData.bind(this);
        this.passwordConfirmedHandler = this.passwordConfirmedHandler.bind(this);
    }

    nameChangeHandler(event) {
        const usernameString = event.target.value;

        this.setState({
            usernameString
        });
    }
    usernameChangeHandler(event) {
        const nameString = event.target.value;

        this.setState({
            nameString
        });
    }
    emailChangeHandler(event) {
        const emailString = event.target.value;

        this.setState({
            emailString
        });
    }
    passwordChangeHandler(event) {
        const passwordString = event.target.value;

        this.setState({
            passwordString
        });
    }
    passwordConfirmedHandler(event) {
        const confirmedPassword = event.target.value;

        this.setState({
            confirmedPassword,
            isDisabled: false
        });
    }

    allRegisterData() {
        let userData = {
            username: this.state.emailString,
            password: this.state.passwordString,
            confirmedPassword: this.state.confirmedPassword,
            email: this.state.emailString,
            name: this.state.usernameString
        };

        let validateChecker = this.validation.validateEverything(userData);

        if (validateChecker) {
            delete userData.confirmedPassword;
            this.authentication.register(userData, (error) => {
                this.setState({
                    isThereError: true,
                    error: error.response.status + " " + error.response.data.error.message
                });
            });
            this.redirection.redirect("");
        }
    }
        
    render() {
        const clName = this.state.isDisabled ? "disabled" : "";

        return (
            <div>
                <form>
                    <label htmlFor="fullName" className="labelStyle"><b>Name</b></label>
                    <br />
                    <input type="text" id="fullName" onChange={this.nameChangeHandler} value={event.target.value} placeholder="Name" style={{ marginBottom: "5px", width: "100%" }} className="form-control form-control-lg" />
                    <br />
                    <label htmlFor="surname" className="labelStyle"><b>Surname</b></label>
                    <br />
                    <input type="text" id="surname" onChange={this.usernameChangeHandler} value={event.target.value} placeholder="Surname" style={{ marginBottom: "5px", width: "100%" }} className="form-control form-control-lg" />
                    <br />
                    <label htmlFor="registerEmail" className="labelStyle"><b>Email</b></label>
                    <br />
                    <input type="email" id="registerEmail" onChange={this.emailChangeHandler} value={event.target.value} placeholder="Email Address" style={{ marginBottom: "5px", width: "100%" }} className="form-control form-control-lg" />
                    <br />
                    <label htmlFor="registerPass" className="labelStyle"><b>Password</b></label>
                    <br />
                    <input type="password" id="registerPass" onChange={this.passwordChangeHandler} value={event.target.value} placeholder="Min 6 characters" style={{ marginBottom: "15px", width: "100%" }} className="form-control form-control-lg"/>
                    <br />
                    <label htmlFor="repeatedPass" className="labelStyle"><b>Repeat Password</b></label>
                    <br />
                    <input type="password" id="repeatedPass" onChange={this.passwordConfirmedHandler} value={event.target.value} placeholder="Min 6 characters" style={{ marginBottom: "15px", width: "100%" }} className="form-control form-control-lg"/>
                    <br />
                    <button className={`btn btn-primary btn-lg entryPageButton ${clName}`} id="registerButton" onClick={this.allRegisterData} style={registerButton}>Register</button>
                    <p>{this.state.isThereError ? this.state.error : ""}</p>
                </form>
            </div>
        );
    }
}

export default Register;