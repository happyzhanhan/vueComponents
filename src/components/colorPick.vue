<template>
	<div class="zk__color-picker">
		<!-- 颜色选择 -->
		<div class="zk__block" :style="{color:value}" @click.stop="!disabled&&(showPanel=!showPanel)" :class="{'hover':showPanel}">
			<i class="zknicon " :class="icon">text</i>
		</div>
		<!-- 颜色面板 -->
		<div class="zk__panel" :style="{left: positionLeft || 0}" v-show="showPanel" @click.stop="">
			<!-- 画布 -->
			<div class="zk__canvas">
				<canvas :id="canvasId" :width="width" :height="height" @click="onCanvasClick"
				        @mousedown="onCanvasMousedown"></canvas>
				<!-- 当前选中小块 -->
				<em class="zk__cur" :id="curId" @mousedown="function(e){onCanvasMousedown(e,'cur')}"></em>
				<!-- 左侧色条选中小块 -->
				<em class="zk__bar" :id="barId" @mousedown="function(e){onCanvasMousedown(e,'bar')}"></em>
				<!-- 透明度控制条 -->
				<div class="zk__alpha-silder" v-if="showAlpha">
					<div class="zk__alpha-silder-bar" :style="alphaBarStyle" @click="onAlphaClick" @mousedown="onAlphaMousedown"></div>
					<em class="zk__alpha" :id="alphaId" :style="{left:alpha*100 + '%'}" @mousedown="onAlphaMousedown"></em>
				</div>
			</div>
			<!--预定义的颜色块-->
			<div class="zk__predefine" v-if="predefine.length>0">
				<div class="zk__color-one" v-for="oneColor in predefine" :style="{backgroundColor:oneColor,borderColor:oneColor}" :class="{'hover': oneColor === curColor }"
						@click.stop="toChange(oneColor)"></div>
			</div>
			<!-- 底部按钮栏 -->
			<div class="zk__control">
				<div class="zk__control-left">
					<!--当前颜色-->
					<div class="zk__color-show" :style="{backgroundColor:curColor}"></div>
					<input class="zk__input" :value="curColor" @blur="inputChange" @keyup.enter="inputChange" />
				</div>
				<div class="zk__btns">
					<div class="zk__btn-clear" @click="clear" v-if="icon==='zknicon-beijingyanse'">cancelBtn</div>
					<div class="zk__btn-confirm" @click="confirm">{{conformBtn}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "colorPick",
    props: {
      // 绑定的色值
      value: {
        type: String,
        default: '#FF0000'
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否使用透明度
      showAlpha: {
        type: Boolean,
        default: false
      },
      // 颜色类型，可选值：hex，rgb
      colorFormat: {
        type: String,
        default: 'hex'
      },
	    //图标
      icon: {
        type: String,
        default: 'zknicon-wenziyanse'
      },
      positionLeft: {
        type: String,
        default: '0'
      },
	    // 预定义的可选颜色
      predefine: {
        type: Array,
	      default: () => {}
      },
      conformBtn: {
        type: String,
        default: '确定'
      },
      cancelBtn: {
        type: String,
        default: '清空'
      },
    },
    data() {
      return {
        canvasId: 'canvas-' + Date.now(), // 画布 id，防止多组件时冲突
        curId: 'cur-' + Date.now(), // 当前选中小块 id，防止多组件时冲突
        barId: 'bar-' + Date.now(), // 左侧色条选中小块 id，防止多组件时冲突
        alphaId: 'alpha-' + Date.now(), // 透明度选中小块 id，防止多组件时冲突
        canvas: null, // 画布
        ctx: null, // 画布实例
        curColor: '', // 当前选中颜色
        activeColor: '', // bar选中颜色
        alpha: 1, // 透明度
        width: 240, // canvas宽度
        height: 200, // canvas高度
        showPanel: false, // 是否显示颜色面板
	      canvasPos: {}, //画布定位位置
      }
    },
    computed:{
      alphaBarStyle(){
        return 'background: linear-gradient(to right, rgba(255, 69, 0, 0) 0%, '+this.activeColor+' 100%);';
      }
    },
    watch: {
      value(val) {
        this.curColor = val;
        if(val){
          this.resetCurColor();
        }
      }
    },
    created() {
      var _this = this;
      this.handler = function(e) {
        _this.showPanel = false;
      }
      document.body.addEventListener('click', this.handler)
      this.$nextTick(() => {
        this.curColor = this.value;
        this.activeColor = JSON.parse(JSON.stringify(this.value)) || '#000000';
        if(this.value){
          this.resetCurColor();
        }
        this.init();
      })
    },
    beforeDestroy() {
      document.body.removeEventListener('click', this.handler);
    },
    methods: {
      // 初始化
      init() {
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.makeColorBar();
        this.makeColorBox(this.activeColor);
      },
	    //输入框颜色回车
	    inputChange (e) {
        if(e.target.value.length!==7){
          return
        }
        this.$nextTick(() => {
          this.curColor = e.target.value;
          this.activeColor = e.target.value;
          this.resetCurColor();
          this.init();
        })
	    },
      // 选择颜色的7色条
      makeColorBar() {
        var gradientBar = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradientBar.addColorStop(0, '#F00');
        gradientBar.addColorStop(1 / 6, '#F0F');
        gradientBar.addColorStop(2 / 6, '#00F');
        gradientBar.addColorStop(3 / 6, '#0FF');
        gradientBar.addColorStop(4 / 6, '#0F0');
        gradientBar.addColorStop(5 / 6, '#FF0');
        gradientBar.addColorStop(1, '#F00');

        this.ctx.fillStyle = gradientBar;
        this.ctx.fillRect(0, 0, 20, this.height);
      },
      // 颜色选择区域
      makeColorBox(color) {
        var gradientBase = this.ctx.createLinearGradient(30, 0, this.width, 0);
        gradientBase.addColorStop(1, color);
        gradientBase.addColorStop(0, 'rgba(255,255,255,1)');
        this.ctx.fillStyle = gradientBase;
        this.ctx.fillRect(30, 0, this.width, this.height);

        var my_gradient1 = this.ctx.createLinearGradient(0, 0, 0, this.height);
        my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
        my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
        this.ctx.fillStyle = my_gradient1;
        this.ctx.fillRect(30, 0, this.width, this.height);

	      // this.onCanvasClick(this.canvasPos);
      },
      // canvas画布点击
      onCanvasClick(e) {
        var ePos = {
          x: e.offsetX || e.layerX,
          y: e.offsetY || e.layerY
        }
        // this.canvasPos = {
        //   offsetX: ePos.x,
        //   offsetY: ePos.y,
        // }
        var rgbaStr = '#000';
        if (ePos.x >= 0 && ePos.x < 20) {
          // in
          rgbaStr = this.getRgbaAtPoint(ePos, 'bar');
          var barBlock = document.getElementById(this.barId);
          barBlock.style.top = ePos.y + 'px';
          this.makeColorBox('rgb(' + rgbaStr.slice(0, 3).join() + ')');
          this.$emit('active-change', this.rgb2hex('rgba(' + rgbaStr.slice(0, 3).join() + ',' + this.alpha +
            ')'));
        } else if (ePos.x >= 30) {
          rgbaStr = this.getRgbaAtPoint(ePos, 'box');
          var cur = document.getElementById(this.curId);
          cur.style.left = ePos.x + 'px';
          cur.style.top = ePos.y + 'px';
        } else {
          return;
        }
        this.setCurColor(rgbaStr);
      },
      // canvas点击 绑定鼠标拖动
      onCanvasMousedown(ev, type) {
        var self = this;
        var ePos = {
          x: ev.layerX || ev.offsetX,
          y: ev.layerY || ev.offsetY
        }
        // this.canvasPos = {
        //   offsetX: ePos.x,
        //   offsetY: ePos.y,
        // }
        var offsetTop = parseInt(ev.target.offsetTop);
        var offsetLeft = parseInt(ev.target.offsetLeft);
        if (type === 'cur' || (ePos.x >= 30 && ePos.x < 30 + this.width && ePos.y >= 0 && ePos.y < this.height)) {
          var cur = document.getElementById(this.curId);
          document.onmouseup = function() {
            document.onmouseup = document.onmousemove = null;
          }
          document.onmousemove = function(e) {
            try {
              var pos = {
                x: e.clientX - ev.clientX + ev.offsetX + offsetLeft,
                y: e.clientY - ev.clientY + ev.offsetY + offsetTop
              }

              pos.x = pos.x <= 30 ? 30 : pos.x && (pos.x > self.width - 1 ? self.width - 1 : pos.x);
              pos.y = pos.y <= 0 ? 0 : pos.y && (pos.y > self.height - 1 ? self.height - 1 : pos.y);

              var rgbaStr = self.getRgbaAtPoint(pos, 'box');
              self.setCurColor(rgbaStr);
              cur.style.left = pos.x + 'px';
              cur.style.top = pos.y + 'px';
            } catch (e) {
              console.log(e);
            }
          }
        } else if (ePos.x <= 20 && ePos.y <= this.height) {
          var bar = document.getElementById(this.barId);
          document.onmouseup = function() {
            document.onmouseup = document.onmousemove = null;
          }
          document.onmousemove = function(e) {
            try {
              var pos = {
                x: 0,
                y: e.clientY - ev.clientY + ev.offsetY + offsetTop
              }

              pos.y = pos.y <= 0 ? 0 : pos.y && (pos.y > self.height - 1 ? self.height - 1 : pos
                .y);

              var rgbaStr = self.getRgbaAtPoint(pos, 'box');
              bar.style.top = pos.y + 'px';
              self.activeColor = self.rgb2hex('rgb(' + rgbaStr.slice(0, 3).join() + ')');
              self.makeColorBox('rgb(' + rgbaStr.slice(0, 3).join() + ')');
              self.$emit('active-change', self.activeColor);
            } catch (e) {
              // console.log(e);
            }
          }
        }
      },
     // 透明度点击选择
      onAlphaClick(e){
        var x = e.offsetX || e.layerX;
        var bar = document.getElementById(this.alphaId);
        var parentNode = bar.parentNode;
        this.alpha = parseFloat(x/parentNode.clientWidth).toFixed(2);
        this.resetCurColor();
      },
      // 透明度控制
      onAlphaMousedown(ev){
        var self = this;
        var ePos = {
          x: ev.layerX || ev.offsetX,
          y: ev.layerY || ev.offsetY
        }
        var offsetTop = parseInt(ev.target.offsetTop);
        var offsetLeft = parseInt(ev.target.offsetLeft);
        var bar = document.getElementById(this.alphaId);
        var parentNode = bar.parentNode;
        document.onmouseup = function() {
          document.onmouseup = document.onmousemove = null;
        }
        document.onmousemove = function(e) {
          try {
            var pos = {
              x: e.clientX - ev.clientX + ev.offsetX + offsetLeft,
              y: 0
            }

            pos.x = pos.x <= 0 ? 0 : pos.x && (pos.x > parentNode.clientWidth ? parentNode.clientWidth : pos
              .x);

            self.alpha = parseFloat(pos.x/parentNode.clientWidth).toFixed(2);
            self.resetCurColor();
          } catch (e) {
            console.log(e);
          }
        }
      },
      // 透明度重新计算颜色
      resetCurColor(){
        var curColor = this.curColor;
        var alpha = this.alpha;
        var reg = /^(rgb|RGB)/;
        if (!reg.test(curColor)){
          curColor = this.hex2rgb(curColor.slice(0,7));
        }
        var colorArr = curColor.replace(/(?:rgba|rgb|RGBA|RGB|\(|\))*/g, "").split(',');
        colorArr[3] = alpha;
        this.setCurColor(colorArr);
      },
      // 设置当前颜色值
      setCurColor(rgbaStr) {
        var txt = 'a';
        if (rgbaStr.length === 4 && parseFloat(rgbaStr[3]) === 1 || !this.showAlpha) {
          rgbaStr = rgbaStr.slice(0, 3);
          txt = '';
        }
        if (this.colorFormat === 'hex') {
          this.curColor = this.rgb2hex('rgb' + txt + '(' + rgbaStr.join() + ')');
        } else if (this.colorFormat === 'rgb') {
          this.curColor = 'rgb' + txt + '(' + rgbaStr.join() + ')';
        }
        // this.$emit('input', this.curColor);
        // this.sendChange();
      },
	    // 快速选择颜色
      toChange (color) {
        var colorChange = [];
        for (var i = 1; i < color.length; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2))+'');
        }
        colorChange.push(1);
	      this.setCurColor(colorChange);
      },
      //  确认按钮点击
      confirm() {
        this.sendChange();
        this.showPanel = false;
      },
	    // 清空颜色
	    clear(){
        this.curColor='';
        this.$emit('input', '');
        this.$emit('change', '');
        this.showPanel = false;
	    },
      // 颜色值change
      sendChange() {
        this.$emit('input', this.curColor);
        this.$emit('change', this.curColor);
      },
      // 获取rgb
      getRgbaAtPoint(pos, area) {
        if (area == 'bar') {
          var imgData = this.ctx.getImageData(0, 0, 20, this.height);
        } else {
          var imgData = this.ctx.getImageData(0, 0, this.width, this.height);
        }
        var data = imgData.data;
        var dataIndex = (pos.y * imgData.width + pos.x) * 4;
        //开始消除误差
        if (pos.x >= 30 && pos.y > this.height - 3) {
          return [0, 0, 0, this.alpha];
        }
        if (pos.x >= 30 && pos.y <= 1) {
          data[dataIndex] = 255;
        }
        if (pos.x >= 30 && pos.x <= 31) {
          return [
            data[dataIndex],
            data[dataIndex],
            data[dataIndex],
            this.alpha
          ]
        }
        if (pos.x >= this.width - 1) {
          return [
            data[dataIndex],
            0,
            0,
            this.alpha
          ]
        }
        // 消除误差结束
        return [
          data[dataIndex],
          data[dataIndex + 1],
          data[dataIndex + 2],
          this.alpha
        ];
      },
      // rgb/rgba色值转16进制
      rgb2hex(rgb) {
        var reg = /^(rgb|RGB)/;
        var a;
        if (reg.test(rgb)) {
          var colorArr = rgb.replace(/(?:rgba|rgb|RGBA|RGB|\(|\))*/g, "").split(',');
          var alpha = (colorArr && colorArr[3] || "").trim()
          var hex = "#" + ((1 << 24) + (parseInt(colorArr[0]) << 16) + (parseInt(colorArr[1]) << 8) + parseInt(
            colorArr[2])).toString(16).slice(1);
          if (alpha != '' && alpha != '1') {
            a = ((alpha * 255) | 1 << 8).toString(16).slice(1);
            hex = hex + a;
          }
          return hex.toUpperCase();
        } else {
          return rgb
        }
      },
      // 16进制色值转rgb
      hex2rgb(hex) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var color = hex.toLowerCase();
        if (reg.test(color)) {
          if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < color.length; i += 1) {
              colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
          }
          var colorChange = [];
          for (var i = 1; i < color.length; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
          }
          return "rgb(" + colorChange.join(",") + ")";
        } else {
          return color;
        }
      }
    }
  }
