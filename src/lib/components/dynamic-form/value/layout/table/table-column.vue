<template>
	<el-table-column :label="label" :prop="name" :min-width="columnWidthInfo['min-width']">
		<v-table-column v-if="hasSubform" v-for="field in subFields" :key="field.name" :options="field" v-on="$listeners"></v-table-column>
		<template  slot-scope="scope">
			<v-strip :value="getValue(scope.row[name])" :type="type" :options="options" v-on="$listeners" @dispatch-width="setColumnWidth"></v-strip>
		</template>
	</el-table-column>
</template>

<script>
import { hasSubform, getSubFields, getValue } from "../../../utils";
import strip from "../../strip";
export default {
	name: "v-table-column",
	props: {
		options: {
			type: Object,
			required: true
		}
	},
	components: {
		[strip.name]: strip
	},
	data() {
		let options = this.options;
		let { label, name, type } = options;
		return {
			label,
			name,
			type,
			hasSubform: hasSubform(options),
			subFields: getSubFields(this.options),
			columnWidthInfo: {}
		};
	},
	methods: {
		getValue,
		setColumnWidth(widthInfo) {
			this.columnWidthInfo = widthInfo;
		}
	},
	created() {}
};
</script>

<style>

</style>
