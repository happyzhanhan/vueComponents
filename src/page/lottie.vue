<template>
 <div class='divBox'>
  <lottie :animationData="lottie" :autoplay="false"></lottie>
 </div>
</template>

<script>
import lottie from '../components/lottie.vue';
export default {
  name: 'lottie',
  components:{
    lottie
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
