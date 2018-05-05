//手术信息
export let operate_info = {
  version: 1,
  multiple: true,
  slug: "surgical_anesthesia",
  display: {
    layout: "base-form"
  },
  api: {
    add: "/smartform/api/enumeration",
    delete: "/smartform/api/enumeration",
    update: "/smartform/api/enumeration",
    get: "/smartform/api/enumerations"
  },
  fields: [
    {
      name: "firstSurgeryDate",
      isLockedField: true,
      label: "手术日期",
      type: "date"
    },
    {
      name: "field_15",
      label: "手术名称",
      type: "selectWithAdd",
      optionsName: "手术名称"
      //   options: [
      //     {
      //       label: "左锁骨下-双侧颈动脉"
      //     },
      //     {
      //       label: "右侧锁骨下动脉人工血管搭桥"
      //     }
      //   ]
    },

    {
      name: "field_3",
      label: "手术类型",
      type: "select",
      allowInput: true,
      options: [
        {
          label: "仅造影"
        },
        {
          label: "造影+测压"
        },
        {
          label: "介入手术"
        },
        {
          label: "开放手术"
        },
        {
          label: "杂交手术"
        }
      ]
    },
    // {
    //   name: "field_4",
    //   label: "手术方式",
    //   type: "select",
    //   allowInput: true,
    //   options: [
    //     {
    //       label: "左锁骨下-双侧颈动脉"
    //     },
    //     {
    //       label: "右侧锁骨下动脉人工血管搭桥"
    //     }
    //   ]
    // },

    {
      name: "field_5",
      label: "手术时长",
      type: "number",
      unit: "min",
      allowNegative: false
    },
    {
      name: "field_16",
      label: "手术特点",
      type: "textarea",
      allowNegative: false
    },
    {
      name: "field_2",
      label: "麻醉",
      type: "selectWithAdd",
      optionsName: "麻醉"
      //   options: [
      //     {
      //       label: "全麻"
      //     },
      //     {
      //       label: "局麻"
      //     },
      //     {
      //       label: "局麻+监测"
      //     }
      //   ]
    },
    {
      name: "field_6",
      label: "出血量(ml)",
      type: "number",
      allowNegative: false
    },
    {
      name: "field_7",
      label: "术中输红细胞(u)",
      type: "number",
      allowNegative: false
    },
    {
      name: "field_17",
      label: "术后输红细胞(u)",
      type: "number",
      allowNegative: false
    },
    {
      name: "field_8",
      label: "术中输血浆(u)",
      type: "number",
      allowNegative: false
    },
    {
      name: "field_9",
      label: "术后输血浆(u)",
      type: "number",
      allowNegative: false
    },
    {
      name: "field_11",
      label: "测压结果",
      visible: false,
      type: "subform",
      multiple: true,
      rely: {
        fields: ["field_3"],
        visibility: "'$field_3#'=='造影+测压'"
      },
      fields: [
        {
          name: "field_11_1",
          label: "测压部位",
          type: "select",
          options: [
            {
              label: "升主动脉"
            },
            {
              label: "主动脉弓"
            },
            {
              label: "胸主动脉"
            },
            {
              label: "腹主动脉"
            },
            {
              label: "髂动脉"
            }
          ]
        },
        {
          name: "field_11_2",
          label: "近心端值",
          type: "number"
        },
        {
          name: "field_11_3",
          label: "远心端值",
          type: "number"
        }
      ]
    },
    {
      name: "field_12",
      label: "开通信息",
      type: "subform",
      multiple: true,
      fields: [
        {
          name: "field_12_1_1",
          label: "开通部位",
          type: "select",
          options: [
            {
              label: "左颈"
            },
            {
              label: "右颈"
            },
            {
              label: "右锁骨下"
            }
          ]
        },
        {
          name: "field_12_1_2",
          label: "病变程度",
          type: "select",
          allowInput: true,
          options: [
            {
              label: "轻度狭窄"
            },
            {
              label: "中度狭窄"
            },
            {
              label: "重度狭窄"
            },
            {
              label: "动脉瘤或夹层"
            },
            {
              label: "重度狭窄"
            }
          ]
        },
        {
          name: "field_12_1_3",
          label: "处理方式",
          type: "select",
          allowInput: true,
          options: [
            {
              label: "球囊拓展"
            },
            {
              label: "支架植入"
            },
            {
              label: "搭桥手术"
            }
          ]
        },
        {
          name: "field_12_1_4",
          label: "材料",
          type: "select",
          options: [
            {
              label: "球囊"
            },
            {
              label: "支架"
            },
            {
              label: "人工血管"
            },
            {
              label: "大隐静脉"
            }
          ]
        },
        {
          name: "field_12_1_5",
          label: "直径",
          type: "number",
          allowNegative: false
        },
        {
          name: "field_12_1_6",
          label: "长度",
          type: "number",
          allowNegative: false
        },
        {
          name: "field_12_1_7",
          label: "厂家",
          type: "select",
          options: [
            {
              label: "Goretex"
            },
            {
              label: "Cordis"
            },
            {
              label: "微创"
            },
            {
              label: "Sterling"
            },
            {
              label: "zilver"
            },
            {
              label: "Viatrac"
            },
            {
              label: "Boston"
            },
            {
              label: "Abbott "
            }
          ]
        },
        {
          name: "field_12_1_8",
          label: "血管阻断时长(min)",
          type: "number",
          allowNegative: false
        }
      ]
    },
    {
      name: "field_13",
      label: "处理病变血管数",
      type: "number",
      editable: false,
      allowNegative: false,
      placeholder: "根据开通部位自动计算",
      rely: {
        //formula: `GETDATALENGTH('field_12')`,
        formula: `GETDATALENGTH('field_12',!!'$field_12_1_1#')`,
        fields: ["field_12"],
        immediate: true
      }
    },
    {
      name: "field_14",
      label: "外科分型",
      type: "select",
      options: [
        {
          label: "主动脉弓上血管重建"
        },
        {
          label: "主-肾动脉血管重建"
        },
        {
          label: "主动脉弓上血管重建+主-肾动脉血管重建"
        },
        {
          label: "动脉瘤型"
        },
        {
          label: "心肺血管重建"
        }
      ]
    },
    {
      name: "field_10",
      label: "转归去向",
      type: "select",
      options: [
        {
          label: "ICU"
        },
        {
          label: "病房"
        },
        {
          label: "死亡"
        }
      ]
    }
  ]
};
