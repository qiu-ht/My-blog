<template>
  <div class="mainInfo">
    <div
      v-for="(artical, index) in CurArticals"
      :class="'oneInfo oneInfo'+index"
      :key="index"
      @mouseenter="enterInfo(index)"
      @mouseleave="leaveInfo(index)"
    >
      <router-link
        :class="`routeBox routeBox${index}`"
        :to="{
          name: 'artical',
          query: {
            blogTitle: artical.blogTitle,
            type: artical.type,
          },
        }"
        
      >
        <div class="imgBox"><img :src="artical.coverImg || '/image/icon/portrait.jpg'" alt="" /></div>
        <div class="rightInfo">
          <div class="titleBox" >
            {{ artical.blogTitle }}
          </div>
          
          <div class="content" @click="readoneArtical(artical)">{{ artical.blogContent }}</div>

          <div class="bottom_info">
            <a class="user" href="/">
              <img src="/image/icon/portrait.jpg" alt="" />
              <span>飀釧灃</span>
            </a>
            <div class="date">
              <i class="iconfont icon-riqi"></i>
              <span>{{ artical.publishDate.slice(0, 10) }}</span>
            </div>
            <div class="views">
              <i class="iconfont icon-liulanliang"></i>
              <span>{{artical.articalView}}</span>
            </div>
          </div>
        </div>
        
      </router-link>
      
      

      <router-link
        :to="{
          name: 'blog',
          params: {
            title: artical.blogTitle,
            publishDate: artical.publishDate,
            content: artical.blogContent,
            type: artical.type,
            coverImg:artical.coverImg,
            isEdit: true,
          },
        }"
      >
        <transition>
          <div :class="hover&&CurIndex===index?`editBlog editBlog${index} hover`:`editBlog editBlog${index}`" v-if="adminIsLogin">
            <span>编辑</span>
          </div>
        </transition>
      </router-link>
      <transition>
        <div
          :class="hover&&CurIndex===index?`deleteBlog deleteBlog${index} hover`:`deleteBlog deleteBlog${index}`"
          @click="deleteBlog(artical.blogTitle, artical.type)"
          v-if="adminIsLogin"
        >
          <span>删除</span>
        </div>
      </transition>
    </div>

    <!-- 翻页 -->
    <Pagination :pageCount="pageCount" @changePage="changePage" class="pageturning"/>

    <router-view></router-view>
  </div>
</template>

<script>
import Pagination from '../../Pagination/Pagination.vue'
export default {
  name: "MainInfo",
  components:{Pagination},
  data() {
    return {
      curPageIndex:1,
      articalCount:0,
      CurArticals:[],
      hover:false,
      CurIndex:0
    };
  },
  computed: {
    adminIsLogin() {
      return this.$store.state.user.administrator;
    },
    pageCount(){
      return Math.ceil(this.articalCount/6)
    },
    
  },
  mounted() {
    const params = {
        limit:6,
        skip:0
    }
    // 'getCurNotes'
    this.$api.artical.getArtical(params).then(
      res=>{
        this.CurArticals = res.data
      }
    )
    
    // 'getNotesCount'
    this.$api.artical.getArticalCount().then(
      res=>{
        this.articalCount = res.data.articalCount
      }
    )

  },
  methods: {
    enterInfo(index) {
      this.CurIndex = index
      if (window.screen.width > 767 && this.adminIsLogin === true) {
        this.hover = true
      }
    },
    leaveInfo() {
      if (window.screen.width > 767 && this.adminIsLogin === true) {
        this.hover = false
      }
    },
    async deleteBlog(blogTitle, blogType) {
      if (confirm("确定删除吗？")) {
        const res = await this.$api.artical.deleteBlog({ blogTitle: blogTitle, type: blogType })
        if(res.status===200){
          this.$message({
            type:'success',
            message:'删除成功！'
          })
        }
        this.changePage(this.curPageIndex)
      }
    },

    async changePage(CurPageIndex) {
      this.curPageIndex = CurPageIndex
      const params = {
        limit: 6,
        skip: (CurPageIndex-1)*6,
      };

      const articals = await this.$api.artical.getArtical(params)
      this.CurArticals = articals.data

      if(window.screen.width>912) {document.documentElement.scrollTop = 700;}
      else if(window.screen.width<912 && window.screen.width>280) {document.documentElement.scrollTop = 0;}
    },

    readoneArtical(artical){
      this.$bus.$emit('articalChange',artical.blogTitle)
    }
  },
};
</script>

<style scoped lang='less'>
@keyframes showEditBtn {
  from {
    width: 0;
  }
  to {
    width: 30px;
  }
}

