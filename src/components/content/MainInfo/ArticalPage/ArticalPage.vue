<template>
  <div :class="loading?'artical loadingStyle':'artical'" ref="artical" >
    <center>
      <h1 class="blogtitle">{{ $route.query.blogTitle }}</h1>
      <h5 v-if="!loading">{{publishDate }}</h5>
    </center>
    <div v-if="loading" class="loading">Loading...</div>
    <button @click="fullScreen" class="fullScreenBtn" v-show="!isfullScreen" v-if="!loading">
      舒适模式
    </button>
    <button v-show="isfullScreen" class="quitfullScreenBtn" @click="quitScreen" v-if="!loading">
      退出全屏
    </button>
    <mavon-editor
      v-if="!loading"
      class="md context markdown-body"
      :value="blogContent"
      :subfield="prop.subfield"
      :defaultOpen="prop.defaultOpen"
      codeStyle="vs"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
      :boxShadow="false"
    ></mavon-editor>

    <el-divider content-position="left" v-if="!loading" class="divider">发表留言</el-divider>
    <SubmitMes v-if="!loading" :blogTitle="this.$route.query.blogTitle"/>

    <LeaveMes v-if="!loading" :blogTitle="this.$route.query.blogTitle"/>
  </div>
</template>

<script>
import LeaveMes from './LeaveMes/LeaveMes.vue'
import SubmitMes from './SubmitMes/SubmitMes.vue'
export default {
  components:{LeaveMes,SubmitMes},
  data() {
    return {
      isfullScreen: false,
      articalPageshow:false,
      loading:false,
      blogContent:'',
      publishDate:'',
    };
  },
  created(){
    this.$watch(
      () => this.$route.query,
      () => {
        this.fetchData()
      },
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      { immediate: true }
    )
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      if (!that.checkFull()) {
        // 退出全屏后要执行的动作
        that.isfullScreen = false;
      }
    };
  

    if (document.documentElement.clientWidth < 912) {
      document.documentElement.scrollTop = 0;
    } else if (document.documentElement.clientWidth > 912) {
      document.documentElement.scrollTop = 500;
    }
  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
      };
      return data;
    },
  },
  methods: {
    async fetchData(){
      this.loading = true
      if(this.$route.query.type==='artical'){
        const res = await this.$api.artical.getOneArtical({blogTitle:this.$route.query.blogTitle})
        this.$api.artical.addarticalView({id:res.data._id})
        console.log(res.data.publishDate);
        this.publishDate = res.data.publishDate.slice(0,10)
        this.blogContent = res.data.blogContent
        this.loading = false
      }else if(this.$route.query.type==='note'){
        const res = await this.$api.note.getOneNote({blogTitle:this.$route.query.blogTitle})
        
        this.publishDate = res.data.publishDate.slice(0,10)
        this.blogContent = res.data.blogContent
        this.loading = false
      }
      
    },
    fullScreen() {
      this.toFullScreen(this.$refs.artical);
      this.isfullScreen = true;
    },
    quitScreen() {
      this.exitFull();
      this.isfullScreen = false;
      this.$refs.artical.scrollTop = 0;
    },
    toFullScreen(ele) {
      if (ele.requestFullscreen) {
        return ele.requestFullscreen();
      } else if (ele.webkitRequestFullScreen) {
        return ele.webkitRequestFullScreen();
      } else if (ele.mozRequestFullScreen) {
        return ele.mozRequestFullScreen();
      } else {
        return ele.msRequestFullscreen();
      }
    },
    exitFull() {
      // 判断各种浏览器，找到正确的方法
      var exitMethod =
        document.exitFullscreen || //W3C
        document.mozCancelFullScreen || //FireFox
        document.webkitExitFullscreen || //Chrome等
        document.msExitFullscreen; //IE11
      if (exitMethod) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    
  },
};
</script>

<style scoped lang='less'>
.v-show-content {
  background-color: none !important;
}
.artical {
  width: 90%;
  color: black;
  background-color: aliceblue;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 10px 20px;
  box-shadow: 0 0 5px black;
  margin: 0 auto;
  position: relative;
  overflow: auto;
  z-index: 999;
  .loading{
    font-size: 30px;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    margin: 200px auto 0;
  }
  .date {
    text-align: center;
  }
  .context {
    background-color: transparent;
    line-height: 30px;
  }
  .fullScreenBtn,
  .quitfullScreenBtn {
    cursor: pointer;
    border: none;
    border-radius: 10px;
    width: 80px;
    height: 30px;
    position: sticky;
    top: 90px;
    left: 88%;
    z-index: 9999;
    transition: 0.3s;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 2px rgb(119, 119, 119);
    color: rgb(124, 124, 124);
    &:hover {
      box-shadow: 0 0 5px rgb(107, 107, 107);
      color: black;
    }
  }
  .quitfullScreenBtn {
    position: fixed;
    cursor: pointer;
    top: 90px;
    left: 1400px;
    z-index: 99999;
  }
}
.loadingStyle{
  height: 1000px;
  width: 90%;
}
.divider{
  margin-top: 100px;
  margin-bottom: 40px;
}

@media only screen and (min-width: 280px) and (max-width: 912px) {
  .artical {
    width: 90%; //
    margin-top: 50px;
    padding: 25px 14px;
    font-size: 14px;
    line-height: 25px;
    .loading{
      line-height: 50px;
      width: 90%; 
    }
    .blogtitle {
      font-size: 20px;
      
    }
    .context {
      top: 30px;
      letter-spacing: 1.5px;
    }

    .quitfullScreenBtn {
      left: 75%; //
    }
  }
}
@media screen and (min-width:280px) and (max-width:350px) {
  
}
@media only screen and (min-width: 912px) and (max-width: 1400px){
  .artical{
    width: 90%;
    font-size: 15px;
  }
}
</style>