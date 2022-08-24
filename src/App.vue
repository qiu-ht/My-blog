<template>
  <div id="app" v-show="complete" >
    <Background/>
    <div v-if="this.$store.state.openQrcode" class="cover" @mousewheel.prevent @touchmove.prevent></div>
    <MyHeader/>
    <router-view></router-view>
    <MyFooter/>
    <Qrcode />
  </div>
</template>

<script>
import MyFooter from "./components/Footer/Footer.vue";
import MyHeader from './components/header/MyHeader.vue'
import Background from './components/Background/Background.vue'
import Qrcode from "../src/components/Qrcode/Qrcode.vue";
export default {
  name: "App",
  data() {
    return {
      complete: false,
    };
  },
  components: {
    MyFooter,
    Background,
    Qrcode,
    MyHeader
  },
  mounted() {
    if(this.$store.state.openQrcode){
      this.$nextTick(()=>{
        document.querySelector('.cover').style.height = document.documentElement.scrollHeight
      })
    }
    
    if(document.cookie.indexOf('token')!==-1){
      this.$api.user.login().then(
        res=>{
          this.$store.state.user=res.data
        }
      )
    }
    
    setTimeout(() => {
      let loading = document.querySelector(".loading");
      document.body.removeChild(loading);
      var links = document.getElementsByTagName("link");
      for (var i = 0; i < links.length; i++) {
        var _href = links[1].href;
        if (links[1] && links[1].href && links[1].href.indexOf(_href) != -1) {
          links[1].parentNode.removeChild(links[1]);
        }
      }

      window.scrollTo("0", "0");
      this.complete = true;
      
    }, 1000);
    if (document.documentElement.clientWidth > 1200) {
      this.$store.state.userScreen = {
        computer: true,
        phone: false,
        ipad: false,
      };
    } else if (document.documentElement.clientWidth <= 912) {
      this.$store.state.userScreen = {
        computer: false,
        phone: true,
        ipad: false,
      };
    }
    
  },
  updated() {
    if (this.$store.state.openQrcode) {
      document.querySelector(".cover").style.height =
        document.documentElement.scrollHeight + "px";
    }
  },
};
</script>

<style lang="less">
@import url("https://at.alicdn.com/t/font_3261344_sy722qwo6w.css");

.cover {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 9999;
  height: 100%;
}

body {
  position: relative;
  padding: 0;
  margin: 0;
  background-color: #b8ecfd;

}
.v-show-content {
  background-color: transparent !important;
}
.v-note-wrapper {
  border: none !important;
}

.markdown-body blockquote {
  color: black !important;
}

//各个浏览器下 全屏状态下背景色设置
:-webkit-full-screen {
  background-color: #fff !important;
}
:-moz-full-screen {
  background-color: #fff !important;
}

:-ms-fullscreen {
  background-color: #fff !important;
}
:fullscreen {
  background-color: #fff !important;
}

.markdown-body .highlight pre,
.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #fff !important;
  border-radius: 5px;
}
.markdown-body code{
  background-color: #fff !important; 
  padding: 5px;
  border-radius: 5px;
  font-size: 15px !important;
  font-family: 'Courier New', Courier, monospace;
}
.markdown-body img{
  box-shadow: 0 0 5px #fff;
  cursor: pointer;
}

.el-divider{
  background-color: #a8dff5 !important;
}
.el-divider__text.is-left{
  background-color: #a6e3fc;
}
.submitReply{
  padding: 0 !important;
  height: 54px !important;
  box-sizing: border-box;
}

.el-button{
  background-color: #6bcff7 !important;
  border: none !important;
  &:hover{
    background-color: #31c5ff !important;
  }
}





@media only screen and (min-width: 280px) and (max-width: 912px) {
  .cover{
    height: 100vh;
  }
  ol,
  li,
  p,
  code {
    font-size: 14px;
  }
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    padding: 0 !important;
  }

  .markdown-body h1 {
    font-size: 19px !important;
  }
  .markdown-body h2 {
    font-size: 18px !important;
  }
  .markdown-body h3 {
    font-size: 17px !important;
  }
  .markdown-body h4 {
    font-size: 16px !important;
  }
  .markdown-body h5 {
    font-size: 15px !important;
  }

  .submitReply{
    height: 30px !important;
    
    box-sizing: border-box;
  }
}
</style>
