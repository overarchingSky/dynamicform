export let blood_pressure = {
  version: 1,
  multiple: true,
  slug: "blood_pressure",
  api: {
    add: "/smartform/api/enumeration",
    delete: "/smartform/api/enumeration",
    update: "/smartform/api/enumeration",
    get: "/smartform/api/enumerations"
  },
  display: {
    layout: "base-form"
  },
  fields: [
    {
      name: "field_1",
      label: "测压部位",
      type: "selectWithAdd",
      required: true,
      optionsName: "测压部位"
    },
    {
      name: "field_2",
      label: "血压",
      enAbleLabel: false,
      multiple: true,
      type: "subform",
      defaultRows: 11,
      highlightRow: 3,
      fields: [
        {
          name: "field_2_1",
          label: "时间",
          type: "Date",
          fixed: true,
          rely: {
            formula: `INCREASING($firstSurgeryDate# - 3 * 86400000,86400000)`,
            fields: [{ name: "firstSurgeryDate", position: "client-extra" }]
          }
        },
        {
          name: "field_2_2",
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
            formula: `BJHOSPITAL_GETINDEXNAME($firstSurgeryDate#,$field_2_1#)`,
            fields: [
              { name: "firstSurgeryDate", position: "client-extra" },
              "field_2_1"
            ],
            immediate: true
          }
        },
        {
          name: "field_2_3",
          label: "6AM-收缩压",
          display: {
            style: {
              "min-width": 84
            }
          },
          type: "number"
        },
        {
          name: "field_2_4",
          label: "6AM-舒张压",
          display: {
            style: {
              "min-width": 84
            }
          },
          type: "number"
        },
        {
          name: "field_2_5",
          label: "10AM-收缩压",
          display: {
            style: {
              "min-width": 90
            }
          },
          type: "number"
        },
        {
          name: "field_2_6",
          label: "10AM-舒张压",
          display: {
            style: {
              "min-width": 90
            }
          },
          type: "number"
        },
        {
          name: "field_2_7",
          label: "2PM-收缩压",
          type: "number",
          display: {
            style: {
              "min-width": 84
            }
          }
        },
        {
          name: "field_2_8",
          label: "2PM-舒张压",
          type: "number",
          display: {
            style: {
              "min-width": 84
            }
          }
        },
        {
          name: "field_2_9",
          label: "6PM-收缩压",
          type: "number",
          display: {
            style: {
              "min-width": 84
            }
          }
        },
        {
          name: "field_2-10",
          label: "6PM-舒张压",
          type: "number",
          display: {
            style: {
              "min-width": 84
            }
          }
        }
        // {
        //   name: "field_1_2",
        //   type: "infinityTable",
        //   label: "血压",
        //   enAbleLabel: false,
        //   required: true,
        //   visible: true,
        //   //startDate: Date.now(),
        //   startDate: `$admissionDate#`,
        //   startDateDescription: "住院日",
        //   sign: [
        //     { tick: "$firstSurgeryDate#", tip: "手术日" }
        //     // { tick: "$lastSurgeryDate#", tip: "最后一次手术日" }
        //   ],
        //   defaultColumnNum: 11,
        //   placeholder: "",
        //   groups: ["6AM", "10AM", "2PM", "6PM"],
        //   repeat: [
        //     {
        //       label: "收缩压",
        //       type: "number",
        //       name: "field_2",
        //       required: false,
        //       validator: {
        //         message: "收缩压不能大于舒张压"
        //       }
        //     },
        //     {
        //       label: "舒张压",
        //       type: "number",
        //       name: "field_3",
        //       validator: {
        //         message: "舒张压不能小于收缩压"
        //       },
        //       required: false
        //     }
        //   ]
        // }
      ]
    }
  ]
};
