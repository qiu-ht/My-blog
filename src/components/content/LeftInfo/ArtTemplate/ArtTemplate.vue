<template>
  <div class="myArtical">
    <div class="bg"></div>
    <!-- 笔记 -->
    <div class="title">
      我的{{ Articalclass === "artical" ? "文章" : "笔记" }}
    </div>
    <div class="inputChunk">
      <input
        type="text"
        class="searchinput"
        placeholder="输入关键字"
        v-model="keyword"
        @keyup="search"
      />
      <i class="iconfont icon-sousuo searchimg" @click="search"></i>
    </div>

    <!-- CurNotes -->
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="notFound" class="notfound">没有找到相关内容。</div>
    <div
      v-for="(artical, index) in CurArticals"
      :key="index"
      @click="readoneArtical(artical)"
      class="articalChunk"
    >
      <router-link
        v-if="!loading"
        :to="{
          name: 'artical',
          query: {
            blogTitle: artical.blogTitle,
            type: artical.type,
          },
        }"
        class="articalLink"
        :title="`${artical.blogTitle}`"
      >
        <div
          :class="`artical artical${index + 1}`"
          @click="openTheArtical(artical.blogTitle, artical.type)"
          @mouseenter="mouseenter(index)"
          @mouseleave="mouseleave()"
        >
          <div class="articalTitle">{{ artical.blogTitle }}</div>
          <div class="publishDate">{{ artical.publishDate.slice(0, 10) }}</div>
          <div
            :class="
              hover && CurIndex === index ? 'operation hover' : 'operation'
            "
          >
            <div
              class="deleteArt"
              @click="deleteArt(artical.blogTitle, artical.type, $event)"
            >
              删除
            </div>
            <div class="editArt" @click="editArt(artical, $event)">编辑</div>
          </div>
        </div>
      </router-link>
    </div>
    <Pagination
      :pageCount="pageCount"
      @changePage="changePage"
      class="pageturning"
      v-if="Pagination"
    />
  </div>
</template>

