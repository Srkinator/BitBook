import React from "react";
import AuthenticationService from "../../services/authenticationService";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            registerEmail: "",
            registerPass: ""
        };

        this.authService = new AuthenticationService();

        this.initBind();
    }

    initBind() {
        this.getFullName = this.getFullName.bind(this);
        this.getPasswordInput = this.getPasswordInput.bind(this);
        this.getEmailInput = this.getEmailInput.bind(this);
        this.handleRegisterRequest = this.handleRegisterRequest.bind(this);
    }

    getFullName(event) {
        let fullName = event.target.value;

        this.setState({
            fullName
        });
        console.log(this.state.fullName);
    }

    getPasswordInput(event) {
        let registerPass = event.target.value;

        this.setState({
            registerPass
        });

    }

    getEmailInput(event) {
        let registerEmail = event.target.value;

        this.setState({
            registerEmail
        });
    }

    handleRegisterRequest() {
        const mail = this.state.registerEmail;
        const fullName = this.state.fullName;
        const password = this.state.registerPass;

        const userData = {
            username: mail,
            password: password,
            name: fullName,
            email: mail
        };


        console.log(userData);

        this.authService.register(userData);

    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="fullName"><b>Name</b></label>
                    <br />
                    <input type="text" id="fullName" onChange={this.getFullName} value={this.state.fullName} placeholder="Full Name" style={{ marginBottom: "5px", width: "100%" }} />
                    <br />
                    <label htmlFor="registerEmail"><b>Email</b></label>
                    <br />
                    <input type="email" id="registerEmail" onChange={this.getEmailInput} placeholder="Email Address" style={{ marginBottom: "5px", width: "100%" }} />
                    <br />
                    <label htmlFor="registerPass"><b>Password</b></label>
                    <br />
                    <input type="password" id="registerPass" onChange={this.getPasswordInput} placeholder="Min 6 characters" style={{ marginBottom: "15px", width: "100%" }} />
                    <br />
                    <input type="button" id="registerButton" onClick={this.handleRegisterRequest} value="Register" style={{ marginLeft: "83%", borderRadius: "5px", width: "80px" }} />
                </form>
            </div>
        );
    }
}

export default Register;