<template>
  <div class="content">
    <router-view name="leftInfo"></router-view>
    <router-view name="mainInfo"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
  components: {},
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.messageBoard {
  height: 1000px;
  width: 51vw;
  position: absolute;
  top: 3300px;
  left: calc(~"35% + 6px");
  background-color: rgba(230, 228, 228, 0.5);
  padding: 10px 30px;
  border-radius: 10px;
  box-shadow: 0 0 5px black;
  .title {
    font-size: 30px;
    color: rgb(94, 94, 94);
    display: block;
    text-align: center;
    // margin-top: 80px;
  }
}
.leaveMes {
  width: calc(~"52% - 2px");
  height: 1200px;
  position: absolute;
  top: 1900px;
  left: calc(~"35% + 6px");
  margin-top: 20px;
  box-shadow: 0 0 5px black;
  border-radius: 10px;
  background-color: rgba(230, 228, 228, 0.6);
  padding: 40px 30px 70px;
  .line {
    margin: 20px 0 50px;
    background-color: white;
  }
  .el-divider__text {
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    border-radius: 5px;
  }
}
@media only screen and (min-width: 280px) and (max-width: 912px) {
  .content {
    padding-top: 0;
  }
  .messageBoard {
    height: 630px;
    width: 90%;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 100px;
    padding: 0;
    .title {
      font-size: 22px;
    }
  }
  .leaveMes {
    width: calc(~"90% - 10px");
    height: 1300px;
    position: absolute;
    top: 1250px;
    left: 0;
    right: 0;
    margin: 20px auto 0;
    padding: 5px 5px 5px;
    .el-divider__text {
      height: 25px;
      font-size: 15px;
      line-height: 25px;
    }
    .line {
      margin: 50px 0 40px;
    }
  }
}
</style>