</script>

<style scoped>
	.zk__color-picker {
		position: relative;
		z-index: 2;
		border-radius: 4px;
		display: inline-block;
		margin-right: 5px;
	}

	.zk__block {
		border: 1px solid #ddd;
		padding: 7px 8px 4px;
		background: #fff;
		border-radius: 3px;
		cursor: pointer;
	}
	.zk__block.hover {
		border-color: #1676ff;
		background: #4180f814;
	}


	.zk__panel {
		position: absolute;
		top: 34px;
		left: 0;
		z-index: 9999999;
		transform-origin: center top;
		padding: 6px;
		box-sizing: content-box;
		background-color: #FFF;
		border: 1px solid #EBEEF5;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	}

	.zk__canvas {
		position: relative;
	}

	.zk__canvas canvas {
		left: 0;
		top: 0;
	}

	.zk__cur {
		width: 3px;
		height: 3px;
		outline: 2px solid #fff;
		margin-left: -1px;
		margin-top: -1px;
		position: absolute;
		border-radius: 50%;
		box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 30%), 0 0 1px 2px rgb(0 0 0 / 40%);
	}

	.zk__bar,.zk__alpha{
		background-color: #fff;
		position: absolute;
		cursor: pointer;
		border-radius: 1px;
		border: 1px solid #f0f0f0;
		box-shadow: 0 0 2px rgb(0 0 0 / 60%);
	}

	.zk__bar {
		width: 20px;
		height: 3px;
		left: 0;
		top: 0;
		margin-left: -1px;
		margin-top: -2px;
	}

	.zk__alpha{
		width: 5px;
		height: 20px;
		left: 100%;
		top: 0;
		margin-left: -3px;
		margin-top: -1px;
	}

	.zk__alpha-silder {
		position: relative;
		box-sizing: border-box;
		width: 240px;
		margin-left: 0;
		height: 18px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
	}

	.zk__alpha-silder-bar {
		position: relative;
		background: linear-gradient(to right, rgba(255, 69, 0, 0) 0%, rgb(255, 69, 0) 100%);
		height: 100%;
	}

	.zk__predefine{
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		margin: 10px 0;
	}

	.zk__predefine .zk__color-one{
		width: 18px;
		height: 18px;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		margin-right: 5px;
		margin-bottom: 5px;
		cursor: pointer;
	}

	.zk__predefine .zk__color-one.hover{
		box-shadow: 0 0 3px 2px #1676FF;
	}

	.zk__control {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
	}
	.zk__control-left{
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.zk__color-show{
		width: 18px;
		height: 18px;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		margin-right: 5px;
	}
	.zk__input {
		background-color: #FFF;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		outline: 0;
		padding: 0 15px;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100px;
		font-size: 12px;
		height: 28px;
		line-height: 28px;
	}

	.zk__input:focus {
		border-color: #409EFF;
	}

	.zk__btns {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.zk__btn-clear {
		font-size: 12px;
		color: #409EFF;
		cursor: pointer;
	}

	.zk__btn-confirm {
		padding: 7px 15px;
		margin-left: 10px;
		font-size: 12px;
		border-radius: 3px;
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		background: #FFF;
		border: 1px solid #DCDFE6;
		color: #606266;
		text-align: center;
		box-sizing: border-box;
		outline: 0;
		font-weight: 500;
	}
</style>
