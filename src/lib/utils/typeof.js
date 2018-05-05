function check(target, type) {
	if (!type) return;
	let _type = type.charAt(0).toUpperCase() + type.substr(1);
	return Object.prototype.toString.call(target) === "[object " + _type + "]";
}
/**
 * 判定是否是字符串类型
 */
export function isString(target) {
	return check(target, "String");
}
/**
 * 判定是否是数组类型
 */
export function isArray(target) {
	return check(target, "Array");
}
/**
 * 判定是否是数字类型
 * @strict(Boolean) 默认为true，为false时，将采用非严格模式，可用于判定字符串形式的数字
 * eg:isNumber('2') => false, isNumber('2',false) => true
 */
export function isNumber(target, strict = true) {
	if (!strict) {
		let NumTarget = Number(target); //强制转化为Number类型，如果是字符串形式的数字或数字，则转化结果为数字，如果不是则为NaN
		if (NumTarget === NumTarget) {
			//利用NaN不等于NaN的规则，过滤掉非数字类型
			target = NumTarget;
		}
	}
	return check(target, "Number");
}
/**
 * 判定是否是日期类型
 */
export function isDate(target) {
	return check(target, "Date");
}
/**
 * 判定是否是对象类型
 */
export function isObject(target) {
	return check(target, "Object");
}
/**
 * 判定是否是函数类型
 */
export function isFunction(target) {
	return check(target, "Function");
}
/**
 * 判定是否是布尔类型
 */
export function isBoolean(target) {
	return check(target, "Boolean");
}

export default {
	isString,
	isArray,
	isNumber,
	isDate,
	isObject,
	isFunction,
	isBoolean
};
