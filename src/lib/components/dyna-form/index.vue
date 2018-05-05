<template>
   <div id="group-form">
	   <div class="wt-form-edit" v-if="type=='edit'">
			 <el-form disabled :label-width="labelWidth">
				<div class="section" v-for="(item,index) in group" :key="index">
					<form-item v-for="cell in item" :key="cell.question_info.key" :data="cell" v-if="cell.question_info.display && (cell.question_info.display == 1 || cell.question_info.display == '1')"  @toggleRealatedField="toggleRealatedField" :hideLabel="cell.question_info.hideLabel" :values="value" @input="setFormValue" v-model="cell.tempValue" @delete="removeFormValue"></form-item>
				</div>
			</el-form>
		</div>
		<div class="wt-form-scan" v-else-if="type=='scan'">
			<scan-item :data="item" v-for="(item,index) in value" :key="index" ></scan-item>
		</div>
	</div>
</template>
<script>

	import formItem from './form-item'
	import scanItem from './scan_item'
	export default {
		name:'dyna-form',
		props: {
			labelWidth:{
				type:[String,Number]
			},
			data:{
				type:Array,
				required:true,
			},
			value:{
				type:Array
			},
			type:{
				type:String,
				default:'edit'
			},
			returnValueFormat:{//['key-value','array',function]
				type:[String,Function],
				default:'array'
			},
		},
		data(){
			return {
				//用来存放临时显示的关联问题
				tempQuestion:{},
				group:[],
				//表单所有项的值
				formValue:[],
				form:this.data,
			}
		},
		components:{
			formItem,
			scanItem
		},
		watch:{
			data:function(val){
				this.form = [].concat(val)
				this.group = this.groupTo()
			},
		},
		created(){
			this.group = this.groupTo()
			
		},
		methods:{
			setFormValue:function(val){
				if(!val) return
				if(val == undefined) return
				let index = this.formValue.findIndex(item => {
					return item.key == val.key
				})
				if(index >= 0){//更新值
					this.formValue[index] = val
				}else{//添加值
					this.formValue.push(val)
				}
				this.outputFormValue(this.formValue)
			},
			outputFormValue(formValue){
				let outputValue = Object.assign({},formValue)
				if(Object.prototype.toString.call(this.returnValueFormat) == '[object Function]'){
					outputValue = this.returnValueFormat(outputValue)
				}else if(this.returnValueFormat == 'key-value'){
					let keyValue = {}
					this.formValue.forEach(item => {
						keyValue[item.key] = item.value
					})
					outputValue = keyValue
				}else if(this.returnValueFormat == 'array'){
					//原样输出，不做格式处理
				}
				this.$emit('update-form-value', outputValue)
			},
			removeFormValue:function(val){ 
				this.formValue = this.formValue.filter(item => {
					return item.question_id != val.question_id
				})
				this.outputFormValue(this.formValue)
			},
			hideFormItem:function(id){//隐藏关联项
				this.$nextTick(() => {
					let cur_question = this.data.find(item => {
						return item.question_info.id == id
					})
					let nexts = this.findAllRelationQuestion(cur_question)
					nexts.forEach(item => {
						item.question_info.display = 0
					})
				})
			},
			findAllRelationQuestion:function(question,deep){//递归查找所有关联项（如关联项的关联项，关联项的关联项的关联项。。。）
				let res = deep?deep:[]
				if(question.question_info.next_question_id){
					res.push(this.data.find(item => {
						return item.id == question.question_info.next_question_id
					}))
				}else if(question.options){
					question.options.forEach(item => {
						if(item.next_question_id){
							let next_question = this.data.find(nav => {
								return nav.question_info.id == item.next_question_id
							})
							if(next_question){
								res.push(next_question)
								res = this.findAllRelationQuestion(next_question,res)
							}
						}
					})
				}
				return res
			},
			showFormItem:function(next_question_id){//显示指定id对应的问题
				this.$nextTick(() => {
					let next_question = this.data.find(item => {
						return item.question_info.id == next_question_id
					})
					if(next_question){
						next_question.question_info.display = 1
					}
				})
			},
			toggleRealatedField: function(id,next_question_id){
				if(next_question_id){
					this.showFormItem(next_question_id)
				}else{
					this.hideFormItem(id)
				}
			},
			groupTo:function(){//分组问题
				if(this.type == "scan") return []
				//分组，产生一个二维数组
				let res = []
				for(let i = 0; i < this.form.length; i++) {
					let item = this.form[i]
					if(item.question_info.display == '0' || item.question_info.display == 0){
						item.question_info.hideLabel = true
					}else{
						item.question_info.hideLabel = false
					}
					res[item.question_info.block_index] = res[item.question_info.block_index] || []
					res[item.question_info.block_index][item.question_info.question_index] = item
				}
				//这里用filter是为了去掉二维数组中一维中的空项，上面的循环可能产生类似[{...},,,,,{...}]这种数组，需要去掉空项，返回[{...},{....}]
				res = res.filter(item => {
					return item != undefined
				})
				//去掉二维数组中二维的空项
				res.forEach((item,index) => {
					item = item.filter(cell => cell != undefined)
					res[index] = item
				})
				return res
			}
		}
	}
</script>
<style>
.section{
	margin:10px 0;
	overflow: hidden;
}
</style>

