// 主动脉病变-检验
// export let test_old = {
//   vertion: 1,
//   multiple: false,
//   slug: "test_case",
//   fields: [
//     {
//       name: "field_5531351",
//       type: "infinityTable",
//       startDateDescription: "住院日",
//       cellInputType: "number",
//       sign: [{ tick: Date.now() + 3 * 86400000, tip: "手术日" }],
//       label: "检验",
//       enAbleLabel: false,
//       required: true,
//       visible: true,
//       startDate: Date.now(),
//       step: 86400000, //一天的毫秒数
//       placeholder: "",
//       ame: "field_2",
//       required: false,
//       groups: [
//         "WBC*10^9",
//         "RBC*10^12/L",
//         "Hb(g/L)",
//         "ALT U/L",
//         "AST U/L",
//         "Cr umol/L",
//         "CRP",
//         "ESR",
//         "肾素",
//         "肾素(激发)",
//         "血管紧张术",
//         "血管紧张术(激发)",
//         "醛固酮",
//         "醛固酮(激发)"
//       ]
//     }
//   ]
// };
// 主动脉病变-检验
export let test = {
  vertion: 1,
  multiple: false,
  slug: "test_case",
  multiple: true,
  defaultRows: 11,
  highlightRow: 3,
  fields: [
    {
      name: "field_1",
      label: "时间",
      type: "Date",
      fixed: true,
      rely: {
        formula: `INCREASING($firstSurgeryDate# - 3 * 86400000,86400000)`,
        fields: [{ name: "firstSurgeryDate", position: "client-extra" }]
      }
    },
    {
      name: "field_0",
      label: "序号",
      type: "text",
      editable: false,
      fixed: true,
      display: {
        style: {
          "min-width": 100
        }
      },
      rely: {
        formula: `BJHOSPITAL_GETINDEXNAME($firstSurgeryDate#,$field_1#)`,
        fields: [
          { name: "firstSurgeryDate", position: "client-extra" },
          "field_1"
        ],
        immediate: true
      }
    },
    {
      name: "field_2",
      label: "WBC",
      unit: "*10^9",
      type: "number"
    },
    {
      name: "field_3",
      label: "RBC",
      unit: "*10^12/L",
      type: "number"
    },
    {
      name: "field_4",
      label: "Hb",
      unit: "g/L",
      type: "number"
    },
    {
      name: "field_5",
      label: "ALT",
      unit: "U/L",
      type: "number"
    },
    {
      name: "field_6",
      label: "AST",
      unit: "U/L",
      type: "number"
    },
    {
      name: "field_7",
      label: "Cr",
      unit: "umol/L",
      type: "number"
    },
    {
      name: "field_8",
      label: "CRP",
      type: "number"
    },
    {
      name: "field_9",
      label: "ESP",
      type: "number"
    },
    {
      name: "field_10",
      label: "肾素",
      type: "number"
    },
    {
      name: "field_11",
      label: "肾素(激发)",
      type: "number"
    },
    {
      name: "field_12",
      label: "血管紧张术",
      type: "number"
    },
    {
      name: "field_13",
      label: "血管紧张术(激发)",
      type: "number"
    },
    {
      name: "field_14",
      label: "醛固酮",
      type: "number"
    },
    {
      name: "field_15",
      label: "醛固酮(激发)",
      type: "number"
    }
  ]
};
