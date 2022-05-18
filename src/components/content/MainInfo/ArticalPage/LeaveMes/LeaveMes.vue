<template>
  <div class="leavemes" v-show="this.$store.state.leaveMesShow">
    <div
      :class="'onemes onemes' + index"
      v-for="(onemes, index) in leaveMes"
      :key="index"
    >
      <div class="avatar">
        <img
          :src="onemes.avatar ? onemes.avatar : '/image/icon/avatar.png'"
          alt=""
        />
      </div>
      <div class="info">
        <span class="username">{{ onemes.username }}</span>
        <div :class="'mesContent mesContent' + index">
          {{ onemes.content }}
        </div>
        <BottomInfo
          :onemes="onemes"
          :commentID="onemes._id"
          :praise="praise"
          from="comment"
        />

        <div
          class="replyMes"
          v-for="(oneReply, index1) in showmoreID.includes(onemes._id)?replies[onemes._id]:(replies[onemes._id] instanceof Array?replies[onemes._id].slice(0,2):[])"
          :key="index1"
        >
          <div class="replyAvatar">
            <img :src="oneReply.initiatorAvatar" alt="" />
          </div>
          <div class="replyInfo">
            <div class="mainContent">
              <span class="UserNameInReply">
                {{ oneReply.initiatorName }}
              </span>
              <span class="replyContent">
                <span v-if="!oneReply.toComment">回复
                <a href="javascript:;" :class="oneReply.acceptorName===oneReply.initiatorName?'acceptorName1':'acceptorName'">@{{ oneReply.acceptorName }}</a>
                </span>
                : {{oneReply.content}}
              </span>
            </div>

            <BottomInfo
              :onemes="oneReply"
              :commentID="onemes._id"
              :praise="praise"
              from="reply"
            />
          </div>
        </div>
        <div class="replyBottomText" v-if="(replyCount[onemes._id]>2?true:false) && (showmoreID.includes(onemes._id)?(!showmoreclick):true)">
          <span>共{{replyCount[onemes._id]}}条回复，</span>
          <a href="javascript:;" @click="showmore(onemes._id)">点击查看</a>
        </div>
        <div class="replyBottomText" v-if="showmoreclick&&showmoreID.includes(onemes._id)">
          <Pagination v-if="replyPageCount(onemes._id)>1?true:false" :pageCount="replyPageCount(onemes._id)" @changePage="changeReplyPage" class="pageTurning"/>
          <a href="javascript:;" @click="hideList(onemes._id)">点击收起</a>
        </div>
        <div
          v-if="CurcommentID === onemes._id ? showReplyInput : false"
          class="replyChunk"
        >
          <div class="replyAvatar">
            <img
              :src="avatar || 'http://121.40.176.121:8888/down/4ytYDk4zQCYh'"
              alt=""
            />
          </div>
          <el-form :model="replyMes" :rules="rules" class="form" ref="replyMes">
            <el-form-item class="el-form-item1" prop="mes">
              <!-- <div class="replyInput"> -->
              <el-input
                class="input"
                v-model="replyMes.mes"
                resize="none"
                rows="2"
                type="textarea"
                :placeholder="'回复：@' + acceptorName"
              ></el-input>
              <!-- </div> -->
            </el-form-item>
            <el-form-item class="el-form-item2">
              <el-button
                type="primary"
                class="submitReply"
                @click="submitReply('replyMes')"
                :loading="submiting.includes(onemes._id)?true:false"
                >提交</el-button
              >
            </el-form-item>
            
          </el-form>
        </div>
      </div>
    </div>
    <div class="nomoreMes">{{nomoreMes?'没有更多内容':"正在加载中..."}}</div>
  </div>
</template>

