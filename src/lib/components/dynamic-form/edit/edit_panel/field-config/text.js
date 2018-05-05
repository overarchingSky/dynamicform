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
        }
      ]
    };
  }
};
