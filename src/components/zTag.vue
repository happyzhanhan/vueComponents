<script>
  export default {
    name: "zTag",
	  props:{
      text:{
        type: String,
	      default: 'Tag'
      },
		  color:{
        type: String,
			  default: '#1676FF'
		  },
		  bgColor:{
        type: String,
        default: '#e8f1ff'
		  },
		  borColor:{
        type: String,
        default: '#d0e4ff'
		  },
      disableTransitions: {
        type: Boolean,
	      default: false
      }
	  },
    render(h) {
      const { color, bgColor, borColor } = this;
      const classes = [
        'zk-tag',
      ];
      const tagEl = (
        <span
	      class={ classes }
	      style={{ backgroundColor: bgColor,color: color,borderColor: borColor }}>
	        { this.$slots.default }
	    </span>
	    );

      return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
    }
  }
</script>

<style scoped lang="scss">
.zk-tag{
	background-color: #e8f1ff;
	border-color: #d0e4ff;
	display: inline-block;
	height: 32px;
	padding: 0 10px;
	line-height: 30px;
	font-size: 12px;
	color: #1676FF;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	box-sizing: border-box;
	white-space: nowrap;
}
</style>
