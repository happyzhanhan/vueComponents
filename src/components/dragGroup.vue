<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/valid-v-for -->
<!--本组件规则：适用于2级的结构，组和图层，并且因为转成后台数据存入数据库，所以存储结构为对象数组，组保存于图层中一个属性，所以空组会被删除
    其他规则：组不可以套组，图层不可以套图层，组和图层都可以移动顺序；组删除图层被删除；组的眼睛影响所有图层的显示和隐藏-->
<template>
	<div class="layerMoule">
		<button @click="addGroupSite" size="mini">新增组</button>
		<button @click="addSite" size="mini">新增图层</button>
		<button @click="saveSort" size="mini">保存</button>

		<!--<el-scrollbar style="height:360px">-->
			<draggable group="A" handle=".mover" ghost-class="ghost" chosen-class="chosenClass" drag-class="dragClass" :list="realList" :value="value" :move="dragMove" @start="dragStart" @end="dragEnd" @change="dragChange" @input="saveSort">
				<!--// eslint-disable-next-line vue/valid-v-for, vue/no-parsing-error-->
				<div v-for="item,i in realList" :key="item.id" class="groupBig" :class="{'hover': curId === item.id}">
					<div :class="item.isGroup ? 'groupOne':'childOne'">
						<div class="groupLeft">
							<div class="groupLeftIcon">
								<i class="zhiconfont zhiconfont-xiangxia" :class="{'show':item.isClose}" v-show="item.isGroup && item.links.length>0" @click="changeGroupShow(item,i)"></i>
							</div>
							<div class="groupName mover" @click="selectOne(item)">
								<i v-if="item.isGroup===0" class="zknicon" :class="item.icon"></i>
								<b v-if="!item.isEdit" :title="item.name">{{ item.name || "组" }}</b>
								<input type="text" v-if="item.isEdit" v-model="item.name" size="mini" />
							</div>
						</div>
						<!--图层默认显示操作，组不显示（选中并展开才可操作组）-->
						<div class="groupOperation" v-show="((curId === item.id && !item.isClose) || !item.isGroup) && !item.isEdit ">
            <span v-if="item.isGroup === 1">
              <i class="zhiconfont zhiconfont-yanjing1" v-if="computedVisible(item) && item.links && item.links.length>0" @click="conVisible(item,i,false)"> </i>
              <i class="zhiconfont zhiconfont-yanjing" v-if="!computedVisible(item) && item.links && item.links.length>0" @click="conVisible(item,i,true)"> </i>
            </span>
							<span v-if="item.isGroup === 0">
              <i class="zhiconfont zhiconfont-yanjing1" v-if="!item.visible" @click="item.visible = !item.visible"> </i>
              <i class="zhiconfont zhiconfont-yanjing" v-if="item.visible" @click="item.visible = !item.visible"> </i>
            </span>
							<i @click="editGroupSite(item,i)" class="zhiconfont zhiconfont-bianji"></i>
							<i @click="deleteGroupSite(item,i)" class="zhiconfont zhiconfont-shanchu btngry"></i>
						</div>
						<div class="groupOperation smalbg" v-if="item.isEdit">
							<i class="zhiconfont zhiconfont-baocun1" @click="saveName(item,i)"> </i>
						</div>
					</div>
					<!--<el-collapse-transition>-->
						<!--图层不允许加叶子节点，折叠时也不允许拖拽-->
						<draggable group="A" handle=".mover" ghost-class="ghost" chosen-class="chosenClass" drag-class="dragClass" :list="item.links" :disabled="childrenDisabled" v-if="!item.isClose && item.links" :move="dragMove" @start="dragStart" @end="dragEnd" @change="dragChange" @input="saveSort">
							<div class="childBig" v-for="itm,n in item.links" :key="itm.id" :class="{'hover': curId === itm.id}">
								<div class="groupChildren">
									<div class="childName mover" @click="selectOne(itm)">
										<i v-if="itm.isGroup===0" class="zhiconfont" :class="itm.icon"></i>
										<b v-if="!itm.isEdit" :title="itm.name">{{ itm.name }}</b>
										<input type="text" v-if="itm.isEdit" v-model="itm.name" size="mini" />
									</div>
									<div class="childOperation morebg" v-show="!itm.isEdit">
										<i class="zhiconfont zhiconfont-yanjing1" v-if="!itm.visible" @click="itm.visible = !itm.visible"> </i>
										<i class="zhiconfont zhiconfont-yanjing" v-if="itm.visible" @click="itm.visible = !itm.visible"> </i>
										<i @click="editSonSite(itm)" class="zhiconfont zhiconfont-bianji"></i>
										<i @click="deleteSonSite(itm, n, i)" class="zhiconfont zhiconfont-shanchu btngry"></i>
									</div>
									<div class="childOperation" v-if="itm.isEdit">
										<i class="zhiconfont zhiconfont-baocun1" @click="saveName(itm,i)"> </i>
									</div>
								</div>
							</div>
						</draggable>
					<!--</el-collapse-transition>-->
				</div>
			</draggable>
		<!--</el-scrollbar>-->
	</div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: 'dragGroup',
    components: {
      draggable
    },
    props: {
      value: {
        required: false,
        type: Array,
        default: null
      },
			initId: {
				required: false,
				type: Number,
        default: 1
			}
    },
    data () {
      return {
        groupId: this.initId, // 自增id
        curId: 2, // 当前选中id
        curIsGroup: 0, // 0图层 1组
        childrenDisabled: false, // 叶子排除禁止
        realList: this.value || []
      }
    },
    computed: {},
    methods: {
      // 显示组的眼睛
      computedVisible (item) {
        let visible = true
        if (item.isGroup === 1 && item.links && item.links.length > 0) {
          item.links.forEach(one => {
            visible = one.visible
          })
        }
        return visible
      },

      // 改变组收缩
      changeGroupShow (item, i) {
        this.$set(this.realList[i], 'isClose', this.realList[i].isClose === 1 ? 0 : 1)
      },
      // 新增组站点
      addGroupSite () {
        this.realList.unshift({
          name: `G_${this.groupId}`,
          id: this.groupId,
          visible: true,
          isGroup: 1,
          isClose: 0,
          isEdit: 0,
          links: []
        })
        this.curId = this.groupId
        this.curIsGroup = 1
        this.groupId++
      },
      // 新增图层
      addSite () {
        let newItem = {
          name: `T_${this.groupId}`,
          id: this.groupId,
          icon: 'zhiconfont-iconfontwenzi',
          isEdit: 0,
          visible: true,
          isGroup: 0
        }
        if (this.curIsGroup === 0) {
          // 如果当前选择是图层
          let cur = this.realList.find(group => {
            if (group.isGroup === 1 && group.links.length > 0) {
              let res = group.links.find(one => one.id === this.curId)
              return res
            }
          })
          if (cur) {
            // 如果当前选择图层在组里
            cur.isClose = 0 // 添加到组组先展开
            cur.links.unshift(newItem)
          } else {
            // 如果当前选择图层在根目录
            this.realList.unshift(newItem)
          }
        } else if (this.curIsGroup === 1) {
          // 如果当前选择是组
          let curIndex = this.realList.findIndex(one => one.id === this.curId)
          this.$set(this.realList[curIndex], 'isClose', 0) // 添加到组组先展开
          this.realList[curIndex].links.unshift(newItem)
        } else if (this.curIsGroup === undefined || this.curIsGroup === null) {
          // 当前没有选择，则加在根目录
          this.realList.unshift(newItem)
        }
        this.curId = this.groupId
        this.curIsGroup = 0
        this.groupId++
      },
      // 全组展示
      conVisible (item, i, bol) {
        item.links && item.links.forEach(one => {
          one.visible = bol
        })
      },
      // 编辑组站点
      editGroupSite (item) {
        item.isEdit = 1
      },
      // 保存组名称
      saveName (item, index) {
        item.isEdit = 0
      },
      // 编辑子站点
      editSonSite (itm) {
        itm.isEdit = 1
      },
      // 删除组站点
      deleteGroupSite (item, index) {
        this.realList.splice(index, 1)
        this.curId = null // 选中取消
        this.curIsGroup = null // 选中类型取消
      },
      // 删除子站点
      deleteSonSite (itm, index, pindex) {
        this.realList[pindex].links.splice(index, 1)
        this.curId = null // 选中取消
        this.curIsGroup = null // 选中类型取消
      },
      // 拖拽开始
      dragStart (evt) {
        this.curId = null // 拖拽开始选中取消
        this.curIsGroup = null // 拖拽开始选中取消
        if (evt.item._underlying_vm_.isGroup === 1) {
          // 如果isGroup是1则是组，不能拖入组里
          this.childrenDisabled = true
        }
      },
      // 拖拽中
      dragMove (evt, originalEvent) {
        // console.log('dragMove', evt, originalEvent)
        // 如果图层拖拽不能拖入图层下(html中判断)
      },
      // 拖拽改变
      dragChange (evt) {
        // console.log('dragChange 拖拽改变', evt)
      },
      // 拖拽结束
      dragEnd (evt) {
        // console.log('拖拽结束', evt)
        this.curId = evt.item._underlying_vm_.id
        this.curIsGroup = evt.item._underlying_vm_.isGroup
        // 防止是组禁止了拖拽
        this.childrenDisabled = false
        this.saveSort() // 提交一下排列
      },
      // 选择节点
      selectOne (item) {
        if (item.id !== this.curId) {
          this.curId = item.id
          this.curIsGroup = item.isGroup
          // 选择节点为组默认展开
          if (item.isGroup === 1) {
            item.isClose = 0
          }
        } else {
          this.curId = null // 选中取消
          this.curIsGroup = null // 选中类型取消
        }
      },
      // 两级数据组装成一级
      groupToList (group, groupName) {
        return group.reduce((root, item) => {
          if (item.isGroup === 0) {
            item.groupName = groupName || null
            root.push(item)
          } else {
            item.links.length > 0 && root.push(...this.groupToList(item.links, item.name))
          }
          return root
        }, [])
      },
      // 一级转成两级图层组
      listToGroup (list) {
        let group = {}
        let newGroup = []
        let id = 1
        // 建立组对象
        list.forEach(one => {
          if (one.groupName) {
            group[one.groupName] = {
              name: one.groupName,
              id: id,
              visible: true,
              isGroup: 1,
              isClose: 0,
              isEdit: 0,
              links: []
            }
          }
          id++
        })
        // 向组对象中遍历添加子对象
        list.forEach(item => {
          if (item.groupName !== null) {
            group[item.groupName].links.push({
              name: item.name,
              id: item.id,
              icon: item.icon,
              isEdit: 0,
              visible: item.visible,
              isGroup: 0
            })
          }
        })
        // 按层级组装出newGroup
        list.forEach(item => {
          if (item.groupName === null) {
            newGroup.push({
              name: item.name,
              id: item.id,
              icon: item.icon,
              isEdit: 0,
              visible: item.visible,
              isGroup: 0
            })
          } else if (Object.keys(group).includes(item.groupName)) {
            newGroup.push(group[item.groupName])
            delete group[item.groupName]
          }
        })
        return newGroup
      },
      // 保存排序
      saveSort () {
        let newArry = this.groupToList(JSON.parse(JSON.stringify(this.realList)), null)
        console.log('newArry', newArry)
        let newGroup = this.listToGroup(newArry)
        console.log('newGroup', newGroup)

        this.$emit('input', this.realList)
        this.$emit('changeLayer', this.realList)
      }
    }
  }
