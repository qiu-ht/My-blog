import axios from '../http'; // 导入http中创建的axios实例

const user = {
    login(params){
        return axios({
            method:'GET',
            url:'/account',
            params:params
        })
    },
    register(data){
        return axios({
            method:'post',
            url:'/account',
            data:data
        })
    },
    checkRepetition(params){
        return axios({
            method:'GET',
            url:'/username',
            params:params
        })
    },
    updateUserInfo(data){
        return axios({
            method:'post',
            url:'/newAccountInfo',
            data:data
        })
    },
    checkPassword(params){
        return axios({
            method:'get',
            url:'/checkPassword',
            params:params
        })
    }
}

export default user