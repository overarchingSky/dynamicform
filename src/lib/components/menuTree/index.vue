<template>
	<div :class="wapperClass">
		<el-menu 
				:default-active="curActive" 
				class="el-menu-vertical-demo"
				@open="handleOpen" 
				@close="handleClose" 
				:collapse="collapse" 
				:unique-opened="true"
				:router="true"
			>
			<template v-for="(item,index) in config">
				<menu-item :data="item" :index="String(index + 1)" :key="index" @mount-menu-item="updateMenuItem" ref="menuItem"></menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script>
import item from "./item";
export default {
	name: "menu-tree",
	props: {
		config: {
			type: Array,
			required: true
		},
		defaultActive: {
			//默认路由
			type: [Number, String],
			default: "/"
		},
		collapse: {
			type: Boolean,
			default: false
		},
		width: {
			type: [Number, String],
			default: 16
		},
		wapperClass: {
			type: String,
			default: "menu-tree"
		}
	},
	data() {
		return {
			menuItems: [],
			index: 0,
			curActive: this.defaultActive
		};
	},
	components: {
		[item.name]: item
	},
	methods: {
		// selectHanlder(path, keyPath){
		// 	this.$router.replace(path)
		// },
		handleOpen(key, keyPath) {
			// console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			// console.log(key, keyPath);
		},
		updateMenuItem(menuItem) {
			this.menuItems.push(menuItem);
		},
		setMenuItemActive() {
			let curPath = this.$router.history.current.fullPath.slice(1); //去掉路劲开头的‘/’符号
			let needToActiveMenuItem = this.menuItems.filter(menuItem => {
				//取消所有菜单激活状态
				if (!menuItem) {
					return;
				}
				menuItem.$el.classList.remove("is-active");
				let menuItemPath = menuItem.index.slice(1);
				return (
					!!curPath &&
					!!menuItemPath &&
					curPath.indexOf(menuItemPath) == 0
				);
			})[0];
			needToActiveMenuItem &&
				needToActiveMenuItem.$el.classList.add("is-active");

			//不要尝试用以下方式来激活菜单，会存在一些问题
			//this.curActive = this.$router.history.current.fullPath
		}
	},
	created() {
		//这里采用的原生location对象获取路由，因为此时vue-Router信息还没初始化成功，通过它获取不到
		let path = window.location.href.replace(
			window.location.origin + "/#",
			""
		);
		if (this.defaultActive !== path) {
			this.curActive = path;
		}
		window.addEventListener("hashchange", this.setMenuItemActive);
	},
	beforeDestroy() {
		window.removeEventListener("hashchange", this.setMenuItemActive);
	}
};
</script>
<style lang="less">
.menu-tree {
	text-align: left;
	overflow-y: auto;
	.el-menu {
		background-color: transparent !important;
		.el-submenu__title,
		.el-menu-item {
			color: rgba(255, 255, 255, 0.6);
			&:hover {
				background-color: #6c8441;
			}
			&.is-active {
				color: rgba(255, 255, 255, 1);
				background-color: #6c8441;
			}
		}
	}
}
</style>
