import CommunicationService from "./communicationService";
import Profile from "../entities/profile";
import User from "../entities/user";
import Post from "../entities/posts";

class DataService {
    constructor() {

        this.communication = new CommunicationService();
    }

    getProfileData(profileDataHandler) {
        this.communication.getRequest("profile", (response) => {
            const profile = new Profile(response.data);
            profileDataHandler(profile);
        });
    }

    getSingleUserData(datahandler, userId, errorHandler) {
        this.communication.getRequest(`users/${userId}`, (response) => {
            const profile = new Profile(response.data);
            datahandler(response);

        }, (error) => {
            errorHandler(error);
        });
    }

    getUsersData(userDataHandler, errorHandler) {
        this.communication.getRequest("users", (response) => {
            let userInfo = response.data;
            let listOfUsers = [];
            userInfo.forEach((user) => {
                const newUser = new User(user);
                listOfUsers.push(newUser);
            });

            userDataHandler(listOfUsers);
        }, (error) =>{
            if(!errorHandler){
                console.warn("Handler not provided");
            } else {
                errorHandler(error);
            }
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

    getPosts(postsHandler, errorHandler) {
        this.communication.getRequest("Posts", (posts) => {
            let postInfo = posts.data;
            let listOfPosts = [];
            postInfo.forEach((post) => {
                const newPost = new Post(post);
                listOfPosts.push(newPost);
            });
            postsHandler(listOfPosts);

        }, (error) => {
            errorHandler(error);
        });
    }
}

export default DataService;