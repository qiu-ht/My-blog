<template>
  <div class="bookpage">
    <i class="iconfont icon-back back" v-show="exitImgShow" @click="back"></i>
    <div class="bg"></div>
    <div class="bookopend" >
      <h1 class="bigfont1" ref="bigfont1">{{booktype==='frontend'?'front-end':'others'}}</h1>
    </div>
    <div class="searchChunk">
      <input
        type="text"
        class="searchinput"
        placeholder="输入书名"
        v-model="keyword"
        @keyup="search"
      />
      <i class="iconfont icon-sousuo" @click="search"></i>
    </div>
    <div class="claim">*本网站所有资源仅供学习分享用，如有侵权请联系本人删除，谢谢！</div>
    <div class="handleBooks">
      <router-link
        class="addbook"
        :to="{
          name: 'AddBookView',
        }"
        v-if="this.$store.state.user.administrator"
        >添加</router-link
      >
      <div class="editbook" @click="editbook" v-if="this.$store.state.user.administrator">{{isEdit?'完成编辑':'编辑'}}</div>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="notFound" class="notfound">没有找到相关内容。</div>
    <div
      class="frontend"
      v-if="!loading"
    >
    
      <div
        v-for="(ebook, index) in curbooks"
        :key="ebook._id"
        class="books"
      >
        <div class="eachbook">
          <i class="iconfont icon-guanbi closebtn" @click="deleteBook(ebook.name)" v-show="isEdit" alt="" ></i>
          <img
            src="http://iph.href.lu/100x140?fg=f0f0f0&bg=f0f0f0"
            :data-src="ebook.firstpage"
            alt=""
            :class="isEdit&&curindex===index?'frontendbookimg':'frontendbookimg active'"
            @click="
              todownload(
                ebook.downloadAddress,
                ebook.verificationCode,
                ebook.password
              )
            "
            @mouseenter="enterbook(index)"
            
          />
          <span
            :class="'ebookname' + index"
            >{{ ebook.name }}</span
          >
        </div>
        
      </div>
      
    </div>

    <Pagination :pageCount="pageCount" @changePage="changePage" class="pagination"/>

    
  </div>
</template>

