<template>
  <div class="leftInfo">
        <AdminstratorInfo/>
        <Calendar/>
        <MyArtical/>
        <Note/>
        <Resource/>
  </div>
</template>

<script>
import AdminstratorInfo from './AdministratorInfo/AdministratorInfo.vue'
import MyArtical from './MyArtical/MyArtical.vue' 
import Resource from './Resource/Resource.vue'
import Note from './Note/MyNote.vue'
import Calendar from './Calendar/MyCalendar.vue'
export default {
    data() {
        return {
            
        }
    },
    components:{AdminstratorInfo,MyArtical,Resource,Note,Calendar}
}
</script>

<style scoped lang='less'>
    
    .leftInfo{
        padding: 40px 2rem 0;
        width: 28vw;
        z-index: 100;
    }
    @media only screen and (min-width: 280px) and (max-width: 912px) {
        .leftInfo{
            padding-top: 0px;
            width: 90vw;   
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 2000px;
            position: absolute;
            top: 80px;
            display: none;
        }
    }
    @media only screen and (min-width:912px) and (max-width:1400px) {
        .leftInfo{
           width: 30vw;
           padding: 40px 0 0 2rem;
        }
    }
    @media screen and (min-width:1200px) and (max-width:1400px) {
        .leftInfo{
            width: 28vw;
        }
    }
    @media screen and (min-width: 1600px) {
        .leftInfo{
            width: 25vw;
            padding: 40px 4rem 0;
        }
    }
    @media screen and (min-width: 2600px) {
        .leftInfo{
            width: 23vw;
        }
    }
    @media screen and (min-width: 4400px) {
        .leftInfo{
            width: 20vw;
        }
    }
</style>