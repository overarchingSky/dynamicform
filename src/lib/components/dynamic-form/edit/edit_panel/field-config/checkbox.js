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
          name: "options",
          label: "选项",
          type: "subform",
          multiple: true,
          fields: [
            {
              name: "field_" + Date.now(),
              label: "名称",
              type: "text"
            },
            {
              name: "field_" + Date.now() + 1,
              label: "值",
              type: "text"
            }
          ]
        }
      ]
    };
  }
};
