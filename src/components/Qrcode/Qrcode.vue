<template>
    <div class="qrcode" v-if="this.$store.state.openQrcode" @mousewheel.prevent @touchmove.prevent>
        <i class="iconfont icon-guanbi1 closeicon"  @click="closeQrcode"></i>
        <img src="/image/officialAccounts/mycard.png" alt="" class="mycard">
        <div class="tip">
            <span>公众号回复：{{this.$store.state.verificationCode}}</span><br>
            <span class="span2">--获取提取码--</span>
        </div>
        <input type="text" class="codeinput" placeholder="输入提取码" v-model="inputverification" ref="codeinput">
        <span class="redword" v-show="inputempty">输入不能为空！</span>
        <span class="redword" v-show="inputwrong">输入有误！</span>
        <button @click="todownload" class="todownloadbtn">提取</button>
    </div>
</template>

<script>
export default {
    name:"Qrcode",
    data() {
        return {
            inputverification:'',
            close:false,
            inputempty:false,
            inputwrong:false
        }
    },
    methods:{
        todownload(){
            if(this.inputverification.trim() == this.$store.state.ebookPassword){
                this.inputwrong = false
                this.inputempty = false
                window.location.href = this.$store.state.ebookHref
                this.$store.state.openQrcode = false
            }else if(this.inputverification.trim() == ''){
                this.inputwrong = false
                this.$refs.codeinput.style.border = '1px solid red'
                this.inputempty = true
            }else if(this.inputverification.trim() != '' && this.inputverification.trim() != this.$store.state.ebookPassword){
                this.inputempty = false
                this.$refs.codeinput.style.border = '1px solid red'
                this.inputwrong = true
            }
            
        },
        closeQrcode(){
            this.close = false
            this.$store.state.openQrcode = false
            this.inputverification = ''
            this.inputwrong = false
        }
    },
}
</script>

<style scoped lang="less">
    @keyframes zoomInDown {
    from {
        opacity: 0;
        transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    60% {
        opacity: 1;
        transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
    }
    .qrcode{
        width: 350px;
        height: 380px;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: calc(~"50% - 150px");
        left: calc(~"50% - 150px");
        display: flex;
        justify-content: center;
        z-index: 9999;
        border-radius: 10px;
        animation: zoomInDown 0.7s;
        .closeicon{
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 30px;
            color: #ccc;
            cursor: pointer;
            &:hover{
                color: #fff;
            }

        }
        .mycard{
            position: absolute;
            top: 40px;
            width: 200px;
            // height: 155.63px;
            
        }
        .tip{
            position: absolute;
            color: #fff;
            top: 210px;
            text-align: center;
            .span2{
                display: inline-block;
                color: #ccc;
                margin-top: 10px;
            }
        }
        .codeinput{
            position: absolute;
            width: 180px;
            height: 30px;
            top: 280px;
            left: 0;
            right: 0;
            margin: 0 auto;
            border-radius: 5px;
            text-indent: 5px;
            border: rgba(0, 0, 0, 0.5);
            &:focus{
                outline: none;
            }
        }
        .todownloadbtn{
            position: absolute;
            top: 330px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 50px;
            height: 25px;
            cursor: pointer;
            border-radius: 5px;
            border: none;
            &:hover{
                transform: scale(1.05,1.05);
                transition: 0.5s;
            }
        }
        .redword{
            position: absolute;
            top: 315px;
            left: 83px;
            color: red;
            font-size: 13px;
        }
    }
    .animate__animated.animate__zoomInDown{
        --animate-duration: 0.7s;
    }

    @media only screen and (min-width: 280px) and (max-width:912px) {
        .qrcode{
            width: 250px;
            height: 280px;
            top: calc(~"50% - 140px");
            left: calc(~"50% - 125px");
            .closeicon{
                top: 2px;
                right: 5px;
                width: 25px;
                height: 25px;

            }
            .mycard{
                width: 160px;
                top: 20px;
            }
            .tip{
                top: 150px;
                font-size: 13px;
                .span2{
                    margin-top: 10px;
                }
            }
            .codeinput{
                top: 205px;
                width: 150px;
                height: 20px;
                font-size: 13px;
            }
            .redword{
                top:230px;
                left: 52px;
                font-size: 12px;
            }
            .todownloadbtn{
                top: 245px;
                height: 20px;
            }
        }
    }
</style>