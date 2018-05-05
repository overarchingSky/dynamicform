/**
 * 根据用户信息过滤问卷
 * @param {Array} form 需要过滤的完整问卷
 * @param {Object} patient 用户信息
 */
export function filter(form,patient){
	return form.filter(item => {
		let flag = true,filterRule = item.question_info.filter
		if(typeof filterRule == 'string'){
			filterRule = JSON.parse(filterRule)
		}
		for(let i in filterRule){
			if(i == 'age'){
				function ageFilter(string){
					if(/^[\>,\<]\d+/.test(string)){
						return eval(patient[i].age+string)
					}else{
						console.warn('age字段过滤失败，age过滤必须为>，<，>=，<=加数字形式的字符串，如：>10，<=10')
						return false
					}
				}
				ageFilter(filterRule[i])
			}
			if(filterRule[i] == patient[i]) {
				flag = true
			}else{
				flag = false
				break
			}
		}
		return flag
	})
}