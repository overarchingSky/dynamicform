//主动脉病变-伴随疾病
export let commen_history = {
  title: "常见既往史",
  multiple: false,
  version: 1,
  slug: "common_history",
  display: {
    layout: "base-form"
  },
  fields: [
    {
      label: "高血压",
      name: "field_1",
      type: "select",
      default: "无",
      options: [
        {
          label: "无"
        },
        {
          label: "1级"
        },
        {
          label: "2级"
        },
        {
          label: "3级"
        }
      ],
      required: true,
      placeholder: "请选择高血压等级"
    },
    {
      label: "糖尿病",
      name: "field_2",
      type: "radio",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      required: true,
      placeholder: "请选择是否患过糖尿病"
    },
    {
      label: "高血脂",
      name: "field_3",
      type: "radio",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      required: true,
      placeholder: "请选择是否患有高血脂"
    },
    {
      label: "高HCY",
      name: "field_4",
      type: "radio",
      default: "无",
      //   display: {
      //     style: {
      //       "min-width": 140
      //     }
      //   },
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      required: true,
      placeholder: "请选择是否患有高HCY血症"
    },
    {
      label: "结核病史",
      name: "field_12",
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
    }
  ]
};
export let heart_history = {
  title: "心脑血管既往史",
  multiple: false,
  version: 1,
  slug: "blood_history",
  fields: [
    {
      name: "field_5_1",
      label: "冠心病",
      type: "select",
      default: "无",
      options: [
        {
          label: "仅药物"
        },
        {
          label: "介入术后"
        },
        {
          label: "搭桥术后"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请选择是否有冠心病"
    },
    {
      name: "field_5_2",
      label: "陈旧心梗",
      type: "radio",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请填写是否有“陈旧心梗”"
    },
    {
      name: "field_5_3",
      label: "心律失常",
      type: "text",
      placeholder: "请填写是否心律失常"
    },
    {
      name: "field_6_1",
      label: "既往血管相关手术",
      type: "subform",
      fields: [
        {
          name: "field_6_1_1",
          label: "1",
          enAbleLabel: false,
          type: "radio",
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
          name: "field_6_1_2",
          label: "2",
          enAbleLabel: false,
          type: "subform",
          multiple: true,
          visible: false,
          rely: {
            visibility: `'$field_6_1_1#'=='有'`,
            fields: ["field_6_1_1"]
          },
          fields: [
            {
              name: "field_6_1_2_1",
              label: "描述",
              type: "textarea"
            }
          ]
        }
      ]
    },
    {
      name: "field_6_2",
      label: "狭窄性疾病",
      type: "subform",
      fields: [
        {
          name: "field_6_2_1",
          label: "",
          enAbleLabel: false,
          type: "radio",
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
          name: "field_6_2_2",
          label: "",
          enAbleLabel: false,
          type: "subform",
          multiple: true,
          visible: false,
          rely: {
            visibility: `'$field_6_2_1#'=='有'`,
            fields: ["field_6_2_1"]
          },
          fields: [
            {
              name: "field_6_2_2_1",
              label: "描述",
              type: "textarea"
            }
          ]
        }
      ]
    },
    {
      name: "field_6_3",
      label: "扩张性疾病",
      type: "subform",
      fields: [
        {
          name: "field_6_3_1",
          label: "",
          enAbleLabel: false,
          type: "radio",
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
          name: "field_6_3_2",
          label: "",
          enAbleLabel: false,
          type: "subform",
          multiple: true,
          visible: false,
          rely: {
            visibility: `'$field_6_3_1#'=='有'`,
            fields: ["field_6_3_1"]
          },
          fields: [
            {
              name: "field_6_3_2_1",
              label: "描述",
              type: "textarea"
            }
          ]
        }
      ]
    },
    {
      name: "field_6_4",
      label: "炎症性疾病",
      type: "subform",
      fields: [
        {
          name: "field_6_4_1",
          label: "",
          enAbleLabel: false,
          type: "radio",
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
          name: "field_6_4_2",
          label: "",
          enAbleLabel: false,
          type: "subform",
          multiple: true,
          visible: false,
          rely: {
            visibility: `'$field_6_4_1#'=='有'`,
            fields: ["field_6_4_1"]
          },
          fields: [
            {
              name: "field_6_4_2_1",
              label: "描述",
              type: "textarea"
            }
          ]
        }
      ]
    },

    // {
    //   name: "field_6_1",
    //   label: "既往血管相关手术",
    //   type: "radioInput",
    //   default: "无",
    //   showExtraInput: "有",
    //   options: [
    //     {
    //       label: "有"
    //     },
    //     {
    //       label: "无"
    //     }
    //   ],
    //   placeholder: "请填写血管手术相关信息"
    // },
    // {
    //   name: "field_6_2",
    //   label: "狭窄性疾病",
    //   type: "radioInput",
    //   default: "无",
    //   showExtraInput: "有",
    //   options: [
    //     {
    //       label: "有"
    //     },
    //     {
    //       label: "无"
    //     }
    //   ],
    //   placeholder: "请填写狭窄性疾病的相关信息"
    // },
    // {
    //   name: "field_6_3",
    //   label: "扩张性疾病",
    //   type: "radioInput",
    //   default: "无",
    //   showExtraInput: "有",
    //   options: [
    //     {
    //       label: "有"
    //     },
    //     {
    //       label: "无"
    //     }
    //   ],
    //   placeholder: "请填写有无血管扩张性疾病"
    // },
    // {
    //   name: "field_6_4",
    //   label: "炎症性疾病",
    //   type: "radio",
    //   default: "无",
    //   options: [
    //     {
    //       label: "有"
    //     },
    //     {
    //       label: "无"
    //     }
    //   ],
    //   placeholder: "请填写炎症性疾病"
    // },
    {
      name: "field_13_1",
      label: "陈旧性脑梗",
      type: "radio",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ]
    }
  ]
};
export let other_history = {
  title: "其他既往史",
  version: 1,
  slug: "other_history",
  fields: [
    {
      name: "field_8_1",
      label: "COPD",
      type: "radio",
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
      name: "field_9_1",
      label: "胃十二指肠溃疡",
      type: "radio",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请选择是否有胃十二指肠溃疡"
    },
    {
      name: "field_9_2",
      label: "消化道出血",
      type: "radio",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请选择是否消化道出血"
    },
    {
      name: "field_9_3",
      label: "肝胆疾病",
      type: "radioInput",
      default: "无",
      showExtraInput: "有",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请选择是否肝胆疾病"
    },
    {
      name: "field_10_1",
      label: "慢性肾功能不全",
      type: "radio",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请选择是否有慢性肾功能不全"
    },
    {
      name: "field_13",
      label: "Cr值",
      type: "Number",
      visible: false,
      rely: {
        fields: ["field_10_1"],
        visibility: "'$field_10_1#'=='有'"
      },
      placeholder: "请填写Cr值"
    },
    {
      name: "field_14",
      label: "时间(h)",
      type: "Number",
      visible: false,
      rely: {
        fields: ["field_10_1"],
        visibility: "'$field_10_1#'=='有'"
      },
      placeholder: "请填写时间"
    },
    {
      name: "field_11",
      label: "其他",
      type: "text",
      placeholder: "请输入其他疾病"
    }
    // {
    //   name: "field_20",
    //   label: "测试",
    //   type: "SelectWithAdd",
    //   options: [
    //     {
    //       label: 55
    //     },
    //     {
    //       label: 66
    //     }
    //   ]
    // }
  ]
};
