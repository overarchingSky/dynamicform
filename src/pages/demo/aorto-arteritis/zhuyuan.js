//住院基本信息
export let inpatient_information = {
  id: 101,
  slug: "inpatient_information",
  version: 1,
  multiple: false,
  fields: [
    {
      name: "admissionDate",
      type: "date",
      label: "入院日期",
      required: true,
      isLockedField: true,
      validator: {
        formula: "$dischargeDate#>$admissionDate#",
        fields: ["dischargeDate"],
        message: "入院时间必须早于出院时间"
      }
    },
    {
      name: "admissionAge",
      label: "年龄",
      type: "number",
      editable: false,
      isLockedField: true,
      placeholder: "根据出生日期和入院时间自动计算",
      required: true,
      rely: {
        formula: "GETAGERANGE($birthday#,$admissionDate#)",
        fields: [
          { name: "birthday", position: "client-extra" },
          "admissionDate"
        ]
      }
    },
    {
      name: "dischargeDate",
      type: "date",
      label: "出院日期",
      isLockedField: true,
      validator: {
        formula: "$dischargeDate#>$admissionDate#",
        fields: ["admissionDate"],
        message: "出院时间必须晚于入院时间"
      },
      required: true
    },
    {
      name: "field_16",
      label: "ICU住院",
      unit: "d",
      allowDecimals: false,
      allowNegative: false,
      required: true,
      type: "number"
    },
    {
      name: "field_17",
      label: "呼吸机时间",
      unit: "h",
      allowNegative: false,
      required: true,
      type: "number"
    },
    {
      name: "field_19",
      label: "术前EQ-5D",
      type: "number"
    },
    {
      name: "field_20",
      label: "术后EQ-5D",
      type: "number"
    },
    {
      name: "field_14",
      label: "住院天数",
      required: false,
      placeholder: "根据入院出院时间自动计算",
      editable: false,
      type: "number",
      rely: {
        formula: "COUNTDAYRANGE($admissionDate#,$dischargeDate#)",
        fields: ["admissionDate", "dischargeDate"]
      }
    },
    {
      name: "field_18",
      label: "住院费用(元)",
      required: true,
      type: "number",
      allowNegative: false
    },
    {
      name: "field_15",
      label: "术后住院天数",
      placeholder: "根据手术、出院时间自动计算",
      editable: false,
      required: false,
      type: "number",
      rely: {
        formula: "COUNTDAYRANGE($firstSurgeryDate#,$dischargeDate#)",
        fields: [
          { name: "firstSurgeryDate", position: "client-extra" },
          "dischargeDate"
        ]
      }
    }
  ]
};
