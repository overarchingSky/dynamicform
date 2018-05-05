/*
 * actions - 封装系统里各种数据请求接口。
 */

import qs from 'qs'

/**
 * 根据传入的url、method以及data数据发起请求，并返回一个promise对象。
 * @param {请求地址} url 
 * @param {请求方法，'GET'或者'POST'或者'PUT'} method 
 * @param {请求数据，应该为json对象} data 
 */
export function request(url, method = 'GET', data) {
	let options = {
		url: url,
		method: method,
	}
	if (data) {
		if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
			// 使用qs来对json对象序列化，以适应x-www-form-urlencoded
			options.data = qs.stringify(data)	
		}else if(method == 'FILE'){//文件上传，form-data
			let formData = new FormData()
			for(let i in data){
				formData.append(i,data[i])
			}
			return Vue.prototype.$http.post(url,formData,{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
		}
		else {
			options.params = data;
		}
	}
	
	return Vue.prototype.$http(options)
}


/**
 * 用于从请求的error对象中解析错误信息
 * @param {*} error 
 * @param {*} customMessage 
 */
export function parseError(error, customMessage) {
	
	// 请求已完成，获得服务器响应
	if (error.response) {
		let status = error.response.status
		if (status == 3519) {
			return '记录已存在！'
		}
		else if (status == 3520) {
			return '参数错误！'
		}
		else if (status >= 500) {
			return '服务器内部错误！'
		}
		else if (status == 401) {
			return '用户未登录或登录失效，请重新登录！'
		}
		else if (status == 403) {
			return '无法访问该请求！'
		}
		else if (status >= 400) {
			return '请求错误！'
		}
		else {
			return customMessage ? customMessage : '其他请求错误！'
		}
	}
	// 请求失败
	else if (error.request) {
		return '请求失败，请稍后重试。'
	}
	// 请求以外的代码出错
	else {
		return customMessage ? customMessage : '程序发生内部错误！'
	}
}