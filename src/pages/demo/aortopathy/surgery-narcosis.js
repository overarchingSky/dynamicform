//主动脉病变-手术及麻醉
export default {
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
      label: "手术日期",
      name: "firstSurgeryDate",
      isLockedField: true,
      type: "date",
      required: true,
      placeholder: "请选择手术日期"
    },
    {
      label: "手术类型",
      name: "field_4_2",
      type: "selectWithAdd",
      optionsName: "手术类型",
      multiple: true,
      //   options: [
      //     {
      //       label: "Ch-烟囱"
      //     },
      //     {
      //       label: "F-开窗/开槽"
      //     },
      //     {
      //       label: "S-三明治"
      //     },
      //     {
      //       label: "Ch+F-烟囱+开窗/开槽"
      //     },
      //     {
      //       label: "Ch+S-烟囱+三明治"
      //     },
      //     {
      //       label: "F+S-开窗/开槽+三明治"
      //     },
      //     {
      //       label: "Ch+F+S-烟囱+开窗/开槽+三明治"
      //     },
      //     {
      //       label: "Open-开放手术"
      //     }
      //   ],
      required: true,
      placeholder: "请选择手术类型"
    },
    // {
    //   label: "手术类型",
    //   name: "field_4_4",
    //   type: "select",
    //   required: true,
    //   allowInput: true,
    //   options: [
    //     {
    //       label: "仅造影"
    //     },
    //     {
    //       label: "造影+测压"
    //     },
    //     {
    //       label: "介入手术"
    //     },
    //     {
    //       label: "开放手术"
    //     },
    //     {
    //       label: "杂交手术"
    //     }
    //   ],
    //   placeholder: "请填写手术名称"
    // },
    {
      label: "手术时长",
      name: "field_3",
      type: "text",
      required: true,
      placeholder: "请填写手术时长",
      unit: "min"
    },
    {
      label: "手术备注",
      name: "field_4_3",
      type: "textarea",
      placeholder: "本次手术的具体特点如定制支架，导丝环辅助"
    },
    // {
    //   label: "ASA分级",
    //   name: "field_2",
    //   type: "text",
    //   required: true,
    //   placeholder: "请填写ASA分级"
    // },
    {
      label: "手术名称",
      name: "field_4_1",
      type: "selectWithAdd",
      optionsName: "手术名称"
    },
    {
      label: "麻醉",
      name: "field_9",
      type: "selectWithAdd",
      optionsName: "麻醉",
      required: true
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
      name: "field_10",
      label: "出血量(ml)",
      type: "number",
      allowNegative: false
    },
    {
      name: "field_12",
      label: "术中输红细胞(u)",
      type: "number",
      allowNegative: false
    },
    // {
    //   name: "field_14",
    //   label: "术后输红细胞(u)",
    //   type: "number",
    //   allowNegative: false
    // },
    {
      name: "field_15",
      label: "术中输血浆",
      unit: "ml",
      type: "number",
      allowNegative: false
    },
    // {
    //   name: "field_16",
    //   label: "术后输血浆",
    //   unit: "ml"
    //   type: "number",
    //   allowNegative: false
    // },
    {
      label: "术中并发症",
      name: "field_6_1",
      type: "text",
      placeholder: "请填写术中并发症"
    },
    {
      label: "术中处理方式及结果",
      name: "field_6_2",
      visible: false,
      type: "text",
      rely: {
        fields: ["field_6_1"],
        visibility: "!!'$field_6_1#'"
      },
      placeholder: "请填写术中处理方式及结果"
    },
    {
      label: "血管及支架/人工血管",
      name: "field_13",
      type: "subform",
      multiple: "true",
      display: {
        layout: "table-form"
      },
      fields: [
        {
          label: "血管名称",
          name: "field_13_1",
          type: "select",
          options: [
            {
              label: "主动脉"
            },
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
          ]
        },
        {
          type: "subform",
          multiple: true,
          name: "field_13_2",
          label: "血管支架",
          display: {
            layout: "table-form"
          },
          fields: [
            {
              label: "型号",
              name: "field_13_2_1",
              type: "select",
              options: [
                {
                  label: "Gore"
                },
                {
                  label: "Cook"
                },
                {
                  label: "Corids"
                }
              ],
              placeholder: "请选择血管支架或者人工血管型号"
            },
            {
              label: "大小",
              name: "field_13_2_2",
              type: "number",
              placeholder: "请选择血管支架或者人工血管型号"
            }
          ]
        }
      ]
    },
    {
      label: "处理血管数量",
      name: "6",
      type: "number",
      editable: false,
      rely: {
        formula: "GETDATALENGTH('field_13',!!'$field_13_1#')",
        fields: ["field_13"],
        immediate: true
      },
      placeholder: "自动计算处理血管数量"
    },
    {
      label: "弹簧圈",
      name: "field_5",
      type: "subform",
      multiple: true,
      display: {
        layout: "table-form"
      },
      fields: [
        {
          label: "型号",
          name: "field_5_1",
          type: "select",
          options: [
            {
              label: "Gore"
            },
            {
              label: "Cook"
            },
            {
              label: "Corids"
            }
          ],
          placeholder: "请选择弹簧圈型号"
        },
        {
          label: "数量",
          name: "field_5_2",
          type: "number",
          placeholder: "请填写弹簧圈数量"
        }
      ]
    },
    {
      label: "转归及去向",
      name: "field_8",
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
