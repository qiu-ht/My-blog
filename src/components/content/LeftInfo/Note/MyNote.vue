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
</style>