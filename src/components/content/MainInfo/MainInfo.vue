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

  @media screen and (min-width: 1600px) {
    .mainInfo{
      padding: 40px 1rem 0 3rem;
    }
  }
  @media screen and (min-width: 3000px) {
    .mainInfo{
      padding: 40px 1rem 0 4rem;
    }
  }
  @media screen and (min-width: 4000px) {
    .mainInfo{
      width: 55vw;
      padding: 40px 1rem 0 5rem;
    }
  }
  @media screen and (min-width: 5000px) {
    .mainInfo{
      width: 52vw;
      padding: 40px 1rem 0 8rem;
    }
  }
</style>