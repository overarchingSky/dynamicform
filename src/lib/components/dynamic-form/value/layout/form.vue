<template>
   <table  class="wt-form">
    <tr v-for="(item,index) in option" :key="index">
    	<td  class="wt-form-label">{{item.label}}:</td>
		<td v-if="!value.length"></td>
		<td v-else v-for="(rowData,number) in value" :key="index + '-' + number">
			<template  v-if="hasSubform(item)">
				<v-layout-form  :options="item" :value="getValue(rowData[item.name])" v-on="$listeners"></v-layout-form>
			</template>
			<template v-else>
				<v-strip :value="rowData?(rowData[item.name] ? getValue(rowData[item.name]):getValue(rowData)):''" :type="item.type" v-on="$listeners"></v-strip>
			</template>
			
		</td>
    </tr>
   </table>
</template>
<script>
import Vue from "vue";
import strip from "../strip";
import { getValue, hasSubform, getSubFields } from "../../utils";

export default {
	name: "v-layout-form",
	components: {
		[strip.name]: strip
	},
	props: {
		options: {
			type: [Object, Array],
			default: function() {
				return {};
			}
		},
		isedit: {
			type: Boolean,
			default: false
		},
		value: {
			type: [Array, Object],
			default: function() {
				return [];
			}
		}
	},
	data() {
		return {
			option: this.options.fields
		};
	},
	methods: {
		getValue,
		hasSubform,
		getSubFields,
		substring(str, symbol) {
			str.lastIndexOf(symbol);
		}
	}
};
</script>
<style lang="less">
.wt-form-label {
	text-align: right;
	width: 180px;
	padding: 0 20px 0 30px !important;
	background-color: #eef1f6;
	line-height: 50px !important;
}
.wt-form {
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
}
.wt-form td {
	border: solid 1px #d1dbe5;
	padding: 5px 10px 5px 10px;
	line-height: 30px;
}
</style>
