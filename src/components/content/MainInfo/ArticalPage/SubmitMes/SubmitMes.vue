<template>
  <div class="submitMes">
    <img
      :src="
        this.$store.state.user.avatar ||
        'http://121.40.176.121:8888/down/4ytYDk4zQCYh'
      "
      alt="用户头像"
      class="avatar"
    />
    <el-form :model="LeaveMes" :rules="rules" class="form" ref="LeaveMes">
      <el-form-item label="" prop="mes" >
        <el-input
          type="textarea"
          v-model="LeaveMes.mes"
          resize="none"
          rows="6"
          class="submitInput"
          placeholder="请输入留言内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitMes('LeaveMes')"
          class="submitBtn"
          :loading="submiting"
          >发表</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "SubmitMes",
  props:['blogTitle'],
  data() {
    var submitMes = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("留言不能为空"));
      } else {
        callback();
      }
    };
    return {
      submiting:false,//是否正在提交
      LeaveMes: {
        mes: "",
      },
      rules: {
        mes: [{ validator: submitMes, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitMes(formName) {
      this.submiting=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.$store.state.user.username) {
            this.$message.error("请先登录！");
            this.$router.push({ path: "/login" });
          } else {
            const user = this.$store.state.user;
            const comment = {
              blogTitle: this.blogTitle,
              id: Number(
                Math.random().toString().substr(3, 10) + Date.now()
              ).toString(36),
              username: user.username,
              avatar: user.avatar,
              content: this.LeaveMes.mes,
              publishDate: dayjs().format("YYYY-MM-DD HH:mm"),
            };

            this.$api.leaveMes.submitMes(comment).then((res) => {
              if (res.data === "评论成功！") {
                this.$message({
                  message: "提交成功！",
                  type: "success",
                });
                this.LeaveMes.mes = "";
                const params = {
                  blogTitle: this.blogTitle,
                  limit: 10,
                  skip: 0,
                };
                this.$store.dispatch("getArticalMes", params);
                this.submiting=false
                this.$bus.$emit('restoreNomoreMes')
              } else {
                this.$message.error("提交失败！请稍后重试或联系管理员");
                this.submiting=false
              }
            });
          }
        } else {
          this.$message.error('提交失败！')
          this.submiting=false
          return false;
        }
      });
    },
  },
  computed: {
    publishDate() {
      return dayjs(this.$store.state.theArtical.publishDate).format(
        "YYYY-MM-DD"
      );
    },
  },
};
</script>

<style scoped lang='less'>
  .submitMes {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    .avatar{
      width: 50px;
      height: 50px;
      display: inline-block;
      margin-top: 2px;
      margin-right: 10px;
      // box-shadow: 0 0 3px black;
      // border: 1px solid rgb(101, 156, 240);
      padding: 2px;
    }
    .form{
      // display: inline-block;
      width: 85%;

    }
    .el-form-item{
      margin: 0;
    }
    .submitInput{
      display: inline-block;
      
    }
    .submitBtn{
      float:right;
      margin-top: 20px;
    }
    
  }
  @media screen and (min-width: 280px) and (max-width: 912px) {
    .submitMes{
      .avatar{
        width: 40px;
        height: 40px;
      }
    }
  }
</style>