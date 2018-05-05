//解析question_type为对应表单输入类型
function get_type (code){
	switch('' + code){
		case '0'://单选
			return 'radio'
		case '1'://多选
			return 'checkbox'
		case '2'://单行输入
			return 'text'
		case '3'://多行输入
			return 'textarea'
		case '4'://多行输入
			return 'date'
	}
}
export default get_type