import Myaxios from '../http'
import axios  from 'axios';
export default {
    uploadImage($file,path){
        var formdata = new FormData();
        formdata.append('img', $file);
        return axios({
            method:'post',
            url:'http://taogezhenshuai.fun:3002/'+path,
            data:formdata,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    getImage(params){
        return Myaxios({
            method:'get',
            url:'/blogImage',
            params:params
        })
    },
    deleteImage(params){
        return Myaxios({
            method:'delete',
            url:'/blogImage',
            params:params
        })
    }
}