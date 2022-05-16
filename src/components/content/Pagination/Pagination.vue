<template>
    <div class="paging pageturning" ref="paging" v-if="pageCount>1">
        <span @click="lastPage" class="lastpPageBtn" v-show="CurPageIndex_!==1">上一页</span>
        <span class="restPage" v-show="CurPageIndex_>2 && pageCount>3">...</span>
        <span v-for="(pageIndex,index) in pageArr" :key="index" @click="changePage(pageIndex)" :class="CurPageIndex_===pageIndex?`PageBtn PageBtn${pageIndex} active`:`PageBtn PageBtn${pageIndex}`">{{pageIndex}}</span>
        <span class="restPage" v-show="CurPageIndex_<pageCount-1 && pageCount>3" >...</span>
        <span @click="nextPage" class="nextPageBtn" v-show="CurPageIndex_!==pageCount">下一页</span>
    </div>
</template>

<script>
export default {
    props:{
        'pageCount':{
            type:Number
        },
        'CurPageIndex':{
            type:Number,
            default:1
        }
    },
    data() {
        return {
            CurPageIndex_:this.CurPageIndex
        }
    },
    computed:{
        pageArr(){
            let pageArr=[];
            if(this.CurPageIndex_===1 || this.pageCount<3){
                for(let i =1,length=this.pageCount;i<length+1;i++){
                    pageArr.push(i)
                }
                pageArr = pageArr.slice(0,3)
            }else if(this.CurPageIndex_===this.pageCount && this.pageCount>=3){
                pageArr=[this.pageCount-2,this.pageCount-1,this.pageCount]
            }else if(this.pageCount>=3){
                pageArr=[this.CurPageIndex_-1,this.CurPageIndex_,this.CurPageIndex_+1]
            }
            return pageArr
        }
    },
    methods:{
        changePage(CurPageIndex){
            this.$emit('changePage',CurPageIndex)
            this.CurPageIndex_ = CurPageIndex
        },
        lastPage(){
            this.changePage(--this.CurPageIndex_)
        },
        nextPage(){
            this.changePage(++this.CurPageIndex_)
        },
    },
}
</script>

<style lang='less' scoped>
    .paging{
        height: 30px;
        display: flex;
        justify-content: center;
        font-size: 16px;
        .nextPageBtn,.PageBtn,.lastpPageBtn{
            cursor: pointer;
            user-select: none;
            display: inline-block;
            width: 50px;
            height: 30px;
            background-color:#ececec;
            // opacity: 0.4;
            border-radius: 5px;
            // box-shadow: 0 0px 3px rgb(119, 119, 119);
            text-align: center;
            line-height: 30px;
            margin-top: 10px;
            color: #606266;
            &:hover{
                background-color: #6ab8f9;
                color: #fff;
                transition: 0.2s;
            }
        }
        .PageBtn{
            height: 30px;
            width: 30px;
            margin-right:5px;
        }
        .active{
            background-color: #6ab8f9;
            color: #fff;
        }
        .restPage{
            display: inline-block;
            width: 20px;
            margin-top: 10px;
            color: rgba(29, 29, 29,0.5);
            text-align: center;
            font-weight: bold;
        }
        .lastpPageBtn{
            margin-right: 3px;
        }
        .nextPageBtn,.lastpPageBtn{
            padding: 0 5px;
        }
    }
    @media only screen and (min-width: 280px) and (max-width: 912px){
        .paging{
            .nextPageBtn,.PageBtn,.lastpPageBtn{
                
            }
            .PageBtn{
                margin-right:5px;
            }
        }
    }
</style>