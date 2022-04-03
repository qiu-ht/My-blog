import Vue from 'vue'
import Vuex from 'vuex'
import api from '../src/request/api/index'

Vue.use(Vuex)

function getEBookCount(url,context,type){
    api.ebook.getEBookCount(url).then(
        res=>{
            context.commit(`get${type}`,res.data[type])
        }
    )
}

function getCurEBooks(url,context,params,type){
    api.ebook.getCurEBooks(url,params).then(
        res=>{
            context.commit(type,res.data)
        }
    )
}
const actions = {

    //获取留言总数
    getMesCount(context){
        api.leaveMes.getMesCount().then(
            res=>{
                context.commit('GETMESCOUNT',res.data)
            }
        )
    },


    //获取资源
    getResource(context){
        api.resource.getResource().then(res=>{
            context.commit('getResource',res.data)
        })
    },

    //获取前端电子书总数
    getFrontendEbooksCount(context){
        getEBookCount("/frontendEbooksCount",context,"frontendEbooksCount")
    },

    //获取其他电子书总数
    getOtherEbooksCount(context){
        getEBookCount("/otherEbooksCount",context,"otherEbooksCount")
    },
    
    //获取当前页面前端电子书
    getCurFrontBooks(context,params){
        getCurEBooks("/CurFrontBooks",context,params,'getCurFrontBooks') 
    },

    //获取当前页面其他电子书
    getCurOtherBooks(context,params){
        getCurEBooks("/CurOtherBooks",context,params,'getCurOtherBooks') 
    },

    //获取当前文章的留言
    getArticalMes(context,params){
        api.leaveMes.getMes(params).then(
            res=>{
                context.commit('getArticalMes',res.data)
                
            }
        )  
    }
}
const mutations = {
    //获取留言总数
    GETMESCOUNT(state,data){
        state.messagesCount = data.Mescount
    },


    //获取资源
    getResource(state,value){
        state.resource = value
    },

    //获取前端电子书总数
    getfrontendEbooksCount(state,value){
        state.frontendEbooksCount = value
    },

    //获取其他电子书总数
    getotherEbooksCount(state,value){
        state.otherEbooksCount = value
    },
    
    //获取当前页面前端电子书
    getCurFrontBooks(state,value){
        state.CurFrontBooks = value
    },

    //获取当前页面其他电子书
    getCurOtherBooks(state,value){
        state.CurOtherBooks = value
    },


    //获取当前文章留言和回复
    getArticalMes(state,value){
        state.leaveMes = value
        state.commentIDs=[]
        value.forEach((comment)=>{
            state.commentIDs.push(comment._id)
        })
        // Vue.prototype.$bus.$emit('getReplyMes',state.commentIDs)
        state.commentIDs.forEach(async (commentID) => {
            const params = {
                commentID: commentID,
                limit:2,
                skip:0
            }
            const res = await api.leaveMes.getReply(params)
            const res1 = await api.leaveMes.getReplyCount({commentID:commentID})
            state.replies[commentID] = res.data;
            state.replyCount[commentID]=res1.data.replyCount
            state.leaveMesShow=false
            state.leaveMesShow=true
        });
    }

}
const state = {
    //当前登录用户
    user:{},
    userLoginpageshow:false,
    //总数
    messagesCount:0,
    frontendEbooksCount:0,
    otherEbooksCount:0,

    //页面数据
    leaveMes:[],
    theArtical:{},//点击某篇随笔或笔记
    CurFrontBooks:[],//当前页面前端电子书
    CurOtherBooks:[],//当前页面其他电子书
    commentIDs:[],
    replies:{},
    replyCount:{},
    leaveMesShow:true,

    //所有资源
    resource:[],

    //电子书开闭状态
    frontendOpend:false,
    othersOpend:false,
    ebooks:false,

    //打开二维码界面条件和电子书地址
    openQrcode:false,
    ebookHref:'',

    //全部前端电子书
    frontendEbooks:[],
    frontbooksShow:true,
    verificationCode:'',//当前验证码
    ebookPassword:'',//当前提取码
    inputverification:'',//input框里的value

    //用户屏幕尺寸
    userScreen:{
        computer:true,
        phone:false,
        ipad:false
    }

}
export default new Vuex.Store({
    actions,
    mutations,
    state
})