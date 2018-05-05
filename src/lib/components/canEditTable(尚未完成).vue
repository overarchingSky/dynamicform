<template>
	<div id="microserve">
		<div class="page-header" v-text="'微服务配置'"></div>
		<el-table
			ref="table"
			:data="serves"
			style="width: 100%"
			highlight-current-row
    		@current-change="edit"
			:row-class-name="tableRowClassName">
			<el-table-column
			prop="name"
			label="name"
			width="180">
				<template scope="filed">
					<el-input v-if="filed.row.editing" v-model="filed.row.name" placeholder="name"></el-input>
					<span v-text="filed.row.name" v-else></span>
				</template>
			</el-table-column>
			<el-table-column
			prop="slug"
			label="slug"
			width="180">
				<template scope="filed">
					<el-input v-if="filed.row.editing" v-model="filed.row.slug" placeholder="slug"></el-input>
					<span v-text="filed.row.slug" v-else></span>
				</template>
			</el-table-column>
			<el-table-column
			prop="description"
			label="描述">
				<template scope="filed">
					<el-input v-if="filed.row.editing" v-model="filed.row.description" placeholder="description"></el-input>
					<span v-text="filed.row.description" v-else></span>
				</template>
			</el-table-column>
			<el-table-column
			prop="comment"
			label="备注">
				<template scope="filed">
					<el-input v-if="filed.row.editing" v-model="filed.row.comment" placeholder="comment"></el-input>
					<span v-text="filed.row.comment" v-else></span>
				</template>
			</el-table-column>
			<el-table-column
			prop=""
			label="操作">
				<template scope="field">
					<el-button @click.stop="onDelete(field.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button class="button-new-tag" size="small" @click="addOptions">+ New Service</el-button>
		<el-button @click="save" :loading="loading">保存</el-button>
	</div>
</template>
<script>
	import request from 'winged/utils/axios'
	export default{
		name:'checkbox-add-delete-edit',
		data(){
			return {
				serves:[],
				value:'',
				currentRow:'',
				loading:false,
			}
		},
		methods:{
			get_micro_services(){
				request('user/config/get_micro_services', 'post', {data:'{}'}, true, response => {
					if(typeof(response) == 'string'){
						response = JSON.parse(response)
					}
					response.micro_services.forEach((item,index) => {
						item.index = index
						item.editing = false
					})
					this.serves = response.micro_services
				}, err => {
					console.log('err-get_micro_services',err)
					this.$message('获取失败！')
				}, false)
			},
			edit:function(row,oldRow){
				if(row){
					row.editing = true
				}
				if(oldRow){
					oldRow.editing = false
				}
				this.currentRow = row
			},
			save:function(){
				this.loading = true
				this.isEditing = false
				let message = this.checkField('slug')
				if(message){
					this.loading = false
					return
				}
				request('user/config/update_micro_services', 'post', {data:JSON.stringify({micro_services:this.serves})}, true, response => {
					this.$message('保存成功！')
					this.loading = false
				}, err => {
					console.log('err',err)
					this.$message('保存失败！')
					this.loading = false
				}, false)
			},
			onDelete:function(row){
				if(row.newServe){//如果搞删除的服务尚未保存到数据库，则不继续
					let index = this.serves.indexOf(row)
					this.serves.splice(index, 1);
					return
				}
				this.$confirm('此操作将从数据库中删除该服务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let index = this.serves.indexOf(row)
					this.serves.splice(index, 1);
					//从数据库中删除
					request('user/config/delete_micro_services', 'post', {data:JSON.stringify({micro_services:[{slug:row.slug}]})}, true, response => {
						this.$message('删除成功！')
					}, err => {
						console.log('err',err)
						this.$message('删除失败, 该项已重新添加回表格中！')
						this.serves.splice(index, 0, row);
					}, false)
				})
				
			},
			addOptions:function(){				
				this.serves.push({index:this.serves.length, slug:'', name:'', description:'', comment:'', editing:false, newServe:true})
				//注意：这里设置一定延时，是防止在created钩子中注册的click事件吧editing状态改回false
				setTimeout(_ => {
					//聚焦到新加的表各行，并使其进入编辑状态，即：editing设为true
					this.$refs.table.setCurrentRow(this.serves[this.serves.length - 1]);
				},20)
			},
			//保存前的检查
			checkField(key){
				//唯一性检查
				for(var i = 0, len = this.serves.length; i<len;i++){
					if(this.serves[i].slug == '' || this.serves[i].name == ''){
						this.$message('slug或name不能为空')
						return true
					}
					for(var j = i + 1; j < len; j++){
						if(this.serves[i][key] === this.serves[j][key]){
							this.$message('slug：' + this.serves[j][key] + '已经存在')
							return true
						}                 
					}
				}
				return false
			},
			tableRowClassName(row, index) {
				if (index === 1) {
				return 'info-row';
				} else if (index === 3) {
				return 'positive-row';
				}
				return '';
			}
		},
		created(){
			this.get_micro_services()
			window.addEventListener('click', e => {
				let eventPath = e.path.reverse()//el-table__body-wrapper el-table__body
				if(eventPath.length < 12 || (eventPath[12] && eventPath[12].className != 'el-table__body-wrapper')){
					this.currentRow && (this.currentRow.editing = false)
					//取消选中表格行
					this.$refs.table.setCurrentRow();
				}
			})
		}
	}
</script>
<style lang="less">
#microserve{
	max-width:1200px;
	.el-checkbox-group{
		display:inline-block;
	}
	.edit{
		padding:5px 7px!important;
	}
	.el-tag{
		height:auto;
		width:100%;
		padding:0 30px 0 0;
		margin-bottom:4px;
		.el-input{
			width:25%;
		}
	}
	.el-table{
		margin-bottom:10px;
		.info-row {
			background: #c9e5f5;
		}
		.positive-row {
			background: #e2f0e4;
		}
	} 
}
	
</style>