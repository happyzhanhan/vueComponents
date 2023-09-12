<template>
 <div class="lottie"  @mouseenter="onMouseenter" @mouseleave="onMouseleave"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  name: "lottie",
  props: {
    animationData: {
      type: Object,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      lottie: null
    }
  },
  mounted () {
    this.intLottie()
  },
  methods: {
    intLottie () {
      const { animationData, autoplay, loop } = this
      this.lottie = lottie.loadAnimation({
        container: this.$el, // 渲染容器
        renderer: 'svg', // 渲染方式 svg|canvas|html
        loop, // 是否循环 true|false|number
        autoplay, // 自动播放 true|false
        animationData // lottie json文件
      })
    },
    onMouseenter () {
      // 我这里demo，非自动播放则判断为鼠标交互播放，具体封装根据自身业务场景来
      if (!this.autoplay) {
        this.lottie.setDirection(-1) // 回退
        this.lottie.play()
        // 监听lottie播放结束
        this.lottie.addEventListener('complete', e => {
          this.lottie.stop()
        })
      }
    },
    onMouseleave () {
      this.lottie.removeEventListener('complete')
      if (!this.autoplay) {
      	// 改变播放方向，鼠标移出继续
        this.lottie.setDirection(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lottie {
  width: 200px;
  height: 200px;
}
</style>
