<template>
<div class="table-form">
<div :style="`font-size:14px;`" v-if="!parentFeild && options.title">
		<h3 class="dynamic-form-title">{{options.title}}</h3>
	</div>
<el-table

		ref="table"
		:data="formValue"
		:row-key="initRowKey"
		v-bind="$attrs"
		:span-method="arraySpanMethod"
		:border="border"
		:row-class-name="tableRowClassName"
		:style="{width:tableWidth + 'px'}">
		<el-table-column label="操作" v-if="options.multiple && $attrs.type == 'input'" width="80" v-bind="{'fixed':fixedColumn}">
			  <template slot-scope="scope">
				  <el-button type="danger" size="middle" icon="el-icon-delete" title="删除本条记录" @click="deleteRow(scope.row)"></el-button>
			  </template>
		  </el-table-column>
		<tableColumn
		v-for="field in fields"
		ref="tableColumn"
		@rowValueUpdate="valueUpdateHandler"
		@on-field-removed="removedField"
		@collectFieldWidthInfo="collectFieldWidthInfoHandler"
		@doTableLayout="doTableLayout"
		:key="field.name"
		v-bind="$attrs"
		v-on="listeners"
		:options="field">
		  </tableColumn>
	</el-table>
</div>
</template>

<script>
import { addDependent, unWacthLastRow } from "../../dependent";
import _ from "../../typeof";
import {
	validateValue,
	getValue,
	setValue,
	hasSubform,
	getSubFields,
	getColSpan,
	exportWidthInfo
	//getChildFormValue
} from "../../utils";
import tableColumn from "./table-column";
export default {
	name: "table-input",
	props: {
		options: {
			type: Object,
			require: true
		},
		parentFeild: String,
		border: {
			type: Boolean,
			default: true
		},
		value: Array
	},
	data() {
		return {
			table: null,
			tableWidth: 0,
			tableMinWidth: 0,
			columnsWidth: 0,
			count: 0,
			cacheWidth: {},
			timer: null,
			rowIndex: 0, //行的key,原则上只能增加，不能减少，每次addRow后，增加1，这是为了保证删除行并添加行时，行号唯一
			formValue: [], //[{key:value,key2:value2}]
			timer: null,
			fixedColumn: false,
			lazyRender: true
		};
	},
	watch: {
		tableWidth() {
			this.lazyRender = false;
		}
	},
	computed: {
		fields() {
			return this.options.fields.filter(field => field.visible !== false);
		},
		isRootTable() {
			return this.$attrs["parent-form-layout"] !== "table";
		},
		listeners() {
			delete this.$listeners["dispatch-width"];
			return this.$listeners["dispatch-width"];
		}
	},
	components: {
		tableColumn
	},
	methods: {
		doTableLayout() {},
		tableRowClassName({ row, rowIndex }) {
			let highlightRow = this.options.highlightRow;
			if (!highlightRow) {
				return "";
			}
			if (_.isNumber(highlightRow)) {
				return rowIndex == highlightRow
					? "dynamic-table-form-highlight-row"
					: "";
			} else if (_.isObject(highlightRow)) {
				return highlightRow.rowIndex == rowIndex
					? highlightRow.class || "dynamic-table-form-highlight-row"
					: "";
			} else if (_.isArray(highlightRow)) {
				for (let i = 0; i < highlightRow.length; i++) {
					const item = highlightRow[i];
					if (_.isNumber(item) && rowIndex == item) {
						return "dynamic-table-form-highlight-row";
					} else if (_.isObject(item) && item.rowIndex == rowIndex) {
						return item.class || "dynamic-table-form-highlight-row";
					}
				}
			}
		},
		initFormValue() {
			if (!this.value || (this.value && this.value.length == 0)) {
				let defaultValue = this.options.default;
				if (defaultValue) {
					for (let i = 0; i < defaultValue.length; i++) {
						const singleValue = defaultValue[i];
						this.addRow(singleValue);
					}
					return;
				}

				let defaultRows = this.options.defaultRows;
				if (defaultRows && _.isNumber(defaultRows)) {
					for (let i = 0; i < defaultRows; i++) {
						this.addRow();
					}
				} else {
					this.addRow();
				}
			} else {
				for (let i = 0; i < this.value.length; i++) {
					this.addRow(this.value[i]);
				}
			}
		},
		initRowKey(row) {
			//设置这个是防止在删除行时，数据显示不对号
			return row._rowIndex; //_rowIndex是一个自定义的保留属性，不做业务逻辑上的有用途
		},
		getValue,
		//getChildFormValue,
		arraySpanMethod({ row, column, rowIndex, columnIndex }) {
			let rowSpan,
				colSpan,
				fieldName = column.property;

			colSpan = getColSpan(getSubFields(this.options), fieldName);
			return [1, colSpan];
		},
		addRowDependent(row) {
			addDependent(this, this.options.fields, "formValue", row);
		},
		valueUpdateHandler() {
			if (this.parentFeild) {
				this.$emit("value-change", {
					key: this.parentFeild,
					value: this.formValue
				});
			} else {
				this.$emit("value-change", this.formValue);
			}
		},
		removedField(key) {
			this.formValue.forEach(rowData => {
				delete rowData[key];
			});
			this.valueUpdateHandler();
		},
		addRow(val) {
			let row = val ? JSON.parse(JSON.stringify(val)) : {}; //这里必须使用val的副本，否则，会意外修改传入的value
			let index = this.formValue.push(row) - 1;
			row._rowIndex = this.rowIndex;
			this.$nextTick(_ => {
				this.addRowDependent(index);
			});
			this.rowIndex += 1;

			//   setTimeout(() => {
			//     this.addRowDependent(row);
			//   }, 1000);

			//   let len = this.formValue.length;
			//   this.$set(this.formValue[len], payload.key, { data: payload.value });
		},
		deleteRow(row) {
			let index = this.formValue.findIndex(rowData => rowData == row);
			let deleteRow = this.formValue[index];
			unWacthLastRow(this);
			this.formValue.splice(index, 1);
			this.valueUpdateHandler();
		},
		collectFieldWidthInfoHandler(val, fieldName) {
			this.cacheWidth[fieldName] = val;
			// this.timer && clearTimeout(this.timer);
			// this.timer = setTimeout(() => {
			// 	let fix = this.options.multiple ? 94 : 14; //fix是左侧删除按钮的宽度以及其他项的修正值
			// 	this.tableMinWidth = fix;
			// 	this.tableWidth = fix;
			// 	for (let i in this.cacheWidth) {
			// 		this.tableMinWidth += this.cacheWidth[i]["min-width"];
			// 		this.tableWidth += this.cacheWidth[i]["min-width"] * 1.1; //将表格宽度设置为最小宽度的1.1倍，一般在表格列比较少时，这样可以让表格宽度显示大一点，如果表格宽度达到了100%，则本项失效，转为使用min-width
			// 	}
			// 	this.$emit(
			// 		"dispatch-width",
			// 		exportWidthInfo(this.options.display, this.tableMinWidth)
			// 	);
			// 	window.ssss ? ssss++ : (window.ssss = 1);
			// }, 0);
			// return;

			let fix = this.options.multiple ? 94 : 14; //fix是左侧删除按钮的宽度以及其他项的修正值
			this.tableMinWidth = fix;
			this.tableWidth = fix;
			for (let i in this.cacheWidth) {
				this.tableMinWidth += this.cacheWidth[i]["min-width"];
				this.tableWidth += this.cacheWidth[i]["min-width"] * 1.1; //将表格宽度设置为最小宽度的1.1倍，一般在表格列比较少时，这样可以让表格宽度显示大一点，如果表格宽度达到了100%，则本项失效，转为使用min-width
			}
			this.$emit(
				"dispatch-width",
				exportWidthInfo(this.options.display, this.tableMinWidth)
			);

			// this.$nextTick(_ => {
			// 	let fix = this.options.multiple ? 94 : 14; //fix是左侧删除按钮的宽度以及其他项的修正值
			// 	this.tableMinWidth = fix + this.columnsWidth / rowNumber;
			// 	this.$emit(
			// 		"dispatch-width",
			// 		exportWidthInfo(this.options.display, this.tableMinWidth)
			// 	);
			// 	this.tableWidth =
			// 		fix + this.columnsWidth * (1 + 1 / this.count) / rowNumber;
			// });
		}
		// addTableInfo(info = {}) {
		// 	let message = "";
		// 	for (let i in info) {
		// 		message += i + ":" + info + ",";
		// 	}
		// 	message =
		// 		message.length > 0 && message.slice(0, message.length - 1);
		// 	if (message) {
		// 		let table = this.table.$el;
		// 		let info = document.createElement("div");
		// 		info.className = `extr_row`;
		// 		addBtn.innerText = message;
		// 		table.appendChild(addBtn);
		// 	}
		// }
	},
	mounted() {
		this.table = this.$refs["table"];
		if (this.options.multiple && this.$attrs.type == "input") {
			this.$nextTick(_ => {
				let table = this.table.$el;
				let addBtn = document.createElement("div");
				addBtn.className = `add-btn`;
				let tip = `新增一条记录`;
				addBtn.setAttribute("tip", tip);
				//this.upDateWidth();
				addBtn.addEventListener("click", _ => {
					this.addRow();
					if (!this.isRootTable) {
						this.$emit("doTableLayout");
					}
				});
				table.appendChild(addBtn);
			});
		}
	},
	created() {
		this.initFormValue();
		this.fixedColumn =
			this.isRootTable &&
			this.options.fields.some(field => {
				return field.fixed === true;
			});
	}
};
</script>

