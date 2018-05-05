<template>
  <div>
	  <el-collapse v-model="activeNames">
		<el-collapse-item title="基础组件" name="1">
			<base-input v-for="type in bases" class="draggable" :type="type" :key="type"></base-input>
				
		</el-collapse-item>
		<el-collapse-item title="高级组件" name="2">
			<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
			<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
		</el-collapse-item>
	</el-collapse>
  </div>
</template>

<script>
import base from "./base";
import draggable from "vuedraggable";
export default {
	name: "warehouse",
	components: {
		[base.name]: base,
		draggable
	},
	data() {
		return {
			activeNames: ["1", "2"],
			bases: [
				"text",
				"textarea",
				"number",
				"radio",
				"radio-input",
				"select",
				"select-add",
				"date",
				"address"
			]
		};
	},
	methods: {}
};
</script>

<style lang="less">
.draggable {
}
.flip-list-move {
	transition: transform 0.5s;
}
.no-move {
	transition: transform 0s;
}
</style>
