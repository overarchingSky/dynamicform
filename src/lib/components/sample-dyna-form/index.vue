<template>
	<el-form :label-width="labelWidth">
		<!-- text 单行输入-->
		<el-form-item v-for="(item,index) in config" :label="item.label" :prop="item.key" :key="index"><!-- v-if="!hideLabel" -->
				<el-input v-if="item.type=='textarea'" :disabled="disabled" type="textarea" v-model="value[index][item.key]"></el-input>
				<el-checkbox-group v-if="item.type=='checkbox'" :disabled="disabled" v-model="value[index][item.key]">
						<div class="check-group">
							<el-checkbox v-for="(atem,index) in item.options" :key="index" :label="atem.label/*atem.key*/"></el-checkbox>
						</div>
				</el-checkbox-group>
				<div class="child-item" v-if="item.child">
					<el-input :type="atem.type" :disabled="disabled" v-for="(atem,andex) in item.child" :key="andex" v-model="value[index][atem.key]"></el-input>
				</div>
		</el-form-item>
	</el-form>
</template>
<script>
	export default{
		name:'sample-dyna-form',
		props:{
			config:{
				type:Array,
				required:true
			},
			value:{
				type:[Array],
				required:true,
			},
			labelWidth:{
				type:[Number,String]
			},
			disabled: false
		},
		created(){
			this.config.forEach(item => {
				let obj = {
					[item.key]:item.type == 'checkbox' ? [] : ''
				}
				this.value.push(obj)
			})
		},
	}
</script>
