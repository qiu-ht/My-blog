<template>
  <div class="resource">
      <div class="line"></div>
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
            document.documentElement.scrollTop = 500
        }
    }
}
</script>

<style scoped lang='less'>
    .resource{
        position: relative;
        width: 100%;
        height: 300px;
        background-color: #6bcff7;
        box-shadow: 0 0 5px black;
        border-radius: 10px;
        border-top-left-radius: 0;
        overflow: hidden;
        color: rgb(29, 29, 29);
        font-size: 20px;
        margin-top: 50px;
        .line{
            width: 10px;
            height: 40px;
            background-color: black;
            opacity: 0.5;
            position: absolute;
            left: 0;
        }
        .title{
            color: black;
            font-size: 20px;
            position: absolute;
            left: 15px;
            line-height: 40px;
        }
        .articalLink{
            text-decoration: none;
        }
        .artical{
            width: 80%;
            background-color: #6bcff7;
            opacity: 0.6;
            color: black;
            border-radius: 5px;
            // box-shadow: 0 0 5px black;
            border-bottom: 1px solid #80b1e9;
            border-top: 1px solid #80b1e9;
            font-size: 16px;
            padding: 5px 10px;
            position: relative;
            cursor: pointer;
            margin: 0 auto;
            overflow: hidden;
            
            &:hover{
                opacity: 0.8;
                transform: scale(1.05,1.05);
                transition: 0.3s;
            }
            .articalTitle{
                padding-left: 10px;
                padding-top: 5px;
                width: 90%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                overflow: hidden; 
            }
            .publishDate{
                margin-top: 5px;
                text-align: right;
                font-size: 12px;
            }
        }
        .artical1{
            margin-top: 80px;
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