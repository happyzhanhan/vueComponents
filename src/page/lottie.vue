<template>
 <div class='divBox'>
  <flottie :animationData="lottie" :autoplay="false"></flottie>
 </div>
</template>

<script>
import flottie from '../components/lottie.vue';
export default {
  name: 'lottie',
  components:{
    flottie
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
