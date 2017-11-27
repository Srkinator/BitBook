import CommunicationService from "./communicationService";
import Profile from "../entities/profile";
import User from "../entities/user";

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

    getUsersData(userDataHandler, errorHandler){
        this.communication.getRequest("users", (response) => {
            let userInfo = response.data;
            let listOfUsers = [];
            userInfo.forEach((user) =>{
                const newUser = new User(user);
                listOfUsers.push(newUser);
            });

            userDataHandler(listOfUsers);
        }, (error) =>{
            errorHandler(error);
        });
    }


    updateProfileData(newData, errorHandler){
        this.communication.putRequest("Profiles", newData, (response) =>{
            if(response.status >= 200 && response.status < 400) {
                window.location.reload();
            };
        }, (error) => {
            errorHandler(error);
        });
    }
}

export default DataService;