<script>
import Pagination from "../../Pagination/Pagination.vue";
export default {
  name: "ArtTemplate",
  components: { Pagination },
  props: [
    "Articalclass",
    "getCurArtical",
    "searchArtical",
    "getCount",
    "Count",
  ],
  data() {
    return {
      keyword: "",
      searchArt: [],
      CurArticals: [],
      articalCount: 0,
      Pagination: true,
      CurIndex: 0,
      hover: false,
      curPageIndex: 1,
      timeOut: "",
      notFound: false,
      loading: false,
      pageCount: 0,
    };
  },
  computed: {
    adminIsLogin() {
      return this.$store.state.user.administrator;
    },
  },
  mounted() {
    this.loading = true;
    const params = {
      limit: 6,
      skip: 0,
    };
    // 'getCurNotes'
    this.$api[this.Articalclass][this.getCurArtical](params).then((res) => {
      this.CurArticals = res.data;
      this.loading = false;
    });
    // 'getNotesCount'
    this.$api[this.Articalclass][this.getCount]().then((res) => {
      this.pageCount = Math.ceil(res.data[this.Count] / 6);
    });
  },
  methods: {
    openTheArtical() {
      document.documentElement.scrollTop = 700;
    },
    search() {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(async () => {
        this.notFound = false;
        this.loading = true;
        if (this.keyword.trim() === "") {
          this.changePage(1);
        } else {
          //note,searchNotes
          const res = await this.$api[this.Articalclass][this.searchArtical]({
            keyword: this.keyword,
          });
          if (res.data) {
            this.CurArticals = res.data.slice(0, 6);
            this.pageCount = Math.ceil(res.data.length / 6);
            this.searchArt = res.data;
          } else {
            this.notFound = true;
            this.pageCount = 0;
            this.searchArt = [];
            this.CurArticals = [];
          }
          this.loading = false;
        }
      }, 500);
    },

    readoneArtical(artical) {
      this.$store.state.theArtical = artical;
      this.$bus.$emit("articalChange", artical.blogTitle);
    },
    async changePage(CurPageIndex) {
      this.loading = true;
      if (
        document.documentElement.scrollTop > 1400 &&
        this.Articalclass === "artical"
      ) {
        document.documentElement.scrollTop = 1400;
      }
      this.curPageIndex = CurPageIndex;
      const params = {
        limit: 6,
        skip: (CurPageIndex - 1) * 6,
      };
      if (this.searchArt.length !== 0 && this.keyword.trim() !== "") {
        this.CurArticals = this.searchArt.slice(params.skip, params.limit);
      } else {
        const res = await this.$api[this.Articalclass][this.getCurArtical](
          params
        );
        const res1 = await this.$api[this.Articalclass][this.getCount]();
        this.pageCount = Math.ceil(res1.data[this.Count] / 6);
        this.CurArticals = res.data;
      }
      this.loading = false;
    },
    mouseenter(index) {
      this.CurIndex = index;
      if (
        document.documentElement.clientWidth > 767 &&
        this.adminIsLogin === true
      ) {
        this.hover = true;
      }
    },
    mouseleave() {
      if (
        document.documentElement.clientWidth > 767 &&
        this.adminIsLogin === true
      ) {
        this.hover = false;
      }
    },
    deleteArt(blogTitle, type, e) {
      const event = e || window.event;
      event.stopPropagation();
      event.preventDefault();
      this.$confirm("确定删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$api.artical.deleteBlog({ blogTitle: blogTitle, type: type });
        this.$message({
          type: "success",
          message: "删除成功！",
        });
        // 局部刷新
        this.changePage(this.curPageIndex);
      });
    },
    editArt(artical, e) {
      const event = e || window.event;
      event.stopPropagation();
      event.preventDefault();
      this.$router.push({
        name: "blog",
        params: {
          title: artical.blogTitle,
          publishDate: artical.publishDate,
          content: artical.blogContent,
          type: artical.type,
          coverImg: artical.coverImg,
          isEdit: true,
        },
      });
    },
  },
};
</script>

