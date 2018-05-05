<template>
	<div class="">
		<h1>动态表单调试页</h1>
		<p>支持功能：1.自动计算，2.验证，3.字段或字段选项根据前置字段特定值条件显示，4.初级表单嵌套，5.表单值查看，6表单和表单值查看组件都支持两种布局，并可随意嵌套（table和form）</p>
		<div class="forms">
		<div class="base-form form">
			<h2>base-form</h2>
			<dynamic-form ref="base-form" :value="baseFormValue" :options="options" @on-value-change="onChangeHandler"></dynamic-form>
			<el-button @click="baseOnClick">验证base-form</el-button>
		</div>
		<div class="table-form form">
			<h2>table-form</h2>
			<dynamic-form ref="table-form" :options="options2" :value="value" @on-value-change="receveValue"></dynamic-form>
			<el-button @click="tableOnClick">验证table-form</el-button>
		</div>
		<h1>InfinityTable组件的使用</h1>
		<div class="table-form form">
			<h2>不含子字段组</h2>
			<dynamic-form ref="single-field-form" :options="options_single_field" :value="baseFormValue" @on-value-change="receveValue"></dynamic-form>
		</div>
		<div class="table-form form">
			<h2>独立的血压表单（喊子字段组）</h2>
			<dynamic-form ref="xueya-form" :options="options_xueya" :value="baseFormValue" @on-value-change="receveValue"></dynamic-form>
		</div>
		
		</div>
		<div class="">
			<div class="form-value">
				<h2>form-value</h2>
				<dynamic-form-value :options="options2" :value="value"></dynamic-form-value>
			</div>
			<div class="table-value">
				<h2>table-value</h2>
				<dynamic-form-value :options="options" :value="value"></dynamic-form-value>
			</div>
      <el-button @click="isData=true">显示数据</el-button>
      <div v-if="isData">
        label:{{label}}
        </br></br>
        data:{{data}}
      </div>
    	</div>
		
	</div>
