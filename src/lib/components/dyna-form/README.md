#问卷答案格式

##默认值（空值）：一般情况，只包含question_content, question_id, question_slug三个字段的值为空值，有时还包含text_answer字段，其值为空，也为空值。
{
	question_content:"测试",
	question_id:'102',
	question_slug:'"lw_weight"',
	text_answer:''//默认表单值这里为空，填写后才有值
},
{
	question_content:"有无其他疾病",
	question_id:'has_other_disease',
	question_slug:'lw_hyperlipid',
},
##非空值：
 [
	{
		question_content:'脊柱变形多长时间',
		question_id:"spinal_deformity_duration",
		question_slug:'"lw_weight"',
		*text_answer:'100'
	},
	{
		question_content:"有无其他疾病",
		question_id:'has_other_disease',
		question_slug:'"lw_weight"',
		*option_ids:"1",
		*option_content:'有'
	},
]

##字段说明：
question_info:{
	id:'问题唯一id'，
	content:'问题描述label'，
	block_index:'将block_index相同的问题分为一组，在界面上，根据block_index值大小顺序进行显示',（分组可用于某些特殊目的，比如，显示“组”的特定ui）
	question_index："问题在该block（组）中的排序位置"，
	question_type:"问题答复类型，number类型，目前支持5种，具体查看./input_type.js"，(注：如果为4，即时间选择类型，则可额外配置dateType字段设置类型)
	dateType:'日历模式，支持三种类型切换，'date'年月日,'time'时分秒,'datetime'年月日+时分秒],默认date类型,
	unit："单位",
	checking_rules："验证规则，多项以#drone#连接，如require#drone#number，必填的数字类型，具体查看./validate.js",
	display："控制是否显示该项，0隐藏，1显示，一般为1，作为联动项时，设为0"，
	hints:"输入提示信息，填写型表单项设置有效，相当于placeholder"，
	disabled:"是否禁用表单项（不能点击，并且显示为灰色），目前支持的已经有radio,text,textarea三种，如需要拓展，请在formItem/item.vue增加样式"
}
options:[
	{
		question_id:'请保持和question_info中id一致'，
		key:'',"选项的key或者value"
		content："选项的文字"，
		selected:"设置是否默认选中项,0不选，1选中，一个options中只能存在一个选项选中，否则可能会产生意料之外的结果"，
		option_index："用于选项的排序"
	}
]