<style lang="less">
.table-form {
	.cell {
		text-align: center;
		padding-left: 6px !important;
		padding-right: 6px !important;
	}
	table {
		border-collapse: separate;
	}
	.dynamic-table-form-highlight-row {
		background-color: oldlace;
	}
	.el-form-item__error {
		position: static;
	}
	@height: 1.8rem;
	.extr_row {
		height: @height;
		bottom: 0;
		z-index: 9;
		background-color: darken(#f5f7fa, 3%);
		color: #888;
	}
	.add-btn {
		bottom: 0;
		z-index: 9;
		cursor: pointer;
		text-align: center;
		font-size: 0;
		line-height: @height;
		position: relative;
		//margin-top: 1rem;
		&:hover {
			background-color: #f5f7fa;
			&:before {
				transform: translateX(-3rem);
			}
			&:after {
				transform: translateX(-3rem);
				opacity: 1;
			}
		}
		&:active {
			background-color: darken(#f5f7fa, 3%);
		}
		&:after {
			content: attr(tip);
			position: absolute;
			top: 50%;
			color: #888;
			transform: translateX(1rem);
			font-size: 0.6rem;
			vertical-align: middle;
			line-height: 0;
			padding-left: 0.5rem;
			opacity: 0;
			transition: all 0.4s;
		}
		&:before {
			content: "+";
			font-size: 1.5rem;
			color: #888;
			display: inline-block;
			vertical-align: middle;
			line-height: @height;
			transition: all 0.4s;
		}
	}
}
</style>
