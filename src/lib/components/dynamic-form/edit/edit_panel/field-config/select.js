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
          labelStyle: "block",
          type: "text"
        },
        {
          name: "description",
          label: "字段描述",
          labelStyle: "block",
          type: "textarea"
        },
        {
          name: "options",
          label: "选项",
          labelStyle: "block",
          type: "subform",
          multiple: true,
          display: {
            layout: "base-form"
          },
          fields: [
            {
              name: "field_" + Date.now(),
              enAbleLabel: false,
              label: "名称",
              type: "text",
              placeholder: "名称"
            },
            {
              name: "field_" + Date.now() + 1,
              enAbleLabel: false,
              label: "值",
              type: "text",
              placeholder: "值"
            }
          ]
        }
      ]
    };
  }
};
