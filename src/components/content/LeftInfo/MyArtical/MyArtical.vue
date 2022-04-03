<template>
    <div class="myArtical">
          <ArtTemplate 
          Articalclass="artical"
          getCount="getArticalCount"
          getCurArtical="getArtical"
          searchArtical="searchArtical"
          Count="articalCount"
          /> 
    </div>
</template>

<script>
import ArtTemplate from '../ArtTemplate/ArtTemplate.vue'
export default {
    name:"MyArtical",
    components:{ArtTemplate},
    
}
</script>

<style scoped lang='less'>
@media only screen and (min-width: 280px) and (max-width: 912px) {
  .myArtical {
    display: none;
  }
}
</style>