<template>
  <div class="mainInfo">
    <div
      v-for="(artical, index) in CurArticals"
      :class="'oneInfo oneInfo' + index"
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
        <div class="artical-info">
          <div class="titleBox">
            {{ artical.blogTitle }}
          </div>

          <div class="content" @click="readoneArtical(artical)">
            <div class="imgBox">
              <img
                :src="artical.coverImg || '/image/icon/portrait.jpg'"
                alt=""
              />
            </div>
            <div class="content-text">
              {{ artical.blogContent }}
            </div>
          </div>

          <div class="bottom_info">
            <a class="user" href="/">
              <img src="/image/icon/portrait.jpg" alt="" />
              <span>飀釧灃</span>
            </a>
            <span class="divide">|</span>
            <div class="date">
              <i class="iconfont icon-riqi"></i>
              <span>{{ artical.publishDate.slice(0, 10) }}</span>
            </div>
            <span class="divide">|</span>
            <div class="views">
              <i class="iconfont icon-liulanliang"></i>
              <span>{{ artical.articalView }}</span>
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
            coverImg: artical.coverImg,
            isEdit: true,
          },
        }"
      >
        <transition>
          <div
            :class="
              hover && CurIndex === index
                ? `editBlog editBlog${index} hover`
                : `editBlog editBlog${index}`
            "
            v-if="adminIsLogin"
          >
            <span>编辑</span>
          </div>
        </transition>
      </router-link>
      <transition>
        <div
          :class="
            hover && CurIndex === index
              ? `deleteBlog deleteBlog${index} hover`
              : `deleteBlog deleteBlog${index}`
          "
          @click="deleteBlog(artical.blogTitle, artical.type)"
          v-if="adminIsLogin"
        >
          <span>删除</span>
        </div>
      </transition>
    </div>

    <!-- 翻页 -->
    <Pagination
      :pageCount="pageCount"
      @changePage="changePage"
      class="pageturning"
    />

    <router-view></router-view>
  </div>
</template>

