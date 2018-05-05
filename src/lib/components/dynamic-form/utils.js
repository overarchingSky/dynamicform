import { formatFormula, execFormula } from "./formula";
import _ from "./typeof";

/**
 * 是否有子字段
 */
export function hasSubform(field) {
  return field.type == "subform" || !!field.fields;
}
/**
 *获取子字段集合
 * @param {*Object} field
 */
export function getSubFields(field) {
  return field.fields;
}
//更新字段的显示与隐藏状态
export function toggleFieldVisibility(
  field,
  formValue,
  formulaStr,
  extraValue
) {
  let isShow = execFormula(formValue, formulaStr, extraValue);
  if (isShow !== undefined && _.isBoolean(isShow)) {
    field.visible = isShow;
  }
}

/**
 *提取所有验证相关的公式，返回公式的集合
 * @param {*Object} options
 */
export function getAllFormula(options) {
  let fields = getSubFields(options);
  let formulaes = [];
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (hasSubform(field)) {
      formulaes = formulaes.concat(getAllFormula(field));
    } else if (field.validator && field.validator.formula) {
      formulaes.push(field.validator.formula);
    }
  }
  return formulaes;
}

//校验输入的值
export function validateValue(formValue, formulaStr) {
  //优化空间 是否应该在验证一个字段时，将其依赖的字段验证提示去掉？
  let valid = execFormula(formValue, formulaStr);
  //   if (valid == undefined) {
  //     return true;
  //   }
  return valid;
}

/**
 *根据字段名查找该字段的定义，并返回
 * @param {*Array} fields
 * @param {*String} key
 */
export function findFieldByKey(fields, key) {
  return fields.find(field => {
    if (field.name == key) {
      return field;
    }
    if (hasSubform(field)) {
      return findFieldByKey(getSubFields(field), key);
    }
  });
}

/**
 * 从表单定义中查找包含指定key的子表单定义
 * @param {*Object} parentField
 * @param {*} key
 */
export function findParentFieldBykey(parentField, key) {
  if (parentField.type !== "subform") {
    return;
  }
  let fields = getSubFields(parentField);
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    if (field.name == key) {
      return parentField;
    }
    return findParentFieldBykey(field, key);
  }
  return;
}

/**
 * 从表单定义中查找子表单类型的父字段，该字段包含指定key(可递归)
 * @param {*Object} fields
 * @param {*} key
 */
export function findFieldByChildkey(fields, key, parentField) {
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    if (field.name == key && parentField) {
      return parentField;
    } else if (field.type == "subform") {
      var childFields = getSubFields(field);
      for (let j = 0; j < childFields.length; j++) {
        var childField = childFields[j];
        if (childField.name == key) {
          return field;
        } else {
          let target = findFieldByChildkey(childFields, key, field);
          if (target) {
            return target;
          }
        }
      }
    }
  }
}

/**
 *从存放值得对象中查找指定key的对象值 返回格式：{data:5}
 * @param {*Object} formValue
 * @param {*String} key
 */
export function getValueDataObject(formValue, key) {
  if (_.isArray(formValue)) {
    for (let i = 0; i < formValue.length; i++) {
      let singleRowValue = formValue[i];
      if (!_.isObject(singleRowValue)) {
        return;
      }
      return getValueDataObject(singleRowValue, key);
    }
  } else {
    for (let i in formValue) {
      let signalValue = formValue[i];
      if (i == key) {
        return signalValue;
      }
      if (!signalValue || !_.isObject(signalValue)) {
        continue;
      }
      let target = getValueDataObject(signalValue.data, key);
      if (target) {
        return target;
      }
      //   if (_.isArray(signalValue.data)) {
      //     for (let i = 0; i < signalValue.data.length; i++) {
      //       return getValueDataObject(signalValue.data[i], key);
      //     }
      //   } else if (_.isObject(signalValue.data)) {
      //     return getValueDataObject(signalValue.data, key);
      //   }
    }
  }
}

/**
 *从存放值的对象中找出指定key的具体值
 * @param {*Object} formValue eg：[{"userName":{data:'张龙'},"start":{},"end":{}}]
 * @param {*String} key
 */
export function getValueFromFormValue(formValue, key) {
  return getValue(getValueDataObject(formValue, key));
}

/**
 *为指定的key赋值
 * @param {*Object} formValue
 * @param {*String} key
 */
