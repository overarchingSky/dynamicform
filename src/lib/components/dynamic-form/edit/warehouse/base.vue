<template>
<el-tag draggable="true" @dragstart.native="onDragstart">
  {{title}}
</el-tag>
  
</template>

<script>
export default {
	name: "base-input",
	props: {
		type: String
	},
	computed: {
		title() {
			switch (this.type) {
				case "text":
					return "单行文本";
				case "textarea":
					return "多行文本";
				case "number":
					return "数字";
				case "date":
					return "日期时间";
				case "radio":
					return "单选按钮";
				case "radio-input":
					return "带文本框的单选按钮";
				case "checkbox":
					return "复选框";
				case "select":
					return "下拉框";
				case "select-add":
					return "可添加下拉框";
				case "address":
					return "地址";
			}
		},
		defaultOptions() {
			let hasOption = ["select", "radio", "checkbox", "select-add"];
			let options = {
				label: "",
				type: this.type
			};
			if (hasOption.findIndex(item => item == this.type) > -1) {
				options.options = [
					{
						label: "示例选项一"
					},
					{
						label: "示例选项二"
					}
				];
			}
			return options;
		}
	},
	methods: {
		onDragstart(e) {
			e.dataTransfer.setData(
				"drag-data",
				JSON.stringify(this.defaultOptions)
			);
		}
	},
	created() {}
};
</script>

<style lang='less' scoped>
.el-tag {
	margin-bottom: 0.5rem;
	min-width: 90%;
	cursor: move;
	border: none;
	border-width: 1px;
	box-sizing: border-box;
	outline: 0;
	&.sortable-chosen {
		border-style: dashed;
	}
	&:hover {
		border-style: dashed;
	}
}
</style>
