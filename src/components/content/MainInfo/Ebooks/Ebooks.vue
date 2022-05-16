<template>
  <div class="ebooks">
      <router-link tag="div" v-show="!this.$store.state.othersOpend" :to="{
        name:'frontEndBook'
        }"
        >
        <div class="frontEnd" v-show="!this.$store.state.othersOpend &&!this.$store.state.frontendOpend" ref="frontEnd" @click="openFrontend">
          <div class="line"></div>
          <h1 class="bigfont1" ref="bigfont1" v-show="!this.$store.state.frontendOpend">front end</h1>
        </div>
      </router-link>
      <router-link tag="div" :to="{
          name:'otherBook'
        }"
        v-show="!this.$store.state.frontendOpend" 
        >
        <div class="others" v-show="!this.$store.state.othersOpend &&!this.$store.state.frontendOpend" ref="other" @click="openOthers">
          <div class="line"></div>
          <h1 class="bigfont2"  ref="bigfont2" v-show="!this.$store.state.othersOpend">others</h1>
        </div>
      </router-link>
      
      
  </div>
</template>

<script>
export default {
    name:"Ebooks",
    data() {
        return {
            
        }
    },
    methods:{
      openFrontend(){
        this.$store.state.frontendOpend = true
      },
      openOthers(){
        this.$store.state.othersOpend = true
      }
    },
    mounted(){
      this.$store.dispatch('getCurFrontBooks',{
        limitBooks:14,
        skipBooks:0,
      })
      
      if(this.$refs.frontEnd.style.height !="700px"){
        this.$store.state.frontendOpend = false
      }else if (this.$refs.other.style.height != "700px"){
        this.$store.state.othersOpend = false
      }
    }
}
</script>

<style scoped lang="less">
    
  .ebooks{
    width: 90%;
    margin: 0 auto;
    .frontEnd,.others{
      background-color:#6ab8f9;
      box-shadow: 0 0 5px black;
      width: 100%;
      height: 330px;
      top: 0;
      cursor: pointer;
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      &:hover{
        transform: scale(1.03,1.03);
        box-shadow: 0 0 30px black;
        transition: 0.5s ;
      }
      .bigfont1,.bigfont2{
        font-size: 120px;
        text-align: center;
        color: aliceblue;
      }
      .line{
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 40px;
        background-color: aliceblue;
      }
    }
    
    
    
  }
  @media only screen and (min-width: 280px) and (max-width: 912px) {
    .ebooks{
      width: 95%;
      margin: 80px auto;
      .frontEnd,.others{
        width: 100%;
        height: 200px;
        margin-bottom: 40px;
        align-items: center;
        &:hover{
          transform: scale(1,1);
          box-shadow: 0 0 5px black;
        }
        .bigfont1,.bigfont2{
          font-size: 50px;
        }
        .line{
          width: 10px;
          height: 40px;
        }
      }
    }
  }
  @media only screen and (min-width: 912px) and (max-width: 1100px){
    .ebooks{
      .frontEnd,.others{
        align-items: center;
        .bigfont1,.bigfont2{
          font-size: 90px;
        }
      }
    }
  }
</style>