<template>
  <el-input :value="value" :placeholder="placeholder" @input="updateValue" v-on="$listeners" v-bind="$attrs" :disabled="!editable"/>
</template>

<script>
export default {
	name: "v-text",
	props: {
		value: [String, Number],
		options: {
			type: Object,
			required: true
		},
		editable: Boolean
	},
	data() {
		return {
			placeholder: this.options.placeholder
		};
	},
	methods: {
		updateValue(val) {
			this.$emit("input", val);
		}
	}
};
</script>

<style>

</style>
