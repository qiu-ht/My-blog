<template>
  <div :class="loading ? 'artical loadingStyle' : 'artical'" ref="artical">
    <center>
      <h1 class="blogtitle">{{ $route.query.blogTitle }}</h1>
      <h5 v-if="!loading" class="date">{{ publishDate }}</h5>
    </center>
    <div v-if="loading" class="loading">Loading...</div>
    <button
      @click="fullScreen"
      class="fullScreenBtn"
      v-show="!isfullScreen"
      v-if="!loading"
    >
      舒适模式
    </button>
    <button
      v-show="isfullScreen"
      class="quitfullScreenBtn"
      @click="quitScreen"
      v-if="!loading"
    >
      退出全屏
    </button>
    <div
      class="catalogue"
      @click="toWhichTitle"
      ref="catalogue"
      v-if="!loading && showCatalogue"
    ></div>
    <el-divider content-position="center" v-if="!loading && showCatalogue"
      >正文</el-divider
    >
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

    <el-divider content-position="left" v-if="!loading" class="divider"
      >发表留言</el-divider
    >
    <SubmitMes v-if="!loading" :blogTitle="this.$route.query.blogTitle" />

    <LeaveMes v-if="!loading" :blogTitle="this.$route.query.blogTitle" />
  </div>
</template>

<script>
import LeaveMes from "./LeaveMes/LeaveMes.vue";
import SubmitMes from "./SubmitMes/SubmitMes.vue";
export default {
  components: { LeaveMes, SubmitMes },
  data() {
    return {
      isfullScreen: false,
      articalPageshow: false,
      loading: false,
      blogContent: "",
      publishDate: "",
      catalogue: [],
      cataloguePosition: [],
      showCatalogue: true,
    };
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.fetchData();
      },
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      { immediate: true }
    );
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
    async fetchData() {
      if (!this.showCatalogue) {
        this.showCatalogue = true;
      }
      const catalogueEle = document.querySelector(".catalogue");
      if (catalogueEle) {
        catalogueEle.innerHTML = "";
      }
      this.loading = true;
      if (this.$route.query.type === "artical") {
        const res = await this.$api.artical.getOneArtical({
          blogTitle: this.$route.query.blogTitle,
        });
        this.$api.artical.addarticalView({ id: res.data._id });

        this.publishDate = res.data.publishDate.slice(0, 10);
        this.blogContent = res.data.blogContent;
        this.loading = false;
      } else if (this.$route.query.type === "note") {
        const res = await this.$api.note.getOneNote({
          blogTitle: this.$route.query.blogTitle,
        });

        this.publishDate = res.data.publishDate.slice(0, 10);
        this.blogContent = res.data.blogContent;
        this.loading = false;
      }
      this.$nextTick(() => {
        const catalogueEle = document.querySelector(".catalogue");
        const position = sessionStorage.getItem(this.$route.query.blogTitle);
        catalogueEle.innerHTML = "";
        this.cataloguePosition = position ? JSON.parse(position) : [];
        this.catalogue = document.querySelectorAll(
          `.v-show-content h1,
            .v-show-content h2,
            .v-show-content h3,
            .v-show-content h4,
            .v-show-content h5,
            .v-show-content h6`
        );
        if (this.catalogue.length) {
          this.showCatalogue = true;
        } else {
          this.showCatalogue = false;
        }
        const fragment = document.createDocumentFragment();
        const title = document.createElement("h1");
        title.style.textAlign = "center";
        title.innerHTML = "目录";
        fragment.appendChild(title);
        let index = 0;

        for (let v of this.catalogue) {
          if (!position) {
            this.cataloguePosition.push(v.offsetTop);
          }

          const ele = document.createElement(v.tagName);
          const br = document.createElement("br");

          const reg = /<(\/)?a[\s\n\r\w\d_:="-.?/]*>/g;

          ele.innerHTML = "- " + v.innerHTML.replaceAll(reg, "");

          ele.style.cssText = `
            cursor:pointer;
            display:inline-block;
            margin:0;
            text-indent: ${v.tagName.substring(1)*1.5}rem;
            font-size:${window.screen.width/1500}rem;
          `;
          ele.setAttribute("id", index++);

          ele.addEventListener("mouseenter", () => {
            ele.style.color = "rgb(100, 176, 242)";
          });
          ele.addEventListener("mouseleave", () => {
            ele.style.color = "skyblue";
          });

          fragment.appendChild(ele);
          fragment.appendChild(br);
        }
        sessionStorage.setItem(
          this.$route.query.blogTitle,
          JSON.stringify(this.cataloguePosition)
        );

        catalogueEle.appendChild(fragment);
      });
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
    toWhichTitle(e) {
      const contentOffsetTop = document.querySelector(".content").offsetTop;
      const catalogueHeight = this.$refs.catalogue.clientHeight;
      if (e.target.id) {
        document.documentElement.scrollTop =
          this.cataloguePosition[e.target.id] +
          contentOffsetTop +
          catalogueHeight;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.v-show-content {
  background-color: none !important;
}
.artical {
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
  .loading {
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
  .catalogue {
    color: skyblue;
    line-height: 25px;
    padding: 0 25px;
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
    right: 5%;
    z-index: 99999;
  }
}
.loadingStyle {
  height: 1000px;
  width: 90%;
}
.divider {
  margin-top: 100px;
  margin-bottom: 40px;
}

@media only screen and (min-width: 280px) and (max-width: 912px) {
  .artical {
    width: 90%; 
    margin-top: 50px;
    padding: 25px 14px;
    font-size: 14px;
    line-height: 25px;
    .loading {
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
@media only screen and (min-width: 912px) and (max-width: 1400px) {
  .artical {
    font-size: 15px;
  }
}
@media screen and (min-width: 1600px) {
  .artical {
    font-size: 1rem;
    .loading {
      font-size: 2rem;
    }
    .date {
      font-size: 1.2rem;
    }
    .context {
      font-size: 1.1rem;
      line-height: 2rem;
      letter-spacing: 1.5px;
    }
    .catalogue {
      line-height: 2rem;
    }
    .fullScreenBtn,
    .quitfullScreenBtn {
      font-size: 1.1rem;
      width: 6rem;
      height: 2.5rem;
    }
  }
}
@media screen and (min-width: 3000px) {
  .artical {
    font-size: 1.5rem;
    .loading {
      font-size: 3rem;
    }
    .date {
      font-size: 1.4rem;
    }
    .context {
      font-size: 1.5rem;
      line-height: 2.5rem;
      letter-spacing: 2px;
    }
    .catalogue {
      line-height: 2.8rem;
    }
    .fullScreenBtn,
    .quitfullScreenBtn {
      font-size: 1.5rem;
      width: 8rem;
      height: 3rem;
    }
  }
}
</style>