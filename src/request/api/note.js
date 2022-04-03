import axios from '../http'

export default {
    getNotesCount(){
        return axios({
            method:'get',
            url:'/notesCount'
        })
    },
    getCurNotes(params){
        return axios({
            method:'get',
            url:'/curNotes',
            params:params
        })
    },
    searchNotes(params){
        return axios({
            method:'get',
            url:'/searchNotes',
            params:params
        })
    },
    getOneNote(params){
        return axios({
            method:'get',
            url:'/oneNote',
            params:params
        })
    },
    addnoteView(data){
        return axios({
            method:'post',
            url:'/noteView',
            data:data
        })
    },
    addnotePraise(data){
        return axios({
            method:'post',
            url:'/notePraise',
            data:data
        })
    }
}