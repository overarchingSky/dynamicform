<template>
  <el-tabs type="border-card"  v-model="curTab" :curTab="curTab">
	<el-tab-pane label="字段">
		<dynamic-form :options="configOptions" v-if="options"></dynamic-form>
	</el-tab-pane>
	<el-tab-pane label="表单">
		<dynamic-form :options="formConfig"></dynamic-form>
	</el-tab-pane>
	</el-tabs>
</template>

<script>
import dynamicForm from "../../form";
import formConfig from "./form-config";
import fieldConfig from "./field-config";
export default {
	name: "edit-panel",
	props: {
		options: {
			type: [Object]
		},
		activeTab: {
			type: String,
			defualt: "字段"
		}
	},
	components: {
		dynamicForm
	},
	data() {
		return {
			formConfig,
			curTab: this.activeTab
		};
	},
	watch: {
		activeTab() {
			this.curTab = this.activeTab;
		}
	},
	computed: {
		configOptions() {
			return fieldConfig[this.options.type].create();
		}
	}
};
</script>

<style>

</style>
