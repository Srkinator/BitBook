import { BASE_URL, API_KEY } from "../constants";
import axios from "axios";

class CommunicationService {
    constructor() {
        this.createHeaders = this.createHeaders.bind(this);
    }

    createHeaders() {
        let sessionId = sessionStorage.getItem("sessionId");

        if (sessionId) {
            return {
                "Key": API_KEY,
                "sessionId": sessionId
            };
        }

        return {
            "Key": API_KEY
        };
    }

    postRequest(address, body, notifyPostRequest,errorHandler) {

        const requestURL = `${BASE_URL}/${address}`;

        axios.post(requestURL, body, {
            headers: this.createHeaders()
        })
            .then(response => {
                notifyPostRequest(response);
            })
            .catch(error => {
                errorHandler(error);
            });
    }

    getRequest(address, notifyGetRequest) {
        const requestURL = `${BASE_URL}/${address}`;

        axios.get(requestURL, {
            headers: this.createHeaders()
        })
            .then(response => {
                notifyGetRequest(response);
            })
            .catch(error => {
                new Error(error);
            });
    }

}

export default CommunicationService;