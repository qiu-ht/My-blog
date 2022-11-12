<template>
  <div class="mainInfo">
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
  .mainInfo{
    width: 60vw;
    padding: 40px 2rem 0;
  }
  @media screen and (min-width: 280px) and (max-width: 912px){
    .mainInfo{
      width: 100%;
      padding: 40px 0 0;
    }
  }
  @media screen and (min-width: 912px) and (max-width:1400px) {
    .mainInfo{
      width: 65vw;
      padding: 40px 1rem 0 1rem;
    }
  }
  // @media screen and (min-width:2600px) {
  //   .mainInfo{
  //     width: 45%;
  //     padding: 40px 4rem 0;
  //   }
  // }
</style>