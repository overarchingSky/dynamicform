<template>
  <component ref="form" :class="edit ? 'dynamic-form-editing' : ''" :is="formType" :api="api" v-bind="$attrs" v-on="$listeners" @value-change="valueChangeHander" @on-add-validate="addValidate" :uid="rootUid" :parent-feild="parentFeild" :options="options"></component>
</template>

<script>
import tableForm from "./tableForm";
import baseForm from "./baseForm";
import { promisify, getAllFormula, validateValue } from "../utils";
import "../edit/dynamic-form-editing.less";
export default {
	name: "dynamic-form",
	props: {
		options: {
			type: Object,
			required: true
		},
		uid: [Number, String],
		parentFeild: String,
		edit: {
			type: Boolean,
			default: false
		},
		layout: String
	},
	data() {
		return {
			rootUid: this.uid || this._uid,
			api: this.options.api || this.$attrs.api,
			validates: [],
			timer: null
		};
	},
	components: {
		[tableForm.name]: tableForm,
		[baseForm.name]: baseForm
	},
	computed: {
		formType() {
			if (this.layout && this.isRoot) {
				return this.layout + "-input";
			}
			return (
				(this.options.display &&
					this.options.display.layout + "-input") ||
				(this.options.multiple ? "table-input" : "form-input")
			);
		},
		isRoot() {
			return !this.parentFeild;
		}
	},
	methods: {
		valueChangeHander(formValue) {
			if (this.isRoot) {
				//将整个表单数据抛出
				this.timer && clearTimeout(this.timer);
				this.timer = setTimeout(_ => {
					this.$emit("on-value-change", {
						formId: this.options.id,
						slug: this.options.slug,
						values: formValue
					});
				}, 20);
			} else {
				//将表单数据抛出给父表单
				this.$emit("value-change", formValue);
			}
		},
		addValidate(validate) {
			this.validates.push(validate);
		},
		validate() {
			return promisify(_ => {
				let valid = true;
				for (let i = 0; i < this.validates.length; i++) {
					let validate = this.validates[i];
					if (validate() == false) {
						valid = false;
					}
				}
				return valid;
			});
		}
	},
	created() {
		if (this.isRoot) {
			this.formulases = getAllFormula(this.options);
		}
	}
};
</script>

<style>
.dynamic-form-title {
	font-size: 18px;
	margin-bottom: 20px;
	text-align: left;
}
</style>
