// 主动脉病变-病变信息
export default {
  version: 1,
  multiple: false,
  slug: "pathological_information_1",
  fields: [
    {
      name: "firstDiagnose",
      label: "第一诊断",
      isLockedField: true,
      type: "text",
      required: true
    },
    {
      label: "病变类型",
      name: "field_1",
      type: "select",
      options: [
        {
          label: "AA-主动脉瘤"
        },
        {
          label: "AD-夹层"
        },
        {
          label: "VAA-内脏动脉瘤"
        }
      ],
      required: true,
      placeholder: "请选择病变类型"
    },
    {
      label: "类型",
      name: "field_2_1",
      type: "select",
      visible: false,
      rely: {
        visibility: "'$field_1#'=='AD-夹层'",
        fields: ["field_1"]
      },
      options: [
        {
          label: "Ⅰ型"
        },
        {
          label: "Ⅱ型"
        },
        {
          label: "Ⅲ型"
        }
      ],
      placeholder: "请选择夹层类型"
    },
    {
      label: "近端最大瘤径",
      name: "field_6",
      type: "number",
      unit: "mm",
      visible: false,
      rely: {
        visibility: "'$field_1#'=='AD-夹层'",
        fields: ["field_1"]
      },
      placeholder: "请填写近端最大瘤径"
    },
    {
      label: "破口起始位置",
      name: "field_2_2",
      type: "subform",
      multiple: true,
      visible: false,
      rely: {
        visibility: "'$field_1#'=='AD-夹层'",
        fields: ["field_1"]
      },
      fields: [
        {
          label: "名称",
          name: "field_2_2_1",
          type: "select",
          options: [
            {
              label: "Z0"
            },
            {
              label: "Z1"
            },
            {
              label: "Z2"
            },
            {
              label: "Z3"
            },
            {
              label: "Z4"
            }
          ]
        },
        {
          label: "备注",
          name: "field_2_2",
          type: "textarea",
          placeholder: "请填写备注"
        }
      ]
    },
    {
      label: "累及最远端",
      name: "field_2_3",
      type: "select",
      options: [
        {
          label: "option_1"
        },
        {
          label: "option_2"
        }
      ],
      visible: false,
      rely: {
        visibility: "'$field_1#'=='AD-夹层'",
        fields: ["field_1"]
      },
      placeholder: "请填写累及最远端"
    },
    {
      label: "累及内脏动脉",
      name: "field_2_4",
      type: "subform",
      multiple: true,
      visible: false,
      rely: {
        visibility: "'$field_1#'=='AD-夹层'",
        fields: ["field_1"]
      },
      fields: [
        {
          name: "field_2_4_1",
          label: "数据",
          type: "select",
          options: [
            {
              label: "IA"
            },
            {
              label: "RSA"
            },
            {
              label: "RCA"
            },
            {
              label: "LSA"
            },
            {
              label: "LCA"
            },
            {
              label: "CT"
            },
            {
              label: "SMA"
            },
            {
              label: "RRA"
            },
            {
              label: "LRA"
            },
            {
              label: "RICA"
            },
            {
              label: "LICA"
            },
            {
              label: "RIICA"
            },
            {
              label: "LIICA"
            },
            {
              label: "RIECA"
            },
            {
              label: "LIECA"
            }
          ],
          placeholder: "请选择是否累及内脏动脉数据"
        },
        {
          name: "field_2_4_2",
          label: "类型",
          type: "select",
          options: [
            {
              label: "真腔供血"
            },
            {
              label: "假腔供血"
            }
          ],
          placeholder: "请选择是否累及内脏动脉类型"
        },
        {
          label: "备注",
          name: "field_4_3",
          type: "textarea",
          placeholder: "请填写备注"
        }
      ]
    },
    {
      label: "相关信息",
      name: "field_3",
      visible: false,
      rely: {
        visibility: "'$field_1#'=='AA-主动脉瘤'",
        fields: ["field_1"]
      },
      type: "subform",
      multiple: true,
      fields: [
        {
          label: "部位",
          name: "field_3_1",
          type: "select",
          // multiple: true,
          options: [
            {
              label: "TAA"
            },
            {
              label: "肾上AAA"
            },
            {
              label: "肾下AAA"
            },
            {
              label: "TAAA"
            },
            {
              label: "AIA"
            },
            {
              label: "IAA"
            }
          ],
          placeholder: "请选择肿瘤部位"
        },
        {
          label: "最大瘤径",
          name: "field_3_2",
          type: "number",
          unit: "mm",
          placeholder: "请填写最大瘤径"
        },
        {
          label: "瘤颈长度",
          name: "field_3_3",
          type: "number",
          unit: "mm",
          placeholder: "请填写瘤颈长度"
        },
        {
          label: "瘤颈角",
          name: "field_3_4",
          type: "number",
          placeholder: "请填写瘤颈角"
        },
        {
          label: "累及内脏动脉",
          name: "field_3_5",
          type: "subform",
          multiple: true,
          display: {
            layout: "table-form"
          },
          fields: [
            {
              name: "field_3_5_1",
              label: "数据",
              type: "select",
              options: [
                {
                  label: "IA"
                },
                {
                  label: "RSA"
                },
                {
                  label: "RCA"
                },
                {
                  label: "LSA"
                },
                {
                  label: "LCA"
                },
                {
                  label: "CT"
                },
                {
                  label: "SMA"
                },
                {
                  label: "RRA"
                },
                {
                  label: "LRA"
                },
                {
                  label: "RICA"
                },
                {
                  label: "LICA"
                },
                {
                  label: "RIICA"
                },
                {
                  label: "LIICA"
                },
                {
                  label: "RIECA"
                },
                {
                  label: "LIECA"
                }
              ],
              placeholder: "请选择是否累及内脏动脉数据"
            },
            {
              name: "field_2_4_3",
              label: "最大瘤径",
              type: "number",
              unit: "mm",
              placeholder: "请填写该动脉最大瘤径"
            },
            {
              name: "field_3_5_2",
              label: "类型",
              type: "select",
              options: [
                {
                  label: "真腔供血"
                },
                {
                  label: "假腔供血"
                }
              ],
              placeholder: "请选择是否累及内脏动脉类型"
            },
            {
              name: "field_2_4_4",
              label: "备注",
              type: "textarea",
              placeholder: "请填写备注"
            }
          ]
        }
      ]
    },
    {
      label: "相关信息",
      name: "field_4",
      type: "subform",
      visible: false,
      rely: {
        visibility: "'$field_1#'=='VAA-内脏动脉瘤'",
        fields: ["field_1"]
      },
      multiple: true,
      fields: [
        {
          label: "部位",
          name: "field_4_1",
          type: "select",
          // multiple: true,
          options: [
            {
              label: "左侧RAA"
            },
            {
              label: "右侧RAA"
            },
            {
              label: "SAA"
            },
            {
              label: "SMAA"
            },
            {
              label: "其他"
            }
          ],
          placeholder: "请选择肿瘤部位"
        },
        {
          label: "最大瘤径",
          name: "field_4_2",
          type: "number",
          unit: "mm",
          placeholder: "请填写最大瘤径"
        },
        {
          label: "瘤颈长度",
          name: "field_4_3",
          type: "number",
          unit: "mm",
          placeholder: "请填写瘤颈长度"
        },
        {
          label: "瘤颈角",
          name: "field_4_4",
          type: "number",
          placeholder: "请填写瘤颈角"
        },
        {
          label: "入口数",
          name: "field_4_5",
          type: "number",
          placeholder: "请填写入口数"
        },
        {
          label: "出口数",
          name: "field_4_6",
          type: "number",
          placeholder: "请填写出口数"
        }
      ]
    },
    // {
    //   label: "累及内脏动脉",
    //   name: "field_4_5",
    //   type: "radio",
    //   visible: false,
    //   rely: {
    //     visibility: "'$field_1#'=='VAA-内脏动脉瘤'",
    //     fields: ["field_1"]
    //   },
    //   options: [
    //     {
    //       label: "是"
    //     },
    //     {
    //       label: "否"
    //     }
    //   ],
    //   placeholder: "请选择是否累及内脏动脉"
    // },
    {
      label: "备注",
      name: "field_5",
      type: "textarea",
      placeholder: "请填写备注"
    }
  ]
};
