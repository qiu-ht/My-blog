<template>
  <div class="adminstratorInfo">
    <div class="baseInfo">
        <div class="careerTime">码龄：<span>{{careerTime}}</span></div>
        <div class="email">邮箱：<span>1910828797@qq.com</span></div>
        <div class="intro">简介：{{intro}}</div>
    </div>
    <div class="Qrcode">
        <img src="/image/officialAccounts/myQrcode.jpg" alt="">
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
export default {
    name:"UserInfo",
    data() {
        return {
            intro:'一只又菜又爱玩的程序猿',
            zan:false,
        }
    },
    computed:{
        careerTime(){
            
            dayjs.extend(relativeTime)
            const a = dayjs('2020-10-14')
            const b = dayjs()
            const careerTime = parseInt((b.diff(a))/(1000*3600*24))+"天"
            return careerTime
        },
    }
}
</script>

<style lang="less" scoped>
    .adminstratorInfo{
        box-sizing: border-box;
        width: 100%;
        padding: 30px 0;
        // height: 170px;
        background-color: #6ab8f9;
        box-shadow: 0 0 5px black;
        margin-bottom: 20px;
        font-size: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        color: aliceblue;
        .baseInfo{
            width: 65%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
            // background-color: red;
            .intro,.email,.careerTime{
                height: 40px;
                width: 90%;
                // background-color: #bfa;
                line-height: 40px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                word-break: break-all;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
        }
        .Qrcode{
            width: 25%;
            // background-color: red;
            position: relative;
            img{
                width: 100%;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto ;
            }
            
        }
    }
    @media screen and(min-width: 912px) and (max-width:1200px) {
        .adminstratorInfo{
            width: 100%;
            padding: 30px 0;
            font-size: 14px;

            .baseInfo{

                .intro,.email,.careerTime{
                    height: 35px;
                    width: 90%;
                }
            }
        }
    }
    @media screen and(min-width: 1200px) and (max-width:1300px){
        .adminstratorInfo{
            .baseInfo{
                .intro,.email,.careerTime{
                    width: 90%;
                }
            }
        }
        
    }
</style>