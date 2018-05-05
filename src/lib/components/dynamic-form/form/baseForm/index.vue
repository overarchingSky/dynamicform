<template>
<div class="base-form-warp">
<div :style="`font-size:14px;text-indent:${labelWidth}`" v-if="!parentFeild && options.title">
		<h3 class="dynamic-form-title">{{options.title}}</h3>
	</div>
<div class="base-form-block" v-for="(rowData,index) in formValue" :key="rowData._rowIndex">
  <el-form
        ref="base-form"
		class="base-form"
        :model="rowData"
        :label-width="labelWidth"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <FormItem
		 v-for="field in fields"
          :value="getValue(rowData[field.name])"
          :options="field"
          :key="field.name"
          @valueUpdate="payload => valueUpdateHandler(index, payload)"
		  @on-field-removed="removedField"
          :validateField="buildValidateFieldFun(index)"
		  v-bind="$attrs"
		  v-on="listeners"
        />
		<el-form-item v-if="options.multiple && $attrs.type == 'input'">	
			<div class="ctrl btns" :sss="rowData._rowIndex">
				<el-button type="success" size="middle" icon="el-icon-plus" v-if="index == formValue.length - 1" @click="addRow">添加一条记录</el-button>
				<el-button type="danger" size="middle" icon="el-icon-delete" @click="deleteRow(rowData._rowIndex)">删除本条记录</el-button>
			</div>
			
		</el-form-item>
		
      </el-form>
	  <hr v-if="formValue.length > 1 && index !== formValue.length - 1" class="segmenting_line" />	
	  </div>
	  <el-button  type="success" size="middle" icon="el-icon-plus" title="添加一条记录" v-if="options.multiple && formValue.length == 0" @click="addRow">添加</el-button>
	</div>
</template>

<script>
import FormItem from "./field";
import { formatFormula } from "../../formula";
import { addDependent, unWacthLastRow } from "../../dependent";
import { validateValue, getValue, getFormLabelMaxWidth } from "../../utils";
import _ from "../../typeof";
export default {
	name: "form-input",
	props: {
		options: {
			type: Object,
			required: true
		},
		parentFeild: String,
		value: [Array, String],
		valueChange: Function,
		filter: Function, //根据表单外部变量值，过滤字段
		filValue: {
			//在使用filter的情况下，表单返回值中，是否包含被过滤掉的字段？ true/不包括， false/包括，默认true
			type: Boolean,
			default: true
		}
	},
	components: {
		FormItem
	},
	data() {
		return {
			formValue: [],
			rowIndex: 0,
			validates: {},
			labelWidth: getFormLabelMaxWidth(this.options)
		};
	},
	computed: {
		fields() {
			return this.options.fields.filter(field => field.visible !== false);
		},
		listeners() {
			delete this.$listeners["value-change"];
			return this.$listeners;
		}
	},
	methods: {
		getValue,
		addRowDependent(row) {
			addDependent(this, this.options.fields, "formValue", row);
		},
		initFormValue() {
			if (!this.value || (this.value && this.value.length == 0)) {
				this.addRow();
			} else {
				for (let i = 0; i < this.value.length; i++) {
					this.addRow(this.value[i]);
				}
			}
		},
		addRow(val) {
			let row = val ? JSON.parse(JSON.stringify(val)) : {}; //这里必须使用val的副本，否则，会意外修改传入的value
			if (!_.isObject(val)) {
				row = {};
			}

			let index = this.formValue.push(row) - 1;
			row._rowIndex = this.rowIndex;
			this.$nextTick(_ => {
				this.addRowDependent(index);
			});
			this.rowIndex += 1;
		},
		deleteRow(rowIndex) {
			let index = this.formValue.findIndex(rowData => {
				return rowData._rowIndex == rowIndex;
			});
			unWacthLastRow(this);
			this.formValue.splice(index, 1);
			//以下几行代码暂时用来结局删除一个记录导致的所有记录都被清空的问题
			let tmp = JSON.parse(JSON.stringify(this.formValue));
			setTimeout(() => {
				this.$emit("value-change", tmp);
			}, 1);
		},
		valueUpdateHandler(index, payload) {
			if (payload) {
				let changeItem = { [payload.key]: payload.value };
				// if (!this.formValue[index]) {
				// 	this.$set(this.formValue, index, {});
				// }
				this.$set(this.formValue[index], payload.key, {
					data: payload.value
				});
			}

			if (this.parentFeild) {
				this.$emit("value-change", {
					key: this.parentFeild,
					value: this.formValue
				});
			} else {
				this.$emit("value-change", this.formValue);
			}
			//this.valueChange && this.valueChange(this.formValue);
		},
		removedField(key) {
			this.$nextTick(_ => {
				this.formValue.forEach(rowData => {
					delete rowData[key];
				});
				this.valueUpdateHandler();
			});
		},
		buildValidateFieldFun(index) {
			let singleValue = this.formValue[index];
			return formula => {
				return validateValue(
					singleValue,
					formula //验证公式
				);
			};
		}
	},
	mounted() {
		window.a = this.formValue;
		//this.form = this.$refs["dynamic-form"];
	},
	created() {
		this.initFormValue();
		// let watcher = initDependence(
		//   this.options.fields,
		//   this.formValue,
		//   "formValue"
		// );
		// for (let i in watcher) {
		//   let { handler, options } = watcher[i];
		//   this.$watch(i, handler, options);
		// }
	}
};
</script>

<style lang="less">
.base-form-warp {
	.base-form-block {
		padding-bottom: 1rem;
		.ctrl {
			float: left;
		}
	}
	.base-form {
		.el-form-item__error {
			position: position;
		}
		.segmenting_line {
			border-color: transparent;
			border-top-color: rgba(255, 255, 255, 0.5);
			-webkit-margin-before: 2em;
			-webkit-margin-after: 1em;
		}
	}
}
</style>
