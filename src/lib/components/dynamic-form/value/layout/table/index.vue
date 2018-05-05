<template>
<!-- 调试：formValue:[{}] -->
  <el-table
  class="layout-table"
  :data="formValue"
  border
  :span-method="arraySpanMethod">
	<v-table-column v-for="field in fields" :key="field.name" :options="field" v-on="$listeners"></v-table-column>
  </el-table>
</template>

<script>
import {
	hasSubform,
	getSubFields,
	formateValueAduptToTable
} from "../../../utils";
import tableColumn from "./table-column";

export default {
	name: "v-layout-table",
	props: {
		options: {
			type: Object,
			required: true
		},
		value: {
			type: Array,
			required: true
		}
	},
	data() {
		let options = this.options;
		let { label, name } = options;
		return {
			fields: getSubFields(options),
			formValue: formateValueAduptToTable(this.value)
		};
	},
	methods: {
		arraySpanMethod({ row, column, rowIndex, columnIndex }) {
			let info = row[column.property];
			if (info) {
				return info.cellSpan;
			}
		}
	},
	components: {
		[tableColumn.name]: tableColumn
	},
	created() {}
};
</script>

<style lang="less">
.layout-table {
}
</style>