<script>
import BottomInfo from "./Bottom_Info/Bottom_Info.vue";
import Pagination from '../../../Pagination/Pagination.vue'
export default {
  name: "LeaveMes",
  props:['blogTitle'],
  components: { BottomInfo,Pagination },
  data() {
    //element组件的内容
    var submitReply = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("消息不能为空"));
      } else {
        callback();
      }
    };
    return {
      height: 0,
      leaveMesShow: true,
      
      praise: [],//已点赞的commentID集合

      CurID: "",//点击回复的当前留言或回复id
      CurcommentID:'',//点击回复的当前留言id
      showmoreID:[],//当前展开的commentid
      showReplyInput: false,//是否显示回复框
      acceptorName:'',//回复的接受者
      CurReplycommentID:'',

      showmoreclick:false,//是否点击了查看

      CurReplyPageIndex:1,

      scollTop:0,

      submiting:[],//是否正在提交
      loadTimes:0,//用户滚动触底触发加载次数

      nomoreMes:false,//是否到底

      replyClass:'',
      //回复的内容
      replyMes: {
        mes: "",
      },
      //element组件的内容
      rules: {
        mes: [{ validator: submitReply, trigger: "blur" }],
      },
    };
  },
  methods: {
    //删除当前留言
    deleteMes(id,commentID,from) {
      this.$confirm("是否删除此留言/回复?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        if(from==="comment"){
          let res = await this.$api.leaveMes.deleteMes({ commentID: commentID })
          if (res.data === "删除成功！") {
            this.Success("删除成功！")
            const params = {
              blogTitle: this.blogTitle,
              limit: 10,
              skip: 0,
            };
            this.$store.dispatch("getArticalMes", params);
          } else {
            this.$message.error("删除失败！请稍后重试~");
          }
        }else if(from==="reply"){
          let res = await this.$api.leaveMes.deleteReply({id:id})
          if(res.data){
            this.Success("删除成功！")
            this.refreshReply(commentID)
            
          }
        }
        
      });
    },
    likeChange(id,from) {

      let restoreIndex =async (res) => {
        if(res.data.publishDate){
          const res1 = await this.$api.leaveMes.getOneMes({commentID:res.data._id})
          this.findByIdAndUpdate(this.$store.state.leaveMes,res1.data._id,res1.data)
        }else if(res.data.replyTime){
          const res1 =await this.$api.leaveMes.getOneReply({_id:res.data._id})
          this.findByIdAndUpdate(this.$store.state.replies[res1.data.commentID],res1.data._id,res1.data)
        }
        this.$store.state.leaveMesShow = false;
        this.$store.state.leaveMesShow = true;
      };
      if (this.praise.includes(id)) {
        this.deleteOneInArray(this.praise,id)
        const params = {
          id: id,
          from:from
        };

        this.$api.leaveMes.cancelpraise(params).then(restoreIndex);  
      } else if (!this.praise.includes(id)) {
        if (this.$store.state.user.username) {
          this.praise.push(id);
          const body = {
            userID: this.$store.state.user._id,
            id: id,
            blogTitle: this.blogTitle,
            from:from
          };
          this.$api.leaveMes.praise(body).then(restoreIndex);
        } else if (!this.$store.state.user.username) {
          this.$message.error("请先登录！");
          this.$router.push({ path: "/login" });
        }
      }
    },
    async articalChange(blogTitle) {
      this.$store.state.leaveMes = [];
      const params = {
        blogTitle: blogTitle,
        limit: 10,
        skip: 0
      };
      this.$store.dispatch("getArticalMes", params);
      const params1 = {
        blogTitle: blogTitle,
      };
      const res = await this.$api.leaveMes.getUser_comment(params1)
      if(res.data.length>0){
        for(let i=0,length=res.data.length;i<length;i++){
          if (!this.praise.includes(res.data[i].comment)) {
            this.praise.push(res.data[i].comment);
          }
        }
      }
    },
    reply(id,acceptorName,commentID) {
      if(id===commentID){
        this.replyClass="comment"
      }else{
        this.replyClass="reply"
      }
      this.UserLoginTest(()=>{
        if (this.CurID !== id) {
          this.showReplyInput = false;
        }
        
        this.acceptorName=acceptorName

        this.CurID = id;
        this.CurcommentID=commentID
        this.showReplyInput = !this.showReplyInput;
      })
    },
    submitReply(formName) {
      this.submiting.push(this.CurcommentID)
      this.$refs[formName][0].validate((valid) => {
        if (valid) {
          this.UserLoginTest(()=>{
            console.log(this.blogTitle);
            const data = {
              blogTitle: this.blogTitle,
              commentID: this.CurcommentID,
              initiatorName: this.$store.state.user.username,
              acceptorName: this.acceptorName,
              initiatorAvatar: this.$store.state.user.avatar,
              content: this.replyMes.mes,
              toComment:this.replyClass==='comment'?true:false,
              replyTime: new Date()
            };
            this.$api.leaveMes.submitReply(data).then((res) => {
              if (res.data === "提交成功！") {
                this.Success("提交成功！");
                this.replyMes.mes = "";
                this.showReplyInput = false;
                this.refreshReply(this.CurcommentID)
                this.deleteOneInArray(this.submiting,this.CurcommentID)
              }else{
                this.$message.error("提交失败！请稍后重试或联系管理员");
                this.deleteOneInArray(this.submiting,this.CurcommentID)
              }
            });
            
          })
        } else {
          this.$message.error('提交失败！')
          this.deleteOneInArray(this.submiting,this.CurcommentID)
          return false;
        }
      });
    },
    UserLoginTest(callback){
      if(!this.$store.state.user.username){
        this.$message.error("请先登录！");
        this.$router.push({ path: "/login" });
      }else{
        callback()
      }
    },
    async refreshReply(commentID){
      const params = {commentID:commentID}
      const res =await this.$api.leaveMes.getReply(params)
      const res1 = await this.$api.leaveMes.getReplyCount(params)
      this.$store.state.replies[commentID]=res.data
      this.$store.state.replyCount[commentID]=res1.data.replyCount
      this.$store.state.leaveMesShow = false;
      this.$store.state.leaveMesShow = true
    },
    async showmore(commentID){
      const params = {
        commentID:commentID,
        limit:10,
        skip:0
      }
      const res = await this.$api.leaveMes.getReply(params)
      this.$store.state.replies[commentID] = res.data;
      this.showmoreclick = true
      this.showmoreID.push(commentID)
      this.CurReplycommentID=commentID
      this.scollTop = document.documentElement.scrollTop
    },
    hideList(commentID){
      this.deleteOneInArray(this.showmoreID,commentID)
      this.$store.state.leaveMesShow=false
      this.$store.state.leaveMesShow=true

      document.documentElement.scrollTop=this.scollTop
    },
    Success(mes){
      this.$message({
        type: "success",
        message: mes,
      });
    },
    deleteOneInArray(array,item){
      let arrIndex;
        for (let i = 0, length = array.length; i < length; i++) {
          if (array[i] === item) arrIndex = i;
        }
      array.splice(arrIndex, 1);
    },
    async changeReplyPage(CurPageIndex){
      const params={
        commentID:this.CurReplycommentID,
        limit:10,
        skip:(CurPageIndex-1)*10
      }
      const res = await this.$api.leaveMes.getReply(params)
      this.$store.state.replies[this.CurReplycommentID] = res.data;
      this.showmoreclick = false
      this.showmoreclick = true
      document.documentElement.scrollTop=this.scollTop
    },
    findByIdAndUpdate(array,id,data){
      array.forEach((value,index)=>{
        if(value._id===id){
          array[index]=data
        }
      })
    }
  },
  computed: {
    adminIsLogin() {
      return this.$store.state.user.administrator;
    },
    leaveMes() {
      return this.$store.state.leaveMes;
    },
    avatar() {
      return this.$store.state.user.avatar;
    },
    replies() {
      return this.$store.state.replies;
    },
    replyCount(){
      return this.$store.state.replyCount
    },
    replyPageCount(){
      return (commentID)=>{
        const pageCount = Math.ceil(this.replyCount[commentID]/10)
        return pageCount
      }
    }
  },
  watch: {
    blogTitle(newval) {
      this.articalChange(newval);
    },
  },
  mounted() {
    this.articalChange(this.blogTitle)
    this.$bus.$on("deleteMes", (id,commentID,from) => {
      this.deleteMes(id,commentID,from);
    });
    this.$bus.$on("likeChange", (id, from) => {
      this.likeChange(id, from);
    });
    this.$bus.$on("replyComment", (id,acceptorName,commentID) => {
      this.reply(id,acceptorName,commentID);
    });
    this.$bus.$on('articalChange',(blogTitle)=>{
      this.articalChange(blogTitle)
    })
    this.$bus.$on('restoreNomoreMes',()=>{
      this.nomoreMes = false
      this.loadTimes = 0
    })
    //无限滚动
    const intersectionObserver = new IntersectionObserver(
      async (entries)=> {
        // 如果不可见，就返回
        if (entries[0].intersectionRatio <= 0) return;
        const params = {
          blogTitle:this.blogTitle,
          limit:10,
          skip:(this.loadTimes+1)*10
        }

        const res = await this.$api.leaveMes.getMes(params)
        if(res.data.length!==0){
          this.$store.state.leaveMes.push.apply(this.$store.state.leaveMes,res.data)
          res.data.forEach(async (comment)=>{
            this.$store.state.commentIDs.push(comment._id)
            const res1 = await this.$api.leaveMes.getReply({commentID:comment._id})
            const res2 = await this.$api.leaveMes.getReplyCount({commentID:comment._id})
            this.$store.state.replies[comment._id] = res1.data
            this.$store.state.replyCount[comment._id] = res2.data.replyCount
          })
          const resPraise = await this.$api.leaveMes.getUser_comment({blogTitle:this.blogTitle})
          if(resPraise.data!=="获取失败！"){
            resPraise.data.forEach((item) => {
              if (!this.praise.includes(item.comment)) {
                this.praise.push(item.comment);
              }
            });
          }

          this.$store.state.leaveMesShow=false
          this.$store.state.leaveMesShow = true
          this.loadTimes++
        }else{
          this.nomoreMes=true
        }
        
      }
    );

    // 开始观察
    intersectionObserver.observe(
      document.querySelector('.nomoreMes')
    );
  },
  beforeDestroy() {
    this.$bus.$off("deleteMes");
    this.$bus.$off("likeChange");
    this.$bus.$off("replyComment");
    this.$bus.$off('articalChange');
    this.$bus.$off('restoreNomoreMes')
  },
};
</script>

