import { getValueFromFormValue, toDouble, getValue } from "../utils";
import { formatFormula, exec } from "./index";
import _ from "../typeof";
import "./fun_for_bjhospital";

//注意：所有函数，在被调用时，务必保证执行上下文中存在formValue变量（这是在eval执行字符串时，传参困难的妥协，现行方案是从函数执行的上下文中查找需要的参数）
//拓展规则：必须挂载到window上，函数第一个参数必须是formValue，后续参数为表单定义formula时传入的参数（在内部，做了formValue参数和定义中的参数的拼接）
/*eg:即在定义中：
{
	name:'field1',
	type:'text'
	...
	rely:{
		formula:'COUNTBYCONDITION(params1,params2,params3)',则最终执行时为COUNTBYCONDITION(formValue,params1,params2,params3)
		fields:[...]
	}
	
}

*/

/**
 * 计算某个字段值的长度（一般用于计算输入字符数量或者某个子表单的数据条数）
 * @param {Object} formValue 这个参数无需传，可无视
 * @param {*String} key 必填
 * @param {Any} filter 可选，用于过滤formValue中键为key的值（该值被期望是一个数组，并且必须是数组），filter代指一系列参数
 * eg:GETDATALENGTH('field_12','$field_12_1#'>10,!!'$field_12_3#','$field_12_9#'!='选项一'......)
 * 解释：上面的定义中field_12的值是一个数组，数组的每个成员为包含多个子字段键值的对象
 * 如：[
 * {'field_12_1':10,'field_12_2':'无'...'field_12_3':''...'field_12_9':'选项一'...},
 * {'field_12_1':12,'field_12_2':'无'...'field_12_3':'心脏病'...'field_12_9':'选项一'...}
 * ]
 * 则该表达式，会筛选出数组中满足且全部满足'$field_12_1#'>10,!!'$field_12_3#','$field_12_9#'!='选项一'的成员，然后返回筛选后数组的长度
 */
window.GETDATALENGTH = function(formValue, extraValue, key, ...filter) {
  let targetFieldValue = getValueFromFormValue(
    formValue,
    key.replace(/[\'\"]/g, "")
  );
  if (!_.isArray(targetFieldValue) && !_.isString(targetFieldValue))
    return console.warn(
      `formula fun.js:GETDATALENGTH 字段${key}所对应的值必须是数组或字符串`
    );
  let res = targetFieldValue.filter(row => {
    let singleFormValue = getValue(row);
    let filterFormulas = filter.map(formula => {
      return formatFormula(row, formula, extraValue);
    });
    return filterFormulas.every(formula => {
      if (/undefined/.test(formula)) return false;
      return exec(formula);
    });
  });
  return res.length;
};

/**
 *计算给定的所有公式中，满足条件的数量
 * @param {Object} formValue
 * @param {*String} 其它参数 可为普通公式和函数型公式
 */
window.COUNTBYCONDITION = function(formValue, extraValue, ...args) {
  return args.filter(flag => exec(formatFormula(formValue, flag, extraValue)))
    .length;
};

/**
 *根据指定的开始时间(出生时间)，结束时间，计算年龄
 * @param {*Date,stamp} startDate
 * @param {*Date,stamp} endDate
 * @param {*Boolean} widthMonth
 */
window.GETAGERANGE = function(
  formValue,
  extraValue,
  startDate,
  endDate,
  withMonth = false
) {
  startDate = formatFormula(formValue, startDate, extraValue);
  endDate = formatFormula(formValue, endDate, extraValue) || Date.now();
  try {
    startDate = new Date(startDate);
  } catch (error) {
    console.warn("无效的startDate");
    return;
  }
  try {
    endDate = new Date(endDate);
  } catch (error) {
    console.warn("无效的endDate");
    return;
  }
  let now_relative_1970 = new Date(endDate - startDate);

  let age = now_relative_1970.getFullYear() - 1970;

  if (!withMonth) {
    return age;
  }
  let month = now_relative_1970.getMonth();
  let ageString =
    month != 0 ? age + "岁 " + toDouble(month) + "月" : age + "岁整";
  return ageString;
};

/**
 *根据身份证，获取年龄
 * @param {Number,String} idcard 身份证号码
 * @param {* Date,stamp} endDate 指定某个时间点，获取该时间点时的年龄
 * @param {*Boolean} withMonth 是否精确到月？
 */
window.GETAGEYIDCARD = function(
  formValue,
  extraValue,
  idcard,
  endDate,
  withMonth = false
) {
  if (!card || card.length == "18") {
    console.warn("身份证不正确！");
    return;
  }
  let card = String(card);
  let birthDate = new Date();
  birthDate.setFullYear(
    card.substring(6, 10),
    Number(card.substring(10, 12)) - 1,
    card.substring(12, 14)
  );
  return GETAGERANGE(
    formValue,
    extraValue,
    birthDate,
    endDate || Date.now(),
    withMonth
  );
};

/**
 *计算指定时间范围的天数
 * @param {*Date,stamp} startDate
 * @param {*Date,stamp} endDate
 */
window.COUNTDAYRANGE = function(formValue, extraValue, startDate, endDate) {
  startDate = formatFormula(formValue, startDate, extraValue);
  endDate = formatFormula(formValue, endDate, extraValue);
  try {
    startDate = new Date(startDate);
  } catch (error) {
    console.warn("无效的startDate");
    return;
  }
  try {
    endDate = new Date(endDate);
  } catch (error) {
    console.warn("无效的endDate");
    return;
  }
  return Math.ceil((endDate - startDate) / (24 * 3600 * 1000));
};

/**
 * 
 * @param {Any} arg 参数集合，每个参数都是一个对象 ，对象格式为：{
  condition: "formula",
  value: ""
  }
  当满足条件formula时，则返回value配置的值，注意，这里会优先匹配靠前的参数，一旦condition执行结果为true，则不会判断后续参数
  具体使用方式eg：IF({condition: "formula1",value: "描述1"},{condition: "formula2",value: "描述2"})
 */
window.IF = function(formValue, extraValue, ...arg) {
  for (let i = 0; i < arg.length; i++) {
    const con = _.isString(arg[i]) ? JSON.parse(arg[i]) : arg[i];
    let formula = formatFormula(formValue, con.condition, extraValue);

    if (exec(formula)) {
      return con.value;
    }
  }
};

/**
 * 表格类型专用，配置在字段上，指定一个依赖的起始值，和递增值，递增渲染该字段值
 * @param {*} formValue
 * @param {*} extraValue
 * @param {*} arg
 */
window.INCREASING = function(formValue, extraValue, ...arg) {
  let _rowIndex = formValue._rowIndex; //_rowIndex 从0开始
  let formulaStr = arg[0];
  let step = arg[1];
  let formula = formatFormula(formValue, formulaStr, extraValue);
  return exec(formula) + _rowIndex * step;
};
