<template>
  <el-input type="number" ref="input" :value="Value" :name="options.name" @input="updateValue" :placeholder="placeholder" :pattern="pattern"  v-on="$listeners" v-bind="$attrs" :disabled="!editable"/>
</template>

<script>
export default {
	name: "v-number",
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
			Value: this.value,
			placeholder: this.options.placeholder,
			limitType: null,
			input: ""
		};
	},
	watch: {
		value(val) {
			this.updateValue(val);
		}
	},
	computed: {
		pattern() {
			//这个pattern是在移动端限制键盘类型，从而限制输入类型
			let options = this.options;
			if (
				(options.allowDecimals == undefined &&
					options.allowNegative == undefined) ||
				(options.allowDecimals && options.allowNegative)
			) {
				this.limitType = 0;
				return "^-?[0-9,\\.]*$"; //所有数字
			} else if (
				options.allowDecimals == false &&
				options.allowNegative == false
			) {
				this.limitType = 1;
				return "^[0-9]*$"; //正整数，0
			} else if (options.allowDecimals == false) {
				this.limitType = 2;
				return "^-?[0-9]*$"; //正整数，0，负整数
			} else if (options.allowNegative == false) {
				this.limitType = 3;
				return "^[0-9,\\.]*$"; //正整数，正小数，0
			}
		}
	},
	methods: {
		filterCharater(val) {
			//pc端限制输入类型
			switch (this.limitType) {
				case 0:
					return val;
				case 1:
					return val.replace(/\.|-/g, "");
				case 2:
					return val.replace(/\./g, "");
				case 3:
					return String(val).replace(/-/g, "");
				default:
					return val;
			}
		},
		updateValue(val) {
			this.Value = this.filterCharater(val);
			this.$emit("input", this.Value);
		}
	},
	mounted() {
		this.input = this.$refs.input;
	}
};
</script>

<style>
input[type="number"] {
	-moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
