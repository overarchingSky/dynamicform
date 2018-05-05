//围术及随访
export let around_operate = {
  version: 1,
  multiple: false,
  slug: "preoperative",
  api: {
    add: "/smartform/api/enumeration",
    delete: "/smartform/api/enumeration",
    update: "/smartform/api/enumeration",
    get: "/smartform/api/enumerations"
  },
  //   api: {
  //     add: "https://dev-services2.wingedcare.com/smartform/api/enumeration",
  //     delete: "https://dev-services2.wingedcare.com/smartform/api/enumeration",
  //     update: "https://dev-services2.wingedcare.com/smartform/api/enumeration",
  //     get: "https://dev-services2.wingedcare.com/smartform/api/enumeration"
  //   },
  fields: [
    {
      name: "field_1",
      label: "    术后并发症",
      type: "radio",
      required: true,
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ]
    },
    {
      name: "field_2",
      label: "并发症信息",
      type: "subform",
      multiple: true,
      visible: false,
      rely: {
        fields: ["field_1"],
        visibility: "'$field_1#'=='有'"
      },
      fields: [
        {
          name: "field_2_1",
          label: "症状或死亡说明",
          type: "selectWithAdd",
          optionsName: "围手术期并发症"
          //   api: {
          //     add: "/api/shoushu",
          //     delete: "/api/shoushu",
          //     update: "/api/shoushu",
          //     get: "/api/shoushu"
          //   }
        },
        {
          name: "field_2_2",
          label: "日期",
          type: "date"
        },
        {
          name: "field_2_3",
          label: "术后第几天",
          type: "number",
          editable: false,
          rely: {
            formula: `COUNTDAYRANGE($firstSurgeryDate#,$field_2_2#)`,
            fields: [
              { name: "firstSurgeryDate", position: "client-extra" },
              "field_2_2"
            ]
          }
        },
        {
          name: "field_2_4",
          label: "备注",
          type: "textarea"
        }
      ]
    },
    {
      name: "field_5",
      label: "非计划二次手术",
      type: "radio",
      default: "否",
      options: [
        {
          label: "是"
        },
        {
          label: "否"
        }
      ],
      visible: false,
      rely: {
        fields: ["field_1"],
        visibility: "'$field_1#'=='有'"
      }
    },
    {
      name: "field_6",
      label: "非计划二次手术原因",
      type: "textarea",
      visible: false,
      rely: {
        fields: ["field_5"],
        visibility: "'$field_5#'=='是'"
      }
    }
  ]
};
