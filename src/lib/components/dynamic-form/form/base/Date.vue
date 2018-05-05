<template>
    <el-date-picker
    :value="value"
	ref="ssss"
    type="date"
    v-bind="$attrs"
	@input="updateValue"
    :max-width="200"
    placeholder="选择日期">
      </el-date-picker>
</template>
<script>
export default {
	name: "v-Date",
	props: {
		value: [Date, Number, String],
		options: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {};
	},
	methods: {
		updateValue(val) {
			val = Date.parse(val);
			this.$emit("input", val);
			this.$nextTick(_ => this.$emit("blur")); //这里与其他基础组件不同，是在更新值得时候，手动触发blur事件去校验。因为此类选择性组件，在选择的同时，会触发blur,而此时表单值尚未更新（即验证先于值更新了），会导致验证始终是失败。
		}
	},
	style: {
		"min-width": 150
	}
};
</script>
<style lang="less" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
	width: auto;
}
</style>

