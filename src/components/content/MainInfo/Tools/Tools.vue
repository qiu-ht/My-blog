<template>
  <div class="tools">
    <div class="bg"></div>
    <h1 class="toolsTitle">工具</h1>
    <div class="chunk" v-for="(eachChunk,index1) in chunk" :key="index1">
      <el-divider content-position="left">{{eachChunk.chunkname}}</el-divider>
      <div class="links">
        <div
          class="eachLink"
          v-for="(item, index) in eachChunk.linkArr"
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
      chunk:[
        {
          chunkname:'Github加速',
          linkArr:[
            {
              src: "http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649004597548-image.png&filename=image.png",
              title: "steam++",
              content: "亲测非常好用。",
              url: "http://steampp.net/",
            },
            {
              src:"http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649139058858-image.png&filename=image.png",
              title:"UU加速器",
              content:"开启学术资源加速~",
              url:'https://uu.163.com/'
            }
          ]
        },
        {
          chunkname:'前端工具',
          linkArr:[
            {
              src:"https://img1.baidu.com/it/u=2123894146,2909659137&fm=253&fmt=auto&app=138&f=JPEG?w=301&h=301",
              title:"菜鸟工具集合",
              content:"上百种好用的工具。",
              url:"https://c.runoob.com/"
            },
            {
              src:"http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649168091154-image.png&filename=image.png",
              title:'postman',
              content:'调试接口常用工具。',
              url:'https://www.postman.com/downloads/'
            }
          ]
        },
        {
          chunkname:'其他工具',
          linkArr:[
            {
              src:"http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649141043217-image.png&filename=image.png",
              title:'书法字体转换',
              content:'各种各样的书法字体。',
              url:'http://www.logoquan.com/shufa/'
            },
            {
              src:"http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649141227778-image.png&filename=image.png",
              title:'艺术字体',
              content:'各种各样好看的艺术字体。',
              url:'http://www.akuziti.com/'
            },
            {
              src:"http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649141227778-image.png&filename=image.png",
              title:'ico图标制作',
              content:'使用图片生成网站ico图标。',
              url:'https://www.bitbug.net/'
            },
            {
              src:"http://taogezhenshuai.fun:3002/blogImage?url=public/blogIMG/1649168810161-image.png&filename=image.png",
              title:'docsmall',
              content:'在线图片压缩网站。',
              url:'https://www.bitbug.net/'
            },
            
          ]
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
  background-color: #6ab8f9;
  position: relative;
  z-index: 99;
  .toolsTitle {
    text-align: center;
    margin: 40px 0 40px;
    color: aliceblue;
  }

  .chunk {
    width: 100%;
    
    .el-divider {
      width: 90%;
      margin: 0 auto;
      
    }
    /deep/ .el-divider__text {
      background-color: #9bd2ff;
      color: aliceblue;
      
    }
    .links {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      width: 94%;
      margin: 5px auto 40px;
      .eachLink {
        width: calc(~"1/3 * 100%");
        display: flex;
        justify-content: center;
        margin-top: 20px;
        .module {
          background-color: aliceblue;
          width: 85%;
          display: flex;
          border-radius: 5px;
          padding: 0 10px;
          transition: 0.3s;
          box-shadow: 0 0 2px #6ab8f9;
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
              color: rgb(120, 120, 120);
            }
            .content {
              top: 50%;
              position: absolute;
              width: 100%;
              font-size: 13px;
              color: rgb(169, 169, 169);
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width:280px) and (max-width:912px) {
  .tools{
    margin-top: 50px;
    .toolsTitle{
      font-size: 25px;
    }
    .chunk{
      .links{
        justify-content: space-around;
        .eachLink{
          width: 48%;
          .module{
            .info{
              .title{
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .content{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
}
</style>