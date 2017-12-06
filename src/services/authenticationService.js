import CommunicationService from "./communicationService";
import RedirectionService from "./redirectionService";


class AuthenticationService {
    constructor() {

        this.redirect = new RedirectionService();
        this.commService = new CommunicationService();

        this.bindInit();
    }

    bindInit() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.storeSession = this.storeSession.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    }

    login(userData, handleError) {
        this.commService.postRequest("login", userData, (data) => {
            this.storeSession(data.data.sessionId);
            this.redirect.redirect("feed");
        }, (error) =>{
            handleError(error);
        });
    }

    register(userData, handleError) {
        this.commService.postRequest("register", userData, (data) => {
        }, (error) => {
            handleError(error);
        });
    }

    storeSession(sessionId) {
        sessionStorage.setItem("sessionId", sessionId);
    }

    logout() {
        sessionStorage.removeItem("sessionId");
        localStorage.removeItem("users");
    }

    isUserAuthenticated() {
        return !!sessionStorage.getItem("sessionId");
    }
}

export default AuthenticationService;