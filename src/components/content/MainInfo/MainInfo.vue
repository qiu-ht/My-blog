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
    width: 70%;
    padding-top: 40px;
  }
  @media screen and (min-width: 280px) and (max-width: 912px){
    .mainInfo{
      width: 100%;
    }
  }
</style>