export function setValueFromFormValue(formValue, key, val) {
  let dataObject = getValueDataObject(formValue, key);
  setValue(dataObject, val);
}

/**
 * 从单个对象值中，取出具体的值 如从{data:5}中取出5
 * @param {*Object} fieldValue
 */
export function getValue(fieldValue) {
  if (fieldValue) {
    return fieldValue.data;
  }
  return;
}
/**
 * 如果只传一个参数，则包装成{data: arg1}格式返回，如果传了两个参数，此时arg1必须为object，函数为其添加data字段，并赋值为arg2
 * @param {*Any} arg1
 * @param {*Any optional} arg2
 */
export function setValue(arg1, arg2) {
  if (_.isObject(arg1) && arg2 !== undefined) {
    arg1.data = arg2;
    return arg1;
  } else {
    return { data: arg1 };
  }
}

/**
 *递归获取父组件中指定名称的组件实例
 * @param {*Object} vm
 */
export function getParentComponent(vm, name) {
  if (vm.$options.name !== name) {
    vm = getParentComponent(vm.$parent, name);
  }
  return vm;
}

/**
 *递归获取父组件中指定名称的组件定义，即$options
 * @param {*Object} vm
 */
export function getParentComponentOptions(vm, name) {
  vm = vm.$parent;
  if (vm.$options.name !== name) {
    vm = getParentComponentOptions(vm, name);
  } else {
    vm = vm.$options;
  }
  return vm;
}

export function findTableColumn(cmp, name, index = 0) {
  let chidlCmp, target;
  if (cmp.name == name) {
    return cmp;
  }
  chidlCmp = cmp.$children;
  for (let i = 0; i < chidlCmp.length; i++) {
    let vm = chidlCmp[i];
    if (vm.$options.name === "table-column" && vm.name == name) {
      target = chidlCmp[index];
      break;
    } else {
      target = findTableColumn(vm, name, index);
      if (target) {
        break;
      }
    }
  }
  return target;
}

/**
 *从及其父组件中，查找并返回包含指定class的元素
 * @param {*Vue instence} vm
 */
export function findTableEl(vm, className) {
  if (vm.$el.classList.contains(className)) {
    return vm.$el;
  }
  vm = vm.$parent;
  if (vm) {
    return findTableEl(vm, className);
  }
  return;
}

/**
 * 通过配置，获取个字段的单元格合并情况
 * @param {*} fields
 * @param {*} key
 * @param {*} tag
 */
export function getColSpan(fields, key, tag = undefined) {
  let target = tag || findFieldByChildkey(fields, key);
  let colSpan = 1;
  if (key == "a12") {
    console.log("search");
  }

  if (target) {
    if (target.fields[0].name !== key) {
      return 0;
    }
    colSpan = colSpan + target.fields.length - 1;
    let flag = findFieldByChildkey(fields, target.name);
    if (flag) {
      colSpan = colSpan + getColSpan(fields, target.name, flag) - 1;
    }
  }
  return colSpan;
}

/**
 *从表单值中取出子表单的值，并将其组合成饿了么表格组件需要的格式
 * @param {*Array} formValue
 * @param {*String} key
 */
// export function getChildFormValue(formValue, flag) {
//   if (!_.isArray(formValue)) {
//     return console.warn("table-form类型表单值必须为数组");
//   }
//   let childFormValue = [];
//   console.log("start", JSON.stringify(formValue));
//   for (let i = 0; i < formValue.length; i++) {
//     console.log("childValuessss", formValue);
//     let item = formValue[i];
//     if (_.isArray(item)) {
//       if (_.isObject(flag)) {
//         console.log("child-obj");
//         return item.filter(tRow => {
//           console.log("compare", flag, tRow);
//           return tRow == flag;
//         });
//       } else {
//         console.warn(
//           `when the formValue is Array like [[...]...],flag must be an Object`
//         );
//       }
//     } else {
//       console.log("child-obj", item, flag);
//       let singleValue = getValue(item[flag]);
//       if (singleValue) {
//         console.log("push", singleValue);
//         childFormValue.push(singleValue);
//       }
//     }
//   }
//   console.log("end", childFormValue);
//   return childFormValue;
// }

/**
 *从表单值中取出子表单的值，并将其组合成饿了么表格组件需要的格式
 * @param {*Array} formValue
 * @param {*String} key
 */
