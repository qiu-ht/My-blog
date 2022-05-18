<template>
  <div class="bottom_info">
    <div class="publishDate">{{ onemes.publishDate || onemes.replyTime}}</div>
    <div class="like" @click="likeChange(onemes._id)">
      <div class="icon">
        <!-- onemes._id:_id -->
        <i
          :class="
            praise.includes(onemes._id)
              ? 'iconfont icon-yizan'
              : 'iconfont icon-dianzan'
          "
        ></i>
        <span class="likeCount">{{
           onemes.like
        }}</span>
      </div>
    </div>
    <div class="comments">
      <!-- onemes._id:commentID -->
      <span class="reply" @click="reply(onemes._id,onemes.initiatorName||onemes.username,onemes.initiatorName?'reply':'comment')">回复</span>
    </div>
    <div class="operation" >
      <i class="iconfont icon-liebiao-dian" slot="reference" @click="visible=!visible"></i>
      <div class="operationList" v-show="visible">
        <div
          class="popitem"
          @click="deleteMes(onemes._id,commentID)"
          v-if="this.$store.state.user.username===onemes.username||this.$store.state.user.administrator||this.$store.state.user.username===onemes.initiatorName?true:false"
        >
          删除
        </div>
        <div class="popitem" v-if="this.$store.state.user.username===onemes.username||this.$store.state.user.username===onemes.initiatorName?false:true">
          举报
        </div>
      </div>
    
      
      
    </div>
  </div>
</template>

<script>
export default {
    props:["onemes","commentID","praise","from"],
    data() {
        return {
            visible:false
        }
    },
    methods:{
        likeChange(id){
            this.$bus.$emit('likeChange',id,this.from)
        },
        deleteMes(id){
            this.$bus.$emit('deleteMes',id,this.commentID,this.from)
            this.visible = false
        },
        reply(id,acceptorName,replyClass){
          this.$bus.$emit('replyComment',id,acceptorName,this.commentID,replyClass)
        }
    }
};
</script>

<style scoped lang="less">
.bottom_info {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  .publishDate {
    font-size: 13px;
    line-height: 30px;
    color: #8d8d8d;
  }

  .like {
    margin-left: 20px;
    cursor: pointer;
    .icon {
      display: flex;
      align-items: center;
      .icon-dianzan,
      .icon-yizan {
        margin-right: 3px;
        font-size: 15px;
      }
      .icon-dianzan {
        color: #a09f9f;
        &:hover {
          color: #6bcff7;
        }
      }
      .icon-yizan {
        color: #6bcff7;
      }
      .likeCount {
        display: inline-block;
        font-size: 12px;
      }
    }
  }
  .comments {
    .reply {
      margin-left: 20px;
      font-size: 12px;
      line-height: 30px;
      color: rgb(102, 102, 102);
      cursor: pointer;
      &:hover {
        transition: 0.1s;
        color: rgb(122, 172, 238);
      }
    }
  }
  .operation{
    position: absolute;
    right: 0;
    .icon-liebiao-dian {
      position: absolute;
      right: 0;
      color: rgb(148, 147, 147);
      font-size: 13px;
      cursor: pointer;
      &:hover {
        transition: 0.1s;
        color: rgb(122, 172, 238);
      }
    }
    .operationList {
      position: absolute;
      top: 20px;
      right:5px;
      width: 100px;
      background-color: #fff;
      padding: 6px 0 0  ;
      transition: 00.3s;
      z-index: 1000;
      .popitem{
        font-size: 13px;
        line-height: 33px;
        padding-left: 10px;
        color: rgb(102, 102, 102);
        cursor: pointer ;
        transition: 0.1s;
        &:hover{
            color: rgb(142, 189, 250);
            background-color: #F1F2F3;
        }
      }
    }
  }
  
  
}
@media screen and(min-width: 280px) and (max-width:912px) {
  .bottom_info{
    margin-bottom: 5px;
    .publishDate{
      font-size: 12px;
      
    }
    .comments {
      .reply {
        &:hover {
          color: rgb(102, 102, 102);
        }
      }
    }
    .operation{
      .icon-liebiao-dian{
        bottom: -11px;
      }
      .operationList {
        right: -10px;
        .icon-liebiao-dian {
          &:hover {
            color: rgb(148, 147, 147);
          }
        }
      }
    }
    
  }
}
</style>