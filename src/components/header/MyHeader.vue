<template>
  <div class="header">
    <div :class="showOrHide ? 'nav' : 'nav navhide'" ref="nav">
      <span class="qiu" ref="qiu">QIU</span>

      <div
        :class="
          this.$store.state.user.administrator
            ? 'mobileList'
            : 'mobileList userMobileList'
        "
        @click="hideList"
      >
        <a class="home" href="/">首页</a>
        <span
          class="note"
          v-if="!this.$store.state.userScreen.computer"
          @click="toNote"
        >
          笔记
        </span>
        <span class="ebook" :to="{ name: 'ebooks' }" @click="openEbooks"
          >电子书</span
        >
        <span
          class="blog"
          v-if="this.$store.state.user.administrator"
          @click="toBlog"
        >
          写博客
        </span>
        <span class="resource" :to="{ name: 'ebooks' }" @click="openTools"
          >工具</span
        >
      </div>

      <el-dropdown
        trigger="click"
        placement="bottom"
        class="portrait"
        @command="handleCommand"
      >
        <img
          :src="
            this.$store.state.user.avatar
              ? this.$store.state.user.avatar
              : '/image/icon/avatar.png'
          "
          class="el-dropdown-link"
        />

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showLoginpage" v-if="!userLogin"
            >注册/登录</el-dropdown-item
          >

          <div v-if="userLogin">
            <el-dropdown-item
              command="username"
              v-if="!this.$store.state.user.administrator"
              >用户：{{ this.$store.state.user.username }}</el-dropdown-item
            >
            <el-dropdown-item
              command="username"
              v-if="this.$store.state.user.administrator"
              >管理员：{{ this.$store.state.user.username }}</el-dropdown-item
            >

            <el-dropdown-item command="userCenter">修改资料</el-dropdown-item>

            <el-dropdown-item command="quitLogin">退出登录</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <i class="iconfont icon-liebiao_o listimg" @click="showlist"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroll: 0,
      showOrHide: true,
      funcList: false,
    };
  },
  methods: {
    navState() {
      if (this.scroll > document.documentElement.scrollTop) {
        // 往上滑
        this.showOrHide = true;
      } else if (this.scroll < document.documentElement.scrollTop) {
        //往下滑
        this.showOrHide = false;
      }
      this.scroll = document.documentElement.scrollTop;
    },
    showUserInfo() {
      this.showOrHide = !this.showOrHide;
    },
    showlist() {
      let mobileList = document.querySelector(".mobileList");
      if (this.funcList) {
        this.funcList = false;
        mobileList.style.display = "none";
      } else {
        this.funcList = true;
        mobileList.style.display = "block";
      }
    },
    hideList() {
      if (document.documentElement.clientWidth <= 912) {
        document.querySelector(".mobileList").style.display = "none";
      }
    },
    openEbooks() {
      this.$router.push({ name: "ebooks" });
      if (document.documentElement.clientWidth < 912) {
        document.documentElement.scrollTop = 0;
      } else {
        document.documentElement.scrollTop = 550;
      }
      setTimeout(() => {
        this.showOrHide = true;
      }, 50);
    },
    openTools() {
      this.$router.push({ name: "tools" });
      if (document.documentElement.clientWidth < 912) {
        document.documentElement.scrollTop = 0;
      } else {
        document.documentElement.scrollTop = 550;
      }

      setTimeout(() => {
        this.showOrHide = true;
      }, 50);
    },
    handleCommand(command) {
      if (command === "quitLogin") {
        this.$store.state.user = {};
        const expire = Date.now() - 1;
        const date = new Date(expire);
        document.cookie =
          "blog_token=;expires=" + date.toGMTString() + ";path=/";
      } else if (command === "showLoginpage") {
        this.$router.push({ path: "/login" });
        document.documentElement.scrollTop = 0;
      } else if (command === "userCenter") {
        document.documentElement.scrollTop = 0;
        this.$router.push({ path: "/userInfo" });
      }
    },
    //节流
    throttle(func, wait) {
      let previous = 0;
      return () => {
        let now = Date.now();
        if (now - previous > wait) {
          func(...arguments);
          previous = now;
        }
      };
    },
    toBlog() {
      this.$router.push({ path: "/blog" });
      document.documentElement.scrollTop = 0;
    },
    toNote() {
      this.$router.push({ path: "/note" });
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    if (document.documentElement.clientWidth > 912) {
      this.funcList = true;
    } else if (
      document.documentElement.clientWidth > 280 &&
      document.documentElement.clientWidth < 912
    ) {
      this.funcList = false;
    }

    window.addEventListener("scroll", this.throttle(this.navState, 100));
  },
  computed: {
    userLogin() {
      return this.$store.state.user.username ? true : false;
    },
  },
  watch: {
    userLogin(newval) {
      if (!newval) {
        this.$api.user.login().then((res) => {
          this.$store.state.user = res.data;
        });
      }
    },
    funcList(newval) {
      let mobileList = document.querySelector(".mobileList");
      if (!newval) {
        if (this.$store.state.user.administrator) {
          mobileList.classList.add("mobileListClose");
        } else {
          mobileList.classList.add("userMobileListClose");
        }
      } else {
        if (this.$store.state.user.administrator) {
          mobileList.classList.remove("mobileListClose");
        } else {
          mobileList.classList.remove("userMobileListClose");
        }
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.throttle(this.navState, 100));
  },
};
</script>

<style scoped lang='less'>
.el-dropdown-link {
  cursor: pointer;
  margin-top: 5px;
  border-radius: 50%;
  width: 2vw;
  box-shadow: 0 0 3px #fff;
}

@keyframes showFuncList {
  from {
    height: 0;
  }
  to {
    height: 179px;
  }
}
@keyframes hideFuncList {
  from {
    height: 179px;
  }
  to {
    height: 0;
  }
}
@keyframes userShowFuncList {
  from {
    height: 0;
  }
  to {
    height: 144px;
  }
}
@keyframes userHideFuncList {
  from {
    height: 144px;
  }
  to {
    height: 0;
  }
}
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  .nav {
    width: 100%;
    margin-top: 0;
    z-index: 2000;
    height: 3.8vw;
    background-color: #6ab8f9;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    color: rgb(235, 233, 233);
    transition: 0.5s;
    // box-shadow: 0 0 2px rgb(99, 97, 97);
    .qiu:hover,
    .home:hover,
    .note:hover,
    .ebook:hover,
    .blog:hover,
    .login:hover,
    .resource:hover {
      opacity: 0.9;
      color: white;
      text-shadow: 0 0 5px #ccc;
      transition: 0.2s;
    }
    .qiu {
      opacity: 0.7;
      font-size: 2vw;
      font-weight: 600;
      letter-spacing: 3px;
      cursor: pointer;
      font-family: "微软雅黑";
      user-select: none;
      transition: 0.3s;
      padding-left: calc(~"6vw - 2rem");
      &:hover {
        opacity: 0.9;
      }
    }
    .home,
    .blog,
    .note,
    .ebook,
    .login,
    .resource {
      text-decoration: none;
      color: rgb(235, 233, 233);
      opacity: 0.7;
      font-size: 1.4vw;
      cursor: pointer;
      margin-right: 2vw;
    }
    .resource {
      margin-right: 4vw;
    }

    .portrait {
      position: absolute;
      cursor: pointer;
      width: 2vw;
      border-radius: 50%;
      right: calc(~"6vw - 2rem");
      // background-color: red;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .listimg {
      display: none;
    }
    .mobileList {
      position: absolute;
      right: 0;
      margin-right: calc(~"7vw - 2rem");
    }
    .login {
      position: absolute;
      right: 10px;
    }
  }
  .navhide {
    margin-top: -3.8vw;
  }
}
.loginpageStyle {
  position: fixed;
  top: 0;
}
@media only screen and (min-width: 280px) and (max-width: 912px) {
  .header {
    .nav {
      height: 50px;
      .qiu {
        font-size: 25px;
        margin-left: 25px;
        &:hover {
          opacity: 0.7;
          text-shadow: none;
          color: rgb(235, 233, 233);
        }
      }
      .navFuncList {
        align-items: center;
      }
      .mobileList {
        position: absolute;
        right: 0;
        top: 50px;
        width: 90px;
        background-color: rgba(99, 98, 98, 0.4);
        border-radius: 3px;
        animation: showFuncList 0.3s;
        overflow: hidden;
        display: none;
      }
      .home,
      .blog,
      .note,
      .ebook,
      .resource {
        font-size: 15px;
        width: 70px;
        height: 35px;
        text-align: center;
        display: inline-block;
        border-bottom: 1px solid rgb(226, 226, 226);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        opacity: 1;
      }
      .resource {
        border: none;
      }
      .mobileListClose {
        animation: hideFuncList 0.3s;
      }
      .userMobileListClose {
        animation: userHideFuncList 0.3s;
      }
      .userMobileList {
        animation: userShowFuncList 0.3s;
      }
      .portrait {
        width: 35px;
        border-radius: 50%;
        right: 60px;
        &:hover {
          width: 35px;
          margin-bottom: 0px;
          box-shadow: none;
        }
      }
      .listimg {
        display: initial;
        width: 30px;
        position: absolute;
        font-size: 30px;
        right: 20px;
      }
    }
    .navhide {
      margin-top: -50px;
    }

    .userInfo {
      width: 220px;
      height: 160px;
      background-color: rgba(27, 27, 27, 0.6);
    }
  }
}
@media screen and (min-width: 912px) and (max-width: 1300px) {
  .header {
    .nav {
      height: 4.5vw;
      .qiu {
        font-size: 2.5vw;
      }
      .home,
      .blog,
      .note,
      .ebook,
      .login,
      .resource {
        font-size: 1.6vw;
        margin-right: 2.2vw;
      }
      .resource{
        margin-right: 5vw;
      }
      .portrait{
        width: 2.5vw;
      }
    }
  }
}
@media screen and (min-width: 912px) and (max-width: 1050px) {
  .header {
    .nav {
      height: 5vw;
      .qiu {
        font-size: 3vw;
      }
      .home,
      .blog,
      .note,
      .ebook,
      .login,
      .resource {
        font-size: 2vw;
        margin-right: 2.5vw;
      }
      .resource{
        margin-right: 5.5vw;
      }
      .portrait{
        width: 2.8vw;
      }
    }
  }
}
@media screen and (min-width: 1600px) {
  .header {
    .nav {
      .qiu{
        padding-left: calc(~"7vw - 2rem");
      }
      .portrait{
        right: calc(~"6vw - 2rem");

      }
      .mobileList{
        margin-right: calc(~"8vw - 2rem");
      }
    }
  }
}
@media screen and (min-width: 2600px) {
  .header {
    .nav {
      height: 8rem;
      .qiu {
        padding-left: calc(~"8.5vw - 2rem");
        font-size: 4rem;
      }
      .home,
      .blog,
      .note,
      .ebook,
      .login,
      .resource {
        font-size: 2.5rem;
      }
      .portrait{
        right: calc(~"7vw - 2rem");

      }
      .mobileList{
        margin-right: calc(~"8vw - 2rem");
      }
    }
  }
}
@media screen and (min-width: 4400px) {
  .header {
    .nav {
      height: 10rem;
      .qiu {
        padding-left: calc(~"10vw - 2rem");
        font-size: 5.5rem;
      }
      .home,
      .blog,
      .note,
      .ebook,
      .login,
      .resource {
        font-size: 3.5rem;
      }
      .portrait{
        right: calc(~"9vw - 2rem");

      }
      .mobileList{
        margin-right: calc(~"9vw - 2rem");
      }
    }
  }
}
</style>