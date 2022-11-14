<template>
  <div class="">
    <ArtTemplate 
    Articalclass="note" 
    getCurArtical="getCurNotes"
    getCount="getNotesCount"
    searchArtical="searchNotes"
    Count="notesCount"
    class="note"
    
    />
  </div>
</template>

<script>
import ArtTemplate from "../ArtTemplate/ArtTemplate.vue";
export default {
  components: {
    ArtTemplate,
  },
};
</script>

<style lang="less" scoped>
  .note{
    margin-top: 50px;
    display: block;
  }
  @media screen and (min-width:1600px) {
    .note{
      margin-top: 2rem;
    }
  }
  @media screen and (min-width:2300px) {
    .note{
      margin-top: 3rem;
    }
  }
  @media screen and (min-width:4000px) {
    .note{
      margin-top: 4rem;
    }
  }
  @media screen and (min-width:6000px) {
    .note{
      margin-top: 5rem;
    }
  }
</style>