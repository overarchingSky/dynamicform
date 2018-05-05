<template>
  <el-radio-group :value="value" @input="updateValue" v-on="$listeners" v-bind="$attrs">
      <el-radio 
	  label="线上品牌商赞助"
	  v-for="(item, index) in selectOptions"
		v-if="item.visible !== false"
		:key="index"
		:label="item.value || item.label"
    :disabled="!editable">
		{{item.label}}
	  </el-radio>
    </el-radio-group>
</template>

<script>
export default {
	name: "v-radio",
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
			selectOptions: this.options.options
		};
	},
	methods: {
		updateValue(val) {
			this.$emit("input", val);
		}
	},
	style: {
		"min-width": 130
	}
};
</script>

<style>

</style>
