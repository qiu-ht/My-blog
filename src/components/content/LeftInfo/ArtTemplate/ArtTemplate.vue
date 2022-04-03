<template>
  <div class="myArtical">
    <div class="line"></div>
    <!-- 笔记 -->
    <div class="title">我的{{Articalclass==='artical'?'文章':'笔记'}}</div>
    <div class="inputChunk">
      <input
        type="text"
        class="searchinput"
        placeholder="输入关键字"
        v-model="keyword"
        @keyup="search"
      />
      <i class="el-icon-search searchimg" @click="search"></i>
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
          @mouseenter="mouseenter(index)" @mouseleave="mouseleave()"
        >
          <div class="articalTitle">{{ artical.blogTitle }}</div>
          <div class="publishDate">{{ artical.publishDate.slice(0, 10) }}</div>
          <div :class="hover&&CurIndex===index?'operation hover':'operation'"> 
            <div class="deleteArt" @click="deleteArt(artical.blogTitle, artical.type,$event)">删除</div>
            <div class="editArt" @click="editArt(artical,$event)">编辑</div>
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
  props:['Articalclass','getCurArtical','searchArtical','getCount','Count'],
  data() {
    return {
      keyword: "",
      searchArt: [],
      CurArticals:[],
      articalCount:0,
      Pagination:true,
      CurIndex:0,
      hover:false,
      curPageIndex:1,
      timeOut:'',
      notFound:false,
      loading:false,
      pageCount:0
    };
  },
  computed: {
    adminIsLogin(){
      return this.$store.state.user.administrator
    }
  },
  mounted() {
    this.loading = true
    const params = {
      limit: 6,
      skip: 0,
    };
    // 'getCurNotes'
    this.$api[this.Articalclass][this.getCurArtical](params).then(
      res=>{
        this.CurArticals = res.data
        this.loading = false
      }
    )
    // 'getNotesCount'
    this.$api[this.Articalclass][this.getCount]().then(
      res=>{
        this.pageCount = Math.ceil((res.data[this.Count])/6)
      }
    )
    
  },
  methods: {
    openTheArtical() {
      document.documentElement.scrollTop = 500;
    },
    search() {
      if(this.timeOut){
        clearTimeout(this.timeOut)
      }
      this.timeOut = setTimeout(async()=>{
        this.notFound = false
        this.loading = true
        if (this.keyword.trim() === "") {
          this.changePage(1);
        } else{
          //note,searchNotes
          const res = await this.$api[this.Articalclass][this.searchArtical]({keyword: this.keyword})
          if(res.data){
            this.CurArticals = res.data.slice(0, 6);
            this.pageCount = Math.ceil((res.data.length)/6);
            this.searchArt = res.data
          }else{
            this.notFound = true
            this.pageCount = 0
            this.searchArt=[]
            this.CurArticals=[]
            
          }
          this.loading = false
        }
      },500)
      
    },

    readoneArtical(artical) {
      this.$store.state.theArtical = artical;
      this.$bus.$emit("articalChange", artical.blogTitle);
    },
    async changePage(CurPageIndex) {
      this.loading = true
      if (document.documentElement.scrollTop > 500 && this.Articalclass==='artical') {
        document.documentElement.scrollTop = 600;
      }
      this.curPageIndex=CurPageIndex
      const params = {
        limit: 6,
        skip: (CurPageIndex-1)*6,
      };
      if (this.searchArt.length !== 0 && this.keyword.trim() !== "") {
        this.CurArticals = this.searchArt.slice(
          params.skip,
          params.limit
        );
      } else {
        const res = await this.$api[this.Articalclass][this.getCurArtical](params)
        const res1 = await this.$api[this.Articalclass][this.getCount]()
        this.pageCount = Math.ceil((res1.data[this.Count])/6)
        this.CurArticals = res.data
      } 
      this.loading=false
    },
    mouseenter(index){
      this.CurIndex = index
      if (window.screen.width > 767 && this.adminIsLogin === true) {
        this.hover = true
      }
    },
    mouseleave(){
      if (window.screen.width > 767 && this.adminIsLogin === true) {
        this.hover = false
      }
    },
    deleteArt(blogTitle,type,e){
      const event = e || window.event
      event.stopPropagation();
      event.preventDefault()
      this.$confirm('确定删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$api.artical.deleteBlog({ blogTitle: blogTitle, type: type })
        this.$message({
          type:'success',
          message:'删除成功！'
        })
        this.changePage(1)
      })
    },
    editArt(artical,e){
      const event = e || window.event
      event.stopPropagation();
      event.preventDefault()
      this.$router.push({
          name: 'blog',
          params: {
            title: artical.blogTitle,
            publishDate: artical.publishDate,
            content: artical.blogContent,
            type: artical.type,
            coverImg:artical.coverImg,
            isEdit: true,
          },
        })
    }
  },
};
</script>

<style scoped lang='less'>
.myArtical {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #6bcff7;
  box-shadow: 0 0 5px black;
  border-radius: 10px;
  border-top-left-radius: 0;
  overflow: hidden;
  color: rgb(29, 29, 29);
  font-size: 20px;
  .line {
    width: 10px;
    height: 40px;
    background-color: black;
    opacity: 0.5;
    position: absolute;
    left: 0;
  }
  .inputChunk{
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    top: 70px;
    .searchinput {
      width: 100%;
      height: 30px;
      border: rgba(230, 228, 228, 0.5);
      border-radius: 15px;
      color: rgb(170, 169, 169);
      text-indent: 15px;
      &:focus {
        outline: none;
      }
    }
    .searchimg {
      position: absolute;
      width: 25px;
      right: 0;
      top: 5px;
      cursor: pointer;
      user-select: none;

      &:hover {
        transition: 0.3s;
        color: #87ceeb;
      }
    }
  }
  
  .title {
    position: absolute;
    left: 15px;
    line-height: 40px;
  }
  .articalLink {
    display: block;
    text-decoration: none;
    .artical {
      width: 80%;
      background-color: #6bcff7;
      opacity: 0.6;
      color: black;
      // box-shadow: 0 0 5px black;
      border-bottom: 1px solid #80b1e9;
      // border-top: 1px solid #80b1e9;
      font-size: 16px;
      padding: 5px 10px;
      position: relative;
      cursor: pointer;
      margin: 0 auto;
      overflow: hidden;
      &:hover {
        opacity: 0.8;
        transform: scale(1.03, 1.03);
        transition: 0.3s;
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
      .operation{
        position: absolute;
        display: flex;
        height: 100%;
        top: 0;
        right: -102px;
        align-items: center;
        background-color: #6da9f8;
        transition: 0.3s;
        .editArt,.deleteArt{
          // line-height: 100%;
          width: 50px;
          text-align: center;
          border-right: 1px solid #6bcff7;
          &:hover{
            color: #fff;
          }
        }
      }
      .hover{
        right: 0;
      }
      
    }
    .artical1{
      margin-top: 150px;
      border-top: 1px solid #80b1e9;
    }
  }
  .loading{
    width: 100%;
    text-align: center;
    margin-top: 150px;
  }
  .notfound{
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
@media screen and (min-width: 280px) and (max-width: 912px){
  .myArtical{
    width: 90%;
    margin: 0 auto;
  }
}
@media only screen and (min-width: 913px) and (max-width: 1200px) {
  .myArtical {
    .searchinput{
      width: 200px;
    }
    .artical {
      font-size: 14px;
    }
  }
}
</style>