<script>
import Pagination from '../../../Pagination/Pagination.vue'
export default {
  name: "FrontEnd",
  components:{Pagination},
  props:['booktype','CurBooksCount','CurBooks'],
  data() {
    return {
      hover: false,
      keyword: "",
      isEdit:false,
      searchBooks:[],
      CurPageIndex:1,
      curindex:0,
      curbooks:[],
      bookscount:0,
      loading:false,
      pageCount:2,
      notFound:false,
      timeOut:''
    };
  },
  created() {
    this.loading = true
    const params = {
      limitBooks: 25,
      skipBooks: 0,
    };
    const phoneParams = {
      limitBooks: 12,
      skipBooks: 0,
    };

    let getbooks = (bookparams)=>{
      this.$api.ebook.getCurEBooks(this.CurBooks,bookparams).then(
        res=>{
          this.curbooks = res.data
          this.loading = false
          this.$nextTick(()=>{
            this.asyncLoadImg()
          })
        }
      )
    }
    if (document.documentElement.clientWidth > 912 && this.CurPageIndex===1) {
      console.log(document.documentElement.clientWidth)
      getbooks(params)
    } else if (document.documentElement.clientWidth <= 767 && document.documentElement.clientWidth >= 280 && this.CurPageIndex===1) {
      getbooks(phoneParams)
    } else if (document.documentElement.clientWidth <= 912 && document.documentElement.clientWidth >= 767 && this.CurPageIndex===1) {
      getbooks(params)
    }

    this.$api.ebook.getEBookCount(this.CurBooksCount).then(
      res=>{
        let page;
        if (document.documentElement.clientWidth > 912) {
          page = Math.ceil(res.data.booksCount / 25);
        } else if (document.documentElement.clientWidth <= 767 && document.documentElement.clientWidth >= 280) {
          page = Math.ceil(res.data.booksCount / 12);
        } else if (document.documentElement.clientWidth <= 912 && document.documentElement.clientWidth >= 767) {
          page = Math.ceil(res.data.booksCount / 25);
        }

        this.pageCount = page
      }
    )
    
  },
  computed: {
    exitImgShow() {
      var exitImgShow;
      if (this.$store.state.userScreen.computer) {
        exitImgShow = false;
      } else if (this.$store.state.userScreen.phone) {
        exitImgShow = true;
      }
      return exitImgShow;
    },
  },
  methods: {
    todownload(href, verificationCode, password) {
      this.$store.state.openQrcode = true;
      this.$store.state.ebookHref = href;
      this.$store.state.verificationCode = verificationCode;
      this.$store.state.ebookPassword = password;
      this.$store.state.inputverification = "";
    },
    editbook(){
      this.isEdit = !this.isEdit    
    },
    enterbook(index){
      this.curindex = index
    },

    async search() {
      this.notFound = false
      if(this.timeOut){
        clearTimeout(this.timeOut)
      }
      this.timeOut = setTimeout(async()=>{
        this.loading = true
        if(this.keyword===""){
          this.changePage(1)
        }
        let limitBooks;
        if (document.documentElement.clientWidth > 912 ) {
          limitBooks=25
        } else if (document.documentElement.clientWidth <= 767 && document.documentElement.clientWidth >= 280 ) {
          limitBooks=12
        } else if (document.documentElement.clientWidth <= 912 && document.documentElement.clientWidth >= 767) {
          limitBooks=25
        }
        const params = {
          keyword:this.keyword,
          booktype:this.booktype
        }
        const res = await this.$api.ebook.searchBook(params)
        
        if(res.data){
          this.curbooks = res.data.slice(0,limitBooks);
          this.pageCount = Math.ceil(res.data.length/limitBooks)
          this.searchBooks = res.data
        }else{
          this.notFound = true
          this.curbooks=[]
        }
        
        this.loading = false
        this.$nextTick(()=>{
          this.asyncLoadImg()
        })
      },500)
        

      
      
      
    },
    deleteBook(name){
      const params={
        name:name,
        booktype:this.booktype
      }
      this.$confirm('确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        async()=>{
          const res = await this.$api.ebook.deleteBook(params)
          if(res.data === '删除成功！'){
            
            this.changePage(1)
            this.$message({
              type:'success',
              message:'删除成功！'
            })
          }else if(res.data==='删除失败！'){
            this.$message.error('删除失败！')
          }else {
            this.$message.error('服务器出错！')
          }
        }
      )
      
    },
    async changePage(CurPageIndex){
      this.CurPageIndex = CurPageIndex
      this.loading=true
      
      let params;
      if (document.documentElement.clientWidth > 912) {
        params = {
          limitBooks: 25,
          skipBooks: (CurPageIndex-1)*25,
        };
        document.documentElement.scrollTop=500
      } else if (document.documentElement.clientWidth <= 767 && document.documentElement.clientWidth >= 280) {
        params = {
          limitBooks: 12,
          skipBooks:  (CurPageIndex-1)*12,
        };
        document.documentElement.scrollTop=0
      } else if (document.documentElement.clientWidth <= 912 && document.documentElement.clientWidth > 767) {
        params = {
          limitBooks: 25,
          skipBooks: (CurPageIndex-1)*25,
        };
        document.documentElement.scrollTop=0
      }

      if(this.searchBooks!==[] && this.keyword!==''){
        this.curbooks = this.searchBooks.slice(params.skipBooks,params.limitBooks+params.skipBooks)
      }else{
        const res = await this.$api.ebook.getCurEBooks(this.CurBooks,params)
        const res1 = await this.$api.ebook.getEBookCount(this.CurBooksCount)
        this.curbooks = res.data
        this.pageCount = Math.ceil(res1.data.booksCount / params.limitBooks)
      }
      
      this.loading = false
      this.$nextTick(()=>{
        this.asyncLoadImg()
      })
      
    },
    back(){
      this.$router.back()
    },
    asyncLoadImg(){
      const imgs = document.querySelectorAll('.frontendbookimg')
      const observer = new IntersectionObserver(
        (changes)=>{
          changes.forEach((change)=>{
            
            if(change.intersectionRatio>0){
              const element = change.target
              const targetSrc = element.getAttribute('data-src')
              element.setAttribute('src',targetSrc)
              observer.unobserve(element)
            }
            
            
          })
        }
      )
      imgs.forEach(item=>{
        observer.observe(item)
      })
    }
  },
};
</script>

<style scoped lang="less">
.bookpage {
  animation: ebooksPageShow 0.5s forwards linear;
}
@keyframes ebooksPageShow {
  from {
    opacity: 0;
    display: none;
  }
  to {
    opacity: 1;
    display: block;
  }
}
@keyframes zoomInRight {
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}