<script>
import Pagination from "../../Pagination/Pagination.vue";
export default {
  name: "MainInfo",
  components: { Pagination },
  data() {
    return {
      curPageIndex: 1,
      articalCount: 0,
      CurArticals: [],
      hover: false,
      CurIndex: 0,
    };
  },
  computed: {
    adminIsLogin() {
      return this.$store.state.user.administrator;
    },
    pageCount() {
      return Math.ceil(this.articalCount / 6);
    },
  },
  mounted() {
    const params = {
      limit: 6,
      skip: 0,
    };
    // 'getCurNotes'
    this.$api.artical.getArtical(params).then((res) => {
      this.CurArticals = res.data;
    });

    // 'getNotesCount'
    this.$api.artical.getArticalCount().then((res) => {
      this.articalCount = res.data.articalCount;
    });
  },
  methods: {
    enterInfo(index) {
      this.CurIndex = index;
      if (
        document.documentElement.clientWidth > 767 &&
        this.adminIsLogin === true
      ) {
        this.hover = true;
      }
    },
    leaveInfo() {
      if (
        document.documentElement.clientWidth > 767 &&
        this.adminIsLogin === true
      ) {
        this.hover = false;
      }
    },
    async deleteBlog(blogTitle, blogType) {
      if (confirm("确定删除吗？")) {
        const res = await this.$api.artical.deleteBlog({
          blogTitle: blogTitle,
          type: blogType,
        });
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "删除成功！",
          });
        }
        this.changePage(this.curPageIndex);
      }
    },

    async changePage(CurPageIndex) {
      this.curPageIndex = CurPageIndex;

      if (document.documentElement.clientWidth > 912) {
        document.documentElement.scrollTop = 700;
      } else if (
        document.documentElement.clientWidth < 912 &&
        document.documentElement.clientWidth > 280
      ) {
        document.documentElement.scrollTop = 0;
      }

      const params = {
        limit: 6,
        skip: (CurPageIndex - 1) * 6,
      };

      const articals = await this.$api.artical.getArtical(params);
      this.CurArticals = articals.data;
    },

    readoneArtical(artical) {
      this.$bus.$emit("articalChange", artical.blogTitle);
    },
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
  width: 100%;
  z-index: 100;
  height: 2050px;
  padding: 10px 0;
  border-radius: 10px;
  position: relative;
  .oneInfo {
    background-color: aliceblue;
    color: rgb(170, 170, 170);
    border-bottom: 1px solid #80b1e9;
    box-shadow: 0 0 5px #6ab8f9;
    border-radius: 6px;
    position: relative;
    margin: 0 auto 40px;

    &:hover {
      box-shadow: 0 0 5px #0287f4;
      transition: 0.2s;
      .imgBox {
        img {
          transform: scale3d(1.2, 1.2, 1.2);
          transition: 0.5s;
        }
      }
    }

    .routeBox {
      color: rgb(73, 73, 73);
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      text-decoration: none;
      justify-content: space-evenly;
      align-items: center;
      &:hover {
        .content {
          color: #4168d396;
          transition: 0.3s;
        }
      }
      .artical-info {
        display: flex;
        padding: 3% 0 2% 5%;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: left;
        height: 100%;
        max-width: 95%;
        .titleBox {
          font-size: 22px;
          border-left: 10px solid #05a3ff;
          height: 30px;
          padding-left: 10px;
          width: 80%;
          color: #05a3ff;
          margin-bottom: 1vw;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .content {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          height: 150px;
          max-width: 98%;

          .imgBox {
            width: 200px;
            // height: 50%;
            // height: 80%;
            overflow: hidden;
            margin-right: 3%;
            height: 83%;
            img {
              width: 100%;
              height: 100%;
              // opacity: 0.7;
            }
          }
          .content-text {
            flex: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 16px;
            padding-right: 4%;
            letter-spacing: 2px;
            line-height: 30px;
            height: auto;
          }
        }
        .bottom_info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1%;
          width: 30%;
          margin-left: 93%;
          transform: translate(-100%);
          .user {
            color: rgb(158, 157, 157);
            cursor: pointer;
            &:hover {
              color: #05a3ff;
            }
            img {
              width: 20px;
              border-radius: 50%;
              vertical-align: middle;
              opacity: 0.8;
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
            color: rgb(158, 157, 157);
            i {
              font-size: 13px;
            }
            span {
              font-size: 13px;
              margin-left: 3px;
            }
          }
          .divide {
            color: rgb(158, 157, 157);
            font-size: 13px;
            user-select: none;
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
    .hover {
      display: block;
    }
  }
  .oneInfo5 {
    margin-bottom: 50px;
  }
  .pageturning {
    margin: 50px auto;
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
        .artical-info {
          width: 100%;
          padding: 3% 4%;
          .titleBox {
            top: 18px;
            left: 5%;
            width: 60%;
            height: 20px;
            font-size: 14px;
            margin-bottom: 0;
          }
          .content {
            height: auto;
            padding: 0 10px;
            .content-text {
              left: 0;
              right: 0;
              margin: 10px auto;
              font-size: 13px;
              -webkit-line-clamp: 2;
              line-height: 25px;
            }
          }
          .bottom_info {
            width: 96%;
            justify-content: space-evenly;
            margin-left: 0;
            transform: none;
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
  }
}

@media only screen and (min-width: 1100px) and (max-width: 1200px) {
  .mainInfo {
    .oneInfo {
      .routeBox {
        .artical-info {
          .titleBox {
            font-size: 17px;
            height: 25px;
          }
          .content {
            font-size: 14px;
          }
          .bottom_info{
            width: 34%;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 912px) and (max-width: 1100px) {
  .mainInfo {
    .oneInfo {
      .routeBox {
        .artical-info {
          .titleBox {
            font-size: 16px;
            height: 25px;
          }
          .content {
            font-size: 14px;
            .imgBox {
              width: 20%;
            }
          }
          .bottom_info{
            width: 40%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 2000px) {
  .mainInfo {
    .oneInfo {
      .routeBox {
        .artical-info {
          .titleBox {
            font-size: 1.6rem;
            height: 2.5rem;
          }
          .content {
            font-size: 1.3rem;
            height: 180px;
            .imgBox {
              width: 220px;
            }
            .content-text {
              font-size: 1.3rem;
              line-height: 2.5rem;
            }
          }
          .bottom_info {
            width: 32%;
            .user,
            .date,
            .views {
              span,
              i {
                font-size: 1.1rem;
              }
              img {
                width: 1.3rem;
              }
            }

            .divide {
              font-size: 1.1rem;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 3000px) {
  .mainInfo {
    .oneInfo {
      .routeBox {
        .artical-info {
          .titleBox {
            font-size: 2rem;
            height: 3rem;
          }
          .content {
            font-size: 1.3rem;
            height: 200px;
            .imgBox {
              width: 250px;
            }
            .content-text {
              font-size: 1.5rem;
              line-height: 2.5rem;
            }
          }
          .bottom_info {
            width: 30%;
            .user,
            .date,
            .views {
              span,
              i {
                font-size: 1.5rem;
              }
              img {
                width: 1.5rem;
              }
            }
            .divide {
              font-size: 1.5rem;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 4000px) {
  .mainInfo {
    .oneInfo {
      .routeBox {
        .artical-info {
          padding: 2% 0 1% 3%;
          .titleBox {
            font-size: 2.5rem;
            height: 3.2rem;
          }
          .content {
            height: 230px;
            .imgBox {
              width: 280px;
            }
            .content-text {
              font-size: 2.2rem;
              letter-spacing: 0.4rem;
              line-height: 3.2rem;
            }
          }
          .bottom_info {
            margin-bottom: 1%;
            margin-top: 1%;
            .user,
            .date,
            .views {
              span,
              i {
                font-size: 2.1rem;
              }
              img {
                width: 2.2rem;
              }
            }
            .divide {
              font-size: 2.1rem;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 5000px) {
  .mainInfo {
    .oneInfo {
      .routeBox {
        .artical-info {
          .bottom_info {
            margin-bottom: 0.5%;
            margin-top: 1%;
            width: 26%;
            .user,
            .date,
            .views {
              span,
              i {
                font-size: 2.1rem;
              }
              img {
                width: 2.2rem;
              }
            }
            .divide {
              font-size: 2.1rem;
            }
          }
        }
      }
    }
  }
}
</style>