</template>
<script>
import dynamicForm from "lib/components/dynamic-form/form";
import dynamicValue from "lib/components/dynamic-form/value";
import layout from "lib/components/dynamic-form/value/layout";
export default {
	name: "login",
	components: {
		dynamicForm,
		[dynamicValue.name]: dynamicValue
	},
	methods: {
		baseOnClick() {
			this.$refs["base-form"].validate();
		},
		tableOnClick() {
			this.$refs["table-form"].validate().then(_ => {
				alert("正在提交");
			});
		},
		onChangeHandler(val) {
			console.log(val);
			console.log("base-form-value", JSON.stringify(val));
		},
		receveValue(value) {
			this.formValue = value;
			console.log(JSON.stringify(value));
		}
	},
	data() {
		return {
			isData: false,
			baseFormValue: [
				{
					_rowIndex: 0,
					userName: {},
					start: {},
					end: {},
					end1: {},
					cal: {},
					number: {},
					birthday: {},
					admissionDate: {},
					dischargeDate: {},
					contactPhone: {},
					nativePlace: {},
					occupation: {},
					nation: {},
					gender: {},
					maritalStatus: {},
					infinity: {
						data: [
							{
								"6AM": { field_2: "10", field_3: "11" },
								"10AM": { field_2: "20", field_3: "21" },
								"2PM": { field_2: "30", field_3: "31" },
								"6PM": { field_2: "40", field_3: "41" }
							},
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} },
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} },
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} },
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} },
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} },
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} },
							{
								"6AM": { field_2: "12" },
								"10AM": { field_2: "123" },
								"2PM": { field_2: "1234" },
								"6PM": { field_2: "12345" }
							},
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} },
							{ "6AM": {}, "10AM": {}, "2PM": {}, "6PM": {} }
						]
					}
				}
			],
			value: [
				{
					userName: { data: "田龙" },
					start: { data: "10" },
					end: {},
					end1: {},
					cal: {},
					number: {},
					birthday: {},
					admissionDate: {},
					dischargeDate: {},
					contactPhone: {},
					nativePlace: {},
					occupation: {},
					nation: {},
					gender: { data: "男" },
					maritalStatus: {},
					nativePlace: {
						data: {
							province: { code: "430000", value: "湖南省" },
							city: { code: "431100", value: "永州市" },
							area: { code: "431126", value: "宁远县" }
						}
					},
					group: {
						data: [
							{
								a2: { data: 110 }, //undefined,
								a3: { data: 1 },
								a1: { data: 2 }
								// a1: {
								//   data: [
								//     {
								//       _rowIndex: "axx",
								//       a12: {},
								//       a11: {
								//         data: [
								//           { _rowIndex: "axxx", a111: { data: 1 }, a112: {} }
								//         ]
								//       }
								//     }
								//   ]
								// }
							},
							{
								a2: { data: 10 }, //undefined,
								a3: undefined
								// a1: {
								//   data: [
								//     {
								//       _rowIndex: "axx",
								//       a12: {},
								//       a11: {
								//         data: [
								//           { _rowIndex: "axxx", a111: { data: 1 }, a112: {} }
								//         ]
								//       }
								//     }
								//   ]
								// }
							}
						]
					}
				}
			],
			options_single_field: {
				title: "不含子字段组的InfinityTable",
				id: "123456789",
				version: 1,
				multiple: false,
				fields: [
					{
						name: "infinity",
						type: "infinityTable",
						cellInputType: "number",
						label: "血压",
						enAbleLabel: false,
						startDate: Date.now(),
						step: 86400000, //一天的毫秒数
						placeholder: "",
						groups: ["1AM", "12AM"]
					}
				]
			},
			options_xueya: {
				title: "单独的血压表格",
				id: "1234567890",
				version: 1,
				multiple: false,
				fields: [
					{
						name: "infinity",
						type: "infinityTable",
						label: "血压",
						enAbleLabel: false,
						required: true,
						visible: true,
						startDate: Date.now(),
						step: 86400000, //一天的毫秒数
						placeholder: "",
						groups: ["6AM", "10AM", "2PM", "6PM"],
						fields: [
							{
								label: "收",
								type: "number",
								name: "field_2",
								required: false,
								validator: {
									message:
										"收不能大于舒!!!!!!!!!!!!!!!!!!!!!!"
								}
							},
							{
								label: "舒",
								type: "number",
								name: "field_3",
								validator: {
									message: "舒不能大于收"
								},
								required: false
							}
						]
					}
				]
			},
			options: {
				title: "基本信息",
				id: "1234567891",
				version: 1,
				multiple: false,
				display: {
					layout: "base-form",
					style: {}
				},
				fields: [
					{
						name: "infinity",
						type: "infinityTable",
						label: "血压",
						enAbleLabel: true, //默认为true,仅在multiple为false的表单中生效
						required: true,
						visible: true,
						startDate: Date.now(),
						step: 86400000, //一天的毫秒数
						placeholder: "",
						groups: ["6AM", "10AM", "2PM", "6PM"],
						fields: [
							{
								label: "收",
								type: "number",
								name: "field_2",
								required: false,
								validator: {
									message:
										"收不能大于舒!!!!!!!!!!!!!!!!!!!!!!"
								}
							},
							{
								label: "舒",
								type: "number",
								name: "field_3",
								validator: {
									message: "舒不能大于收"
								},
								required: false
							}
						]
					},
					{
						//子表单
						name: "group",
						type: "subform",
						label: "成绩信息",
						required: true,
						multiple: true,
						visible: true,
						fields: [
							{
								name: "a1",
								type: "number",
								label: "语文",
								required: true,
								visible: true
							},
							{
								name: "a2",
								type: "number",
								label: "数学",
								required: false,
								visible: true
							},
							{
								name: "a3",
								type: "number",
								label: "英语",
								required: false,
								visible: true
							}
						]
					},
					{
						name: "count",
						label: "成绩信息记录数量",
						type: "number",
						rely: {
							formula: `GETDATALENGTH('group')`,
							fields: ["group"],
							immediate: true
						}
					},
					{
						name: "userName",
						type: "text",
						label: "姓名",
						required: true,
						visible: true,
						placeholder:
							"请输入您的姓名（输入“张龙”可触发隐藏字段显示）",
						validator: ""
					},
					{
						name: "async",
						type: "number",
						label: "根据姓名字段特定值显示",
						required: false,
						visible: false,
						rely: {
							visibility: "'$userName#'=='张龙'",
							fields: ["userName"]
						}
					},
					{
						name: "start",
						type: "number",
						label: "起点",
						required: false,
						placeholder: "出发地点",
						visible: true,
						validator: {
							formula: "$start#<$end#",
							fields: ["end"],
							message: "起点必须小于终点"
						}
					},
					{
						name: "end",
						type: "number",
						label: "终点",
						required: false,
						visible: true,
						validator: {
							formula: "$start#<$end#&&$end#<$end1#",
							fields: ["start", "end", "end1"],
							message: "终点必须大于起点且小于终点1"
						}
					},
					{
						name: "end1",
						type: "number",
						label: "终点1",
						required: false,
						visible: true,
						validator: {
							formula: "$end#<$end1#",
							fields: ["end", "end1"],
							message: "终点1必须大于终点"
						}
					},
					{
						name: "cal",
						type: "number",
						label: "自动计算",
						required: false,
						visible: true,
						rely: {
							formula: "$start#+$end1#",
							fields: ["start", "end1"]
						}
					},
					{
						name: "number",
						type: "number",
						label: "住院号",
						required: false,
						visible: true
					},
					{
						name: "birthday",
						type: "date",
						label: "生日",
						required: true,
						visible: true
					},
					{
						name: "admissionDate",
						type: "date",
						label: "入院日期",
						required: true,
						visible: true,
						validator: {
							formula: "$dischargeDate#>$admissionDate#",
							fields: ["dischargeDate"],
							message: "入院时间必须早于出院时间"
						}
					},
					{
						name: "dischargeDate",
						type: "date",
						label: "出院日期",
						validator: {
							formula: "$dischargeDate#>$admissionDate#",
							fields: ["admissionDate"],
							message: "出院时间必须晚于入院时间"
						},
						required: true,
						visible: true
					},
					{
						name: "contactPhone",
						type: "text",
						label: "联系电话",
						required: true,
						visible: true
					},
					{
						name: "nativePlace",
						type: "address",
						label: "籍贯",
						required: true,
						visible: true
					},
					{
						name: "occupation",
						type: "select",
						allowInput: true,
						label: "职业",
						required: true,
						visible: true,
						options: [
							{
								label: "专业技术人员",
								value: "1",
								visible: false,
								rely: {
									visibility: "'$nation#'=='汉族'", //必须加上引号
									fields: ["nation"]
								}
							},
							{
								label: "政府机关",
								value: "2",
								visible: false,
								rely: {
									visibility: "'$nation#'=='汉族'", //必须加上引号
									fields: ["nation"]
								}
							},
							{
								label: "事业单位",
								value: "3",
								visible: true
							},
							{
								label: "体力劳动者",
								value: "4",
								visible: true
							},
							{
								label: "其他",
								visible: true
							}
						]
					},
					{
						name: "nation",
						type: "select",
						label: "民族",
						required: true,
						visible: true,
						// rely: {
						// 	fields: ["nation"],
						// 	visibility: "'$nation#'=='其他'"
						// },
						options: [
							{
								label: "汉族",
								value: "汉族",
								visible: true
							},
							{
								label: "其他",
								value: "其他",
								visible: true
							}
						]
					},
					{
						name: "gender",
						type: "select",
						label: "性别",
						required: true,
						visible: true,
						options: [
							{
								label: "男",
								value: "1",
								visible: true
							},
							{
								label: "女",
								value: "2",
								visible: true
							}
						]
					},
					{
						name: "maritalStatus",
						type: "select",
						label: "婚姻状况",
						required: true,
						visible: true,
						options: [
							{
								label: "未婚",
								value: "1",
								visible: true
							},
							{
								label: "已婚",
								value: "2",
								visible: true
							},
							{
								label: "离异",
								value: "3",
								visible: true
							}
						]
					}
				]
			},
			options2: {
				title: "表格形式表单",
				id: "1234567894535",
				version: 1,
				multiple: true,
				display: {
					layout: "table-form"
				},
				fields: [
					{
						name: "userName",
						type: "text",
						label: "姓名",
						required: true,
						visible: true,
						placeholder: "请输入您的姓名",
						validator: ""
					},
					{
						name: "async",
						type: "number",
						label: "根据姓名字段特定值显示",
						required: false,
						visible: false,
						rely: {
							visibility: "'$userName#'=='张龙'",
							fields: ["userName"]
						}
					},

					{
						//子表单
						name: "group",
						type: "subform",
						label: "成绩信息",
						required: true,
						multiple: true,
						visible: true,
						fields: [
							/*{
                name: "a1",
                type: "subform",
                label: "语文",
                required: true,
                multiple: true,
                visible: true,
                fields: [
                  {
                    name: "a11",
                    type: "subform",
                    label: "最高分",
                    required: true,
                    visible: true,
                    fields: [
                      {
                        name: "a111",
                        type: "number",
                        label: "最高分1",
                        required: true,
                        visible: true
                      },
                      //可以在表格类型表单的根表单中使用如下方法动态增加字段，但请勿在子表单中使用，因为子表单中的一条数据动态添加了表头后，会导致该子表单所有其他数据都添加了该字段。
                      //   {
                      //     name: "max",
                      //     type: "number",
                      //     label: "根据最高分1显示",
                      //     required: false,
                      //     visible: false,
                      //     rely: {
                      //       visibility: "'$a111#'>='80'",
                      //       fields: ["a111"]
                      //     }
                      //   },
                      {
                        name: "a112",
                        type: "date",
                        label: "最低分2",
                        required: true,
                        visible: true
                      }
                    ]
                  },
                  {
                    name: "a12",
                    type: "number",
                    label: "最低分",
                    required: false,
                    visible: true
                  }
                ]
              },*/
							{
								name: "a2",
								type: "number",
								label: "数学",
								required: false,
								visible: true,
								validator: {
									formula: "$a2#>=80",
									fields: [],
									message: "数学成绩必须大于等于80"
								}
							},
							{
								name: "a3",
								type: "number",
								label: "英语",
								required: false,
								visible: true,
								validator: {
									formula: "$a3#>=$a2#",
									fields: ["a2"],
									message: "英语必须大于数学"
								}
							}
						]
					},
					{
						name: "start",
						type: "number",
						label: "起点",
						required: false,
						placeholder: "出发地点",
						visible: true,
						validator: {
							formula: "$start#<$end#",
							fields: ["end"],
							message: "起点必须小于终点"
						}
					},
					{
						name: "end",
						type: "number",
						label: "终点",
						required: false,
						visible: true,
						validator: {
							formula: "$start#<$end#&&$end#<$end1#",
							fields: ["start", "end", "end1"],
							message: "终点必须大于起点且小于终点1"
						}
					},
					{
						name: "end1",
						type: "number",
						label: "终点1",
						required: false,
						visible: true,
						validator: {
							formula: "$end#<$end1#",
							fields: ["end", "end1"],
							message: "终点1必须大于终点"
						}
					},
					{
						name: "cal",
						type: "number",
						label: "自动计算",
						required: false,
						visible: true,
						rely: {
							formula: "$start#+$end1#",
							fields: ["start", "end1"]
						}
					},
					{
						name: "number",
						type: "number",
						label: "住院号",
						required: false,
						visible: true
					},
					{
						name: "birthday",
						type: "date",
						label: "生日",
						required: true,
						visible: true
					},
					{
						name: "admissionDate",
						type: "date",
						label: "入院日期",
						required: true,
						visible: true
					},
					{
						name: "dischargeDate",
						type: "date",
						label: "出院日期",
						display: {
							style: {
								"min-width": 240,
								"max-width": 500
							}
						},
						validator: {
							formula: "$dischargeDate#>$admissionDate#",
							fields: ["admissionDate"],
							message: "出院时间必须晚于入院时间"
						},
						required: true,
						visible: true
					},
					{
						name: "contactPhone",
						type: "text",
						label: "联系电话",
						required: true,
						visible: true
					},
					{
						name: "nativePlace",
						type: "address",
						label: "籍贯",
						display: {
							style: {
								"max-width": 800,
								"min-width": 350
							}
						},
						required: true,
						visible: true
					},
					{
						name: "occupation",
						type: "select",
						label: "职业",
						required: true,
						visible: true,
						options: [
							{
								label: "专业技术人员",
								value: "1",
								visible: true
							},
							{
								label: "政府机关",
								value: "2",
								visible: true
							},
							{
								label: "事业单位",
								value: "3",
								visible: true
							},
							{
								label: "体力劳动者",
								value: "4",
								visible: true
							},
							{
								label: "其他",
								value: "5",
								visible: true
							}
						]
					},
					{
						name: "nation",
						type: "select",
						label: "民族",
						required: true,
						visible: true,
						options: [
							{
								label: "汉族",
								value: "汉族",
								visible: true
							},
							{
								label: "其他",
								value: "其他",
								visible: true
							}
						]
					},
					{
						name: "gender",
						type: "select",
						label: "性别",
						required: true,
						visible: true,
						options: [
							{
								label: "男",
								value: "1",
								visible: true
							},
							{
								label: "女",
								value: "2",
								visible: true
							}
						]
					},
					{
						name: "maritalStatus",
						type: "select",
						label: "婚姻状况",
						required: true,
						visible: true,
						options: [
							{
								label: "未婚",
								value: "1",
								visible: true
							},
							{
								label: "已婚",
								value: "2",
								visible: true
							},
							{
								label: "离异",
								value: "3",
								visible: true
							}
						]
					}
				]
			},
			label: {
				title: "基本信息",
				version: 1,
				multiple: false,
				fields: [
					{
						name: "field_1",
						label: "姓名",
						type: "text",
						required: true
					},
					{
						name: "field_21",
						label: "病案号",
						type: "number",
						required: true
					},
					{
						name: "field_3",
						label: "出生日期",
						type: "date",
						required: true
					},
					{
						name: "field_13",
						label: "年龄",
						type: "number",
						editable: false,
						placeholder: "根据出生日期自动计算",
						required: true
					},
					{
						name: "field_4",
						type: "date",
						label: "入院日期",
						required: true,
						validator: {
							formula: "$field_5#>$field_4#",
							fields: ["field_4"],
							message: "入院时间必须早于出院时间"
						}
					},
					{
						name: "field_5",
						type: "date",
						label: "出院日期",
						validator: {
							formula: "$field_5#>$field_4#",
							fields: ["field_4"],
							message: "出院时间必须晚于入院时间"
						},
						required: true
					},
					{
						name: "field_6",
						label: "联系电话",
						type: "number",
						required: true
					},
					{ name: "field_7", label: "籍贯", type: "address" },
					{
						name: "field_8",
						label: "职业",
						type: "select",
						allowInput: true,
						options: [
							{ label: "专业技术人员" },
							{ label: "政府机关" },
							{ label: "事业单位" },
							{ label: "体力劳动者" }
						]
					},
					{
						name: "field_9",
						label: "民族",
						type: "select",
						default: "汉",
						options: [{ label: "汉" }, { label: "其它" }]
					},
					{
						name: "field_11",
						label: "性别",
						type: "select",
						options: [{ label: "男" }, { label: "女" }]
					},
					{
						name: "field_12",
						label: "婚姻",
						type: "select",
						options: [
							{ label: "已婚" },
							{ label: "未婚" },
							{ label: "离异" }
						]
					}
				]
			},
			data: [
				{
					_rowIndex: 0,
					field_1: { data: "哈哈" },
					field_21: { data: "12" },
					field_3: { data: "2018-02-20T16:00:00.000Z" },
					field_13: { data: "15" },
					field_4: { data: "2018-02-13T16:00:00.000Z" },
					field_5: { data: "2018-02-15T16:00:00.000Z" },
					field_6: { data: "1356666666" },
					field_7: {
						data: {
							province: { code: "360000", value: "江西省" },
							city: { code: "360200", value: "景德镇市" },
							area: { code: "360222", value: "浮梁县" }
						}
					},
					field_8: { data: "事业单位" },
					field_9: { data: "汉" },
					field_11: { data: "男" },
					field_12: { data: "未婚" }
				}
			]
		};
	}
};
</script>
<style lang="less">
.forms {
	width: 100%;
	.form {
		display: inline-block;
		width: 40%;
		margin: 0 3%;
		vertical-align: top;
	}
	.table-form {
		width: 80%;
	}
}
</style>
