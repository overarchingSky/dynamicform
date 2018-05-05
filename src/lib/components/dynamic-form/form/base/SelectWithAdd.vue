<template>
<div>
	<el-alert
		:title="notice"
		type="info"
		:show-icon="true"
		:closable="true"
		style="margin-bottom:5px">
	</el-alert>
	<el-select 
		v-model="currentvalue"
		@input='onInput'
		filterable
		allow-create
		:multiple="multiple"
		>
		<el-option
		v-for="item in selectOptions"
		:key="item.value||item.label"
		:label="item.label"
		:value="item.value||item.label"
		>
		</el-option>
	</el-select>
	<i v-if="!added && loading" class="el-icon-loading"></i>
	<el-button v-if="added" icon="el-icon-plus" :loading="loading"  type="primary" @click="addoption"></el-button>
	</div>
</template>
<script>
import Vue from "vue";
// import ElementUI from "element-ui";
// import request from "../utils/axios";
// import utils from "../utils/utils";
export default {
	name: "select-with-add",
	props: {
		value: {
			type: [Number, String, Array],
			default: ""
		},
		options: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			selectOptions: this.options.options ? this.options.options : [],
			loading: false,
			added: false,
			currentvalue: this.value,
			newOptions: [],
			multiple: this.options.multiple || false
		};
	},
	computed: {
		notice() {
			return "您可以从以下选项中选择或添加（输入内容后点击右边“+”号）相应类型";
		}
	},
	watch: {
		currentvalue: function(val) {
			this.$emit("input", val);
		}
	},
	methods: {
		onInput(val) {
			this.newOptions = [];
			if (this.multiple) {
				//多选
				this.newOptions = val.filter(option => {
					return !this.selectOptions.some(
						item => item.label == option && item.value == option
					);
				});
			} else {
				//单选
				let isexist = this.selectOptions.some(
					item => item.label == val && item.value == val
				);
				if (!isexist) {
					this.newOptions.push(val);
				}
			}
			if (val !== "" && this.newOptions.length) {
				this.added = true;
			} else {
				this.added = false;
			}
			this.currentvalue = val;
		},
		next(options, replace = false) {
			if (options && this.selectOptions.length == 0) {
				//此处处理了getOptions返回的结果
				this.selectOptions = JSON.parse(options.data.content);
			}
			this.loading = false;
		},
		getOptions() {
			this.loading = true;
			this.$emit("fetch", "options", "get", null, this.next);
		},
		addoption() {
			this.loading = true;
			let toAddOptions = this.newOptions.map(item => {
				return { label: item, value: item };
			});
			this.$emit("fetch", "options", "add", toAddOptions, this.next);
		}
	},
	style: {
		"min-width": 290
	},
	created() {
		this.getOptions();
	}
};
</script>