export function getChildFormValue(formValue, key) {
  if (!_.isArray(formValue)) {
    return console.warn("table-form类型表单值必须为数组");
  }
  let childFormValue = [];
  for (let i = 0; i < formValue.length; i++) {
    let item = formValue[i];
    let singleValue = getValue(item[key]);
    if (singleValue) {
      childFormValue.push(singleValue);
    }
  }
  return childFormValue;
}

/**
 *将函数promise化
 * @param {*Function} fun
 */
export function promisify(fun) {
  return new Promise((resolve, reject) => {
    let res = fun();
    if (res) {
      resolve(res);
    } else {
      reject();
    }
  });
}

/**
 *读取fields中所有字段的label的长度，并返回其中最大值
 * @param {*Object} options
 */
export function getFormLabelMaxWidth(options) {
  let fields = getSubFields(options).filter(field => field.visible !== false);
  let labels = fields.map(field => {
    let label = field.label;
    if (field.unit) {
      label += field.unit;
    }
    return label.replace(/[\u4e00-\u9fa5A-Z]/g, "aa").length;
  });
  return Math.max(...labels) / 2 + 2 + "em";
}

/**
 * 计算出单个字段在表格型显示值（值为数组，即子表单的值）时的最大行数
 */
function calc(singleData) {
  let maxRow = 0;
  let flag = true;
  delete singleData._rowIndex; //去掉该字段，此字段是在表单填写时使用，于显示时为冗余字段
  for (let i in singleData) {
    let childFiledValue = getValue(singleData[i]);
    if (_.isArray(childFiledValue)) {
      flag = false;
      for (let j = 0; j < childFiledValue.length; j++) {
        let row = calc(childFiledValue[j]);
        maxRow += row;
      }
    }
  }
  if (flag) {
    maxRow += 1;
  }
  return maxRow;
}

/**
 * 获取表格单元格合并信息
 * @param {*} childFiledValue
 */
function getRowSpan(childFiledValue) {
  let compare = [];
  for (let i in childFiledValue) {
    let tmpMax = 0;
    let item = getValue(childFiledValue[i]);
    if (_.isArray(item)) {
      for (let j = 0; j < item.length; j++) {
        let row = calc(item[j]);
        tmpMax += row;
      }
    } else {
      tmpMax = 1;
    }
    compare.push(tmpMax);
  }
  return Math.max.apply(undefined, compare);
}

function tumb(value, res = {}, idx = 1) {
  for (let i = 0; i < value.length; i++) {
    let rowData = value[i];
    delete rowData._rowIndex;
    for (let j in rowData) {
      let singleFieldData = getValue(rowData[j]);
      if (_.isArray(singleFieldData)) {
        idx = value.length;
        tumb(singleFieldData, res, idx);
      } else {
        let rowSpan = getRowSpan(rowData);
        rowData[j].cellSpan = [rowSpan, 1];
        _.isArray(res[j]) ? res[j].push(rowData[j]) : (res[j] = [rowData[j]]);
      }
    }
  }
  return res;
}

