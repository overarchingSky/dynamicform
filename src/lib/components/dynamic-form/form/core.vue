<template>
	<div class="form-core">
		<!-- 如果值抛出出现异常，很可能是添加了为了$attrs造成 -->
		<div v-show="type=='input'">
			<component :is="inputType" ref="core" v-if="update" :value="inputValue" v-on="$listeners" v-bind="$attrs" @fetch="handleFetch" @input="emitValue" :options="options" @blur="validate" :class="itemStatus" :editable="editable"></component>
		</div>
		<div v-if="type == 'view'">
			<v-strip :value="inputValue" :type="this.options.type" v-on="$listeners"></v-strip>
		</div>
		<div class="el-form-item__error" v-if="validateStatus == false">
			{{message}}
		</div>
	</div>
</template>

<script>
import { getValue, isRandomField, setStash } from "../utils";
import Inputs from "./base";
import _ from "../typeof";
import remoteOptions from "../fetch";
import { getKeysFromFormula } from "../formula";
import { exportWidthInfo } from "../utils";
//临时的view

import view from "../value/strip";

//临时的view end
export default {
	name: "core",
	props: {
		type: {
			type: String,
			default: "input"
		},
		options: {
			type: Object,
			required: true
		},
		value: [Object, String, Number, Array, Boolean, Date],
		validateField: {
			type: Function,
			required: true
		},
		rowIndex: {
			type: [String, Number]
		}
	},
	components: {
		...Inputs,
		[view.name]: view
	},
	watch: {
		"options.options": {
			handler: function(val) {
				this.update = false;
				this.$nextTick(_ => {
					this.update = true;
				});
				//这里没有使用$forceUpdate方法更新，因为该方法只会更新组件本身，并不会更新其子孙组件
				//this.$refs.core.$forceUpdate();
			},
			deep: true
		}
	},
	data() {
		let { label, name, validator, editable } = this.options;
		editable = editable == undefined ? true : editable;
		//this.value = this.value || this.options.default;
		return {
			label: label,
			name: name,
			update: true,
			editable,
			message: validator ? validator.message : "",
			inputType:
				"v" +
				this.options.type.charAt(0).toUpperCase() +
				this.options.type.slice(1),
			rules: {
				required: this.options.required,
				validator: this.validate,
				trigger: "blur"
			},
			validateStatus: null //null未加验证，true验证通过，false验证失败
		};
	},
	computed: {
		componsentType() {
			//临时显示用的
			switch (this.type) {
				case "address":
					return "address";
				case "infinityTable":
					return "infinityTable";
				default:
					return "base";
			}
		},
		inputValue() {
			return this.value || this.options.default;
		},
		itemStatus() {
			if (this.validateStatus == null) {
				return "";
			} else if (this.validateStatus == true) {
				return "is-success";
			} else if (this.validateStatus == false) {
				return "is-error";
			}
		}
	},
	methods: {
		forceUpdate() {},
		emitValue(val) {
			//this.inputValue = val;
			let { name } = this.options;
			//   if (this.name == "a2") {
			// 	alert(this.value);
			//   }
			this.$emit("valueUpdate", { key: name, value: val });
			if (!isRandomField(this.options)) {
				//如果不是随机生成的字段名称(表单唯一且跨表单唯一)，将其存入propery
				val = _.isObject(val) ? JSON.stringify(val) : val;
				setStash(name, val);
			}
		},
		error(message) {
			this.message = message;
			return (this.validateStatus = false);
		},
		success() {
			return (this.validateStatus = true);
		},
		validate() {
			let { validator, required, label, name } = this.options;
			if (required && !this.value) {
				//必填
				return this.error(`${label}不能为空`);
			}
			if (this.value === null || this.value === undefined) {
				//非必填时，如果值为空，则跳过验证
				return;
			}
			if (this.options.validator) {
				let valid = this.validateField(this.options.validator.formula);
				return _.isBoolean(valid)
					? valid
						? this.success()
						: this.error(this.options.validator.message)
					: this.success();
			}
			return this.success();
		},
		handleFetch(type, action, newOption, next) {
			let url = this.options.api //优先使用字段内配置的api，如果没有配置，则使用全局配置的api
				? this.options.api[action]
				: this.$attrs.api[action];
			switch (type) {
				case "option":
				case "options":
					remoteOptions[action](
						url,
						this.options.optionsName,
						newOption
					)
						.then(response => {
							if (action.toLocaleLowerCase() !== "get") {
								this.$message.success("操作成功！");
							}
							next(response);
						})
						.catch(err => {
							let message;
							if (action.toLocaleLowerCase() == "get") {
								message = `获取选项失败！error:${err.message}`;
							} else {
								message = `操作失败！error:${err.message}`;
							}
							this.$message.error(message);
							next();
						});
					break;
				case "field":
					//请求字段值
					break;
				default:
					break;
			}
		}
	},
	created() {
		this.emitValue(this.inputValue);
		this.$emit("on-add-validate", this.validate);
		let style = Inputs[this.inputType].style;
		let minWidth =
			style && _.isObject(style) ? style["min-width"] : undefined;
		this.$emit(
			"dispatch-width",
			exportWidthInfo(this.options.display, minWidth)
		);
	}
};
</script>
<style lang="less">
.el-form-item__content {
	.form-core {
		text-align: left;
		.is-success {
			input,
			select,
			textarea {
				border-color: #67c23a;
			}
		}
		.is-error {
			input,
			select,
			textarea {
				border-color: #f56c6c;
			}
		}
		max-width: 30em;
		.el-input {
			max-width: 220px;
		}
	}
	.el-form-item .el-form-item {
		margin-bottom: 10px !important;
	}
}
</style>
