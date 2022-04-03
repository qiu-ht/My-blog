import axios from '../http'

export default {
    getArticalCount(){
        return axios({
            method:'get',
            url:'/articalCount'
        })
    },
    getArtical(params){
        return axios({
            method:'get',
            url:'/artical',
            params:params
        })
    },
    saveArtical(data){
        return axios({
            method:'post',
            url:'/artical',
            data:data
        })
    },
    updateArtical(data){
        return axios({
            method:'post',
            url:'/editBlog',
            data:data
        })
    },
    getOneArtical(params){
        return axios({
            method:'get',
            url:'/oneArtical',
            params:params
        })
    },
    searchArtical(params){
        return axios({
            method:'get',
            url:'/searchArtical',
            params:params
        })
    },
    deleteBlog(params){
        return axios({
            method:'DELETE',
            url:'/Blog',
            params:params
        })
    },
    getArticalComment(params){
        return axios({
            method:'get',
            url:'/articalComment',
            params:params
        })
    },
    postArticalComment(data){
        return axios({
            method:'post',
            url:'/articalComment',
            data:data
        })
    },
    postcomment_reply(data){
        return axios({
            method:'post',
            url:'/comment_reply',
            data:data
        })
    },
    uploadImage(data){
        return axios({
            method:'post',
            url:'/uploadImage',
            data:data
        })
    },
    addarticalView(data){
        return axios({
            method:'post',
            url:'/articalView',
            data:data
        })
    },
    addarticalPraise(data){
        return axios({
            method:'post',
            url:'/articalPraise',
            data:data
        })
    }

}