.bookpage{
  margin: 0 auto;
  width: 90%;
  height: 1350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  background-color: aliceblue;
  box-shadow: 0 0 5px black;
  padding-bottom: 40px;
  position: relative;
  animation: zoomInRight 0.7s;
  z-index: 99;
  .bg{
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: #6ab8f9;
  }
  .bookopend{
    .bigfont1{
      position: relative;
      color: aliceblue;
    }
  }
  .searchChunk{
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    .searchinput{
      width: 60%;
      height: 30px;
      border: rgba(230, 228, 228, 0.5);
      border-radius: 15px;
      color: rgb(170, 169, 169);
      text-indent: 15px;
      margin-bottom: 5px;
      &:focus {
        outline: none;
        transform: scale(1.05,1.05);
        transition: 0.3s;
      }
    }
    i{
      position: absolute;
      line-height: 30px;
      right: calc(~"20% + 10px");
      cursor: pointer;
      z-index: 99;
    }
  }
  .claim{
    color: #707070;
    font-size: 13px;
    margin-bottom: 20px;
  }
  .handleBooks{
    margin-bottom: 10px;
    width: 150px;
    position: relative;
    .addbook{
      position: absolute;
      left: 0;
      text-decoration: none;
      color: #585858;
      &:hover{
        color: #3a78ff;
      }
    }
    .editbook{
      position: absolute;
      right: 0;
      cursor: pointer;
      color: #585858;
      &:hover{
        color: #3a78ff;
      }
    }
  }
  .frontend {
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    width: 88%;
    align-items: flex-start;
    
    .books {
      width: 20%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
      margin-bottom: 15px;
      position: relative;
      .eachbook{
        width: 100px;
        text-align: center;
        margin-bottom: 25px;
        .closebtn{
          width: 25px;
          height: 25px;
          color: rgb(204, 55, 55);
          position: absolute;
          top: -10px;
          left: 20px;
          cursor: pointer;
          &:hover{
            transform: scale(1.1, 1.1);
            transition: 0.3s;
          }
        }
        .frontendbookimg {
          width: 100px;
          height: 140px;
          cursor: pointer;
          transition: 0.3s;
          margin-bottom: 5px;
          box-shadow: 0 0 2px black;
        }
        .active{
          &:hover{
            transform:scale(1.05, 1.05);
            box-shadow: 0 0 5px #3da7ed;
          }
        }
        span {
          width: 100px;
          font-size: 12px;
          color: black;
          display: -webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;

        }
      }
      
    }
  }
  
  .loading{
    height: 900px;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .notfound{
    color: #707070;
  }
  .pagination{
    position: absolute;
    bottom: 50px;
  }
}

@media screen and (min-width: 912px) and (max-width: 1100px) {
  .bookpage{
    height: 1200px;
    .frontend {
      .books {
        .eachbook{
          .frontendbookimg{
            width: 90%;
            height: 120px;
          }
          span{
            width: 90%;
          }
        }
        
      }
    }
  }
}
@media screen and (min-width: 767px) and (max-width: 912px)  {
  .bookpage{
    margin-top: 100px;
  }
}
@media screen and (min-width: 280px) and (max-width: 767px) {
  .bookpage{
    width: 95%;
    height: 1100px;
    margin-top: 100px;
    flex-wrap: nowrap;
    .bookopend{
      .bigfont1{
        font-size: 25px;
      }
    }
    .back{
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 25px;
      i{
        font-size: 20px;
      }
    }
    .searchChunk{
      .searchinput{
        margin-top: 15px;
        width: 80%;
        height: 30px;
      }
      i{
        margin-top: 15px;
        right: calc(~"10% + 10px");
      }
    }
    .claim{
      text-align: center;
      width: 80%;
      color: #707070;
      font-size: 10px;
      margin-bottom: 20px;
    }
    .frontend {
      width: 95%;

      // justify-content: space-around;
      .books {
        width: calc(~"1/3 * 100%");
        .eachbook{
          font-size: 12px;
          margin-bottom: 20px;
          .closebtn{
            top: -5px;
            left: -5px;
            &:hover{
              transform: scale(1, 1);
              transition: 0.3s;
            }
          }
          .frontendbookimg{
            width: 90%;
            height: 140px;
          }
          
          .active{
            &:hover{
              transform:scale(1, 1);
              box-shadow: none;
            }
          }
        }
        
      }
    }
    
    .loading{
      font-size: 25px;
    }
    .pagination{
      bottom: 50px;
    }
  }
  
}
@media screen and (min-width:280px) and (max-width:350px){
  .bookpage{
    height: 900px;
    .frontend{
      .books{
        .eachbook{
          margin-bottom: 10px;
          .frontendbookimg{
            width: 80%;
            height: 100px;
          }
          span{
            width: 90%;
          }
        }
      }
    }
  }
}
@media screen and (min-width:350px) and (max-width:450px){
  .bookpage{
    height: 1000px;
    .frontend{
      .books{
        .eachbook{
          .frontendbookimg{
            height: 120px;
          }
        }
      }
    }
  }
}
</style>