import CommunicationService from "./communicationService";
import Profile from "../entities/profile";

class DataService {
    constructor(){

        this.communication = new CommunicationService();
    }

    getProfileData(profileDataHandler){
        this.communication.getRequest("profile", (response) =>{
            const profile = new Profile(response.data);
            profileDataHandler(profile);
        });
    }


    updateProfileData(newData, errorHandler){
        this.communication.putRequest("profile", newData, (response) =>{
            if(response.status >= 200 && response.status < 400) {
                window.location.reload();
            } else {
                errorHandler(error);
            }
        });
    }
}

export default DataService;