
class RedirectionService {

    redirect(url){
        window.location.assign(`/#/${url}`); 
    }
}

export default RedirectionService;