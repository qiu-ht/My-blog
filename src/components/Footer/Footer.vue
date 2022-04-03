<template>
  <footer class="myfooter" ref="myfooter" >
      <a class="aboutMe">关于我</a>
      <a class="contactMe" @click="contactMe">联系我</a>
      <div class="followMeChunk">
        <div class="qrcodeChunk" v-show="QrcodeIsShow">
          <div class="qrcodeTop" ref="qrcodeTop">
            <img src="/image/officialAccounts/myQrcode.jpg" alt="">
          </div>
          <div class="triangle" ref="triangle"></div>
        </div>
      
        <a class="followMe" @mouseenter="showQrcode" @mouseleave="hideQrcode" @click="mobileQrcode">关注我</a>
      </div><br>
      
      
      <a href="https://beian.miit.gov.cn/" class="num">粤ICP备2021130234号</a>
  </footer>
</template>

<script>
export default {
    data() {
      return {
        QrcodeIsShow:false
      }
    },
    computed:{

    },
    methods:{
      contactMe(){
        alert('我的邮箱：1910828797@qq.com,欢迎随时来骚扰^-^')
      },
      showQrcode(){
        if(window.screen.width>767){
          this.QrcodeIsShow = true
        }
      },
      hideQrcode(){
        if(window.screen.width>767){
          this.QrcodeIsShow = false
        }
      },
      mobileQrcode(){
        if(window.screen.width<767){
          if(this.QrcodeIsShow===false){
            this.QrcodeIsShow = true
          }else if(this.QrcodeIsShow===true){
            this.QrcodeIsShow = false
          }
          
        }
        
      }
    },

}
</script>

<style scoped lang='less'>
    @keyframes linearwipe{ 
        from { height: 0;opacity: 0 } 
    } 
    .myfooter{
        z-index: 1000;
        width: 100%;
        height: 100px;
        background-color: rgba(17, 6, 6, 0.5);
        text-align: center;
        margin-top: 500px;
        .aboutMe,.contactMe,.followMe{
            color: #ccc;
            text-decoration: none;
            z-index: 10000;
            &:hover{
              color: #fff;
            }
        }
        .contactMe{
          display: inline-block;
          margin: 20px 50px 15px;
          cursor: pointer;
        }
        .followMeChunk{
          display: inline-block;
          position: relative;
          .qrcodeChunk{
            width: 216px; 
            position: absolute;
            bottom:30px;
            left: 0;
            display: flex;
            flex-wrap: wrap;
            .qrcodeTop{
              width: 216px;   
              height: 216px;    
              background-color: rgba(0, 0, 0, 0.4);   
              -webkit-border-radius: 30px;   
              -moz-border-radius: 30px;   
              border-radius: 10px;   
              animation: linearwipe 0.3s steps(100, end); 
              opacity: 1; 
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                height: 175px;
                width: 175px;
                animation: linearwipe 0.3s steps(100, end); 
                border-radius: 5px;
              }
              
            }
            .triangle{   
              animation: linearwipe 0.3s steps(200, end); 
              width: 0;
              height: 0 ;
              border: 20px solid;
              border-color: rgba(0, 0, 0, 0.4) transparent transparent rgba(0, 0, 0, 0.4);
              margin-left: 30px;
              z-index: 9999;
            }
          }
        }
        .num{
          text-decoration: none;
          color: rgb(124, 121, 121);
          &:hover{
            color: #ccc;
          }
        }
        
        

    }
    .loginpageStyle{
      position: fixed;
      bottom: 0;
    }
    @media only screen and (min-width:280px) and (max-width:912px) {
      .myfooter{
        .followMeChunk{
          .qrcodeChunk{
            width: 216px; 
            bottom:10px;
            left: -50px;
            .qrcodeTop{
              width: 150px;   
              height: 150px;    
              background-color: #B0E5FA;   
              img{
                height: 120px;
                width: 120px;
              }
              
            }
            .triangle{   
              border-color:#B0E5FA  transparent  transparent;
              margin-left: 55px;
              margin-top: -1px;
            }
          }
        }
      }
    }
</style>