.mainInfo {
  z-index: 100;
  width: 85%;
  height: 2050px;
  padding: 10px 30px;
  border-radius: 10px;
  margin-left: 50px;
  position: relative;
  .oneInfo {
    width: 100%;
    height: 280px;
    background-color: aliceblue;
    color: rgb(170, 170, 170);
    border-bottom: 1px solid #80b1e9;
    box-shadow: 0 0 5px #6ab8f9;
    border-radius: 6px;
    position: relative;
    margin: 0 auto 40px;
    @media screen and (min-width:912px) {
      margin-left: -20px;
    }
    
    .imgBox{
      box-shadow: 0 0 5px #6ab8f9;
    }
    &:hover {
      box-shadow: 0 0 5px #0287f4;
      // border-bottom: 1px solid #80b1e9;
      transition: 0.2s;
      .imgBox {
        img {

          transform: scale3d(1.1, 1.1, 1.1);
          transition: 0.5s;
        }
      }
    }
    
    
    .routeBox {
      width: 100%;
      height: 100%;
      font-size: 18px;
      color: rgb(73, 73, 73);
      cursor: pointer;
      display: block;
      display: flex;
      flex-wrap: wrap;
      text-decoration: none;
      justify-content: space-evenly;
      align-items: center;
      &:hover {
        color: #4168d396;
        transition: 0.3s;
      }
      .imgBox {
        width: 23%;
        height: 65%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          opacity: 0.7;
        }
      }
      .rightInfo{
        // position: relative;
        width: 60%;
        display: flex;
        flex-wrap: wrap;

        .titleBox {
          position: absolute;
          top: 15%;
          // left: 30%;
          height: 25px;
          font-size: 16px;
          a{
            text-decoration: none;
          }
          width: 50%;
          border-bottom: 1px solid rgb(173, 173, 173);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .content {
          // position: absolute;
          // left: 30%;
          top: 26%;
          position: absolute;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 56%;
          font-size: 14px;
          margin-top: 25px;
          margin-bottom: 30px;
          
        }
        .bottom_info{
          display: flex;
          position: absolute;
          // left: 30%;
          top: 73%;
          align-items: center;
          height: 30px;
          width: 55%;
          justify-content: space-between;
          .user {
            color: rgb(73, 73, 73);
            bottom: 20px;
            cursor: pointer;
            &:hover {
              color: #05a3ff;
              // transition: 0.2s;
            }
            img {
              width: 20px;
              border-radius: 50%;
              vertical-align: middle;
            }
            span {
              display: inline-block;
              font-size: 13px;
              vertical-align: middle;
              margin-left: 3px;
            }
          }
          .date,
          .views {
            color: rgb(73, 73, 73);
            bottom: 20px;
            i {
              font-size: 13px;
            }
            span {
              font-size: 13px;
              margin-left: 3px;
            }
          }
        }
      }
    }
    
    
    

    .editBlog,
    .deleteBlog {
      width: 30px;
      height: 50px;
      background-color: rgba(155, 155, 155, 0.7);
      position: absolute;
      text-align: center;
      padding-top: 10px;
      color: rgb(63, 63, 63);
      cursor: pointer;
      font-size: 16px;
      left: 100%;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      animation: showEditBtn 0.3s linear;
      overflow: hidden;
      display: none;

      &:hover {
        background-color: rgba(115, 174, 212, 0.9);
        color: blanchedalmond;
        transition: 0.3s;
      }
      span {
        position: absolute;
        right: 5px;
      }
    }
    .editBlog {
      top: 20px;
    }
    .deleteBlog {
      top: 90px;
    }
    .hover{
      display: block;
    }
  }
  .oneInfo5{
    margin-bottom: 50px;
  }
  .pageturning{
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 50px;
  }
}
@media only screen and (min-width: 280px) and (max-width: 912px) {
  .mainInfo {
    width: 90%;
    height: 1100px;
    top: 70px;
    margin: 0 auto;
    padding: 0;
    box-shadow: none;
    .oneInfo {
      width: 100%;
      height: 140px;
      overflow: hidden;
      margin-bottom: 25px;
      &:hover {
        opacity: 0.7;
        box-shadow: 0 0 5px black;
      }
      .imgBox {
        display: none;
      }
      
      .routeBox {
        font-size: 14px;
        .rightInfo{
          width: 100%;
          .titleBox {
            top: 18px;
            left: 5%;
            width: 60%;
            height: 20px;
            font-size: 14px;
            // border: none;
          }
          .content {
            width: 90%;
            left: 0;
            right: 0;
            margin: 18px auto 0 ;
            font-size: 14px;
            font-size: 13px;
            -webkit-line-clamp: 2;
          }
          .bottom_info{
            left: 5%;
            width: 80%;
            .user {
              img {
                width: 18px;
              }
              span {
                font-size: 12px;
                margin-left: 5px;
              }
            }
            .date,
            .views {
              img {
                width: 17px;
              }
              span {
                font-size: 12px;
                margin-left: 5px;
              }
            }
          }
          
        }
      }
      
      
      .editBlog,
      .deleteBlog {
        display: none;
      }
    }
    .pageturning {
      top: 1000px;
    }
  }
}

@media only screen and (min-width: 1100px) and (max-width: 1200px) {
  .mainInfo {
    width: 90%;
    margin-left: 20px;
    .oneInfo {
      .titleBox {
        font-size: 17px;
      }
      .content {
        font-size: 14px;
      }
    }
  }
}
@media only screen and (min-width: 912px) and (max-width: 1100px) {
  .mainInfo {
    width: 90%;
    margin-left: 20px;
    .oneInfo {
      .titleBox {
        font-size: 16px;
      }
      .content {
        font-size: 14px;
      }
    }
  }
}
</style>