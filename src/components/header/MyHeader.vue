<template>
  <div class="header">
    <div :class="showOrHide?'nav':'nav navhide'" ref="nav" >
      <span class="qiu" ref="qiu">QIU</span>

        <div
          :class="this.$store.state.user.administrator?'mobileList':'mobileList userMobileList'"
          @click="hideList"
        >
          
          <a class="home" href="/">首页</a>
          <span class="note" v-if="!this.$store.state.userScreen.computer" @click="toNote"> 笔记 </span>
          <span
            class="ebook"
            :to="{ name: 'ebooks' }"
            @click="openEbooks"
            >电子书</span
          >
          <span
            class="resource"
            :to="{ name: 'ebooks' }"
            @click="openTools"
            >工具</span
          >
          <span
            class="blog"
            v-if="this.$store.state.user.administrator"
            @click="toBlog"
          >
            写博客
          </span>
        </div>
        
        <el-dropdown trigger="click" placement="bottom" class="portrait" @command="handleCommand">
        
        <el-avatar :size="35" :src="this.$store.state.user.avatar?this.$store.state.user.avatar:'/image/icon/avatar.png'" class="el-dropdown-link"></el-avatar>
        
        <el-dropdown-menu slot="dropdown" >

            <el-dropdown-item command='showLoginpage' v-if="!userLogin">注册/登录</el-dropdown-item>

            <div v-if="userLogin" >
              <el-dropdown-item command='username' v-if="!this.$store.state.user.administrator">用户：{{this.$store.state.user.username}}</el-dropdown-item>
              <el-dropdown-item command='username' v-if="this.$store.state.user.administrator">管理员：{{this.$store.state.user.username}}</el-dropdown-item>

              <el-dropdown-item command='userCenter'>修改资料</el-dropdown-item>
              
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
      let mobileList = document.querySelector('.mobileList')
      if(this.funcList){
        this.funcList = false
        setTimeout(()=>{
          mobileList.style.display = 'none'
        },300)
      }else{
        this.funcList = true
        mobileList.style.display = 'block'
      }
      
    },
    hideList() {
      if (window.screen.width <= 912) {
        document.querySelector('.mobileList').style.display = 'none'
      }
    },
    openEbooks() {
      this.$router.push({name:'ebooks'})
      document.documentElement.scrollTop = 0
    },
    openTools(){
      this.$router.push({name:'tools'})
      document.documentElement.scrollTop = 0
    },
    handleCommand(command) {
      if(command==='quitLogin'){
        this.$store.state.user={}
        const expire  = new Date();
        expire.setTime(expire.getTime() - 1);
        document.cookie="token=;expires="+expire.toGMTString()+";path=/";
      }else if(command==='showLoginpage'){
        this.$router.push({path:'/login'})
        document.documentElement.scrollTop=0
      }else if(command==='userCenter'){
        this.$router.push({path:'/userInfo'})
      }
    },
    //节流
    throttle(func,wait){
      let previous = 0;
      return ()=>{
        let now = Date.now()
        if(now-previous>wait){
          func(...arguments)
          previous = now
        }
      }
    },
    toBlog(){
      this.$router.push({path:'/blog'})
      document.documentElement.scrollTop = 0
    },
    toNote(){
      this.$router.push({path:'/note'})
      document.documentElement.scrollTop = 0
    }
  },
  mounted() {
    if (window.screen.width > 912) {
      this.funcList = true;
    } else if (window.screen.width > 280 && window.screen.width < 912) {
      this.funcList = false;
    }

    window.addEventListener("scroll", this.throttle(this.navState,100));

  },
  computed:{
    userLogin(){
      return this.$store.state.user.username ?true:false
    },
  },
  watch:{
    userLogin(newval){
      if(!newval){
        this.$api.user.login().then(
          res=>{
            this.$store.state.user=res.data
          }
        )
      }
    },
    funcList(newval){
      let mobileList = document.querySelector('.mobileList')
      if(!newval){
        if(this.$store.state.user.administrator){
          mobileList.classList.add('mobileListClose')
        }else{
          mobileList.classList.add('userMobileListClose')
        }
      }else{
        if(this.$store.state.user.administrator){
          mobileList.classList.remove('mobileListClose')
        }else{
          mobileList.classList.remove('userMobileListClose')
        }
      }
    }
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.throttle(this.navState,100))
  }
};
</script>

<style scoped lang='less'>
.el-dropdown-link {
    cursor: pointer;
    margin-top: 5px;
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
  .nav {
    margin-top: 0;
    z-index: 2000;
    width: 100%;
    height: 70px;
    background-color: rgba(172,171,171,.3);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    color: rgb(235, 233, 233);
    transition: 0.5s;
    box-shadow: 0 0 2px rgb(99, 97, 97);
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
      margin-left: 162px;
      font-size: 40px;
      font-weight: 600;
      letter-spacing: 3px;
      cursor: pointer;
      font-family: "微软雅黑";
      user-select: none;
      transition: 0.3s;
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
      font-size: 20px;
      cursor: pointer;
      margin-right: 20px;
    }

    .portrait {
      position: absolute;
      cursor: pointer;
      width: 40px;
      border-radius: 50%;
      right: 60px;
    }
    .listimg {
      display: none;
    }
    .mobileList{
      position: absolute;
      right: 120px; 
    }
    .login{
      position: absolute;
      right: 10px;
    }
  }
  .navhide{
    margin-top: -70px;
  }

}
.loginpageStyle{
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
      .navFuncList{
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
        .home,
        .blog,
        .note,
        .ebook,
        .resource{
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
        .blog {
          border: none;
        }
      }
      .mobileListClose{
        animation: hideFuncList 0.3s;
      }
      .userMobileListClose{
        animation: userHideFuncList 0.3s ;
      }
      .userMobileList{
        animation: userShowFuncList 0.3s;
      }
      .portrait {
        width: 40px;
        border-radius: 50%;
        right: 60px;
        &:hover {
          width: 40px;
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

    .userInfo {
      width: 220px;
      height: 160px;
      background-color: rgba(27, 27, 27, 0.6);
    }
  }
}
</style>