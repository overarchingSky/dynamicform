<template>
    <el-input class="textarea" type="textarea" :autosize="{ minRows: 2}" :placeholder="placeholder" @input="updateValue" :value="value" :disabled="!editable"></el-input>
</template>
<script>
export default {
	name: "v-textarea",
	props: {
		value: String,
		options: {
			type: Object,
			required: true
		},
		editable: Boolean
	},
	data() {
		return {
			placeholder: this.options.placeholder,
			autosize: {
				minRows: 2
			}
		};
	},
	methods: {
		updateValue(val) {
			this.$emit("input", val);
		}
	},
	style: {
		"min-width": 250
	}
};
</script>
<style>
.el-textarea__inner {
	font-family: Arial;
}
</style>

