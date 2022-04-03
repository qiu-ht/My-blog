import Vue from "vue"
import Router from 'vue-router'
const LeftInfo = () => import( '../components/content/LeftInfo/LeftInfo.vue')
const MainInfo = () => import( '../components/content/MainInfo/MainInfo.vue')
const Ebooks = () => import( '../components/content/MainInfo/Ebooks/Ebooks.vue')
const Note = () => import( '../components/content/LeftInfo/Note/MyNote.vue')
const AddBookView = () => import( '../components/content/MainInfo/Ebooks/AddBookView/AddBookView.vue')
const NotFound = () => import( '../components/404NotFound/404NotFound.vue')
const Content = () => import( '../components/content/Content.vue')
const Login = () => import( '../components/login/login.vue')
const ArticalPage = () => import( '../components/content/MainInfo/ArticalPage/ArticalPage.vue')
const WriteBlog = () => import( '../components/content/MainInfo/WriteBlog/WriteBlog.vue')
const ArticalInfo = () => import( '../components/content/MainInfo/ArticalInfo/ArticalInfo.vue')
const UserInfo = () => import( '../components/UserInfo/UserInfo.vue')
const frontendEbooks = () => import('../components/content/MainInfo/Ebooks/Frontbooks/Frontbooks.vue')
const OtherEbooks = () => import('../components/content/MainInfo/Ebooks/Otherbooks/Otherbooks.vue')
const Tools = () => import('../components/content/MainInfo/Tools/Tools.vue')
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            component:Content,
            props:true,
            children:[
                {
                    path:'/',
                    components:{
                        'leftInfo':LeftInfo,
                        'mainInfo':MainInfo,
                    },
                    children:[
                        {
                            name:'ArticalInfo',
                            path:'/',
                            component:ArticalInfo
                        },
                        {
                            name:'artical',
                            path:'articalPage',
                            component:ArticalPage,
                        },
                        {
                            name:'ebooks',
                            path:'/resource/ebook',
                            component:Ebooks
                        },
                        {
                            name:'frontEndBook',
                            path:'/resource/ebooks/frontEndBook',
                            component:frontendEbooks,
                        },
                        {
                            name:"otherBook",
                            path:"/resource/ebooks/otherBook",
                            component:OtherEbooks
                        },
                        {
                            name:'AddBookView',
                            path:'/resource/ebooks/addBookView',
                            component:AddBookView
                        },
                        {
                            name:'note',
                            path:'/note',
                            component:Note
                        },
                        {
                            name:'blog',
                            path:'/blog',
                            component:WriteBlog,
                            props:true
                        },
                        {
                            name:'tools',
                            path:"/resource/tools",
                            component:Tools
                        },
                        {
                            name:'olcourse',
                            path:'/resource/olcourse'
                        },
                    ]
                }
            ]
        }, 
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'userInfo',
            path:'/userInfo',
            component:UserInfo,
            props:true
        },
        
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    
    ]
})