/**
 *将动态表单值转化为表格能够接受的格式（格式参见element-ui table组件的data参数）
 * 设计思路：1.首先创建一个包含在value中出现过的所有字段的对象（A），并且该对象所有字段值均为一个数组
 * 			2.使用tumb方法，遍历value，按照顺序，将字段的值push到A中相应字段下（在此过程中，同时生成一份可用的cellSpan信息，该信息用来控制表格中的行列合并），从而得到一个tb
 * 			tb格式如：
 * 			{
				"field_1": [{
					"data": "有",
					"cellSpan": [3, 1]
				}],
				"field_5": [{
					"data": "是",
					"cellSpan": [3, 1]
				}],
				"field_2_1": [{
					"data": "dsafsad",
					"cellSpan": [1, 1]
				}, {
					"data": "asfdgsdf",
					"cellSpan": [1, 1]
				}, {
					"data": "ghjfghhkfghkjh",
					"cellSpan": [1, 1]
				}],
				"field_2_2": [{
					"data": 1525795200000,
					"cellSpan": [1, 1]
				}, {
					"data": 1525968000000,
					"cellSpan": [1, 1]
				}, {
					"data": 1527177600000,
					"cellSpan": [1, 1]
				}],
				"field_2_3": [{
					"data": 66,
					"cellSpan": [1, 1]
				}, {
					"data": 68,
					"cellSpan": [1, 1]
				}, {
					"data": 82,
					"cellSpan": [1, 1]
				}],
				"field_2_4": [{
					"data": "fagasdf",
					"cellSpan": [1, 1]
				}, {
					"data": "fgdhfg",
					"cellSpan": [1, 1]
				}, {
					"data": "fhjkghjkh",
					"cellSpan": [1, 1]
				}],
				"field_6": [{
					"data": "sdgfgn的粉红色房东告诉对方",
					"cellSpan": [3, 1]
				}]
			}
 * 			3.整理tb，将其转化成如下格式：
 * 				[{
					"field_1": {
						"data": "有",
						"cellSpan": [3, 1]
					},
					"field_5": {
						"data": "是",
						"cellSpan": [3, 1]
					},
					"field_2_1": {
						"data": "dsafsad",
						"cellSpan": [1, 1]
					},
					"field_2_2": {
						"data": 1525795200000,
						"cellSpan": [1, 1]
					},
					"field_2_3": {
						"data": 66,
						"cellSpan": [1, 1]
					},
					"field_2_4": {
						"data": "fagasdf",
						"cellSpan": [1, 1]
					},
					"field_6": {
						"data": "sdgfgn的粉红色房东告诉对方",
						"cellSpan": [3, 1]
					}
				}, {
					"field_1": {
						"data": "",
						"cellSpan": [0, 0]
					},
					"field_5": {
						"data": "",
						"cellSpan": [0, 0]
					},
					"field_2_1": {
						"data": "asfdgsdf",
						"cellSpan": [1, 1]
					},
					"field_2_2": {
						"data": 1525968000000,
						"cellSpan": [1, 1]
					},
					"field_2_3": {
						"data": 68,
						"cellSpan": [1, 1]
					},
					"field_2_4": {
						"data": "fgdhfg",
						"cellSpan": [1, 1]
					},
					"field_6": {
						"data": "",
						"cellSpan": [0, 0]
					}
				}, {
					"field_1": {
						"data": "",
						"cellSpan": [0, 0]
					},
					"field_5": {
						"data": "",
						"cellSpan": [0, 0]
					},
					"field_2_1": {
						"data": "ghjfghhkfghkjh",
						"cellSpan": [1, 1]
					},
					"field_2_2": {
						"data": 1527177600000,
						"cellSpan": [1, 1]
					},
					"field_2_3": {
						"data": 82,
						"cellSpan": [1, 1]
					},
					"field_2_4": {
						"data": "fhjkghjkh",
						"cellSpan": [1, 1]
					},
					"field_6": {
						"data": "",
						"cellSpan": [0, 0]
					}
				}]
 *
 * @param {*Array} value 只需传入本参数即可
 * @param {*Array} resValue 用于方法内部递归传递的参数
 * @param {*Object} parentRowData 用于方法内部递归传递的参数
 */
export function formateValueAduptToTable(value, resValue, parentRowData = {}) {
  let res = [];
  let tb = tumb(value);
  let compare = [];
  let template = {};
  for (let i in tb) {
    compare.push(tb[i].length);
    template[i] = { data: "" };
  }
  let maxRow = Math.max.apply(undefined, compare);
  while (maxRow--) {
    res.push(JSON.parse(JSON.stringify(template)));
  }
  for (let i in tb) {
    let rowSpanCalc = 0;
    tb[i].forEach((item, index) => {
      let rowSpan = item.cellSpan[0];
      let startIdx = rowSpanCalc;
      res[startIdx][i] = item;
      let empty = rowSpan;
      while (--empty) {
        res[startIdx + empty][i] = { data: "", cellSpan: [0, 0] };
      }
      rowSpanCalc += rowSpan;
    });
  }
  return res;
}

/**
 * 获取字段中最后面的时间戳
 * @param {*String} fieldName
 */
export function getTimeStampFormField(fieldName) {
  let res = fieldName.split("-");
  return res[res.length - 1]; //返回最后一个用'-'连接的内容，即时间戳（约定时间戳放在字段最后，用'-'连接）
}

/**
 *根据options中的display字段，获取组件的最小宽度
 * @param {*Object} display
 * @param {*Number} defaultMinWidth
 */
