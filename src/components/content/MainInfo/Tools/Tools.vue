<template>
  <div class="tools">
    <h1 class="toolsTitle">工具</h1>
    <div class="chunk">
      <el-divider>Github加速</el-divider>
      <div class="links">
        <div
          class="eachLink"
          v-for="(item, index) in github"
          :key="index"
          @click="toLink(item.url)"
        >
          <div class="module">
            <div class="imgDiv">
              <img :src="item.src" alt="" />
            </div>
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <div class="content">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      github: [
        {
          src: "http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649004597548-image.png&filename=image.png",
          title: "steam++",
          content: "亲测非常好用。",
          url: "http://steampp.net/",
        }
      ],
    };
  },
  methods: {
    toLink(url) {
      window.open(url);
    },
  },
};
</script>

<style lang="less" scoped>
.tools {
  width: 90%;
  height: 1000px;
  box-shadow: 0 0 5px black;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  .toolsTitle {
    text-align: center;
    margin: 40px 0 40px;
  }

  .chunk {
    width: 100%;
    .el-divider {
      width: 80%;
      margin: 0 auto;
      
    }
    /deep/ .el-divider__text {
      background-color: #6bcff7;
      
    }
    .links {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      width: 94%;
      margin: 20px auto 20px;
      .eachLink {
        width: calc(~"1/3 * 100%");
        display: flex;
        justify-content: center;
        margin-top: 20px;
        .module {
          background-color: #9be3ff;
          width: 250px;
          display: flex;
          border-radius: 5px;
          padding: 0 10px;
          transition: 0.3s;
          &:hover {
            box-shadow: 0 1px 3px black;
            transform: translate(0, -5px);
            cursor: pointer;
          }
          .imgDiv {
            height: 80px;
            display: flex;
            align-items: center;

            img {
              width: 60px;
              height: 60px;
              box-shadow: 0 0 2px rgb(255, 255, 255);
              border-radius: 3px;
            }
          }

          .info {
            flex-grow: 1;
            height: 80px;
            position: relative;
            margin-left: 10px;
            .title {
              width: 100%;
              position: absolute;
              top: 10px;
            }
            .content {
              top: 50%;
              position: absolute;
              width: 100%;
              font-size: 13px;
              color: rgb(154, 154, 154);
            }
          }
        }
      }
    }
  }
}
</style>