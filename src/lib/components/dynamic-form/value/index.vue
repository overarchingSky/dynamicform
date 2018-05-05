<template>
<div>
  <component :is="type" v-bind="$attrs" :options="options" v-on="$listeners"></component></div>
</template>

<script>
import Layout from "./layout"; //目前支持form、和table
import form from "./layout/form";
export default {
	name: "dynamic-form-value",
	props: {
		// value: {
		//   type: Array,
		//   required: true
		// },
		options: {
			type: Object,
			required: true
		},
		layout: String
	},
	computed: {
		type() {
			return (
				(this.layout && `v-layout-${this.layout}`) ||
				(this.options.multiple ? "v-layout-table" : "v-layout-form")
			);
		}
	},
	components: {
		//ssss: form
		...Layout
	}
};
</script>

<style lang="less">

</style>