<style scoped lang='less'>
@keyframes showmes {
  from {
    display: -webkit-box;
  }
  to {
    display: block;
  }
}
.leavemes {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .onemes {
    width: 100%;
    display: flex;
    justify-content: center;
    // padding-bottom: 10px;
    padding:10px 5% 0;
    position: relative;
    .avatar {
      width: 25px;
      margin-top: 8px;
      margin-right: 25px;

      img {
        width: 35px;
        height: 35px;
        // box-shadow: 0 0 3px rgb(23, 62, 192);
        border-radius: 50%;
      }
    }
    .info {
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(209, 209, 209);
      .username {
        font-size: 14px;
        color: #79abfa;
        display: block;
        line-height: 25px;
        margin-top: 8px;
        margin-bottom: 6px;
        font-weight: bold;
      }
      .mesContent {
        color: rgb(75, 75, 75);
        margin: 0;
        font-size: 16px;
        margin-bottom: 6px;
      }
      .replyMes {
        display: flex;
        flex-wrap: wrap;
        .replyAvatar {
          margin-right: 10px;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
        }
        .replyInfo {
          width: 92%;
          margin-top: 3px;
          
          .mainContent {
            font-size: 14px;
            
            word-wrap: break-word;
            position: relative;
            .UserNameInReply {
              color: #79abfa;
              font-weight: bold;
            }
            
            .replyContent {
              color: rgb(75, 75, 75);
              font-size: 14px;
              word-wrap:break-word;
              word-break:break-all;
              .acceptorName{
                color: #9f9f9f;
                text-decoration: none;
                font-weight: bold;
              }
              .acceptorName1{
                color: #a7a7a7;
                text-decoration: none;
              }
            }
          }
        }
      }
      .replyBottomText{
        font-size: 13px;
        color: #707070;
        a{
          text-decoration: none;
          color: #707070;
          transition: 0.3s;
          &:hover{
            color: #5796fa;
          }
        }
      }
      .replyChunk {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 10px;
        margin-top: 15px;
        .replyAvatar {
          // width: 3%;
          // text-align: center;
          display: inline-block;
          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }
        .form {
          display: flex;
          justify-content: space-around;
          align-items: stretch;
          width: 90%;
          .el-form-item {
            margin: 0;
          }
          .el-form-item1 {
            width: 85%;
            .replyInput {
              width: 100%;
              .input {
                width: 100%;
              }
            }
          }
          .el-form-item2 {
            width: 10%;
            height: 100%;
            .submitReply {
              width: 100%;
              // background-color: rgb(99, 160, 240);
              // height: 100%;
            }
          }
        }
      }
    }
  }
  .nomoreMes{
    color: #a7a7a7;
    font-size: 13px;
    line-height: 80px;
  }
  @media only screen and (min-width: 280px) and (max-width: 912px) {
    .onemes {
    padding:5px 5% 0;
    .avatar {
      width: 25px;
      margin-right: 15px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .info {
      width: 100%;
      padding-bottom: 0;
      border-bottom: 1px solid rgb(209, 209, 209);
      .username {
        font-size: 14px;
        line-height: 20px;
        color: #66baff;
      }
      .mesContent {
        font-size: 15px;
      }
      .replyMes {
        // background-color: #b3ecfd;
        padding: 0 5px;
        .replyAvatar {
          margin-right: 5px;
          img {
            display: none;
          }
        }
        .replyInfo {
          width: 100%;
          margin-top: 3px;
          .mainContent {
            font-size: 14px;
            .UserNameInReply {
              color: #66baff;
            }
          }
        }
      }

      .replyChunk {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 10px;
        margin-top: 15px;
        .replyAvatar {
          display: none
        }
        .form {
          flex-wrap: wrap;
          width: 100%;
          .el-form-item {
            margin: 0;
          }
          .el-form-item1 {
            width: 100%;

          }
          .el-form-item2 {
            margin-top: 10px;
            width: 30%;
            height: 100%;
            .submitReply {
              width: 100%;
            }
          }
        }
      }
    }
  }

  }
  @media only screen and (min-width: 767px) and (max-width: 912px) {
  }
}
</style>