</script>

<style lang="scss" scoped>

	@import url("../assets/fonts/input/zhiconfontsvg.css");

	.layerMoule {
		width: 100%;
		padding: 0 10px;
		box-sizing: border-box;
		background: #fff;
		text-align: left;
		line-height: 30px;

		b {
			font-weight: normal;
			text-align: left;
			width: 100px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		input {
			height: 28px;
			outline: none;
			font-size: 12px;
			line-height: 28px;
			border: 1px solid #eee;
			width: 80%;

			&:focus {
				border: 1px solid #1676ff;
			}
		}

		.zknicon {
			margin: 5px;
			width: 16px;
			height: 16px;
		}

		.groupOne {
			position: relative;
			background: #eee;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.groupLeft {
				display: flex;
				flex-direction: row;
				width: 100%;

				.groupLeftIcon {
					width: 30px;
				}

				.zhiconfont-xiangxia {
					font-size: 16px;
					line-height: 30px;
					margin-right: 5px;
					transition: all 0.1s;

					&:hover {
						cursor: pointer;
						color: #1676ff;
					}

					&.show {
						transform: rotate(-90deg);
					}
				}
			}

			.groupName {
				width: 100%;
				font-size: 14px;
				display: flex;
				flex-direction: row;
				justify-content: left;
				cursor: move;

			}

			.groupOperation {
				position: absolute;
				right: 0;
				width: 80px;
				background-image: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 1));
				display: flex;
				flex-direction: row;
				justify-content: right;
				padding-right: 3px;
				font-size: 12px;
				height: 30px;

				&.smalbg {
					width: 30px;
				}

				.el-icon-edit,
				.zhiconfont-baocun1 {
					font-size: 30px;
					line-height: 30px;
				}

				i {
					cursor: pointer;
					margin-right: 5px;

					&:hover {
						color: #1676ff;
					}
				}
			}

		}

		.groupBig,
		.childBig {
			border: 1px solid #ddd;
			box-sizing: border-box;

			&.ghost {
				// 占位
				opacity: 0.5;
				background: #e0e6f2;
				border: 1px dashed #4180F8;
			}

		}

		.groupBig {
			margin-bottom: 4px;
			background: #eee;

			.chosenClass {
				// 占位样式（图层缩进）
				margin: 0 0 0 30px;
				opacity: 0.5;
			}

			.ghost {
				// 占位
				margin: 0 0 0 30px;
			}

			&.hover {
				// 选中样式
				border: 1px solid #1676ff;

				.groupOne .groupName {
					color: #1676ff;
				}

				.childOne {
					background: #d1defd;
				}
			}

			&.dragClass {

				// 拖拽时样式
				.childOne {
					border: 1px solid #1676ff;
					background: #d1defd;
				}
			}
		}

		.childBig {
			margin: 0 0 0 30px;
			box-sizing: border-box;

			&.hover {
				// 选中样式
				border: 1px solid #1676ff;

				.groupChildren {
					background: #d1defd;
				}

			}

			&.dragClass {

				// 拖拽时样式
				.groupChildren {
					border: 1px solid #1676ff;
					background: #d1defd;
				}
			}
		}

		.chosenClass {
			// 占位样式
			margin: 0 0 0 0;
		}

		.childOne {
			position: relative;
			background: #fff;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.groupLeft{
				width: 100%;
			}

			.groupName {
				font-size: 14px;
				display: flex;
				flex-direction: row;
				justify-content: left;
				cursor: move;

				input {
					width: 80%;
				}

			}

			.groupOperation {
				position: absolute;
				right: 0;
				width: 80px;
				background-image: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
				display: flex;
				flex-direction: row;
				justify-content: right;
				/*visibility: hidden;*/
				padding-right: 3px;
				font-size: 12px;
				height: 30px;
				color: #999;

				&.smalbg {
					width: 30px;
					visibility: visible;
				}

				.el-icon-edit,
				.zhiconfont-baocun1 {
					font-size: 16px;
					line-height: 30px;
				}

				i {
					margin-right: 5px;
					cursor: pointer;

					&:hover {
						color: #1676ff;
					}

				}
			}

			// 根下图层感应显示按钮
			&:hover {
				.groupOperation {
					visibility: visible;
				}
			}
		}

		.groupChildren {
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			background: #fff;

			.childName {
				width: calc(100% - 30px);
				font-size: 14px;
				display: flex;
				flex-direction: row;
				justify-content: left;
				cursor: move;

				input {
					width:  80%;
				}

			}

			.childOperation {
				position: absolute;
				right: 0;

				display: flex;
				flex-direction: row;
				justify-content: right;

				padding-right: 3px;
				font-size: 14px;
				height: 30px;
				color: #999;

				&.morebg {
					width: 80px;
					/*visibility: hidden;*/
					background-image: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
				}

				.el-icon-edit,
				.zhiconfont-baocun1 {
					font-size: 16px;
					line-height: 30px;
				}

				i {
					margin-right: 5px;
					cursor: pointer;

					&:hover {
						color: #1676ff;
					}
				}
			}

			// 组内图层感应显示按钮
			&:hover {
				.morebg {
					visibility: visible;
				}
			}
		}

		.childBig.hover {

			// 选中的操作背景色
			.morebg {
				width: 80px;
				background-image: linear-gradient(to right, rgba(209, 222, 253, 0.8), rgba(209, 222, 253, 1));
			}
		}

		.groupBig.hover .childOne {

			// 选中的操作背景色
			.groupOperation {
				background-image: linear-gradient(to right, rgba(209, 222, 253, 0.8), rgba(209, 222, 253, 1));
			}
		}
	}
</style>
