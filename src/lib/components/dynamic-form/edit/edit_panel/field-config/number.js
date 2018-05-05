export default {
  create() {
    return {
      title: "字段设置",
      version: 1,
      multiple: false,
      fields: [
        {
          name: "label",
          label: "字段名称",
          type: "text"
        },
        {
          name: "description",
          label: "字段描述",
          type: "textarea"
        },
        {
          name: "allowDecimals",
          label: "小数",
          type: "radio",
          options: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        },
        {
          name: "allowNegative",
          label: "负数",
          type: "radio",
          options: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        }
      ]
    };
  }
};