<style scoped lang='less'>
.myArtical {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: aliceblue;
  box-shadow: 0 0 5px black;
  border-top-left-radius: 0;
  overflow: hidden;
  color: rgb(29, 29, 29);
  font-size: 20px;
  z-index: 99;
  .bg {
    position: absolute;
    width: 100%;
    height: 85px;
    background-color: #6ab8f9;
  }
  .inputChunk {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    top: 70px;
    ::-webkit-input-placeholder {
      color: rgb(191, 191, 191);
    }
    .searchinput {
      width: 100%;
      height: 30px;
      border: none;
      border-radius: 15px;
      color: #3da7ed;
      text-indent: 15px;
      background-color: aliceblue;
      box-shadow: 0 0 2px #3da7ed;
      &:focus {
        outline: none;
        box-shadow: 0 0 5px #3da7ed;
        transform: scale(1.05, 1.05);
        transition: 00.3s;
      }
    }
    .searchimg {
      position: absolute;
      width: 25px;
      right: 0;
      top: 8px;
      cursor: pointer;
      user-select: none;

      &:hover {
        transition: 0.3s;
        color: #d9e8f7;
      }
    }
  }

  .title {
    margin-top: 10px;
    position: absolute;
    line-height: 40px;
    width: 100%;
    color: aliceblue;
    text-align: center;
  }
  .articalLink {
    display: block;
    text-decoration: none;
    .artical {
      width: 80%;
      background-color: aliceblue;
      opacity: 0.6;
      color: black;
      border-top: 1px solid #80b1e9;
      font-size: 16px;
      padding: 5px 10px;
      position: relative;
      cursor: pointer;
      margin: 0 auto;
      overflow: hidden;
      &:hover {
        .articalTitle {
          transform: scale(1.05, 1.05) translateX(5px);
          transition: 0.2s;
          text-shadow: 0 0 2px black;
        }
      }
      .articalTitle {
        padding-left: 10px;
        padding-top: 5px;
        width: 90%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .publishDate {
        margin-top: 5px;
        text-align: right;
        font-size: 12px;
      }
      .operation {
        position: absolute;
        display: flex;
        height: 100%;
        top: 0;
        right: -102px;
        align-items: center;
        background-color: #6da9f8;
        transition: 0.3s;
        .editArt,
        .deleteArt {
          // line-height: 100%;
          width: 50px;
          text-align: center;
          // border-right: 1px solid #6bcff7;
          &:hover {
            color: #fff;
          }
        }
      }
      .hover {
        right: 0;
      }
    }
    .artical1 {
      margin-top: 150px;
      border-top: none;
    }
  }
  .loading {
    width: 100%;
    text-align: center;
    margin-top: 150px;
  }
  .notfound {
    color: #707070;
    font-size: 13px;
    width: 100%;
    text-align: center;
    margin-top: 150px;
  }
}

.pageturning {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 40px;
}
@media screen and (min-width: 280px) and (max-width: 912px) {
  .myArtical {
    width: 90%;
    margin: 0 auto;
  }
}
@media only screen and (min-width: 913px) and (max-width: 1200px) {
  .myArtical {
    .searchinput {
      width: 200px;
    }
    .artical {
      font-size: 14px;
    }
  }
}
@media only screen and (min-width: 1600px) {
  .myArtical {
    height: 48rem;
    .bg {
      height: 6.5rem;
    }

    .title {
      font-size: 1.5rem;
      margin-top: 1.5rem;
    }
    .inputChunk {
      top: 5rem;
      ::-webkit-input-placeholder {
        font-size: 1.1rem;
      }
      .searchinput {
        height: 2.5rem;
        border-radius: 1.25rem;
      }
      .searchimg {
        font-size: 1.4rem;
        width: 2rem;
      }
    }

    .articalLink {
      .artical {
        padding: 0.5rem 0.5rem 0.5rem;
        font-size: 1.3rem;
        .publishDate {
          margin-top: 0.8rem;
          font-size: 0.9rem;
        }
      }
      .artical1{
        margin-top: 10rem;
      }
    }
  }
}
@media only screen and (min-width: 2300px) {
  .myArtical {
    height: 55rem;
    .bg {
      height: 8rem;
    }

    .title {
      font-size: 1.8rem;
      margin-top: 1.5rem;
    }
    .inputChunk {
      top: 6.5rem;
      ::-webkit-input-placeholder {
        font-size: 1.1rem;
      }
      .searchinput {
        height: 2.5rem;
        border-radius: 1.25rem;
      }
      .searchimg {
        font-size: 1.4rem;
        width: 2rem;
      }
    }

    .articalLink {
      .artical {
        padding: 1rem 1rem 0.5rem;
        font-size: 1.5rem;
        .publishDate {
          margin-top: 0.8rem;
          font-size: 1.1rem;
        }
      }
      .artical1{
        margin-top: 11rem;
      }
    }
  }
}
@media only screen and (min-width: 4000px) {
  .myArtical {
    height: 60rem;

    .title {
      font-size: 2.2rem;
      margin-top: 1.5rem;
    }
    .inputChunk {
      top: 6.5rem;
      ::-webkit-input-placeholder {
        font-size: 1.3rem;
      }
      .searchinput {
        height: 3rem;
        border-radius: 1.5rem;
      }
      .searchimg {
        font-size: 1.7rem;
        width: 2.3rem;
      }
    }

    .articalLink {
      .artical {
        font-size: 2rem;
        .publishDate {
          margin-top: 0.8rem;
          font-size: 1.3rem;
        }
      }
      .artical1{
        margin-top: 11rem;
      }
    }
  }
}
</style>