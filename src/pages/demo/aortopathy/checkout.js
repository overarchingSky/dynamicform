// 主动脉病变-检验
export default {
  vertion: 1,
  multiple: true,
  defaultRows: 11,
  highlightRow: 3,
  slug: "test_case",
  fields: [
    {
      name: "field_12",
      label: "时间",
      type: "date",
      fixed: true,
      rely: {
        formula: `INCREASING($firstSurgeryDate# - 3 * 86400000,86400000)`,
        fields: [{ name: "admissionDate", position: "client-extra" }]
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
        formula: `BJHOSPITAL_GETINDEXNAME($firstSurgeryDate#,$field_12#)`,
        fields: [
          { name: "firstSurgeryDate", position: "client-extra" },
          "field_12"
        ],
        immediate: true
      }
    },
    {
      name: "field_1",
      label: "WBC",
      unit: "*10^9",
      type: "number"
    },
    {
      name: "field_2",
      label: "RBC",
      unit: "*10^12/L",
      type: "number"
    },
    {
      name: "field_3",
      label: "Hb",
      unit: "g/L",
      type: "number"
    },
    {
      name: "field_4",
      label: "T-Bil",
      unit: "umol/L",
      type: "number"
    },
    {
      name: "field_5",
      label: "D-Bil",
      unit: "umol/L",
      type: "number"
    },
    {
      name: "field_6",
      label: "ALT",
      unit: "U/L",
      type: "number"
    },
    {
      name: "field_7",
      label: "AST",
      unit: "U/L",
      type: "number"
    },
    {
      name: "field_8",
      label: "Cr",
      unit: "umol/L",
      type: "number"
    },
    {
      name: "field_9",
      label: "UA",
      type: "number"
    },
    {
      name: "field_10",
      label: "CRP",
      type: "number"
    },
    {
      name: "field_11",
      label: "ESR ",
      type: "number"
    },
    {
      name: "field_13",
      label: "D_dimer",
      unit: "ng/mL",
      type: "number"
    },
    {
      name: "field_14",
      label: "PT",
      unit: "S",
      type: "number"
    },
    {
      name: "field_15",
      label: "aPTT",
      unit: "S",
      type: "number"
    },
    {
      name: "field_16",
      label: "Fbg",
      unit: "mmol/L",
      type: "number"
    }
    // {
    //   name: "infinity",
    //   type: "infinityTable",
    //   startDateDescription: "住院日",
    //   cellInputType: "number",
    //   sign: [{ tick: Date.now() + 3 * 86400000, tip: "手术日" }],
    //   label: "检验",
    //   enAbleLabel: false,
    //   required: true,
    //   visible: true,
    //   startDate: Date.now(),
    //   step: 86400000, //一天的毫秒数
    //   placeholder: "",
    //   ame: "field_2",
    //   required: false,
    //   groups: []
    // }
  ]
};
