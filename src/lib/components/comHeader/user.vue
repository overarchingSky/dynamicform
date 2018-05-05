<template>
	<div class="user-ctrl">
		<el-row>
			<el-col :span="16" class="user-head">
				<img src="/static/images/logo2.png" class="user-head-img" @click="clickHandler" />
				<span class="user-name" v-text="userInfo.username"></span>
			</el-col>
			<el-col :span="8" class="ctrl btns">
				<el-button size="small" @click="logout">注销</el-button>
			</el-col>
		</el-row>
		
	</div>
</template>
<script>
export default{	
	data(){
		return{
			userInfo:{}
		}
	},
	methods:{
		clickHandler(){
			alert('你好！')
		},
		logout(){
			this.$confirm('此操作将退出当前登录用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          	this.$auth.logout()
        })
		}
	},
	created(){
		this.userInfo = this.$auth.user()	
	}
}
</script>
<style lang="less">
.user-ctrl{
	.user-head{
		text-align:right;
		.user-head-img{
			height:1.8rem;
			padding:0;
			margin:0;
			border-radius:50%;
			cursor:pointer;
			vertical-align:middle;
			&:hover{
				// box-shadow:0 0 1px 1px #ccc;
			}
		}
		.user-name{
			font-size:1rem;
		}
	}
	.btns{
		font-size:1rem;
		line-height:1;
		.el-button{
			color:red;
			border-color:red;
			margin-left: 1rem;
			&:hover{
				color:darken(red,10%);
				border-color:darken(red,10%);
			}
		}
	}
}
</style>