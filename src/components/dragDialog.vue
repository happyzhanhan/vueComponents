<template>
  <div v-if="visible" class="my_dialog" id="dialogbig">
      <!-- 遮罩层 -->
     <!-- <div class="my_dialog_mask"></div>-->
      <div class="my_dialog_box" id="my_dialog_box" v-drag >

         <!--<div class="shuline" v-scaleX><i></i></div>

         <div class="henline" v-scaleY><i></i></div>-->
          <!-- 标题 -->
          <div class="my_dialog_title">
              {{showTitle}}
              <span class="my_dialog_close" @click="cancel">

              </span>
          </div>
          <!-- 内容 -->
          <div class="my_dialog_content"  id="content_box" >
              <slot></slot>
          </div>
          <!-- 底部按钮 -->
          <!--<div class="my_dialog_bottom">
              <button class="btn cancelBtn" v-if="showCancelButton" @click="cancel">{{canceltext}}</button>
             &lt;!&ndash; <button class="btn confirmBtn" @click="confirm">{{confirmtext}}</button>&ndash;&gt;
          </div>-->
      </div>
  </div>
</template>

<script>
  export default {
      name: "dragDialog",
      props:{
          visible:{
              type:Boolean,
              default:false,
          },
          showTitle:{
              type:String,
              default:'title',
          },
          confirmtext:{
              type:String,
              default:'确定',
          },
          canceltext:{
              type:String,
              default:'取消',
          },
      },
      mounted(){

      },
      data(){
          return{
              showCancelButton:true,

              width:700,
              height:500,
          }
      },
      directives: {
          drag: {
              inserted: function (el, binding, vnode) {
                  vnode = vnode.elm

                  let boxdom = document.getElementById('dialogbig');
                  let bigdom = document.getElementById('my_dialog_box');

                  el.onmousedown = ((event) => {
                      if (event.target.className !== "my_dialog_title") {
                          return
                      }
                      // (clientX, clientY)点击位置距离当前可视区域的坐标(x，y)
                      // offsetLeft, offsetTop 距离上层或父级的左边距和上边距

                      // 获取鼠标在弹窗中的位置
                      let mouseX = event.clientX - vnode.offsetLeft
                      let mouseY = event.clientY - vnode.offsetTop

                      let initClientX = event.clientX;

                      // 绑定移动和停止函数
                      document.onmousemove = ((event) => {
                          let left, top

                          // 获取新的鼠标位置(event.clientX, event.clientY)
                          // 弹窗应该在的位置(left, top)
                          left = event.clientX - mouseX
                          top = event.clientY - mouseY

                          let changeLeft;
                          changeLeft = event.clientX - initClientX;
                          let offsetLeft = boxdom.offsetLeft;


                          // offsetWidth、offsetHeight 当前元素的宽度
                          // innerWidth、innerHeight 浏览器可视区的宽度和高度

                          // 获取弹窗在页面中距X轴的最小、最大 位置
                          let minX = -vnode.offsetWidth / 2 + bigdom.offsetWidth
                          let maxX = window.innerWidth + vnode.offsetWidth / 2 - bigdom.offsetWidth
                          if (left <= minX) {
                              left = minX
                          } else if (left >= maxX) {
                              left = maxX
                          }

                          // 获取弹窗在页面中距Y轴的最小、最大 位置
                          let minY = vnode.offsetHeight / 2
                          let maxY =window.innerHeight + vnode.offsetHeight / 2 - bigdom.offsetHeight
                          if (top <= minY) {
                              top = minY
                          } else if (top >= maxY) {
                              top = maxY
                          }
                          // 赋值移动
                          vnode.style.left = left + 'px'
                          vnode.style.top = top + 'px'
                          //boxdom.style.left = offsetLeft + changeLeft +'px'
                         /* boxdom.style.top = top + 'px'*/
                      })
                      document.onmouseup = (() => {
                          document.onmousemove = document.onmouseup = null
                      })
                  })
                  window.onresize = (() => {
                      vnode.style.left = "50%"
                      vnode.style.top = "50%"
                     /* boxdom.style.left = "50%"
                      boxdom.style.top =  "50%"*/
                  })
              }
          },
          scaleX:{
              inserted: function (el, binding, vnode) {
                  vnode = vnode.elm;
                  let bigdom = document.getElementById('my_dialog_box');
                  let smalldom = document.getElementById('content_box');

                  let boxdom = document.getElementById('dialogbig');

                  el.onmousedown = ((event) => {
                      if (event.target.className !== "shuline") {
                          return
                      }
                      // 获取鼠标在弹窗中的位置
                      let mouseX = event.clientX - vnode.offsetLeft;
                      let initClientX = event.clientX;

                      let leftwidth = bigdom.offsetWidth;
                      let rightwidth = smalldom.offsetWidth;

                      document.onmousemove = ((event) => {
                          let left;
                          left = event.clientX - initClientX;

                          // 赋值
                          bigdom.style.width = (leftwidth + left)<544?544:(leftwidth + left)+'px';
                          smalldom.style.width = (rightwidth + left)<544?544:(rightwidth + left)+'px';
                          boxdom.style.width = (leftwidth+left+2)<546?546:(leftwidth+left+2)+'px';

                      });
                      document.onmouseup = (() => {
                          document.onmousemove = document.onmouseup = null
                      })
                  });
                  window.onresize = (() => {
                      bigdom.style.width = '200px';
                      smalldom.style.width = '200px';
                  })
              }
          },
          scaleY:{
              inserted: function (el, binding, vnode) {
                  vnode = vnode.elm;
                  let bigdom = document.getElementById('my_dialog_box');
                  let smalldom = document.getElementById('content_box');
                  let boxdom = document.getElementById('dialogbig');

                  el.onmousedown = ((event) => {
                      if (event.target.className !== "henline") {
                          return
                      }
                      // 获取鼠标在弹窗中的位置
                      let initClientY = event.clientY;

                      let bigheight = bigdom.offsetHeight;
                      let smallheight = smalldom.offsetHeight;

                      document.onmousemove = ((event) => {
                          let top;
                          top = event.clientY - initClientY;

                          // 赋值
                          bigdom.style.height = (bigheight + top)<200?200:(bigheight + top)+'px';
                          smalldom.style.height = (smallheight + top)<200?200:(smallheight + top)+'px';
                          boxdom.style.height = (bigheight+top+2)<202?202:(bigheight+top+2)+'px';

                      });
                      document.onmouseup = (() => {
                          document.onmousemove = document.onmouseup = null
                      })
                  });
                  window.onresize = (() => {
                      bigdom.style.height = '200px';
                      smalldom.style.height = '200px';
                  })
              }
          }
      },
      methods: {
          cancel: function () {
              // .sync 实现弹窗显示 or 隐藏
              this.$emit("cancel")
          },
          confirm: function () {
              this.$emit("confirm")
          },

      },
  }
