//药物信息
export let medication_info = {
  version: 1,
  multiple: true,
  slug: "drug_information",
  fields: [
    {
      name: "field_1",
      label: "长期医嘱",
      type: "subform",
      multiple: true,
      fields: [
        {
          name: "field_1_1",
          label: "分类",
          type: "select",
          options: [
            {
              label: "免疫抑制用药"
            },
            {
              label: "抗凝/抗血小板药"
            },
            {
              label: "降压药"
            },
            {
              label: "脱水药"
            }
          ]
        },
        {
          name: "field_1_2",
          label: "药名",
          type: "select",
          allowInput: true,
          options: [
            {
              label: "甲泼尼龙片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "醋酸泼尼松片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "硫唑嘌呤片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "甲氨蝶呤片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "复方环磷酰胺片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "注射用环林酰胺",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "秋水仙碱片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "硫酸羟氯喹片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "吗替麦考酚酯分散片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "注射用泼甲尼松琥珀酸钠",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "来氟米特片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "白芍总苷胶囊",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='免疫抑制用药'"
              }
            },
            {
              label: "硫酸氢氯吡格雷片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='抗凝/抗血小板药'"
              }
            },
            {
              label: "阿司匹林肠溶片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='抗凝/抗血小板药'"
              }
            },
            {
              label: "那屈肝素钙注射液",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='抗凝/抗血小板药'"
              }
            },
            {
              label: "达肝素钠注射液",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='抗凝/抗血小板药'"
              }
            },
            {
              label: "依诺肝素钠注射液",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='抗凝/抗血小板药'"
              }
            },
            {
              label: "华法林",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='抗凝/抗血小板药'"
              }
            },
            {
              label: "利伐沙班",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='抗凝/抗血小板药'"
              }
            },
            {
              label: "倍他乐克",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "酒石酸美托洛尔",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "琥珀酸美托洛尔",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "苯磺酸氨氯地平",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "硝苯地平控释片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "盐酸地尔硫卓缓释胶囊",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "马来酸依那普利片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "卡托普利",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "福辛普利钠片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "缬沙坦胶囊",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "氯沙坦钾片",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='降压药'"
              }
            },
            {
              label: "甘露糖注射液",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='脱水药'"
              }
            },
            {
              label: "甘油果糖",
              visible: false,
              rely: {
                fields: ["field_1_1"],
                visibility: "'$field_1_1#'=='脱水药'"
              }
            }
          ]
        },
        {
          name: "field_1_3",
          label: "使用情况",
          type: "subform",
          multiple: true,
          fields: [
            {
              name: "field_1_3_1",
              label: "时间区间",
              type: "select",
              required: true,
              options: [
                {
                  label: "术前",
                  value: "术前"
                },
                {
                  label: "围手术期（术后3天）",
                  value: "围手术期（术后3天）"
                },
                {
                  label: "术后",
                  value: "术后"
                }
              ]
            },
            {
              name: "field_1_3_2",
              label: "用量",
              type: "subform",
              multiple: true,
              fields: [
                {
                  name: "field_1_3_2_1",
                  label: "用量",
                  type: "text",
                  unit: "g"
                },
                {
                  name: "field_1_3_2_2",
                  label: "用法",
                  type: "text"
                },
                {
                  name: "field_1_3_2_3",
                  label: "频率",
                  type: "text"
                },
                {
                  name: "field_1_3_2_4",
                  label: "起始日期",
                  type: "date",
                  validator: {
                    formula: "$field_1_3_2_5#>$field_1_3_2_4#",
                    fields: ["field_1_3_2_5"],
                    message: "起始日期必须小于停止日期"
                  }
                },
                {
                  name: "field_1_3_2_5",
                  label: "停止日期",
                  type: "date",
                  validator: {
                    formula: "$field_1_3_2_5#>$field_1_3_2_4#",
                    fields: ["field_1_3_2_4"],
                    message: "停止日期必须大于起始日期"
                  }
                }
              ]
            },
            {
              name: "field_1_3_3",
              label: "区间总量",
              type: "number",
              unit: "g"
            }
          ]
        },
        {
          name: "field_1_4",
          label: "总量",
          type: "text",
          unit: "g"
        }
      ]
    },
    {
      name: "field_2",
      label: "临时医嘱",
      type: "subform",
      multiple: true,
      fields: [
        {
          name: "field_2_1",
          label: "药名",
          type: "select",
          allowInput: true,
          options: [
            {
              label: "肝素钠注射液"
            },
            {
              label: "盐酸乌拉地尔注射液"
            },
            {
              label: "注射液硝普钠"
            },
            {
              label: "硝酸甘油注射液"
            },
            {
              label: "盐酸尼卡地平注射液"
            },
            {
              label: "盐酸艾司洛尔注射液"
            },
            {
              label: "重酒石酸去甲肾上腺素注射液"
            }
          ]
        },
        {
          name: "field_2_2",
          label: "次数",
          type: "number"
        },
        {
          name: "field_2_3",
          label: "总量",
          type: "number",
          unit: "g"
        }
      ]
    },
    {
      name: "field_3",
      label: "白蛋白用量",
      type: "number",
      unit: "g"
    },
    {
      name: "field_4",
      label: "有创血压监测天数",
      type: "number",
      unit: "d"
    },
    {
      name: "field_5",
      label: "中心静脉置管天数",
      type: "number",
      unit: "d"
    }
  ]
};
