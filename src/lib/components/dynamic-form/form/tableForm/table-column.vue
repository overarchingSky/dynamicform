<template>
	<!-- <el-table-column :label="label" :prop="name" ref="column" :min-width="style?style['min-width']:(hasSubform ? '300' : '100')" :max-width="style?style['max-width']:'800'"> -->
		<el-table-column :label="options.unit ? `${label}(${options.unit})` : label" :prop="name" class="column"  ref="column" :min-width="columnWidthInfo['min-width']" :max-width="columnWidthInfo['max-width']" v-bind="{'fixed':options.fixed}">
		<template slot-scope='scope'>	
			<!-- 这里看能否使用components目录下的Subform组件替代 ？ -->
			<child-dynamic-form v-if="hasSubform" v-bind="$attrs" v-on="$listeners" parent-form-layout="table" @dispatch-width="setColumnWidth" :value="getValue(scope.row[name])" :parent-feild="name" :options="options" layout="form" @value-change="payload => valueUpdateHandler(scope.row, payload)"></child-dynamic-form>
			<div v-else>
				<div v-if="!isBaseComponents">
					<component 
					:is="type"
					:value="getValue(scope.row[options.name])"
					:options="options" 
					:validateField="formula => validateField(scope.row, formula)"
					@valueUpdate="payload => valueUpdateHandler(scope.row, payload)"
					v-on="$listeners"
					v-bind="$attrs"></component>
				</div>		
				
				<core
					v-else
					ref="core"
					:row-index="scope.$index"
					:value="getValue(scope.row[options.name])"
					:options="options"
					:validateField="formula => validateField(scope.row, formula)"
					@valueUpdate="payload => valueUpdateHandler(scope.row, payload)"
					@dispatch-width="setColumnWidth"
					v-on="$listeners"
					v-bind="$attrs"
					></core>	
			</div>
		</template>
	</el-table-column>
</template>

<script>
import {
	getValue,
	setValue,
	hasSubform,
	getSubFields,
	validateValue,
	getParentComponentOptions,
	findTableEl,
	getParentComponent,
	findFieldByChildkey,
	getValueFromFormValue,
	getChildFormValue
} from "../../utils";
import Inputs from "../base";
import componentFields from "../components";
import core from "../core";
import { addDependent } from "../../dependent";
export default {
	name: "table-column",
	props: {
		options: {
			type: Object,
			required: true
		},
		data: Array,
		addRow: Function,
		value: {},
		rootOptions: Object, //本参数为初始化表单时传入的全部配置，暂时用来获取添加一条记录按钮的提示信息add-btn
		parentOptions: Object,
		childOptions: Object
	},
	components: {
		core,
		...componentFields
	},
	data() {
		let { name, label, type, required, display } = this.options;
		return {
			formValue: this.value ? [] : [{}],
			hasSubform: hasSubform(this.options),
			label: required ? "*" + label : label,
			columnWidthInfo: {},
			name: name,
			style: display ? display.style : "",
			count: 0,
			type:
				"v" +
				this.options.type.charAt(0).toUpperCase() +
				this.options.type.slice(1),
			childTableFields:
				hasSubform(this.options) &&
				getSubFields(this.options).filter(
					field => field.visible !== false
				)
		};
	},
	computed: {
		isBaseComponents() {
			//是否是基础组件？
			return this.type in Inputs;
		}
	},
	methods: {
		getValue,
		getSubFields,
		getChildFormValue,
		setColumnWidth(widthInfo) {
			this.count += 1;
			this.columnWidthInfo = widthInfo;
			this.$emit("collectFieldWidthInfo", widthInfo, this.options.label);
		},
		validateField(singleValue, formula) {
			return validateValue(
				singleValue,
				formula //验证公式
			);
		},
		valueUpdateHandler(singleValue, payload) {
			this.$set(singleValue, payload.key, {
				data: payload.value
			});
			this.$emit("rowValueUpdate", payload.key);
		}
	},
	created() {
		let dynamicForm = getParentComponentOptions(this, "dynamic-form");
		this.$options.components["child-dynamic-form"] = dynamicForm;
	},
	beforeDestroy() {
		this.$emit("on-field-removed", this.name);
	}
};
</script>

<style lang="less">
// td.no-padding {
//   padding: 0 !important;
//   .cell {
//     padding: 0 !important;
//     td.padding {
//       .cell {
//         padding: 0 6px !important;
//       }
//     }
//   }
// }
// .child-table {
//   .el-table__body-wrapper {
//     overflow: hidden;
//   }
// }
</style>
