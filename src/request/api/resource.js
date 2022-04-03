import axios from "../http";

export default {
    getResource(){
        return axios({
            method:'get',
            url:'/resource'
        })
    }
}