<template>
	<component :is="curComponent" :index="curComponent == 'el-submenu' ? key : data.action" v-if="checkAuth(data.auth)" ref="muenItem">
		<template slot="title" v-if="curComponent == 'el-submenu'">
			<i :class="data.icon"></i>
			<span slot="title" >{{data.text}}</span>
		</template>
		<template v-for="(item,aIndex) in data.children">
			<menu-item :data="item" v-if="curComponent == 'el-submenu' && checkAuth(item.auth)" :index="String(aIndex + 1)" :layer="key" :key="aIndex" @mount-menu-item="updateMenuItem"></menu-item>
		</template>
		<template v-if="curComponent == 'el-menu-item'">
			<i :class="data.icon"></i>
			<span slot="title">{{data.text}}</span>
		</template>
	</component>
		<!-- <el-submenu v-if="data.children && checkAuth(data.auth)" :index="key">
			<template slot="title">
				<i :class="data.icon"></i>
				<span slot="title" >{{data.text}}</span>
			</template>
			<template v-for="(item,aIndex) in data.children">
				<menu-item :data="item"  v-if="checkAuth(item.auth)" :index="String(aIndex + 1)" :layer="key" :key="aIndex"></menu-item>
			</template>
		</el-submenu>
		<el-menu-item v-else-if="checkAuth(data.auth)" :index="data.action">
			<i :class="data.icon"></i>
			<span slot="title">{{data.text}}</span>
		</el-menu-item> -->
</template>
<script>
	export default{
		name:'menu-item',
		props:{
			data:{
				type:Object,
				required:true
			},
			index:{
				type:String,
				required:true
			},
			layer:{
				type:String,
			}
		},
		computed:{
			key(){
				return this.layer ? this.layer + '-' + this.index : this.index
			},
			curComponent(){
				return this.data.children ? 'el-submenu' : 'el-menu-item'
			},
		},
		methods:{
			checkAuth(arr){
				return this.$auth.check(arr)
			},
			updateMenuItem(menuItem) {
				this.$emit('mount-menu-item',menuItem)
			}
		},
		mounted(){
			if(this.curComponent === 'el-menu-item'){
				this.$emit('mount-menu-item',this.$refs.muenItem)
			}
		},
	}
</script>