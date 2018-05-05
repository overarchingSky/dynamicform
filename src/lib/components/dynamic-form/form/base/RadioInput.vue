<template>
    <div id="radio_input">
        <el-radio-group class="radio" v-model="inputValue" @input="updateValue" v-on="$listeners" v-bind="$attrs">
            <el-radio 
            v-for="(item, index) in selectOptions"
                v-if="item.visible !== false"
                :key="index"
                :label="item.value || item.label">
                {{item.label}}
            </el-radio>
            </el-radio-group>
            <el-input v-if="isInput" :type="options.minRows?'textarea':'text'" :placeholder="placeholder" class="rinput" @input="updateInputValue" :value="elValue"/>
    </div>
</template>
<script>
export default {
	name: "radio-input",
	props: {
		value: [String, Number],
		options: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			inputValue: this.value,
			selectOptions: this.options.options,
			placeholder: this.options.placeholder,
			isInput: false,
			elValue: ""
		};
	},

	methods: {
		updateValue(val) {
			if (val == this.options.showExtraInput) {
				this.isInput = true;
			} else {
				(this.isInput = false), this.$emit("input", val);
			}
		},
		updateInputValue(val) {
			this.$emit("input", val);
		}
	},
	style: {
		"min-width": 750
	},
	created() {
		this.$emit("input", this.options.default);
		if (this.value) {
			let isExtra = !this.options.options.some(
				option =>
					option.value !== undefined
						? option.value == this.value
						: option.label == this.value
			);
			if (isExtra) {
				this.elValue = this.value;
				this.inputValue = this.options.showExtraInput;
				this.isInput = true;
			} else {
				this.inputValue = this.value;
			}
		}
	}
};
</script>
<style lang="less">
#radio_input {
	.radio {
		margin-right: 20px;
	}
	.rinput {
		display: block;
	}
}
</style>