/**
 * 本脚本内的方法仅仅针对北京医院项目，不具备通用性
 */

import { formatFormula, exec } from "./index";

/**
 * 表格类型专用，配置在字段上，指定一个依赖的起始值，和递增值，递增渲染该字段值
 * @param {*} formValue
 * @param {*} extraValue
 * @param {*} arg
 */
window.BJHOSPITAL_GETINDEXNAME = function(formValue, extraValue, ...arg) {
  let _rowIndex = formValue._rowIndex; //_rowIndex 从0开始
  let formulaStrSurgeryDay = arg[0]; //手术日期formula
  let formulaStrCurrentRowDay = arg[1]; //当前行的的日期formula
  let surgeryDay = formatFormula(formValue, formulaStrSurgeryDay, extraValue);
  let currentRowDay = formatFormula(
    formValue,
    formulaStrCurrentRowDay,
    extraValue
  );
  let index = (currentRowDay - surgeryDay) / (24 * 3600 * 1000);
  if (Math.abs(index) !== 0 && !Math.abs(index)) {
    return "";
  }
  if (_rowIndex == 0) {
    return "住院1d";
  } else if (index == 0) {
    return "手术日";
  } else if (index > 0) {
    return `术后${index}天`;
  } else {
    return `术前${Math.abs(index)}天`;
  }
};
