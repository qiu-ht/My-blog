import axios from '../http'; // 导入http中创建的axios实例

const question = {
    sendQuestion(data){
        return axios({
            method:'POST',
            url:'/question',
            data:data
        })
    }
}

export default question