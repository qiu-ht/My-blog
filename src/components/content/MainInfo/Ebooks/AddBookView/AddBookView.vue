<template>
  <div class="addBookView">
    <div class="back"><i class="iconfont icon-back" @click="back"></i></div>
    <div class="formData">
      <input type="text" placeholder="书名" v-model="name" /><br />
      <input
        type="text"
        placeholder="下载地址"
        v-model="downloadAddress"
      /><br />
      <input
        type="text"
        placeholder="公众号验证码"
        v-model="verificationCode"
      /><br />
      <input type="text" placeholder="提取密码" v-model="password" /><br />
      <select name="booktype" id="booktype" v-model="booktype">
        <option value="frontend">前端</option>
        <option value="others">其他</option>
      </select>
      <br />
      <input
        type="file"
        id="uploadfile"
        accept=".png,.jpg,.jpeg"
        @change="uploadfile"
      /><br />
      <div id="output"></div>
      <div id="progress"></div>
      <button class="add" @click="addbook">添加</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name:'AddBookView',
  data() {
    return {
      name: "",
      downloadAddress: "",
      verificationCode: "",
      password: "",
      firstpage: "",
      booktype: "",
    };
  },
  methods: {
    uploadfile(ev) {
      const event = ev || window.event;
      const files = event.target.files,
        output = document.getElementById("output"),
        progress = document.getElementById("progress"),
        reader = new FileReader();
      if (/image/.test(files[0].type)) {
        reader.readAsDataURL(files[0]);
      }
      reader.onerror = function () {
        output.innerHTML =
          "Could not read file,error code is " + reader.error.code;
      };
      reader.onprogress = function (ev) {
        const event = ev || window.event;
        if (event.lengthComputable) {
          progress.innerHTML = `${event.loaded}/${event.total}`;
        }
      };
      const that = this
      reader.onload = function () {
        let html = `<img src="${reader.result}">`;
        that.dealImage(reader.result,500,(imgbase64)=>{
          that.saveImg(imgbase64)
          
        })
        output.innerHTML = html;
      };
    },
    saveImg(imgbase64){
      this.firstpage = imgbase64
    },
    addbook() {
      const book = {
        name: this.name,
        firstpage: this.firstpage,
        downloadAddress: this.downloadAddress,
        verificationCode: this.verificationCode,
        password: this.password,
      };
      const params = {
        booktype: this.booktype,
      };

      axios({
        method: "post",
        url: "http://taogezhenshuai.fun:3002/ebook",
        data: Qs.stringify(book),
        params: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res)=>{
        alert(res.data)
        if(res.data==='添加成功！'){
          this.name=''
          this.downloadAddress=''
          this.verificationCode=''
          this.password=''
          this.firstpage=''
          this.booktype=''
          
        }
      });
      const fileinput = document.getElementById('uploadfile')
      fileinput.value=''

    },
    dealImage(base64, w, callback) {
      var newImage = new Image();
      var quality = 0.6; //压缩系数0-1之间
      newImage.src = base64;
      newImage.setAttribute("crossOrigin", "Anonymous"); //url为外域时需要
      var imgWidth, imgHeight;
      newImage.onload = function () {
        imgWidth = this.width;
        imgHeight = this.height;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w;
            canvas.height = (w * imgHeight) / imgWidth;
          } else {
            canvas.height = w;
            canvas.width = (w * imgWidth) / imgHeight;
          }
        } else {
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          quality = 0.6;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句

        callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
      };
    },
    back(){
      this.$router.back()
    }
  },
};
</script>

<style lang="less" scope>
.addBookView {
  position: relative;
  background-color: #6BCFF7;
  margin: 0 auto;
  // opacity: 0.5;
  box-shadow: 0 0 5px black;
  width: 90%;
  cursor: auto;
  height: 700px;
  border-radius: 10px;
  color: #607580;
  overflow: hidden;
  .back{
    position: absolute;
    top: 40px;
    left: 50px;
    i{
      font-size: 30px;
      cursor: pointer;
      &:hover{
        color: #3879da;
      }
    }
  }
  .formData {
    // position: absolute;
    width: 300px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:80px auto;
  }
  input {
    // position: absolute;
    width: 300px;
    height: 30px;
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    text-indent: 1em;
    &:focus {
      outline: none;
    }
  }
  input:last-of-type {
    text-indent: 0;
  }
  #output {
    img {
      height: 100px;
    }
  }
  #booktype {
    border: none;
    background-color: white;
    width: 100px;
    height: 25px;
    margin-top: 30px;
    border-radius: 5px;
  }
  .add {
    width: 100px;
    height: 30px;
    margin: 40px auto 0 ;
    border-radius: 5px;
    border: none;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #6fbaf7;
      color: #fff;
    }
  }
}
</style>