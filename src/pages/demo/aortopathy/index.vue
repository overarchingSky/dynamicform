<template>
    <el-tabs v-model="activeName"  @tab-click="gggg">
        <el-tab-pane label="基本信息" name="first">
        	<div class="base-form form first-form" style="float:left;margin-left:100px;">
				<dynamic-form-group ref="information-form" :options="[information,hosformation]" @on-value-change="onChangeHandler"></dynamic-form-group>
			</div>
        </el-tab-pane>
        <el-tab-pane label="既往史" name="second"> 
          <div class="base-form form" >
            <dynamic-form-group ref="acc-disease-form" :options="[commenHistory,heartHistory,otherHistory]" ></dynamic-form-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="病变信息" name="third">
          <div class="base-form form">
            <dynamic-form-group ref="acc-disease-form" :options="[lesMessage]" ></dynamic-form-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="手术及麻醉" name="fourth">
         <div class="base-form form">
            <dynamic-form-group ref="acc-disease-form" :options="[surNarcosis]" ></dynamic-form-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检验" name="fifth">
        	<div class="table-form form">
            <dynamic-form-group ref="xueya-form" :options="[checkOut]" :extra="{firstSurgeryDate:1520092800000,admissionDate:1520006400000}" ></dynamic-form-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="体温" name="sixth">
          <div class="table-form form">
            <dynamic-form-group ref="xueya-form" :options="[bodyHeat]" :extra="{admissionDate:1520006400000,firstSurgeryDate:1520179200000}"></dynamic-form-group>
          </div>
          </el-tab-pane>
        <el-tab-pane label="围手术期并发症" name="seventh">
          <div class="table-form form">
            <dynamic-form-group ref="xueya-form" :options="[commen_complication,heart_complication,digestion_complication]"></dynamic-form-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用药信息" name="eighth">
          <div>
            <dynamic-form-group ref="xueya-form" :options="[medicationInfo]" ></dynamic-form-group>
          </div>
        </el-tab-pane>
    </el-tabs>
    
</template>
<script>
import dynamicForm from "lib/components/dynamic-form";
import { general_information1 } from "../aorto-arteritis/general_information";
import { inpatient_information } from "../aorto-arteritis/zhuyuan";
import lesionMessage from "./lesion-message";
import surgeryNarcosis from "./surgery-narcosis";
import checkout from "./checkout";
import bodyHeat from "./body-heat";
import {
	commen_complication,
	heart_complication,
	digestion_complication
} from "./perioperational";
import {
	commen_history,
	heart_history,
	other_history
} from "./accompanying-disease";
import { medication_info } from "../aorto-arteritis/medication_info";
export default {
	name: "aortopathy",
	components: {
		[dynamicForm.name]: dynamicForm
	},
	data() {
		return {
			activeName: "first",
			information: general_information1,
			hosformation: inpatient_information,
			// accDisease: accompanyingDisease,
			lesMessage: lesionMessage,
			surNarcosis: surgeryNarcosis,
			checkOut: checkout,
			bodyHeat: bodyHeat,
			medicationInfo: medication_info,
			commenHistory: commen_history,
			heartHistory: heart_history,
			otherHistory: other_history,
			commen_complication,
			heart_complication,
			digestion_complication
		};
	},
	methods: {
		onChangeHandler(val) {
			console.log(JSON.stringify(this.information));
			console.log(JSON.stringify(val));
		},
		receveValue() {},
		gggg() {}
	},
	created() {
		// console.log(this.lesMessage);
	}
};
</script>
<style>

</style>
