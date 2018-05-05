<template>
  <div class="json">
	  <h3>住院</h3>
	  {{J(inpatient_information)}}
	  <h3>病变信息</h3>
	  	<h4>1.</h4>
	  	{{J(bingbian1)}}
		  <h4>2.</h4>
		{{J(bingbian2)}}
		<h4>3.</h4>
		{{J(bingbian3)}}
		<h4>4.</h4>
		{{J(bingbian4)}}
	  <h3>既往史</h3>
	  <h4>常见既往史</h4>
	  {{J(commen_history)}}
	  <h4>心脑血管既往史</h4>
	{{J(heart_history)}}
	<h4>其他既往史</h4>
	{{J(other_history)}}
	  <h3>化验</h3>
	  {{J(test)}}
	  <h3>手术及麻醉</h3>
	  {{J(operate_info)}}
	  <h3>围手术及随访情况</h3>
	  {{J(around_operate)}}
	  <h3>血压</h3>
	  {{J(blood_pressure)}}
	  <h3>用药信息</h3>
	  {{J(medication_info)}}
  </div>
</template>

<script>
import { inpatient_information } from "../demo/aorto-arteritis/zhuyuan";
import {
	bingbian1,
	bingbian2,
	bingbian3,
	bingbian4
} from "../demo/aorto-arteritis/bingbian";
import {
	commen_history,
	heart_history,
	other_history
} from "../demo/aorto-arteritis/accompanying-disease"; //既往史
import { test } from "../demo/aorto-arteritis/test"; //化验
import { operate_info } from "../demo/aorto-arteritis/operate_info"; //手术信息
import { around_operate } from "../demo/aorto-arteritis/around_operate"; //围术及随访
import { blood_pressure } from "../demo/aorto-arteritis/blood_pressure"; //血压
import { medication_info } from "../demo/aorto-arteritis/medication_info"; //用药情况
export default {
	name: "json",
	data() {
		return {
			inpatient_information,
			bingbian1,
			bingbian2,
			bingbian3,
			bingbian4,
			commen_history,
			heart_history,
			other_history,
			test,
			operate_info,
			around_operate,
			blood_pressure,
			medication_info
		};
	},
	methods: {
		J(a) {
			return JSON.stringify(a);
		}
	}
};
</script>

<style>

</style>
