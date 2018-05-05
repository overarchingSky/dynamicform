//主动脉病变-体温
// export default {
//   version: 1,
//   multiple: false,
//   slug: "temperature",
//   fields: [
//     {
//       name: "field_15",
//       type: "infinityTable",
//       startDateDescription: "住院日",
//       startDate: `$admissionDate#`,
//       sign: [{ tick: "$firstSurgeryDate#", tip: "手术日" }],
//       defaultColumnNum: 11,
//       label: "体温",
//       cellInputType: "number",
//       enAbleLabel: false,
//       visible: true,
//       placeholder: "",
//       groups: ["AM", "PM"]
//     }
//   ]
// };

export default {
  version: 1,
  multiple: true,
  slug: "temperature",
  highlightRow: 3,
  defaultRows: 11,
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
      name: "field_2",
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
      name: "field_3",
      label: "AM",
      type: "number"
    },
    {
      name: "field_4",
      label: "PM",
      type: "number"
    }
  ]
};
