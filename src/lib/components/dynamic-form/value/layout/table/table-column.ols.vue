<template>
	<div>
		<div v-if="type == 'infinityTable'">
			<el-table-column :label="1" :prop="name">
				<el-table-column :label="label" :prop="field.name" v-for="field in subFields" :key="field.name"></el-table-column>
			</el-table-column>
			<el-table-column :label="2" :prop="name">
				<el-table-column :label="field.label" :prop="field.name" v-for="field in subFields" :key="field.name"></el-table-column>
			</el-table-column>
		</div>
	<el-table-column :label="label" :prop="name" v-else>
			<v-table-column v-if="hasSubform" v-for="field in subFields" :key="field.name" :options="field"></v-table-column>
			<template  slot-scope="scope">
				<v-strip :value="getValue(scope.row[name])" :type="type"></v-strip>
			</template>
		
	</el-table-column>
	</div>
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
			subFields: getSubFields(this.options)
		};
	},
	methods: {
		getValue
	},
	created() {}
};
</script>

<style>

</style>
