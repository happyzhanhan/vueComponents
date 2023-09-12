<template>
 <div class='divBox'>
  <firstlottie :animationData="lottie" :autoplay="false"></firstlottie>
 </div>
</template>

<script>
import firstlottie from '../components/lottie.vue';
export default {
  name: 'lottie',
  components:{
    firstlottie
  },
  data () {
    return {
      // lottie json文件
      lottie: require('../assets/lottie/car-loading.json')
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
