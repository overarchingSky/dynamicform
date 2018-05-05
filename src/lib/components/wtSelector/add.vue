<!--
参数：
btnText:添加按钮上的文字
confirmHandler:确认按钮回调
closeHandler:取消按钮回调
loading:是否显示加载提示
以下参数，格式参见本目录下index组件
options，multiple，value
-->
<template>
	<div class="selector-add">
		<wt-selector v-bind="$attrs" :options:="options" v-model="selecteds"></wt-selector>
		<span style="display: inline-block;width: 25px">
			<i :class="{'el-icon-loading':loading}"></i>
		</span>
		<el-button type="primary" @click="addHandler" icon="plus" class="add">{{btnText}}</el-button>
		<el-dialog :title="btnText" :visible.sync="dialogVisible" :size="size">
			<slot></slot>
  <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </div>
		</el-dialog>
	</div>
</template>
<script>
	import wtSelector from './index'
	export default {
		name:'wt-selector-add',
		props:{
			btnText:{
				type:String,
				default:'add'
			},
			confirmHandler:{
				type:Function,
				default:function(){
					
				}
			},
			closeHandler:{
				type:Function,
				default:function(){
				}
			},
			loading:{
				type:Boolean,
				default:false,
			},
			value:{
				type:[String,Array]
			},
			size:{
				type:String,
				default:'tiny'
			}
		},
		data(){
			return {
				selecteds:this.value,
				dialogVisible:false,
				options:''
			}
		},
		watch:{
			selecteds(val){
				this.$emit('input',val)
			},
			value(val){
				this.selecteds = val
			}
		},
		components:{
			[wtSelector.name]:wtSelector
		},
		methods:{
			addHandler(){
				this.dialogVisible = true
			},
			close(){
				this.closeHandler()
				this.dialogVisible = false
			},
			confirm(){
				this.confirmHandler(this.close)
			}
		}
	}
</script>
<style lang="less">
	.selector-add{
		
	}
</style>