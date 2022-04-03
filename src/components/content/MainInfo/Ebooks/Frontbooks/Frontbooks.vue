<template>
  <div>
      <BooksView booktype="frontend" CurBooks="/CurFrontBooks" CurBooksCount="/frontendEbooksCount"/>
  </div>
</template>

<script>
import BooksView from '../BooksView/BooksView.vue'
export default {
    components:{BooksView}
}
</script>

<style>

</style>