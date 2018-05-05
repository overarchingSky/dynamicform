export default {
  title: "表单配置",
  version: 1,
  multiple: false,
  fields: [
    {
      name: "name",
      label: "表单名称",
      type: "text"
    },
    {
      name: "version",
      label: "版本号",
      type: "number"
    },
    {
      name: "layout",
      label: "布局方式",
      type: "radio",
      options: [
        {
          label: "基础",
          value: "base-form"
        },
        {
          label: "表格",
          value: "table-form"
        }
      ]
    },
    {
      name: "multiple",
      label: "多条记录",
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
