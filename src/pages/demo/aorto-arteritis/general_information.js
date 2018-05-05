//一般资料
export let general_information1 = {
  title: "患者基本信息",
  id: 1,
  version: 1,
  multiple: false,
  slug: "aaaaaa",
  fields: [
    {
      name: "name",
      label: "姓名",
      type: "text",
      required: true,
      isLockedField: true
    },
    {
      name: "clientNumber",
      label: "病案号",
      type: "number",
      required: true,
      isLockedField: true
    },
    {
      name: "birthday",
      label: "出生日期",
      type: "date",
      required: true,
      isLockedField: true
    },
    {
      name: "phone",
      label: "联系电话",
      type: "number",
      required: true,
      isLockedField: true
    },
    {
      name: "field_7",
      label: "籍贯",
      type: "address"
    },
    {
      name: "jub",
      label: "职业",
      type: "select",
      allowInput: true,
      isLockedField: true,
      options: [
        {
          label: "专业技术人员"
        },
        {
          label: "政府机关"
        },
        {
          label: "事业单位"
        },
        {
          label: "体力劳动者"
        }
      ]
    },
    {
      name: "nation",
      label: "民族",
      type: "select",
      default: "汉",
      isLockedField: true,
      options: [
        {
          label: "汉"
        },
        {
          label: "其它"
        }
      ]
    },
    {
      name: "sex",
      label: "性别",
      type: "select",
      isLockedField: true,
      options: [
        {
          label: "男"
        },
        {
          label: "女"
        }
      ]
    },
    {
      name: "field_12",
      label: "婚姻",
      type: "select",
      options: [
        {
          label: "已婚"
        },
        {
          label: "未婚"
        },
        {
          label: "离异"
        }
      ]
    }
  ]
};
