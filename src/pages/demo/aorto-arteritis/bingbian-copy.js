export let bingbian1 = {
  id: 3,
  version: 1,
  multiple: false,
  fields: [
    {
      name: "field_1",
      label: "主诉",
      type: "textarea",
      required: true
    },
    {
      name: "field_2",
      label: "第一诊断",
      type: "text",
      required: true
    },
    {
      name: "field_3",
      label: "国内分型",
      editable: false,
      placeholder: "根据受累血管情况自动计算",
      type: "text",
      required: true,
      rely: {
        formula: `IF(
			  {"condition":"('$field_16#'!='未查'&&'$field_16#'!='不受累'||'$field_17#'!='未查'&&'$field_17#'!='不受累'||'$field_18#'!='未查'&&'$field_18#'!='不受累'||'$field_19#'!='未查'&&'$field_19#'!='不受累')&&('$field_6#'!='未查'&&'$field_6#'!='不受累'||'$field_7#'!='未查'&&'$field_7#'!='不受累'||'$field_8#'!='未查'&&'$field_8#'!='不受累'||'$field_9#'!='未查'&&'$field_9#'!='不受累'||'$field_10#'!='未查'&&'$field_10#'!='不受累'||'$field_11#'!='未查'&&'$field_11#'!='不受累'||'$field_12#'!='未查'&&'$field_12#'!='不受累')","value":"广泛型"},			
			  {"condition":"'$field_16#'!='未查'&&'$field_16#'!='不受累'||'$field_17#'!='未查'&&'$field_17#'!='不受累'||'$field_18#'!='未查'&&'$field_18#'!='不受累'||'$field_19#'!='未查'&&'$field_19#'!='不受累'","value":"胸-腹动脉型"},
			  {"condition":"'$field_15#'!='未查'&&'$field_15#'!='不受累'||'$field_14#'!='未查'&&'$field_14#'!='不受累'||'$field_13#'!='未查'&&'$field_13#'!='不受累'","value":"肺动脉型"},
			  {"condition":"'$field_6#'!='未查'&&'$field_6#'!='不受累'||'$field_7#'!='未查'&&'$field_7#'!='不受累'||'$field_8#'!='未查'&&'$field_8#'!='不受累'||'$field_9#'!='未查'&&'$field_9#'!='不受累'||'$field_10#'!='未查'&&'$field_10#'!='不受累'||'$field_11#'!='未查'&&'$field_11#'!='不受累'||'$field_12#'!='未查'&&'$field_12#'!='不受累'","value":"头臂型"}
			  
		  )`,
        fields: [
          "field_6",
          "field_7",
          "field_8",
          "field_9",
          "field_10",
          "field_11",
          "field_12",
          "field_13",
          "field_14",
          "field_15",
          "field_16",
          "field_17",
          "field_18",
          "field_19",
          "field_20",
          "field_21",
          "field_22",
          "field_23",
          "field_24"
        ]
      }
      //   options: [
      //     {
      //       label: "头臂型"
      //     },
      //     {
      //       label: "胸-腹主动脉型"
      //     },
      //     {
      //       label: "广泛型"
      //     },
      //     {
      //       label: "肺动脉型"
      //     }
      //   ]
    },
    {
      name: "field_4",
      label: "影像分型",
      editable: false,
      placeholder: "根据受累血管情况自动计算",
      type: "text",
      required: true,
      rely: {
        formula: `IF(
			  {"condition":"('$field_6#'!='不受累'&&'$field_6#'!='未查'||'$field_7#'!='不受累'&&'$field_7#'!='未查'||'$field_8#'!='不受累'&&'$field_8#'!='未查'||'$field_9#'!='不受累'&&'$field_9#'!='未查'||'$field_10#'!='不受累'&&'$field_10#'!='未查'||'$field_11#'!='不受累'&&'$field_11#'!='未查'||'$field_12#'!='不受累'&&'$field_12#'!='未查')&&('$field_13#'=='不受累'&&'$field_14#'=='不受累'&&'$field_15#'=='不受累'&&'$field_16#'=='不受累'&&'$field_17#'=='不受累'&&'$field_18#'=='不受累'&&'$field_19#'=='不受累'&&'$field_20#'=='不受累'&&'$field_21#'=='不受累'&&'$field_22#'=='不受累'&&'$field_23#'=='不受累'&&'$field_24#'=='不受累')","value":"type Ⅰ"},
			  {"condition":"'$field_13#'=='不受累'&&'$field_14#'=='不受累'&&'$field_15#'=='不受累'&&'$field_16#'!='不受累'&&'$field_16#'!='未查'&&'$field_17#'!='不受累'&&'$field_17#'!='未查'&&'$field_18#'=='不受累'&&'$field_19#'=='不受累'&&'$field_20#'=='不受累'&&'$field_21#'=='不受累'&&'$field_22#'=='不受累'&&'$field_23#'=='不受累'&&'$field_24#'=='不受累'","value":"type Ⅱ a"},
			  {"condition":"'$field_18#'!='未查'&&'$field_18#'!='不受累'&&'$field_19#'=='不受累'","value":"type Ⅱ b"},
			  {"condition":"'$field_6#'=='不受累'&&'$field_7#'=='不受累'&&'$field_8#'=='不受累'&&'$field_9#'=='不受累'&&'$field_10#'=='不受累'&&'$field_11#'=='不受累'&&'$field_12#'=='不受累'&&'$field_16#'=='不受累'&&'$field_17#'=='不受累'&&'$field_18#'!='未查'&&'$field_18#'!='不受累'&&'$field_19#'!='未查'&&'$field_19#'!='不受累'","value":"type Ⅲ"},
			  {"condition":"'$field_6#'=='不受累'&&'$field_7#'=='不受累'&&'$field_8#'=='不受累'&&'$field_9#'=='不受累'&&'$field_10#'=='不受累'&&'$field_11#'=='不受累'&&'$field_12#'=='不受累'&&'$field_13#'=='不受累'&&'$field_14#'=='不受累'&&'$field_15#'=='不受累'&&'$field_16#'=='不受累'&&'$field_17#'=='不受累'&&'$field_18#'=='不受累'&&'$field_19#'!='不受累'&&'$field_19#'!='未查'&&'$field_20#'=='不受累'&&'$field_21#'=='不受累'&&'$field_22#'=='不受累'&&'$field_23#'=='不受累'&&'$field_24#'=='不受累'","value":"type Ⅳ"},
			  {"condition":"true","value":"type Ⅴ"}
		  )`,
        fields: [
          "field_6",
          "field_7",
          "field_8",
          "field_9",
          "field_10",
          "field_11",
          "field_12",
          "field_13",
          "field_14",
          "field_15",
          "field_16",
          "field_17",
          "field_18",
          "field_19",
          "field_20",
          "field_21",
          "field_22",
          "field_23",
          "field_24"
        ]
      }
      //   options: [
      //     {
      //       label: "type 1"
      //     },
      //     {
      //       label: "type 2"
      //     },
      //     {
      //       label: "type 3"
      //     },
      //     {
      //       label: "type 4"
      //     },
      //     {
      //       label: "type 5"
      //     },
      //     {
      //       label: "type 6"
      //     }
      //   ]
    },
    {
      name: "field_5",
      label: "受累血管数",
      required: true,
      editable: false,
      placeholder: "根据受累血管情况自动计算",
      type: "number",
      rely: {
        //受累血管，不包括主动脉瓣
        formula: `COUNTBYCONDITION(
			  '$field_6#'!='不受累'&&'$field_6#'!='未查',
			  '$field_7#'!='不受累'&&'$field_7#'!='未查',
			  '$field_8#'!='不受累'&&'$field_8#'!='未查',
			  '$field_9#'!='不受累'&&'$field_9#'!='未查',
			  '$field_10#'!='不受累'&&'$field_10#'!='未查',
			  '$field_11#'!='不受累'&&'$field_11#'!='未查',
			  '$field_12#'!='不受累'&&'$field_12#'!='未查',
			  '$field_14#'!='不受累'&&'$field_14#'!='未查',
			  '$field_15#'!='不受累'&&'$field_15#'!='未查',
			  '$field_16#'!='不受累'&&'$field_16#'!='未查',
			  '$field_17#'!='不受累'&&'$field_17#'!='未查',
			  '$field_18#'!='不受累'&&'$field_18#'!='未查',
			  '$field_19#'!='不受累'&&'$field_19#'!='未查',
			  '$field_20#'!='不受累'&&'$field_20#'!='未查',
			  '$field_21#'!='不受累'&&'$field_21#'!='未查',
			  '$field_22#'!='不受累'&&'$field_22#'!='未查',
			  '$field_23#'!='不受累'&&'$field_23#'!='未查',
			  '$field_24#'!='不受累'&&'$field_24#'!='未查'
		  )`,
        fields: [
          "field_6",
          "field_7",
          "field_8",
          "field_9",
          "field_10",
          "field_11",
          "field_12",
          "field_14",
          "field_15",
          "field_16",
          "field_17",
          "field_18",
          "field_19",
          "field_20",
          "field_21",
          "field_22",
          "field_23",
          "field_24"
        ]
      }
    },
    {
      name: "field_6",
      label: "左颈",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_7",
      label: "右颈",
      required: true,
      type: "selectWithInput",
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_8",
      label: "左椎",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_9",
      label: "右椎",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_10",
      label: "左锁骨下",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_11",
      label: "右锁骨下",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_12",
      label: "头臂干",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_14",
      label: "冠脉",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_15",
      label: "肺动脉",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_16",
      label: "升主",
      required: true,
      type: "selectWithInput",
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_17",
      label: "主动脉弓",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_18",
      label: "胸降主",
      required: true,
      type: "selectWithInput",
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_19",
      label: "腹降主",
      required: true,
      type: "selectWithInput",
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_20",
      label: "腹腔干",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_21",
      label: "肠系膜上",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_22",
      label: "肠系膜下",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_23",
      label: "左肾",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_24",
      label: "右肾",
      type: "selectWithInput",
      required: true,
      default: "不受累",
      showExtraInput: "其它病变",
      options: [
        {
          label: "不受累"
        },
        {
          label: "轻微受累（<30%）"
        },
        {
          label: "轻度狭窄（30%-50%）"
        },
        {
          label: "中度狭窄（50%-70%）"
        },
        {
          label: "重度狭窄（70%-99%）"
        },
        {
          label: "闭塞"
        },
        {
          label: "扩张病变"
        },
        {
          label: "其它病变"
        },
        {
          label: "未查"
        }
      ]
    },
    {
      name: "field_13",
      label: "主动脉瓣",
      type: "select",
      required: true,
      default: "不受累",
      options: [
        {
          label: "不受累"
        },
        {
          label: "关闭不全"
        },
        {
          label: "狭窄 "
        }
      ]
    }
  ]
};

export let bingbian2 = {
  id: 4,
  version: 1,
  multiple: false,
  fields: []
};
