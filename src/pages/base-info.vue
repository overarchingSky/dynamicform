<template>
	<div class="">
		<div class="forms">
		<div class="base-form form">
			<h2>基础信息</h2>
			<dynamic-form :options="options" @value-change="onChangeHandler"></dynamic-form>
		</div>
		<div class="table-form form">
			<h2>血压</h2>
			<dynamic-form :options="options2" @value-change="onChangeHandler"></dynamic-form>
		</div>
		</div>
		
	</div>
</template>
<script>
import dynamicForm from "lib/components/dynamic-form/form";
export default {
  name: "login",
  components: {
    dynamicForm
  },
  methods: {
    onChangeHandler(val) {
      console.log("base-form-value", val);
    }
  },
  data() {
    return {
      options2: {
        title: "血糖",
        version: 1,
        multiple: false,
        fields: [
          {
            name: "infinity",
            type: "infinityTable",
            label: "血压",
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
                  message: "收不能大于舒!!!!!!!!!!!!!!!!!!!!!!"
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
        version: 1,
        multiple: false,
        fields: [
          {
            name: "name",
            type: "text",
            label: "姓名",
            required: true
          },
          {
            name: "number",
            type: "number",
            label: "住院号",
            required: true
          },
          {
            name: "birthday",
            type: "date",
            label: "生日",
            required: true
          },
          {
            name: "admissionDate",
            type: "date",
            label: "入院日期",
            required: true,
            validator: {
              formula: "$dischargeDate#>$admissionDate#",
              fields: ["admissionDate"],
              message: "出院时间必须晚于入院时间"
            }
          },
          {
            name: "dischargeDate",
            type: "date",
            label: "出院日期",
            required: true,
            validator: {
              formula: "$dischargeDate#>$admissionDate#",
              fields: ["admissionDate"],
              message: "出院时间必须晚于入院时间"
            }
          },
          {
            name: "contactPhone",
            type: "text",
            label: "联系电话",
            required: true
          },
          {
            name: "nativePlace",
            type: "address",
            label: "籍贯"
          },
          {
            name: "occupation",
            type: "select",
            label: "职业",
            options: [
              {
                label: "专业技术人员",
                value: "1"
              },
              {
                label: "政府机关",
                value: "2"
              },
              {
                label: "事业单位",
                value: "3"
              },
              {
                label: "体力劳动者",
                value: "4"
              },
              {
                label: "其他",
                value: "5"
              }
            ]
          },
          {
            name: "nation",
            type: "select",
            label: "民族",
            options: [
              {
                label: "汉族",
                value: "汉族"
              },
              {
                label: "其他",
                value: "其他"
              }
            ],
            useInputOnValue: "其他"
          },
          {
            name: "gender",
            type: "select",
            label: "性别",
            required: true,
            options: [
              {
                label: "男",
                value: "1"
              },
              {
                label: "女",
                value: "2"
              }
            ]
          },
          {
            name: "maritalStatus",
            type: "select",
            label: "婚姻状况",
            options: [
              {
                label: "未婚",
                value: "未婚"
              },
              {
                label: "已婚",
                value: "已婚"
              },
              {
                label: "离异",
                value: "离异"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>
<style lang="less">
.forms {
  width: 100%;
  .form {
    display: inline-block;
    width: 400px;
    margin: 0 3%;
    vertical-align: top;
  }
  .table-form {
    width: 50%;
  }
}
</style>
