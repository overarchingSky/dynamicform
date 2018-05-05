<template>
<div>
	<el-switch
  v-model="typeW"
  active-text="填写表单"
  inactive-text="查看值">
</el-switch>
<el-switch
style="margin-left:50px;"
  v-model="layoutW"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="form布局"
  inactive-text="table布局">
</el-switch>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="基本信息" name="first" >
		<div  style="float:left;margin-left:100px;" v-if="activeName == 'first'">
			<dynamic-form :options="[general_information1,inpatient_information]" @on-value-change="getValue" :type="type" :layout="layout" 
			:value='[{"formId":1,"slug":"aaaaaa","values":[{"_rowIndex":0,"name":{"data":"dsafsd"},"clientNumber":{},"birthday":{"data":1525795200000},"phone":{},"field_7":{"data":{"province":{"code":"420000","value":"湖北省"},"city":{"code":"429004","value":"仙桃市"},"area":{"code":"429004","value":"仙桃市"}}},"jub":{"data":"政府机关"},"nation":{"data":"汉"},"sex":{"data":"男"},"field_12":{"data":"离异"}}]},{"formId":101,"slug":"inpatient_information","values":[{"_rowIndex":0,"admissionDate":{},"admissionAge":{"data":48},"dischargeDate":{},"field_16":{},"field_17":{},"field_19":{},"field_20":{},"field_14":{},"field_18":{},"field_15":{"data":null}}]}] ' 
			:extra="{birthday:2908800000}" ref="base"></dynamic-form>
			<a @click="validate">验证</a>
		</div>
		<!-- <div  style="float:left;margin-left:100px;">
			<h3>住院基本信息</h3>
			<dynamic-form :options="general_information3"></dynamic-form>
		</div> -->
	</el-tab-pane>
	<el-tab-pane label="病变信息" name="second">
		<dynamic-form  v-if="activeName == 'second'" :options="[bingbian1,bingbian2,bingbian3,bingbian4]" :type="type" :layout="layout" @on-value-change="getValue" 
		:value='[{"formId":3,"slug":"pathological_information_1","values":[{"_rowIndex":0,"chiefComplaint":{},"firstDiagnose":{},"field_3":{"data":"广泛型"},"field_4":{"data":"type Ⅴ"},"field_5":{"data":3}}]},{"formId":4,"slug":"pathological_information_2","values":[{"_rowIndex":0,"field_6":{"data":"不受累"},"field_7":{"data":"不受累"},"field_8":{"data":"轻度狭窄（30%-50%）"},"field_9":{"data":"不受累"},"field_10":{"data":"不受累"},"field_11":{"data":"不受累"},"field_12":{"data":"不受累"}}]},{"formId":5,"slug":"pathological_information_3","values":[{"_rowIndex":0,"field_14":{"data":"不受累"},"field_15":{"data":"不受累"},"field_16":{"data":"不受累"},"field_17":{"data":"轻度狭窄（30%-50%）"},"field_18":{"data":"不受累"},"field_19":{"data":"不受累"}}]},{"formId":6,"slug":"pathological_information_4","values":[{"_rowIndex":0,"field_20":{"data":"不受累"},"field_21":{"data":"中度狭窄（50%-70%）"},"field_22":{"data":"不受累"},"field_23":{"data":"不受累"},"field_24":{"data":"不受累"},"field_13":{"data":"不受累"}}]}] '
		></dynamic-form>
	</el-tab-pane>
    <el-tab-pane label="既往史" name="third">
			<div style="float:left"  v-if="activeName == 'third'">
				<dynamic-form :options="[commen_history,heart_history,other_history]" :layout="layout" :type="type" @on-value-change="getValue"
				 :value='[
				 {"slug":"common_history","values":[{"_rowIndex":0,"field_1":{"data":"无"},"field_2":{"data":"有"},"field_3":{"data":"有"},"field_4":{"data":"无"},"field_12":{"data":"无"}}]},
				 {"slug":"blood_history","values":[{"_rowIndex":0,"field_5_1":{"data":"无"},"field_5_2":{"data":"有"},"field_5_3":{},"field_6_1":{"data":[{"_rowIndex":0,"field_6_1_1":{"data":"有"},"field_6_1_2":{"data":[{"_rowIndex":0,"field_6_1_2_1":{"data":"啥时给"}},{"_rowIndex":1,"field_6_1_2_1":{"data":"就等于就如同"}}]}}]},"field_6_1_1":{"data":"有"},"field_13_1":{"data":"无"},"field_6_1_2":{"data":[{"_rowIndex":0,"field_6_1_2_1":{"data":"啥时给"}},{"_rowIndex":1,"field_6_1_2_1":{"data":"就等于就如同"}}]}}]},
				 {"slug":"other_history","values":[{"_rowIndex":0,"field_8_1":{"data":"有"},"field_9_1":{"data":"有"},"field_9_2":{"data":"无"},"field_9_3":{"data":"无"},"field_10_1":{"data":"有"},"field_11":{"data":"test"},"field_13":{"data":"453"},"field_14":{"data":"645"}}]}] '></dynamic-form>
			</div>
			<!-- <div  style="float:left;margin-left:80px"  v-if="activeName == 'third'">
				<dynamic-form :options="[heart_history]" @on-value-change="getValue" :type="type" :layout="layout"
				 :value='[{"slug":"blood_history","values":[{"_rowIndex":0,"field_5_1":{"data":"无"},"field_5_2":{"data":"有"},"field_5_3":{},"field_6_1":{"data":[{"_rowIndex":0,"field_6_1_1":{"data":"有"},"field_6_1_2":{"data":[{"_rowIndex":0,"field_6_1_2_1":{"data":"啥时给"}},{"_rowIndex":1,"field_6_1_2_1":{"data":"就等于就如同"}}]}}]},"field_6_1_1":{"data":"有"},"field_13_1":{"data":"无"},"field_6_1_2":{"data":[{"_rowIndex":0,"field_6_1_2_1":{"data":"啥时给"}},{"_rowIndex":1,"field_6_1_2_1":{"data":"就等于就如同"}}]}}]}] '></dynamic-form>
			</div>
			<div  style="float:left;margin-left:80px"  v-if="activeName == 'third'">
				<dynamic-form :options="[other_history]" :type="type" :layout="layout" @on-value-change="getValue" 
				:value='[{"slug":"other_history","values":[{"_rowIndex":0,"field_8_1":{"data":"有"},"field_9_1":{"data":"有"},"field_9_2":{"data":"无"},"field_9_3":{"data":"无"},"field_10_1":{"data":"有"},"field_11":{"data":"test"},"field_13":{"data":"453"},"field_14":{"data":"645"}}]}] '></dynamic-form>
			</div> -->
	</el-tab-pane>
    <el-tab-pane label="化验" name="fourth" >
		<!-- 改成血压表格类型 -->
		<dynamic-form  v-if="activeName == 'fourth'" :options="[test]" :extra="{admissionDate:1520006400000,firstSurgeryDate:1520092800000}" @on-value-change="getValue" 
		:type="type" :layout="layout"
		 :value='[{"slug":"test_case","values":[{"_rowIndex":0,"field_1":{"data":1519833600000},"field_0":{"data":"住院1d"},"field_2":{"data":"53"},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{},"field_12":{},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":1,"field_1":{"data":1519920000000},"field_0":{"data":"术前2天"},"field_2":{},"field_3":{},"field_4":{"data":"546"},"field_5":{},"field_6":{},"field_7":{},"field_8":{},"field_9":{"data":"879"},"field_10":{},"field_11":{},"field_12":{},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":2,"field_1":{"data":1520006400000},"field_0":{"data":"术前1天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{},"field_12":{"data":"878"},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":3,"field_1":{"data":1520092800000},"field_0":{"data":"手术日"},"field_2":{},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{},"field_12":{},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":4,"field_1":{"data":1520179200000},"field_0":{"data":"术后1天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{"data":"546"},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{},"field_12":{"data":"5"},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":5,"field_1":{"data":1520265600000},"field_0":{"data":"术后2天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{"data":"87"},"field_8":{},"field_9":{},"field_10":{},"field_11":{"data":"4"},"field_12":{},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":6,"field_1":{"data":1520352000000},"field_0":{"data":"术后3天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{"data":"4545"},"field_8":{"data":"4"},"field_9":{},"field_10":{},"field_11":{},"field_12":{},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":7,"field_1":{"data":1520438400000},"field_0":{"data":"术后4天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{"data":"5"},"field_12":{},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":8,"field_1":{"data":1520524800000},"field_0":{"data":"术后5天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{},"field_12":{},"field_13":{"data":"4564"},"field_14":{},"field_15":{}},{"_rowIndex":9,"field_1":{"data":1520611200000},"field_0":{"data":"术后6天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{},"field_12":{},"field_13":{},"field_14":{},"field_15":{}},{"_rowIndex":10,"field_1":{"data":1520697600000},"field_0":{"data":"术后7天"},"field_2":{},"field_3":{},"field_4":{},"field_5":{"data":"456"},"field_6":{},"field_7":{},"field_8":{},"field_9":{},"field_10":{},"field_11":{},"field_12":{},"field_13":{},"field_14":{},"field_15":{"data":"4564"}}]}] '></dynamic-form>
	</el-tab-pane>
    <el-tab-pane label="手术及麻醉" name="five" >
		<dynamic-form v-if="activeName == 'five'" :options="[operate_info]" @on-value-change="getValue" :type="type" :layout="layout" :value='[{"slug":"surgical_anesthesia","values":[{"_rowIndex":0,"firstSurgeryDate":{"data":1525881600000},"field_15":{"data":"sdfasdasd"},"field_3":{"data":"造影+测压"},"field_5":{"data":"40"},"field_16":{"data":"4204"},"field_2":{"data":"dasd"},"field_6":{"data":"4.5"},"field_7":{"data":"545"},"field_17":{"data":"556"},"field_8":{"data":"545"},"field_9":{"data":"56"},"field_13":{"data":"3"},"field_14":{"data":"动脉瘤型"},"field_10":{"data":"病房"},"field_12":{"data":[{"_rowIndex":0,"field_12_1_1":{"data":"右颈"},"field_12_1_2":{"data":"轻度狭窄"},"field_12_1_3":{"data":"支架植入"},"field_12_1_4":{"data":"支架"},"field_12_1_5":{"data":"32"},"field_12_1_6":{"data":"1"},"field_12_1_7":{"data":"Cordis"},"field_12_1_8":{"data":"1"}},{"_rowIndex":1,"field_12_1_1":{"data":"右锁骨下"},"field_12_1_2":{"data":"动脉瘤或夹层"},"field_12_1_3":{"data":"搭桥手术"},"field_12_1_4":{"data":"大隐静脉"},"field_12_1_5":{"data":"156"},"field_12_1_6":{"data":"11"},"field_12_1_7":{"data":"微创"},"field_12_1_8":{"data":"11"}},{"_rowIndex":2,"field_12_1_1":{"data":"左颈"},"field_12_1_2":{"data":"中度狭窄"},"field_12_1_3":{"data":"支架植入"},"field_12_1_4":{},"field_12_1_5":{},"field_12_1_6":{},"field_12_1_7":{"data":"微创"},"field_12_1_8":{}}]}},{"_rowIndex":1,"firstSurgeryDate":{"data":1526486400000},"field_15":{"data":"14545"},"field_3":{"data":"介入手术"},"field_5":{"data":"455"},"field_16":{"data":"5\n"},"field_2":{"data":"4135"},"field_6":{"data":"464"},"field_7":{"data":"64564"},"field_17":{"data":"45645"},"field_8":{"data":"456456"},"field_9":{"data":"456456"},"field_13":{"data":"2"},"field_14":{"data":"动脉瘤型"},"field_10":{"data":"病房"},"field_12":{"data":[{"_rowIndex":0,"field_12_1_1":{"data":"左颈"},"field_12_1_2":{"data":"轻度狭窄"},"field_12_1_3":{"data":"球囊拓展"},"field_12_1_4":{"data":"人工血管"},"field_12_1_5":{"data":"456"},"field_12_1_6":{"data":"456"},"field_12_1_7":{"data":"Sterling"},"field_12_1_8":{"data":"456"}},{"_rowIndex":1,"field_12_1_1":{"data":"右锁骨下"},"field_12_1_2":{"data":"重度狭窄"},"field_12_1_3":{"data":"搭桥手术"},"field_12_1_4":{"data":"支架"},"field_12_1_5":{"data":"45"},"field_12_1_6":{"data":"456"},"field_12_1_7":{"data":"Viatrac"},"field_12_1_8":{"data":"1547"}}]}}]}] '></dynamic-form>
	</el-tab-pane>
	<el-tab-pane label="围手术及随访情况" name="six" >
		<dynamic-form v-if="activeName == 'six'" :options="[around_operate]" :extra="{admissionDate:1520006400000,firstSurgeryDate:1520092800000}" @on-value-change="getValue"
		:value='[{"slug":"preoperative","values":[{"_rowIndex":0,"field_1":{"data":"有"},"field_5":{"data":"是"},"field_2":{"data":[{"_rowIndex":0,"field_2_1":{"data":"dsafsad"},"field_2_2":{"data":1525795200000},"field_2_3":{"data":66},"field_2_4":{"data":"fagasdf"}},{"_rowIndex":1,"field_2_1":{"data":"asfdgsdf"},"field_2_2":{"data":1525968000000},"field_2_3":{"data":68},"field_2_4":{"data":"fgdhfg"}},{"_rowIndex":2,"field_2_1":{"data":"ghjfghhkfghkjh"},"field_2_2":{"data":1527177600000},"field_2_3":{"data":82},"field_2_4":{"data":"fhjkghjkh"}}]},"field_6":{"data":"sdgfgn的粉红色房东告诉对方"}}]}]'
		:type="type" :layout="layout"
		></dynamic-form>	
	</el-tab-pane>
    <el-tab-pane label="血压" name="seven">
		<dynamic-form  v-if="activeName == 'seven'" :options="[blood_pressure]" :extra="{admissionDate:1520006400000,firstSurgeryDate:1520179200000}" :type="type" :layout="layout" 
		:value='[{"slug":"blood_pressure","values":[{"_rowIndex":0,"field_1":{"data":"测试血压1"},"field_2":{"data":[{"_rowIndex":0,"field_2_1":{"data":1519920000000},"field_2_2":{"data":"住院1d"},"field_2_3":{"data":"4534"},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":1,"field_2_1":{"data":1520006400000},"field_2_2":{"data":"术前2天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":2,"field_2_1":{"data":1520092800000},"field_2_2":{"data":"术前1天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{"data":"4564"},"field_2_7":{},"field_2_8":{},"field_2_9":{"data":"456"},"field_2-10":{}},{"_rowIndex":3,"field_2_1":{"data":1520179200000},"field_2_2":{"data":"手术日"},"field_2_3":{},"field_2_4":{"data":"5645"},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{"data":"456"},"field_2_9":{},"field_2-10":{}},{"_rowIndex":4,"field_2_1":{"data":1520265600000},"field_2_2":{"data":"术后1天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{"data":"456"},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":5,"field_2_1":{"data":1520352000000},"field_2_2":{"data":"术后2天"},"field_2_3":{},"field_2_4":{},"field_2_5":{"data":"45645"},"field_2_6":{},"field_2_7":{"data":"456"},"field_2_8":{"data":"456"},"field_2_9":{},"field_2-10":{}},{"_rowIndex":6,"field_2_1":{"data":1520438400000},"field_2_2":{"data":"术后3天"},"field_2_3":{},"field_2_4":{"data":"46"},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":7,"field_2_1":{"data":1520524800000},"field_2_2":{"data":"术后4天"},"field_2_3":{},"field_2_4":{},"field_2_5":{"data":"46"},"field_2_6":{},"field_2_7":{},"field_2_8":{"data":"456"},"field_2_9":{},"field_2-10":{}},{"_rowIndex":8,"field_2_1":{"data":1520611200000},"field_2_2":{"data":"术后5天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":9,"field_2_1":{"data":1520697600000},"field_2_2":{"data":"术后6天"},"field_2_3":{},"field_2_4":{},"field_2_5":{"data":"456"},"field_2_6":{},"field_2_7":{},"field_2_8":{"data":"45"},"field_2_9":{},"field_2-10":{}},{"_rowIndex":10,"field_2_1":{"data":1520784000000},"field_2_2":{"data":"术后7天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{"data":"4564"},"field_2_9":{},"field_2-10":{}}]}},{"_rowIndex":1,"field_1":{"data":"测试血压2"},"field_2":{"data":[{"_rowIndex":0,"field_2_1":{"data":1519920000000},"field_2_2":{"data":"住院1d"},"field_2_3":{},"field_2_4":{"data":"75368"},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":1,"field_2_1":{"data":1520006400000},"field_2_2":{"data":"术前2天"},"field_2_3":{},"field_2_4":{},"field_2_5":{"data":"7896"},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":2,"field_2_1":{"data":1520092800000},"field_2_2":{"data":"术前1天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":3,"field_2_1":{"data":1520179200000},"field_2_2":{"data":"手术日"},"field_2_3":{"data":"897"},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":4,"field_2_1":{"data":1520265600000},"field_2_2":{"data":"术后1天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":5,"field_2_1":{"data":1520352000000},"field_2_2":{"data":"术后2天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{"data":"789"},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":6,"field_2_1":{"data":1520438400000},"field_2_2":{"data":"术后3天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":7,"field_2_1":{"data":1520524800000},"field_2_2":{"data":"术后4天"},"field_2_3":{},"field_2_4":{},"field_2_5":{"data":"789"},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":8,"field_2_1":{"data":1520611200000},"field_2_2":{"data":"术后5天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":9,"field_2_1":{"data":1520697600000},"field_2_2":{"data":"术后6天"},"field_2_3":{},"field_2_4":{"data":"89"},"field_2_5":{"data":"8"},"field_2_6":{},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}},{"_rowIndex":10,"field_2_1":{"data":1520784000000},"field_2_2":{"data":"术后7天"},"field_2_3":{},"field_2_4":{},"field_2_5":{},"field_2_6":{"data":"5"},"field_2_7":{},"field_2_8":{},"field_2_9":{},"field_2-10":{}}]}}]}] '
		 @on-value-change="getValue"></dynamic-form>
	</el-tab-pane>
	<el-tab-pane label="用药信息" name="eight" >
		<dynamic-form v-if="activeName == 'eight'" :options="[medication_info]" @on-value-change="getValue" :value="valueObj" :type="type" :layout="layout"></dynamic-form>
	</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import dynamicForm from "lib/components/dynamic-form";
