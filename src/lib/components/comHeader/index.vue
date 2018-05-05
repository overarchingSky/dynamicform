<template>
	<div class="header">
		<el-row>
			<el-col :span="16" style="min-width:20rem;">
				<search @toggle-search="searchHanlder"></search>
			</el-col>
			<el-col :span="8">
				<user></user>
			</el-col>
		</el-row>
		
	</div>
</template>
<script>
import search from './search'
import user from './user'
export default{
	components:{
		search,
		user
	},
	methods:{
		searchHanlder(keys){
			alert(keys)
		}
	}
}
</script>
<style lang="less">
	.header{
		padding:0.9rem 5rem;
		background:#fff;
	}
</style>