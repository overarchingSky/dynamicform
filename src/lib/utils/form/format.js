import {
	gender,
	MaritalStatus
} from './enum'
/**
 * 格式化性别
 * @param {*String or Nunber} code 
 */
export function genderFormat(code){
	switch(String(code)){
		case '1':
			return '男'
			break
		case '0':
			return '女'
			break
	}
	for (let item of gender) {
		if (item.key == code) {
			return item.value
		}
	}
	return ''
}

/**
 * 格式化婚姻状态
 * @param {*} value 
 */
export function formatMarital(value) {
	for (let item of MaritalStatus) {
		if (item.key == value) {
			return item.value
		}
	}
	return ''
}

/**
 * 根据生日计算年龄
 */
export function birthdayToAge(birthday){
	if(birthday){
		var nowTime = new Date().getTime();
		var age = nowTime - birthday;
		age = age / 1000 / 60 / 60 / 24 / 365
		age = Math.floor(age)
		return age
	}else{
		return ''
	}
}

/**
 * 检查字符串命名风格，将驼峰格式化成下划线风格
 * @param {*String} str 
 */
export function switch_humpStyle_to_underLineStyle_for_string(str){
	return str.replace(/([a-z]+)([A-Z])/g,'$1_$2').toLowerCase()
}

/**
 * 检查对象中字段命名风格，将驼峰格式化成下划线风格
 * @param {*Object} obj 
 */
export function switch_humpStyle_to_underLineStyle_for_object (obj){
	if(!_.isObject(obj)){
		return console.warn('switch_humpStyle_to_underLineStyle_for_object方法参数必须为一个Object')
	}
	for(let i in obj){
		let underLineStyle_key = switch_humpStyle_to_underLineStyle_for_string(i)
		obj[underLineStyle_key] = obj[i]
		underLineStyle_key !== i && delete obj[i]
	}
	return obj
}