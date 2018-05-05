<template>
  <child-dynamic-form :parent-feild="name" :options="options"  v-bind="$attrs" v-on="$listeners" @value-change="valueChangeHandler"></child-dynamic-form>
</template>

<script>
import { getParentComponentOptions } from "../../utils";
export default {
	name: "v-subform",
	props: {
		options: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			name: this.options.name
		};
	},
	methods: {
		valueChangeHandler(val) {
			this.$emit("valueUpdate", val);
		}
	},
	created() {
		delete this.$listeners["value-change"];
		//将dynamic-form组件注册为子组件，这里因为webpack循环调用的问题，导致不能import dynamic-form组件，暂时用这种方式
		let dynamicForm = getParentComponentOptions(this, "dynamic-form");
		this.$options.components["child-dynamic-form"] = dynamicForm;
	}
};
</script>

<style>

</style>