</script>

<style scoped lang="scss">
  .my_dialog {
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      display: contents;
/*
      width: 550px;
      height: 390px;*/

  }
  .my_dialog *{

      user-select: none;
  }
  .my_dialog_mask {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: #000;
      opacity: 0.5;
  }
  .my_dialog_box {
      z-index: 1000;
      position: absolute;
      width: 450px;
      background: #fff;
      border:1px solid #eee;
      box-shadow: 1px 3px 10px #eee;
      top: calc(100vh - 250px);
      left:calc(100vw - 525px);
      max-width: 100%;
      border-radius: 3px;
      overflow: hidden;
      transform: translate(-50%, -50%);

  }
  .shuline{
      position: absolute;
      right:-10px;
      top:0;
      z-index: 9;
      padding: 0 10px;
      height: 100%;
      cursor: w-resize;

  }
  .shuline i{
      position: relative;
      width: 1px;
      height: 100%;
      display: inline-block;
      background: #eee;
  }
  .shuline:hover i,.shuline:active i{
      background: #0062b2;
  }

  .henline{
      position: absolute;
      left:0;
      bottom:-14px;
      z-index: 9;
      padding: 10px 0;
      width: 100%;
      cursor: s-resize;
  }
  .henline i{
      position: relative;
      width: 100%;
      height: 1px;
      display: inline-block;
      background: #eee;
  }
  .henline:hover i,.henline:active i{
      background: #0062b2;
  }

  .my_dialog_content {
    /*  min-height: 100px;
      overflow-x: hidden;
      overflow-y: auto;*/
      position: relative;
      padding: 0;
      text-align: left;
      box-sizing: border-box;
  }
  .my_dialog_title {
      cursor: all-scroll;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      top: 0;
      left: 0;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e7e8eb;
      color: #000;
      font-size: 18px;
      font-family: \5fae\8f6f\96c5\9ed1;
      padding: 0 31px 0 18px;
      text-align: left;
      user-select: none;
  }
  .my_dialog_close {
      cursor: pointer;
      position: absolute;
      top: 15px;
      margin-top: -8px;
      right: 20px;
      width: 25px;
      height: 25px;
      line-height: 16px;
      color: #ccc;
      display: block;
      border: 1px solid #999;
      border-radius: 50%;
      transform-origin: center center;
      transform: rotate(45deg);

  }
  .my_dialog_close::before{
    content: "";
    position: absolute;
    left:4px;
    top:12px;
    width: 17px;
    height: 1px;
    background: #999;
  }
  .my_dialog_close::after{
    content: "";
    position: absolute;
    left:12px;
    top:4px;
    width: 1px;
    height: 17px;
    background: #999;
  }
  .my_dialog_close:hover {
      color: #409eff;
      border-color:  #409eff;
      &::before,&::after{
      background: #409eff;
      border-color:  #409eff;
  }
  }
  .my_dialog_bottom {
      position: relative;
     /* height:40px;*/
      background: #fff;
      padding: 16px 0;
      text-align: center;
      border-top: 1px solid transparent;
  }
  .btn {
      min-width: 60px;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;
      line-height: 14px;
      padding: 8px 15px;
      border-radius: 3px;
      text-decoration: none;
      border-radius: 3px;
      cursor: pointer;
      outline: none;
  }
  .my_dialog_bottom .cancelBtn:focus,
  .my_dialog_bottom .cancelBtn:hover {
      color: #409eff;
      background: #ecf5ff;
      border: 1px solid #b3d8ff;
  }
  .my_dialog_bottom .confirmBtn:focus,
  .my_dialog_bottom .confirmBtn:hover {
      background: #66b1ff;
      border: 1px solid #66b1ff;
      color: #fff;
  }
  .my_dialog_bottom .confirm_btn .marginLeft {
      margin-left: 10px;
  }
  .cancelBtn {
      border: 1px solid #dcdfe6;
      background-color: #fff;
      color: #606266;
  }
  .confirmBtn {
      border: 1px solid #409eff;
      background-color: #409eff;
      color: #fff;
  }
  button + button {
      margin-left: 15px;
  }
</style>
