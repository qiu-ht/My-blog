import axios from "../http";
const defaultData = {target:"taogezhenshuai.fun"}
export default {
    addPageView(data){
        return axios({
            method: "post",
            url: "pageView",
            data: data || defaultData
        })
    },
    addVisitorCount(data){
        const visitor_token_start = document.cookie.indexOf('visitor_token')
        const visited = document.cookie.slice(visitor_token_start).split(';')[0].split('=')[1]
        return axios({
            method:'post',
            url: "visitorCount",
            data:data || defaultData,
            headers:{
                "visited":visited
            }
        })
    },
    getBlogData(){
        return axios({
            method:"get",
            url: "blogData",
            params: defaultData
        })
    }
}