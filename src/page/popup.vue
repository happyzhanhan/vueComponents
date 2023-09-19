<template>
<div class="my_page">
  <button @click="isShow = true">打开</button>
  <dragDialog :visible="isShow" :showTitle="title"  :canceltext="canceltext" :confirmtext="confirmtext" @confirm="onConfirm" @cancel="onCancel">
     <div class="text">我是弹框里的内容，可以随便放哦</div>
  </dragDialog>
</div>
</template>

<script>
import dragDialog from '../components/dragDialog.vue';
export default {
  name: 'popup',
  components: {
    dragDialog
  },
  data () {
    return {
      isShow: false,
      title: '拖拽弹窗',
      canceltext: '关闭',
      confirmtext: '提交'
    }
  },
  methods: {
    onConfirm() { },
    onCancel() {
        this.isShow = false;
    }
  }
}
</script>

<style scoped lang='scss'>
.text{
  padding: 50px 15px;
}
</style>
