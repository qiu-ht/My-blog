import Vue from "vue";
import Router from "vue-router";
const LeftInfo = () => import("../components/content/LeftInfo/LeftInfo.vue");
const MainInfo = () => import("../components/content/MainInfo/MainInfo.vue");
const Ebooks = () => import("../components/content/MainInfo/Ebooks/Ebooks.vue");
const Note = () => import("../components/content/LeftInfo/Note/MyNote.vue");
const AddBookView = () =>
  import("../components/content/MainInfo/Ebooks/AddBookView/AddBookView.vue");
const NotFound = () => import("../components/404NotFound/404NotFound.vue");
const Content = () => import("../components/content/Content.vue");
const Login = () => import("../components/login/login.vue");
const ArticalPage = () =>
  import("../components/content/MainInfo/ArticalPage/ArticalPage.vue");
const WriteBlog = () =>
  import("../components/content/MainInfo/WriteBlog/WriteBlog.vue");
const ArticalInfo = () =>
  import("../components/content/MainInfo/ArticalInfo/ArticalInfo.vue");
const UserInfo = () => import("../components/UserInfo/UserInfo.vue");
const frontendEbooks = () =>
  import("../components/content/MainInfo/Ebooks/Frontbooks/Frontbooks.vue");
const OtherEbooks = () =>
  import("../components/content/MainInfo/Ebooks/Otherbooks/Otherbooks.vue");
const Tools = () => import("../components/content/MainInfo/Tools/Tools.vue");
const ContactMe = () => import("../pages/ContactMe/ContactMe.vue");
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Content,
      props: true,
      metaL: {
        title: "涛~的个人博客",
      },
      children: [
        {
          path: "/",
          components: {
            leftInfo: LeftInfo,
            mainInfo: MainInfo,
          },
          children: [
            {
              name: "ArticalInfo",
              path: "/",
              component: ArticalInfo,
            },
            {
              name: "artical",
              path: "articalPage",
              component: ArticalPage,
              meta: {
                title: "文章详情",
              },
            },
            {
              name: "ebooks",
              path: "/resource/ebook",
              component: Ebooks,
              meta: {
                title: "电子书",
              },
            },
            {
              name: "frontEndBook",
              path: "/resource/ebooks/frontEndBook",
              component: frontendEbooks,
              meta: {
                title: "前端书籍",
              },
            },
            {
              name: "otherBook",
              path: "/resource/ebooks/otherBook",
              component: OtherEbooks,
              meta: {
                title: "其他书籍",
              },
            },
            {
              name: "AddBookView",
              path: "/resource/ebooks/addBookView",
              component: AddBookView,
              meta: {
                title: "添加书籍",
              },
            },
            {
              name: "note",
              path: "/note",
              component: Note,
              meta: {
                title: "笔记",
              },
            },
            {
              name: "blog",
              path: "/blog",
              component: WriteBlog,
              meta: {
                title: "写博客",
              },
              props: true,
            },
            {
              name: "tools",
              path: "/resource/tools",
              meta: {
                title: "工具",
              },
              component: Tools,
            },
            {
              name: "olcourse",
              path: "/resource/olcourse",
            },
          ],
        },
      ],
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: {
        title: "注册/登录",
      },
    },
    {
      name: "userInfo",
      path: "/userInfo",
      component: UserInfo,
      props: true,
      meta: {
        title: "修改信息",
      },
    },
    {
      name: "contactMe",
      path: "/contactMe",
      component: ContactMe,
      meta: {
        title: "联系我"
      }
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "页面丢失了"
      }
    },
  ],
});