export function exportWidthInfo(display, defaultMinWidth) {
  let widthInfo = {};
  let style = display && display.style;
  if (style) {
    widthInfo["min-width"] = style["min-width"];
    widthInfo["max-width"] = style["max-width"];
  }
  widthInfo["min-width"] = widthInfo["min-width"] || defaultMinWidth || 80;
  widthInfo["max-width"] = widthInfo["max-width"] || 800;
  return widthInfo;
}

/**
 *判断给定的字符串所有字符全为大写
 * @param {String} str
 */
export function stringIsAllUpperCase(str) {
  let Upper = str.toLocaleUpperCase();
  console.log("stringIsAllUpperCase", Upper, str);
  return str === Upper;
}

/**
 *判断formula是否为函数
 * @param {String} str
 */
export function isFun(str) {
  return /[^\(^\)]+\([\s\S]*\)$/.test(str);
}

/**
 * 获取函数公式中已有的参数
 * @param {String} str
 */
export function getParamsFromFunFormula(str) {
  var tmp = [];
  let strTmp = str
    .match(/\(([\s\S]*)\)/)[1]
    .replace(/\{[^\}\]]+\}/g, content => {
      tmp.push(content);
      return "~" + (tmp.length - 1) + "~";
    });
  //   console.log(
  //     "params",
  //     strTmp
  //       .split(",")
  //       .filter(item => !!item.trim())
  //       .map(formuls => {
  //         if (/~\d+~/.test(formuls)) {
  //           let index = Number(formuls.replace(/~/g, ""));
  //           console.log("strTmp", strTmp.split(","), "分割线", formuls);
  //           return tmp[index].trim();
  //         }
  //         return formuls.trim();
  //       })
  //   );
  return strTmp.split(",").map(formuls => {
    if (/~\d+~/.test(formuls)) {
      let index = Number(formuls.replace(/~/g, ""));
      return tmp[index].trim();
    }
    return formuls.trim();
  });
  //   return str
  //     .match(/\(([^\(\)]*)\)/)[1]
  //     .split(/\,(?![^\]\}+]\]\})/)
  //     .map(formula => formula.trim());
}

/**
 * 获取函数名称
 * @param {String} str
 */
export function getFunNameFromFunFormula(str) {
  return str.match(/([^\(^\)]+)\(/)[1];
}

/**
 * 将传入数字转化成两位数 eg：1 => '01' 12 => 12
 * @param {*Number,String} val
 */
export function toDouble(val) {
  if (String(val).length < 2) {
    return "0" + val;
  }
  return val;
}

/**
 * 判断字段是否是随机生成的字段名
 * @param {String} fieldName
 */
export function isRandomField(options) {
  return options.isLockedField !== true;
  //return /field_/.test(fieldName);
}

/**
 * 将固定字段存入全局缓存里
 * @param {String} fieldName
 */
export function setStash(fieldName, val) {
  window["_dynamicCache"] = window["_dynamicCache"] || {};
  //   if (fieldName in window["_dynamicCache"]) {
  //     return console.error(`字段${fieldName}冲突，请确保该字段在整个项目中唯一`);
  //   }
  window["_dynamicCache"][fieldName] = val;
}

/**
 * 从全局缓存中取出固定字段的缓存
 * @param {String} fieldName
 */
export function getStash(fieldName) {
  window["_dynamicCache"] = window["_dynamicCache"] || {};
  return fieldName
    ? window["_dynamicCache"][fieldName]
    : window["_dynamicCache"];
}

/**
 * 将表单字段值存在一个全局的，用于处理依赖关系的变量里，该变量里的字段被依赖于它的字段所watch
 * @param {String} formId
 * @param {String} fieldName
 */
export function setDepStash(formId, fieldName, val) {
  window["_dynamicDepCache"] = window["_dynamicDepCache"] || {};
  //   if (fieldName in window["_dynamicCache"]) {
  //     return console.error(`字段${fieldName}冲突，请确保该字段在整个项目中唯一`);
  //   }
  window["_dynamicCache"][formId + "-" + fieldName] = val;
}

/**
 * 从全局缓存字段_dynamicDepCache中取出值
 * @param {String} fieldName
 */
export function getDepStash(formId, fieldName) {
  window["_dynamicDepCache"] = window["_dynamicDepCache"] || {};
  return formId && fieldName
    ? window["_dynamicDepCache"][formId + "-" + fieldName]
    : window["_dynamicCache"];
}
