<template>
 <div class='divBox'>
  <gifLoading v-bind:loadingText="loadingText"></gifLoading>
 </div>
</template>

<script>
import gifLoading from '../components/gifLoading.vue';
export default {
  components: {
    gifLoading
  },
  name: 'loading',
  data () {
    return {
      loadingText: "联网中……"
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
