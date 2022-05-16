<template>
    <div class="userInfo" >
        <el-form :model="UserInfo" status-icon :rules="rules" ref="UserInfo" label-width="100px" class="demo-UserInfo">
        <el-form-item label="用户名" prop="username" >
            <el-input v-model="UserInfo.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="UserInfo.password"  autocomplete="off"></el-input>
        </el-form-item>
        <span>{{tip}}</span>

        <div class="CoverImg">
            <input type="file" @change="uploadImg($event)" >
            <span v-show="!UserInfo.avatar" class="uploadWord">上传头像</span>
            <i class="iconfont icon-tianjia" v-show="!UserInfo.avatar"></i>
            <img :src="UserInfo.avatar" alt="" v-show="UserInfo.avatar">
        </div>
        <span class="copyUrlTip">或者复制图片链接：</span>
        <input type="text" class="inputURL" v-model="UserInfo.avatar" >
        <el-form-item>
            <el-button type="primary" @click="submitForm('UserInfo')">提交</el-button>
            <el-button type="primary" @click="resetForm('UserInfo')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>

  export default {
    data() {
        var checkusername = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('用户名不能为空'));
        }
        if(value!==this.$store.state.user.username){
            this.$api.user.checkRepetition({username:value})
            .then(res=>{
                if(res.data==="用户名已存在！"){
                return callback(new Error(res.data))
                }else{
                callback()
                }
            })
        }else{
            callback()
        }
        
        };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.UserInfo.checkPass !== '') {
            this.$refs.UserInfo.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        UserInfo: {
          password: '',
          username: '',
          avatar: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkusername, trigger: 'blur' }
          ],
        },
        tip:'',
        checkUserInfoSuccess:false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.user.updateUserInfo(this.UserInfo).then(
                res=>{
                    if(res.data==="修改成功！"){
                        this.$message.success('修改成功！')
                        this.$store.state.user=[]
                        this.deleteToken()
                    }else{
                        this.$message.error('出错了！')
                    }
                }
            )
          } else {
            this.$message.error('提交失败！')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async uploadImg(e){
            const files = e.target.files;
            if(files && files[0]) {
                if(this.UserInfo.avatar.indexOf('url')!==-1){
                    const url = this.UserInfo.avatar.split('url=')[1].split('&')[0]
                    const res = await this.$api.file.deleteImage({url:url})
                    console.log(res.data);
                }
                const res = await this.$api.file.uploadImage(files[0],'userAvatar')
                console.log(res.data);
                this.UserInfo.avatar = res.data.url
                
            }   
            
        },
        deleteToken(){
            const expire  = new Date();
            expire.setTime(expire.getTime() - 1);
            document.cookie="token=;expires="+expire.toGMTString()+";path=/";
            this.$router.push('/login')
        }
    },
    mounted(){
        this.$prompt('请输入密码', '身份验证', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal:false,
            showCancelButton:false,
            showClose:false
        }).then(async({ value }) => {
            const params = {
            username:this.$store.state.user.username,
            password:value
            }
            const res = await this.$api.user.checkPassword(params)
            if(res.data==='密码错误！'){
            this.$message.error('密码错误！')
            this.$router.push({path:'/'})
            }else if(res.data==="密码正确！"){
                this.$message({
                    type: 'success',
                    message: '验证成功！'
                })
                this.checkUserInfoSuccess=true

            }else {
              this.$message.error('服务器错误！')
              this.$router.push({path:'/'})
            }
            
        })
        setTimeout(()=>{
            this.UserInfo.username = this.$store.state.user.username
            this.UserInfo.avatar = this.$store.state.user.avatar
        },500)
    }
  }
</script>

<style lang="less" scoped>
    .userInfo{
        background-color: #fff;
        width: 600px;
        height: 600px;
        margin: 0 auto;
        padding: 50px;
        top: 100px;
        box-sizing: border-box;
        border-radius: 10px;
        position: relative;
        z-index: 111;
        .el-form-item{
            width: 80%;
        }
        .CoverImg{
            height: 200px;
            width: 200px;
            background-color: #fff;
            color: rgb(187, 187, 187);
            text-align: center;
            margin-top: 30px;
            border-radius: 5px;
            position: relative;
            border: 1px dashed rgb(129, 129, 129);
            margin-left: 100px;
            input{
                height: 200px;
                width: 200px;
                position: absolute;
                left: 0;
                opacity: 0;
                cursor: pointer;
                
            }
            img{
                height: 200px;
                width: 200px;
                
            }
            .icon-tianjia{
                line-height: 200px;
                
            }
        }
        .copyUrlTip{
            color: rgb(77, 77, 77);
            display: inline-block;
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: 100px;
        }
        .inputURL{
            display: block;
            width: 300px;
            border: 1px solid #ccc;
            height: 30px;
            border-radius: 5px;
            margin-left: 100px;
            margin-bottom: 30px;
            &:focus{
                outline: none;
            }
        }
    }

    @media screen and (min-width: 280px) and (max-width:912px) {
      .userInfo{
        width: 90%;
        height: 500px;
        padding:55px 10px;
        .CoverImg{
          height: 120px;
          width: 120px;
          input{
            width: 120px;
            height: 120px;
          }
          img{
            height: 120px;
            width: 120px;
          }
        }
        .inputURL{
          width: 50%;
        }
      }
    }
</style>