#问卷格式
  [
 			{
 				question_info:{
 					"id":"spinal_deformity_duration","content":"脊柱变形多长时间", "value":"","question_index":"0","block_index":"0","question_type":'2',"unit":"年",
 					"checking_rules":"require#drone#number"//验证规则，用#drone#连接
 					"display":'1',
 					"hints":'提示信息'
 				},
 				options:[]
 			},
 			{
 				question_info:{
 					"id":"has_spinal_orthosis","content":"是否做过脊柱矫形手术", "value":"0", "question_index":"1","block_index":"0",
 					"question_type":"0",
 					"display":'1',
 				},
 				"options":[
 					{
 						"id":'1',
 					 	"question_id":"1",
 						"content":"是",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 					    "option_index":"1",
 					    "hints":"提示"
 					},
 					{
 						"id":'1',
 					 	"question_id":"1",
 						"content":"否",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 					    "option_index":"2",
 					    "hints":"提示"
 					},
 				]
 			},
 			{
 				question_info:{
 					"id":"has_body_fixture","content":"体内是否有内固定物", "value":"0", "question_index":"2","block_index":"0",
 					"question_type":"0",
 					"display":'1',
 				},
 				"options":[
 					{	
 						"id":'1',
 						"content":"是",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"0",
 						"value":"1"
 					},
 					{
 						"id":'2',
 						"content":"否",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"1",
 						"value":"0"
 					},
 				]
 			},
 			{
 				question_info:{
 					"id":"has_syringomyelia","content":"脊髓空洞", "value":"0", "question_index":"3","block_index":"0",
 					"question_type":"0",
 					"display":'1',
 				},
 				"options":[
 					{
 						"id":'1',
 						"content":"是",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"0",
 						"value":"1"
 					},
 					{
 						"id":'1',
 						"content":"否",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"1",
 						"value":"0"
 					},
 					{
 						"id":'1',
 						"content":"不确定",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"2",
 						"value":"2"
 					},
 				]
 			},
 			{
 				question_info:{
 					"id":"has_diastematomyelia","content":"脊髓纵裂", "value":"0", "question_index":"4","block_index":"0",
 					"question_type":"0",
 					"display":'1',
 				},
 				"options":[
 					{
 						"id":'1',
 						"content":"是",
 						"option_index":"0",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"value":"1"
 					},
 					{
 						"id":'1',
 						"content":"否",
 						"option_index":"1",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 						"value":"0"
 					},
 					{
 						"id":'1',
 						"content":"不确定",
 						"option_index":"2",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"value":"2"
 					},
 				]
 			},
 			{
 				question_info:{
 					"id":"has_progressive_dyspnea","content":"进行性呼吸困难", "value":"0", "question_index":"5","block_index":"0",
 					"question_type":"0",
 					"display":'1',
 				},
 				"options":[
 					{
 						"id":'1',
 						"content":"是",
 						"option_index":"0",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"value":"1"
 					},
 					{
 						"id":'1',
 						"content":"否",
 						"option_index":"1",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 						"value":"0"
 					},
 					{
 						"id":'1',
 						"content":"不确定",
 						"option_index":"2",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"value":"2"
 					},
 				]
 			},
 			{
 				question_info:{
 					"id":"has_neurothlipsis","content":"进行性神经压迫症状", "value":"0", "question_index":"6","block_index":"0",
 					"question_type":"0",
 					"display":'1',
 				},
 				"options":[
 					{
 						"id":'1',
 						"content":"是",
 						"option_index":"0",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"value":"1"
 					},
 					{
 						"id":'1',
 						"content":"否",
 						"option_index":"1",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 						"value":"0"
 					},
 					{
 						"id":'1',
 						"content":"不确定",
 						"option_index":"2",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"value":"2"
 					},
 				]
 			},
 			{
 				question_info:{
 					"id": "has_other_disease","question_index":"7","block_index":"1",
 					"content":"有无其他疾病",
 					"question_type":"0",
 					"display":'1',
 					"value":"1",
 				},
 				"options":[
 					{
 						"id":'1',
 						"content":"有",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"0",
 						"next_question_id":"101",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 					},
 					{
 						"id":'1',
 						"content":"无",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"1",
 						"value":"0"
 					}
 				]
 			},
 			{
 				question_info:{
 					"id": "101","question_index":"8","block_index":"1",
 					"content":"",
 					"question_type":"0",
 					"display":'0',
 					"value":"1",
 				},
 				"options":[
 					{
 						"id":'1',
 						"content":"脊柱结核",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"0",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 					},
 					{
 						"id":'1',
 						"content":"颅内疾病",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"1",
 						"value":"0"
 					},
 					{
 						"id":'1',
 						"content":"神经纤维瘤",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"2",
 						"value":"0"
 					},
 					{
 						"id":'1',
 						"content":"其他",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"3",
 						"next_question_id":"102",
 						"value":"0"
 					}
 				]
				
 			},
 			{
 				question_info:{
 					"id": "102","question_index":"9","block_index":"1",
 					"content":"测试",
 					"question_type":"3",
 					"display":'0',
 					"value":"1",
 					"hints":"请详细秒速其它疾病的病情和患病时间"
 				},
 				options:[]
 			},
 			{
 				question_info:{
 				"id": "103","question_index":"11","block_index":"2",
 				"content":"类似疾病",
 				"question_type":"3",
 				"display":'0',
 				"value":"1",
 				"hints":"请详细秒速其它疾病的病情和患病时间"
 				},
 				options:[]
 			},
 			{
 				question_info:{
 				"id":"family_disease", "question_index": '10',"block_index":"2",
 				"content":"家族类似疾病",
 				"value": '1',
 				"question_type":"0",
 				"display":'1',
 				},
 				"options":[
 					{
 						"id":'1',
 						"content":"有",
 						"selected":"0",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"0",
 						"next_question_id":"103",
 						"checking_rules":"require#drone#number"//验证规则，用#drone#连接
 						"hints":'请详细描述家族的患病情况和患病时间'
 					},
 					{
 						"id":'1',
 						"content":"无",
 						"selected":"1",设置默认选中项，0,1；0未选中，1选中
 						"option_index":"1",
 						"value":"无"
 					}
 				]
 			},
 			{
 				question_info:{
 				"id":"remark", "question_index": '11',"block_index":"3",
 				"content":"备注",
 				"display":'1',
 				"value": '',
 				"question_type":"3",
 				"checking_rules":"require#drone#number"//验证规则，用#drone#连接
 				"hints":"其它信息请备注"
 				},
 				options:[]
 			}
 		 ]

