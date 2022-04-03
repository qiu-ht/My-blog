<template>
  <div>
      <BooksView booktype="others" CurBooks="/CurOtherBooks" CurBooksCount="/otherEbooksCount"/>
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