import { general_information1 } from "./general_information"; //一般资料
import { inpatient_information } from "./zhuyuan";
import { bingbian1, bingbian2, bingbian3, bingbian4 } from "./bingbian";
import {
	commen_history,
	heart_history,
	other_history
} from "./accompanying-disease"; //既往史
import { test } from "./test"; //化验
import { operate_info } from "./operate_info"; //手术信息
import { around_operate } from "./around_operate"; //围术及随访
import { blood_pressure } from "./blood_pressure"; //血压
import { medication_info } from "./medication_info"; //用药情况
export default {
	name: "aorto-arteritis-form",
	components: {
		dynamicForm
	},
	computed: {
		layout() {
			return this.layoutW ? "form" : "table";
		},
		type() {
			return this.typeW ? "input" : "view";
		}
	},
	data() {
		return {
			layoutW: true,
			typeW: true,
			heart_history_value: [
				{
					slug: "blood_history",
					values: [
						{
							_rowIndex: 0,
							field_5_1: { data: "无" },
							field_5_2: { data: "无" },
							field_5_3: {},
							field_6_1: { data: "1023" },
							field_13_1: { data: "无" }
						}
					]
				}
			],
			activeName: "first",
			valueObj: [
				{
					slug: "drug_information",
					values: [
						{
							field_1: {
								data: [
									{
										field_1_1: { data: "哈哈" },
										field_1_2: { data: "嘿嘿" },
										field_1_4: { data: "100" },
										field_1_3: {
											data: [
												{
													field_1_3_1: {
														data: "术前"
													},
													field_1_3_3: { data: "10" },
													field_1_3_2: {
														data: [
															{
																field_1_3_2_1: {
																	data: "1030"
																},
																field_1_3_2_2: {
																	data: "20"
																},
																field_1_3_2_3: {
																	data: "30"
																},
																field_1_3_2_4: {
																	data: 1522771200000
																},
																field_1_3_2_5: {
																	data: 1523289600000
																},
																_rowIndex: 0
															},
															{
																field_1_3_2_1: {
																	data: "1"
																},
																field_1_3_2_2: {
																	data: "2"
																},
																field_1_3_2_3: {
																	data: "3"
																},
																field_1_3_2_4: {
																	data: 1522771200000
																},
																field_1_3_2_5: {
																	data: 1523289600000
																},
																_rowIndex: 1
															}
														]
													},
													_rowIndex: 0
												},
												{
													field_1_3_1: {
														data:
															"围手术期（术后3天）"
													},
													field_1_3_3: { data: "20" },
													field_1_3_2: {
														data: [
															{
																field_1_3_2_1: {
																	data: "30"
																},
																field_1_3_2_2: {
																	data: "4"
																},
																field_1_3_2_3: {
																	data: "560"
																},
																field_1_3_2_4: {
																	data: 1522771200000
																},
																field_1_3_2_5: {
																	data: 1522857600000
																},
																_rowIndex: 0
															},
															{
																field_1_3_2_1: {
																	data: "310"
																},
																field_1_3_2_2: {
																	data: "41"
																},
																field_1_3_2_3: {
																	data: "5610"
																},
																field_1_3_2_4: {
																	data: 1522771200000
																},
																field_1_3_2_5: {
																	data: 1522857600000
																},
																_rowIndex: 1
															}
														]
													},
													_rowIndex: 1
												},
												{
													field_1_3_1: {
														data: "术后"
													},
													field_1_3_3: { data: "30" },
													field_1_3_2: {
														data: [
															{
																field_1_3_2_1: {
																	data: "70"
																},
																field_1_3_2_2: {
																	data: "80"
																},
																field_1_3_2_3: {
																	data: "90"
																},
																field_1_3_2_4: {
																	data: 1522598400000
																},
																field_1_3_2_5: {
																	data: 1524844800000
																},
																_rowIndex: 0
															},
															{
																field_1_3_2_1: {
																	data: "701"
																},
																field_1_3_2_2: {
																	data: "801"
																},
																field_1_3_2_3: {
																	data: "901"
																},
																field_1_3_2_4: {
																	data: 1522598400000
																},
																field_1_3_2_5: {
																	data: 1524844800000
																},
																_rowIndex: 1
															}
														]
													},
													_rowIndex: 2
												}
											]
										},
										_rowIndex: 0
									},
									{
										field_1_1: { data: "降压药" },
										field_1_2: {
											data: "盐酸地尔硫卓缓释胶囊"
										},
										field_1_4: { data: "99" },
										field_1_3: {
											data: [
												{
													field_1_3_1: {
														data: "术后"
													},
													field_1_3_3: { data: "89" },
													field_1_3_2: {
														data: [
															{
																field_1_3_2_1: {
																	data: "88"
																},
																field_1_3_2_2: {
																	data: "87"
																},
																field_1_3_2_3: {
																	data: "86"
																},
																field_1_3_2_4: {
																	data: 1526918400000
																},
																field_1_3_2_5: {
																	data: 1527177600000
																},
																_rowIndex: 0
															}
														]
													},
													_rowIndex: 0
												}
											]
										},
										_rowIndex: 1
									}
								]
							},
							field_2: {
								data: [
									{
										field_2_1: { data: "肝素钠注射液" },
										field_2_2: { data: "3" },
										field_2_3: { data: "302" },
										_rowIndex: 0
									},
									{
										field_2_1: {
											data: "盐酸尼卡地平注射液"
										},
										field_2_2: { data: "4" },
										field_2_3: { data: "50" },
										_rowIndex: 1
									},
									{
										field_2_1: {
											data: "盐酸尼卡地平注射液"
										},
										field_2_2: { data: "4" },
										field_2_3: { data: "50" },
										_rowIndex: 2
									}
								]
							},
							field_3: { data: "10" },
							field_4: { data: "30" },
							field_5: { data: "50" },
							_rowIndex: 0
						},
						{
							_rowIndex: 1,
							field_3: { data: "73" },
							field_4: { data: "783" },
							field_5: { data: "783" },
							field_1: {
								data: [
									{
										_rowIndex: 0,
										field_1_1: { data: "抗凝/抗血小板药" },
										field_1_2: { data: "依诺肝素钠注射液" },
										field_1_4: { data: "49" },
										field_1_3: {
											data: [
												{
													_rowIndex: 0,
													field_1_3_1: {
														data:
															"围手术期（术后3天）"
													},
													field_1_3_3: { data: "45" },
													field_1_3_2: {
														data: [
															{
																_rowIndex: 0,
																field_1_3_2_1: {
																	data: "11"
																},
																field_1_3_2_2: {
																	data: "1"
																},
																field_1_3_2_3: {
																	data: "11"
																},
																field_1_3_2_4: {
																	data: 1526486400000
																},
																field_1_3_2_5: {
																	data: 1527696000000
																}
															}
														]
													}
												}
											]
										}
									}
								]
							},
							field_2: {
								data: [
									{
										_rowIndex: 0,
										field_2_1: { data: "硝酸甘油注射液" },
										field_2_2: { data: "7" },
										field_2_3: { data: "37" }
									}
								]
							}
						}
					]
				}
			],
			general_information1,
			inpatient_information,
			bingbian1,
			bingbian2,
			bingbian3,
			bingbian4,
			commen_history,
			test,
			operate_info,
			around_operate,
			blood_pressure,
			medication_info,
			commen_history,
			heart_history,
			other_history
		};
	},
	methods: {
		validate() {
			this.$refs.base.validate();
		},
		getValue(val, property) {
			//console.log("val", JSON.stringify(val), property);
		}
	},
	created() {}
};
</script>

<style>

</style>