##联动表单项：
某些问题，需要在另一个问题（前置问题）特定答案下才会出现，此为联动表单项
要使用此功能，需要在前置问题options的某个选项中添加next_question_id字段，当用户选中前置问题的这个选项后，组件会在内部查找id为next_question_id的问题，并显示出来。

注意，此项功能可能存在不完善的地方：（尚未具体实施过，以下皆为推测）
当你在表单初始化后，试图通过某个开关，对表单进行动态的增减，可能会出现意料之外的情况，比如，减少表单项后，界面上该表单项不存在了，但表单最终返回的结果里，那个讨厌的家伙可能还在，并且可能有值（如果再删减之前填写过）。但如果是增加表单项的话，应该不会存在这个问题。

#问卷过滤
当前获取下来的都是完整的问卷，但有时需要根据患者信息(如性别，年龄)，来控制只显示部分：
在页面中引入：
import {filter} from './utils.js'
使用：
	filter() 参数参见utils.js中filter方法声明

#问卷答案验证
依赖于本目录下validate.js
在页面中引入：
	import {validate} from '*****/formItem/validate.js'
使用：
	validate(问卷[Array]，问卷答案[Array])  => 返回true or false
注意：问卷 和 问卷答案 均为前面提到的格式


#组件使用说明：
<form-item :data="form" :value="sync_form_inputValue" type="edit" @update-form-value="updateFormValue"></form-item>

##type：edit(填写表单),scan（查看表单）

##组件数据流向：（请宽屏查看）
							  			  			  			   |	如果有新加项则添加到表单值中
	  data变更————>更新视图—————>必然触发setFormValue（input事件）———|								————>如果有删除项，则触发removeFormValue（delete事件，在setFormValue之后触发）
		↑									      			  	   |	如果有改动项则更新表单值
		|
初始化：data、value（可选）传入 -> 初始化视图 ->  update-form-value返回表单值resValue（如果传入value不为空表单值，则resValue和传入的value相等，否则，返回表单默认值，见上述问卷答案格式)
				|value变更
				↓
 用户输入   ———————————> 更新视图 -——————>  update-form-value返回新的表单值
			
为了实现value变更时，更新视图，同时，更新组件传出的值，组件在内部对value属性传入值进行了watch，因此请不要在update-form-value回调中修改sync_form_inputValue的值，否则会陷入死循环
正确的做法，需要将value传入值和组件传出的值存在两个具有独立内存的变量中（比如sync_form_inputValue、sync_form_outputValue）

##特殊样式
本组件主要针对单行表单（即一个问题一行），但有时需要针对个别问题做特殊样式处理，为了满足这种需求，组件在内部为个问题所对应的li添加了slug字段作为class之一(浏览器调试工具中审查元素可直观查看)，通过如下方式，可自定义样式：
#group-form{
	.{{slug}}{
		***:***
	} 
}