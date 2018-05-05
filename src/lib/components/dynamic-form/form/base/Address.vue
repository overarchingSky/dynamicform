<template>
    <v-distpicker :province="province" :city="city" :area="area"  @selected="updateValue" v-bind="$attrs"></v-distpicker>
</template>
<script>
import VDistpicker from "v-distpicker";
import _ from "../../typeof";
export default {
	components: { VDistpicker },
	props: {
		value: [Array, Object, String],
		options: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			innerValue:
				this.value &&
				(_.isString(this.value) ? JSON.parse(this.value) : this.value)
		};
	},
	computed: {
		province() {
			return (
				this.innerValue &&
				this.innerValue.province &&
				this.innerValue.province.value
			);
		},
		city() {
			return (
				this.innerValue &&
				this.innerValue.city &&
				this.innerValue.city.value
			);
		},
		area() {
			return (
				this.innerValue &&
				this.innerValue.area &&
				this.innerValue.area.value
			);
		}
	},
	methods: {
		updateValue(val) {
			this.$emit("input", val);
			this.$nextTick(_ => this.$emit("blur")); //本组件采取了手动触发blur事件去执行验证，因为v-distpicker在选择后似乎并不会触发blur事件
		}
	},
	style: {
		"min-width": 400
	}
};
</script>
