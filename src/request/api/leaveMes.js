import axios from "../http";

export default {
    getMesCount(){
        return axios({
            method:'get',
            url:'/MesCount'
        })
    },
    submitMes(data){
        return axios({
            method:'post',
            url:'/leaveMes',
            data:data
        })
    },
    getMes(params){
        return axios({
            method:'get',
            url:'/leaveMes',
            params:params
        })
    },
    getOneMes(params){
        return axios({
            method:'GET',
            url:'/oneLeaveMes',
            params:params
        })
    },
    deleteMes(params){
        return axios({
            method:'delete',
            url:'/leaveMes',
            params:params
        })
    },
    praise(body){
        return axios({
            method:'post',
            url:'/praise',
            data:body
        })
    },
    cancelpraise(params){
        return axios({
            method:'delete',
            url:'/praise',
            params:params
        })
    },
    getUser_comment(params){
        return axios({
            method:'get',
            url:"/user_comment",
            params:params
        })
    },
    submitReply(data){
        return axios({
            method:'post',
            url:'/reply',
            data:data
        })
    },
    getReply(params){
        return axios({
            method:'get',
            url:'/reply',
            params:params
        })
    },
    getOneReply(params){
        return axios({
            method:'get',
            url:'/oneReply',
            params:params
        })
    },
    deleteReply(params){
        return axios({
            method:'delete',
            url:'/reply',
            params:params
        })
    },
    getReplyCount(params){
        return axios({
            method:'get',
            url:'/replyCount',
            params:params
        })
    }
}