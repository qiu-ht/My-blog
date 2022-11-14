<template>
  <div class="login">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="注册" name="first">
        <el-form
          :model="register"
          status-icon
          :rules="rules"
          ref="register"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="register.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="register.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('register')"
              >注册</el-button
            >
            <el-button type="primary" @click="resetForm('register')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="登录" name="second">
        <el-form
          :model="login"
          status-icon
          :rules="rules"
          ref="login"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="loginUsername">
            <el-input
              v-model="login.loginUsername"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="loginPassword">
            <el-input
              placeholder="请输入密码"
              v-model="login.loginPassword"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitLogin('login')"
              >登录</el-button
            >
            <el-button type="primary" @click="resetForm('login')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    var checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      this.$api.user.checkRepetition({ username: value }).then((res) => {
        if (res.data === "用户名已存在！") {
          return callback(new Error(res.data));
        } else {
          callback();
        }
      });
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.register.checkPass !== "") {
          this.$refs.register.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.register.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkLoginUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      this.$api.user.checkRepetition({ username: value }).then((res) => {
        if (res.data === "用户名未注册！") {
          return callback(new Error(res.data));
        } else {
          callback();
        }
      });
    };
    var checkLoginPasswordEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var checkLoginPassword = (rule, value, callback) => {
      if (this.login.loginUsername) {
        const user = {
          username: this.login.loginUsername,
          password: this.login.loginPassword,
        };
        this.$api.user.login(user).then((res) => {
          if (res.data === "密码错误！") {
            callback(new Error(res.data));
          } else if (res.status === 200) {
            this.$message({
              message: "登录成功！",
              type: "success",
            });
            const dateNow = Date.now() + 7 * 24 * 3600 * 1000;
            const date = new Date(dateNow)
            document.cookie = `blog_token=${res.data.token};Expires=${date.toGMTString()};path=/`;
            this.$store.state.user = res.data;
            callback();
          } else {
            this.$message.error("登录失败！请重新登录~");
          }
        });
      }
    };
    return {
      activeName: "second",
      register: {
        pass: "",
        checkPass: "",
        username: "",
      },
      login: {
        loginUsername: "",
        loginPassword: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkusername, trigger: "blur" }],
        loginUsername: [{ validator: checkLoginUsername, trigger: "blur" }],
        loginPassword: [
          { validator: checkLoginPasswordEmpty, trigger: "blur" },
          { validator: checkLoginPassword, trigger: this.submitLogin },
        ],
      },

      //图片链接
      imageUrl: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this[formName];
          const user = {
            username: form.username,
            password: form.pass,
          };
          this.$api.user.register(user).then((res) => {
            alert(res.data);
          });
        } else {
          this.$message.error("提交失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (formName === "register") {
        this.register = {
          pass: "",
          checkPass: "",
          username: "",
        };
      } else if (formName === "login") {
        this.login = { loginUsername: "", loginPassword: "" };
      }
    },
    submitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.error("提交失败！");
          return false;
        } else if (valid) {
          this.$router.push({ path: "/" });
        }
      });
    },
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang='less' >
.login {
  width: 400px;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  box-shadow: 0 0 2px black;
  z-index: 10;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
@media screen and (min-width: 280px) and (max-width: 912px) {
  .login {
    width: 90%;
  }
}
</style>