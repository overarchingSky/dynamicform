import {
  hasSubform,
  getSubFields,
  getValueFromFormValue,
  setValueFromFormValue,
  isFun,
  getParamsFromFunFormula,
  getFunNameFromFunFormula
} from "../utils";
import "./fun";
import _ from "../typeof";

/**
 * 格式化format，将其中的$key#替换成对应的值，返回替换后的字符串如5>6
 * @param {*} formValue
 * @param {*} rely
 * @param {Object} extraValue 额外的值，如果formValue中没有查找到指定的值，则尝试在extraValue中查找（如果extraValue存在的话），这个参数一般用于依赖字段在当前表单之外的情况（如当前页面的其表单的某个字段，或远程服务器上其它表单的某个字段）
 */
export function formatFormula(formValue, formulaStr, extraValue) {
  if (!formulaStr) {
    return console.warn("formula is empty");
  }
  let keys = getKeysFromFormula(formulaStr);
  keys.forEach(key => {
    let value =
      getValueFromFormValue(formValue, key) || (extraValue && extraValue[key]);
    let reg = new RegExp(`\\$${key}\\#`);
    formulaStr = formulaStr.replace(reg, value);
  });
  //这里这样处理，是为了保证输出的正确的变量类型，否则，formulaStr将始终为字符串，
  try {
    return formulaStr == "undefined" ? undefined : JSON.parse(formulaStr);
  } catch (error) {
    return formulaStr;
  }
}
/**
 *从公式中提取出字段名（key）
 * @param {*String} formulaStr
 */
export function getKeysFromFormula(formulaStr) {
  if (!_.isString(formulaStr)) {
    return console.error("formulaStr must be a string");
  }
  let res = formulaStr.match(/\$([a-zA-Z0-9_]+)\#/g);
  return res ? res.map(m => m.replace(/[\$\#]/g, "")) : [];
}
/**
 * 执行字符串形式的公式，并返回结果
 */
export function exec(formulaStr) {
  return eval(formulaStr);
}

/**
 * 根据表单定义中配置的formula(可能是rely下的formula或visibility字段值)，得到计算结果
 * @param {*Object} formValue
 * @param {*} formulaStr
 */
export function execFormula(formValue, formulaStr, extraValue) {
  if (isFun(formulaStr)) {
    //解析函数形式formulaStr
    //注意：函数形式公式，必须保证在调用exec的上下文中存在formValue变量
    //let formula = formatFormula(formValue, formulaStr, extraValue);
    let formula = formulaStr;
    //let params = getParamsFromFunFormula(formula).map(pa => exec(pa));
    let params = getParamsFromFunFormula(formula);
    let funName = getFunNameFromFunFormula(formula);
    // return new Function(
    //   "funName",
    //   "params",
    //   "formValue",
    //   "extraValue",
    //   `return window[funName].call(undefined, formValue,extraValue, ...params)`
    // )(funName, params, formValue, extraValue);
    //不要使用上面的方式替代以下代码，因为...语法在字符串中并不会被babel转码,从而导致兼容问题
    params = [formValue, extraValue, ...params];
    return new Function(
      "funName",
      "params",
      `return window[funName].apply(undefined, params)`
    )(funName, params);
  }
  let formula = formatFormula(formValue, formulaStr, extraValue);
  if (/undefined/.test(formula)) {
    return;
  }
  try {
    return exec(formula);
  } catch (error) {
    console.warn('formula "' + formula + "\" can't be eval:");
    console.error(error);
    return;
  }
}
/**
 *根据公式规则，计算出指定key的值，并添加到表单值中
 * @param {*} key
 * @param {*Object} formValue
 * @param {*String} formulaStr
 */
export function autoCalculate(key, formValue, formulaStr, extraValue) {
  let val = execFormula(formValue, formulaStr, extraValue);
  //   if (/^[0-9]+$/.test(val)) {
  //     //必须是数字，才进行赋值
  //     setValueFromFormValue(formValue, key, val);
  //   }
  setValueFromFormValue(formValue, key, val);
}
