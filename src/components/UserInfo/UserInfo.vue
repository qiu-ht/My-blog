<template>
  <div class="userInfo">
    <el-form
      :model="UserInfo"
      status-icon
      :rules="rules"
      ref="UserInfo"
      label-width="100px"
      class="demo-UserInfo"
    >
      <el-form-item class="elInput" label="用户名：" prop="username">
        <el-input v-model="UserInfo.username"></el-input>
      </el-form-item>
      <el-form-item class="elInput" label="旧密码：" prop="oldPassword">
        <el-input
          type="password"
          v-model="UserInfo.oldPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="elInput" label="新密码：" prop="newPassword">
        <el-input
          type="password"
          v-model="UserInfo.newPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <span>换头像：</span>
      <div class="CoverImg">
        <input type="file" @change="uploadImg($event)" />
        <span v-show="!UserInfo.avatar" class="uploadWord">上传头像</span>
        <i class="iconfont icon-tianjia" v-show="!UserInfo.avatar"></i>
        <img :src="UserInfo.avatar" alt="" v-show="UserInfo.avatar" />
      </div>
      <span class="copyUrlTip">或者复制图片链接：</span>
      <el-form-item class="elInput">
        <el-input class="inputURL" v-model="UserInfo.avatar" />
      </el-form-item>

      <el-form-item class="btns">
        <el-button type="primary" @click="submitForm('UserInfo')"
          >提交</el-button
        >
        <el-button type="primary" @click="resetForm('UserInfo')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    const checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (value !== this.$store.state.user.username) {
        this.$api.user.checkRepetition({ username: value }).then((res) => {
          if (res.data === "用户名已存在！") {
            return callback(new Error(res.data));
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    };
    const validateOldPass = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const params = {
          username: this.$store.state.user.username,
          password: value,
        };
        const res = await this.$api.user.checkPassword(params);
        if (res.data === "密码错误！") {
          callback(new Error("密码错误"));
        } else if (res.data === "密码正确！") {
          callback();
        } else {
          this.$message.error("服务器错误！");
          callback(new Error("服务器错误，请刷新重试"));
        }
      }
    };
    const validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      UserInfo: {
        oldPassword: "",
        newPassword: "",
        username: "",
        avatar: "",
      },
      showUserInfo: false,
      rules: {
        oldPassword: [{ validator: validateOldPass, trigger: "blur" }],
        newPassword: [{ validator: validateNewPass, trigger: "blur" }],
        username: [{ validator: checkusername, trigger: "blur" }],
      },
      tip: "",
      checkUserInfoSuccess: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newInfo = {
            username: this.UserInfo.username,
            password: this.UserInfo.newPassword,
            avatar: this.UserInfo.avatar,
          };
          this.$api.user.updateUserInfo(newInfo).then((res) => {
            if (res.data === "修改成功！") {
              this.$message.success("修改成功！请重新登陆~");
              this.$store.dispatch("quitLogin");
              this.$router.push({ path: "/login" });
            } else {
              this.$message.error("出错了！");
            }
          });
        } else {
          this.$message.error("提交失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async uploadImg(e) {
      const files = e.target.files;
      if (files && files[0]) {
        if (this.UserInfo.avatar.indexOf("url") !== -1) {
          const url = this.UserInfo.avatar.split("url=")[1].split("&")[0];
          await this.$api.file.deleteImage({ url: url });
        }
        const res = await this.$api.file.uploadImage(files[0], "userAvatar");
        console.log(res.data);
        this.UserInfo.avatar = res.data.url;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.UserInfo.username = this.$store.state.user.username;
      this.UserInfo.avatar = this.$store.state.user.avatar;
    }, 500);
  },
};
</script>

<style lang="less" scoped>
.userInfo {
  background-color: #fff;
  width: 600px;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  // bottom: 0;
  top: 70px;
  margin: auto;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  // position: relative;
  z-index: 111;
  .el-form-item {
    width: 90%;
  }
  .demo-UserInfo {
    /deep/ .el-form-item__label {
      text-align: left;
      padding-right: 0;
      width: auto !important;
    }
    .elInput {
      display: flex;
      justify-content: left;
      width: 95%;
      /deep/ .el-form-item__content {
        margin-left: 50px !important;
        display: flex;
        flex: 1;
      }
    }
    .inputURL {
      margin-left: 50px;
    }

    .btns {
      width: 100%;
      margin-bottom: 0;
      margin-top: 20px;
      /deep/ .el-form-item__content {
        display: flex;
        justify-content: space-between;
        // width: 100%;
        margin-left: 0 !important;
      }
    }

    span {
      color: #606266;
      display: inline-block;
      box-sizing: border-box;
      line-height: 20px;
      text-align: left;
    }
    .copyUrlTip {
      margin-left: 100px;
      margin-bottom: 22px;
      width: 60%;
    }
  }
  .CoverImg {
    height: 200px;
    width: 200px;
    background-color: #fff;
    color: rgb(187, 187, 187);
    text-align: center;
    margin-top: -20px;
    border-radius: 5px;
    position: relative;
    border: 1px dashed rgb(129, 129, 129);
    margin-left: 105px;
    margin-bottom: 22px;
    input {
      height: 200px;
      width: 200px;
      position: absolute;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    img {
      height: 200px;
      width: 200px;
    }
    .icon-tianjia {
      line-height: 200px;
    }
  }
}

@media screen and (min-width: 280px) and (max-width: 912px) {
  .userInfo {
    width: 90%;
    padding: 40px 20px 20px;
    .CoverImg {
      height: 120px;
      width: 120px;
      input {
        width: 120px;
        height: 120px;
      }
      img {
        height: 120px;
        width: 120px;
      }
    }
    .demo-UserInfo {
      .elInput {
        /deep/ .el-form-item__content {
          margin-left: 20px !important;
          display: flex;
          flex: 1;
        }
      }
      .copyUrlTip {
      margin-left: 75px;
    }
    }
    .CoverImg{
      margin-left:75px;
    }
  }
}
</style>