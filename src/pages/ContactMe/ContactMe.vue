<template>
  <div class="w3l-submain">
    <form action="http://taogezhenshuai.fun:3002/question" method="post">
      <div class="contact-agile">
        <h1>联系我们</h1>
        <label>昵称</label>
        <input type="text" name="nickname" placeholder="Thomson" v-model="nickname" required />
        <label>E-MAIL</label>
        <input
          type="email"
          name="email"
          placeholder="info@example.com"
          v-model="email"
          required
        />
        <label>消息</label>
        <textarea
          name="content"
          placeholder="在这输入消息....."
          v-model="content"
          required
        ></textarea>
      </div>
      <div class="send-button w3layouts">
        <input type="button" @click="sendQuestion" value="发 送" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactMe",
  data() {
    return {
      nickname:"",
      email:"",
      content:""
    };
  },
  methods:{
    sendQuestion(){
      const data = {
        nickname:this.nickname,
        email:this.email,
        content:this.content
      }
      this.$api.question.sendQuestion(data).then(value => {
        if(value.data === "昵称已存在！"){
          alert("昵称已存在！")
        }else{
          this.$message({
            message: "发送成功！",
            type: "success",
          });
          this.$router.push("/")
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // ...
    document.documentElement.scrollTop = 0
    next()
  }
};
</script>

<style scoped lang="less">
/*--main--*/
.contact-agile {
  text-align: left;
  float: left;
  width: 66%;
  background: #fff;
  padding: 1em 14em 2em 3em;
  position: relative;
  margin-bottom: 2em;
  z-index: 10;
}
.w3l-submain {
  width: 50%;
  margin: 0 auto;
  margin-top: -450px;
}
.contact-agile label {
  color: #000;
  font-size: 1em;
  font-family: "Nunito", sans-serif;
}
.contact-agile label {
  color: #000;
  font-size: 1em;
  width: 100%;
  display: inline-block;
}
.contact-agile input[type="text"],
.contact-agile input[type="email"],
.contact-agile textarea {
  outline: none;
  font-size: 1em;
  color: #969696;
  padding: 10px 0px 6px 0px;
  width: 94%;
  border: none;
  font-family: "Nunito", sans-serif;
  border-bottom: 2px solid #cecfd3;
  -webkit-appearance: none;
  margin: 2px 0px 31px;
  background: #fff;
}
input[type="button"] {
  padding: 1em 0em;
  color: #fff;
  font-size: 1em;
  border: none;
  outline: none;
  font-family: "Nunito", sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 1em;
  background: rgb(81, 124, 232);
  cursor: pointer;
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -o-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -ms-transition: 0.5s all;
  margin: 0 auto;
  display: block;
  width: 35%;
}
input[type="submit"]:hover {
  background: rgb(70, 110, 213);
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -o-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -ms-transition: 0.5s all;
}
.footer-w3l a {
  color: rgb(81, 124, 232);
}
.footer-w3l a:hover {
  color: #fff;
  text-decoration: underline;
}
/*--//footer--*/

@media (max-width: 1440px) {
  .w3l-submain {
    width: 59%;
  }
}
@media (max-width: 1366px) {
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    width: 92%;
  }
}
@media (max-width: 1280px) {
  .w3l-submain {
    width: 62%;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    width: 94%;
  }
  .w3l-submain {
    width: 63%;
  }
}
@media (max-width: 1024px) {
  .w3l-submain {
    width: 72%;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    margin: 2px 0px 24px;
  }
  .contact-agile {
    width: 61%;
  }
  .w3l-submain {
    margin-top: 1.8em;
  }
}
@media (max-width: 991px) {
  .contact-agile {
    width: 58%;
  }
  input[type="submit"] {
    padding: 0.9em 0em;
    width: 32%;
  }
}
@media (max-width: 800px) {
  .contact-agile label {
    font-size: 0.95em;
  }
  .w3l-submain {
    width: 80%;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    margin: 2px 0px 21px;
    padding: 9px 0px 5px 0px;
    width: 87%;
  }
  input[type="submit"] {
    padding: 0.8em 0em;
    width: 31%;
  }
  .contact-agile {
    margin-bottom: 1.9em;
  }
}
@media (max-width: 768px) {
  .w3l-submain {
    margin-top: 3.5em;
    width: 85%;
  }
  .contact-agile {
    margin-bottom: 3em;
    width: 56%;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    margin: 2px 0px 30px;
    padding: 11px 0px 7px 0px;
  }
  input[type="submit"] {
    padding: 0.9em 0em;
    width: 37%;
  }
}
@media (max-width: 736px) {
  .w3l-submain {
    margin-top: 1.5em;
    width: 89%;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    margin: 2px 0px 21px;
    padding: 9px 0px 6px 0px;
  }
  .contact-agile {
    margin-bottom: 1.8em;
    width: 55%;
  }
  input[type="submit"] {
    padding: 0.85em 0em;
    width: 34%;
  }
}
@media (max-width: 667px) {
  .contact-agile {
    width: 52%;
    padding: 1em 13em 2em 3em;
  }
  input[type="submit"] {
    padding: 0.8em 0em;
    width: 35%;
  }
}
@media (max-width: 640px) {
  .contact-agile {
    width: 46%;
    padding: 1em 14.5em 2em 3em;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    width: 96%;
  }
}
@media (max-width: 600px) {
  .w3l-submain {
    margin-top: 1.4em;
    width: 89%;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    font-size: 0.9em;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    width: 100%;
  }
  .contact-agile {
    width: 47%;
    padding: 1em 14.5em 2em 2em;
  }
}
@media (max-width: 568px) {
  .contact-agile {
    padding: 1em 14.5em 2em 2em;
  }
  .contact-agile {
    margin-bottom: 1.3em;
  }
}
@media (max-width: 480px) {
  .w3l-submain {
    width: 90%;
  }
  .contact-agile {
    width: 38%;
  }
  .w3l-submain {
    margin-top: 1.2em;
    width: 89%;
  }
  .contact-agile {
    margin-bottom: 9em;
    padding: 1em 3.5em 2em 2em;
    width: 79%;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    width: 100%;
  }
}
@media (max-width: 414px) {
  .w3l-submain {
    margin-top: 1.5em;
    width: 91%;
  }
  .contact-agile label {
    font-size: 0.9em;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    font-size: 0.85em;
  }
  .contact-agile {
    margin-bottom: 8.5em;
    padding: 1em 2em 2em 2em;
    width: 82.2%;
  }
  input[type="submit"] {
    padding: 0.7em 0em;
    width: 41%;
    letter-spacing: 1px;
    font-size: 0.9em;
  }
}
@media (max-width: 384px) {
  .w3l-submain {
    margin-top: 1.1em;
  }
  .contact-agile {
    margin-bottom: 8.5em;
    padding: 1em 1.5em 2em 1.5em;
    width: 85.5%;
  }
}
@media (max-width: 375px) {
}
@media (max-width: 320px) {
  .contact-agile label {
    font-size: 0.85em;
  }
  .contact-agile input[type="text"],
  .contact-agile input[type="email"],
  .contact-agile textarea {
    font-size: 0.8em;
    margin: 2px 0px 16px;
    padding: 8px 0px 6px 0px;
  }
  .contact-agile {
    margin-bottom: 7.7em;
    width: 82.5%;
  }
  input[type="submit"] {
    padding: 0.7em 0em;
    width: 50%;
    letter-spacing: 0px;
    font-size: 0.85em;
  }
}
</style>