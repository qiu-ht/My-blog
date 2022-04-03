import axios from '../http'

export default {
    getEBookCount(url){
        return axios({
            method:'get',
            url:url
        })
    },
    getCurEBooks(url,params){
        return axios({
            method:'get',
            url:url,
            params:params
        })
    },
    searchBook(params){
        return axios({
            method:'get',
            url:'/Someebooks',
            params:params
        })
    },
    deleteBook(params){
        return axios({
            method:'delete',
            url:'/ebook',
            params:params
        })
    },
    addBook(data){
        return axios({
            method:'post',
            url:'/ebook',
            data:data
        })
    }
}