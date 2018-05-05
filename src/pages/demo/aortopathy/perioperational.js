//主动脉病变-围手术并发症
export let commen_complication = {
  title: "伤口/发热相关并发症",
  multiple: false,
  slug: "preoperative_1",
  fields: [
    {
      label: "发热",
      name: "field_1",
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
      label: "Tmax(℃)",
      name: "field_1_1",
      type: "number",
      visible: false,
      rely: {
        fields: ["field_1"],
        visibility: "'$field_1#' == '有'"
      },
      placeholder: "请输入发热最高温度"
    },
    {
      label: "时间(h)",
      name: "field_1_2",
      type: "number",
      visible: false,
      rely: {
        fields: ["field_1"],
        visibility: "'$field_1#' == '有'"
      },
      placeholder: "请输入发热时间"
    },
    {
      label: "脂肪液化",
      name: "field_8_1",
      type: "radioInput",
      default: "无",
      showExtraInput: "有",
      minRows: "2",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请输入脂肪液化相关信息"
    },
    {
      label: "淋巴漏",
      name: "field_8_2",
      type: "radioInput",
      default: "无",
      showExtraInput: "有",
      minRows: "2",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请输入淋巴漏相关信息"
    }
  ]
};
export let heart_complication = {
  title: "心脑血管并发症",
  multiple: false,
  slug: "preoperative_2",
  fields: [
    {
      label: "ACS",
      name: "field_2_1",
      type: "select",
      type: "radioInput",
      default: "无",
      showExtraInput: "有",
      minRows: "2",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请输入ACS相关信息"
    },
    {
      label: "心梗",
      name: "field_2_2",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入心梗相关信息"
    },
    {
      label: "房颤",
      name: "field_2_3",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入房颤相关信息"
    },
    {
      label: "心率失常",
      name: "field_2_4",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入心率失常相关信息"
    },
    {
      label: "下肢栓塞",
      name: "field_3_1",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入下肢栓塞相关信息"
    },
    {
      label: "DVT",
      name: "field_3_2",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入DVT相关信息"
    },
    {
      label: "脑梗",
      name: "field_4_1",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入脑梗相关信息"
    },
    {
      label: "脑出血",
      name: "field_4_2",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入脑出血相关信息"
    },
    {
      label: "TIA",
      name: "field_4_3",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入TIA相关信息"
    }
  ]
};
export let digestion_complication = {
  title: "呼吸/消化/泌尿相关并发症",
  multiple: false,
  slug: "preoperative_3",
  fields: [
    {
      label: "肺部感染",
      name: "field_5_1",
      type: "radioInput",
      minRows: "2",
      showExtraInput: "有",
      default: "无",
      options: [
        {
          label: "有"
        },
        {
          label: "无"
        }
      ],
      placeholder: "请输入肺部感染相关信息"
    },
    {
      label: "肠梗塞",
      name: "field_6_1",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入肠梗塞相关信息"
    },
    {
      label: "消化道出血",
      name: "field_6_2",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入消化道出血相关信息"
    },
    {
      label: "泌尿系感染",
      name: "field_7_1",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入泌尿系统感染相关信息"
    },
    {
      label: "肾功能不全",
      name: "field_7_2",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入肾功能不全相关信息"
    },
    {
      label: "透析",
      name: "field_7_3",
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
      placeholder: "请输入透析相关信息"
    },
    {
      label: "输尿管损伤",
      name: "field_7_4",
      type: "radioInput",
      minRows: "2",
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
      placeholder: "请输入输尿管损伤相关信息"
    }
  ]
};
// export default {
//   title: "围手术并发症",
//   vertion: 1,
//   multiple: false,
//   fields: [
//     {
//       label: "发热",
//       name: "field_1",
//       type: "radio",
//       default: "无",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ]
//     },
//     {
//       label: "Tmax(℃)",
//       name: "field_1_1",
//       type: "number",
//       visible: false,
//       rely: {
//         fields: ["field_1"],
//         visibility: "'$field_1#' == '有'"
//       },
//       placeholder: "请输入发热最高温度"
//     },
//     {
//       label: "时间(h)",
//       name: "field_1_2",
//       type: "number",
//       visible: false,
//       rely: {
//         fields: ["field_1"],
//         visibility: "'$field_1#' == '有'"
//       },
//       placeholder: "请输入发热时间"
//     },
//     {
//       label: "ACS",
//       name: "field_2_1",
//       type: "select",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入ACS相关信息"
//     },
//     {
//       label: "心梗",
//       name: "field_2_2",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入心梗相关信息"
//     },
//     {
//       label: "房颤",
//       name: "field_2_3",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入房颤相关信息"
//     },
//     {
//       label: "心率失常",
//       name: "field_2_4",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入心率失常相关信息"
//     },
//     {
//       label: "下肢栓塞",
//       name: "field_3_1",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入下肢栓塞相关信息"
//     },
//     {
//       label: "DVT",
//       name: "field_3_2",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入DVT相关信息"
//     },
//     {
//       label: "脑梗",
//       name: "field_4_1",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入脑梗相关信息"
//     },
//     {
//       label: "脑出血",
//       name: "field_4_2",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入脑出血相关信息"
//     },
//     {
//       label: "TIA",
//       name: "field_4_3",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入TIA相关信息"
//     },
//     {
//       label: "肺部感染",
//       name: "field_5_1",
//       type: "radioInput",
//       showExtraInput: "有",
//       default: "无",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入肺部感染相关信息"
//     },
//     {
//       label: "肠梗塞",
//       name: "field_6_1",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入肠梗塞相关信息"
//     },
//     {
//       label: "消化道出血",
//       name: "field_6_2",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入消化道出血相关信息"
//     },
//     {
//       label: "泌尿系感染",
//       name: "field_7_1",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入泌尿系统感染相关信息"
//     },
//     {
//       label: "肾功能不全",
//       name: "field_7_2",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入肾功能不全相关信息"
//     },
//     {
//       label: "透析",
//       name: "field_7_3",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入透析相关信息"
//     },
//     {
//       label: "输尿管损伤",
//       name: "field_7_4",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入输尿管损伤相关信息"
//     },
//     {
//       label: "脂肪液化",
//       name: "field_8_1",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入脂肪液化相关信息"
//     },
//     {
//       label: "淋巴漏",
//       name: "field_8_2",
//       type: "radioInput",
//       default: "无",
//       showExtraInput: "有",
//       options: [
//         {
//           label: "有"
//         },
//         {
//           label: "无"
//         }
//       ],
//       placeholder: "请输入淋巴漏相关信息"
//     },
//     {
//       label: "其他",
//       name: "field_9",
//       type: "textarea",
//       placeholder: "请输入"
//     }
//   ]
// };
