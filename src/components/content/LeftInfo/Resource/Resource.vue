<template>
  <div class="resource">
      <div class="bg"></div>
      <div class="title">资源</div>
      <div v-for="(resource,index) in resource" :key="index">
            <router-link :to="{
                    name: `${resource.resourceRoute}`,
                    params:{
                        resouceName:resource.resourceName,
                        resourceRoute:resource.resourceRoute,
                        updatedDate:resource.updatedDate
                    }
                }" 
                class="articalLink"
                >
                <div :class="`artical artical${index+1}`" @click="changeOpenState">
                    <div class="articalTitle">{{resource.resourceName}}</div>
                    <div class="publishDate">{{resource.updatedDate}}</div>
                </div>
            </router-link>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted(){
        this.$store.dispatch('getResource')
    },
    computed:{
        resource(){
            return this.$store.state.resource
        }
    },
    methods:{
        changeOpenState(){
            this.$store.state.frontendOpend = false
            this.$store.state.othersOpend = false
            document.documentElement.scrollTop = 700
        }
    }
}
</script>

<style scoped lang='less'>
    .resource{
        position: relative;
        width: 100%;
        height: 300px;
        background-color: aliceblue;
        box-shadow: 0 0 5px black;
        border-top-left-radius: 0;
        overflow: hidden;
        color: rgb(29, 29, 29);
        font-size: 20px;
        margin-top: 50px;
        .bg{
            position: absolute;
            height: 50px;
            width: 100%;
            background-color: #6ab8f9;
        }
        .title{
            width: 100%;
            color: aliceblue;
            font-size: 20px;
            position: absolute;
            text-align: center;
            line-height: 40px;
            margin-top: 5px;
        }
        .articalLink{
            text-decoration: none;
        }
        .artical{
            width: 80%;
            background-color: aliceblue;
            opacity: 0.6;
            color: black;
            // box-shadow: 0 0 5px black;
            // border-bottom: 1px solid #80b1e9;
            border-top: 1px solid #80b1e9;
            font-size: 16px;
            padding: 5px 10px;
            position: relative;
            cursor: pointer;
            margin: 0 auto;
            overflow: hidden;
            &:hover{
                .articalTitle{
                    transform: scale(1.05,1.05) translateX(5px);
                    transition: 0.2s;
                    text-shadow: 0 0 2px black;  
                }
                
            }
            
            .articalTitle{
                padding-left: 10px;
                padding-top: 5px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                overflow: hidden; 
                // background-color: red;
            }
            .publishDate{
                margin-top: 5px;
                text-align: right;
                font-size: 12px;
            }
        }
        .artical1{
            margin-top: 80px;
            border-top: none;
        }
    }
    @media only screen and (min-width: 280px) and (max-width: 912px){
        .resource{
            display: none;
        }
    }
    @media only screen and (min-width: 912px) and (max-width:1200px){
        .resource{
            .artical{
                font-size: 14px;
            }
        }
    }
</style>