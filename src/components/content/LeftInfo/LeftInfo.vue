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
        // z-index: 100;
        padding-top: 40px;
        width: 32%;
        // height: 2000px;
        margin-left: 4%;
        z-index: 100;
        // background-color: #bfa;
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
    @media only screen and (min-width:912px) and (max-width:1300px) {
        .leftInfo{
           width: 35%;
        }
    }
</style>