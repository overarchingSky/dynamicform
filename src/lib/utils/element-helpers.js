
/**
 * 对element-ui的form表单验证进行包装，并返回Promise对象
 * @param {*} form 
 */
export function formValidateToPromise(form) {
	return new Promise((resolve, reject) => {
		form.validate((valid) => {
			if (valid) {
				resolve()
			}
			else {
				reject()
			}
		})
	})
}