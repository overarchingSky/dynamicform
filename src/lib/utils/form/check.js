import IDValidator from 'id-validator'
/**
 * 验证身份证
 */
export function id_card_number_validate (rule, value, callback) {
	if(value){
		let Validator = new IDValidator()
		if(Validator.isValid(value)){
			callback();
		}else{
			callback(new Error('请输入正确的身份证号码'));
		}
	}else{
		callback();
	}
}