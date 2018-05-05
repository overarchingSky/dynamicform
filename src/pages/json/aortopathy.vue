<template>
  <div class="json">
	  <h3>住院</h3>
	  {{J(inpatient_information)}}
	  <h3>病变信息</h3>
	  {{J(lesionMessage)}}
	  
	  <h3>既往史</h3>
	  <h4>1.常见既往史</h4>
	  {{J(commen_history)}}
	  <h4>2.心脑血管既往史</h4>
	{{J(heart_history)}}
	<h4>3.其他既往史</h4>
	{{J(other_history)}}
	  <h3>检验</h3>
	  {{J(checkout)}}
<h3>体温</h3>
	  {{J(bodyHeat)}} 
	  <h3>手术及麻醉</h3>
	  {{J(surgeryNarcosis)}}
	  <h3>围手术及随访情况</h3>
	<h4>1.伤口/发热相关并发症</h4>
	  	{{J(commen_complication)}}
		  <h4>2.心脑血管并发症</h4>
		{{J(heart_complication)}}
		<h4>3.呼吸/消化/泌尿相关并发症</h4>
		{{J(digestion_complication)}}
	  <h3>用药信息</h3>
	  {{J(medication_info)}}
  </div>
</template>

<script>
import { inpatient_information } from "../demo/aorto-arteritis/zhuyuan";
import lesionMessage from "../demo/aortopathy/lesion-message";
import surgeryNarcosis from "../demo/aortopathy/surgery-narcosis";
import checkout from "../demo/aortopathy/checkout";
import bodyHeat from "../demo/aortopathy/body-heat";
import {
	commen_complication,
	heart_complication,
	digestion_complication
} from "../demo/aortopathy/perioperational";
import {
	commen_history,
	heart_history,
	other_history
} from "../demo/aortopathy/accompanying-disease";
import { medication_info } from "../demo/aorto-arteritis/medication_info";

export default {
	name: "json",
	data() {
		return {
			inpatient_information,
			lesionMessage,
			surgeryNarcosis,
			checkout,
			bodyHeat,
			commen_complication,
			heart_complication,
			digestion_complication,
			commen_history,
			heart_history,
			other_history,
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
