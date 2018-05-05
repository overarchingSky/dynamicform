
/**
 * by：田龙
 * 动态表单验证库
 * 如果要拓展验证库，在getValidateMessage中添加对应的规则key（这个key需要和后端协商好），并添加对应的验证器
 */
import toast from '../../../lib/winged/toast'

/* 验证器 */

//验证手机号
export function isMobile(mobile){
    return (/^1[3|4|5|6|7|8|9]\d{9}$/i).test(mobile);
}
//验证数字
export function isNumber(number){
    return (/^-?[0-9]+/i).test(number);
}
//验证非空
export function require(val){
    return val !== '' && val !== undefined && val !== null && val !== NaN
}
//验证数字大小是否在规定范围
export function numberWithinLimit(num, valid){
    return eval(num + valid)
}
/* 验证器 end */
/*
 * getValidateMessage，设计原则，通过验证返回true，不通过返回相应文字
 */
function getValidateMessage (val,label,valid){
    switch(valid){
        case 'require':
            return require(val) || label + '不能为空'
        case 'number':
            return isNumber(val) || label + '必须为数字'
        case 'tel':
            return isMobile(val) || '请输入正确的' + label
    }
    if(/[>,<,>=,<=]-?\d+(\.\d+)?$/.test(valid)){//验证数字是否在规定范围
        var message,limit
        limit = valid.match(/(\d+)(\.\d+)?/)[0]
        if(/<=/.test(valid)){
            message = label + '不能超过' + limit
        }else if(/>=/.test(valid)){
            message = label + '不能低于' + limit
        }else if(/>/.test(valid)){
            message = label + '必须大于' + limit
        }else if(/</.test(valid)){
            message = label + '必须小于' + limit
        } 
        return numberWithinLimit(val,valid) || message
    }
    return true
}

function _validate (val,label,valid){
    let res
    if(typeof(valid) == 'string'){
        res = getValidateMessage(val, label, valid)
    }
    if(Object.prototype.toString.call(valid) == '[object Array]'){
        for(let i = 0; i < valid.length; i++){
            if(getValidateMessage(val, label, valid[i]) !== true){
                res = getValidateMessage(val, label, valid[i])
                break
            }
            res = true
        }
    }
    return res
}

/*
 * validate 验证问卷答案格式
 * @questions Array:问卷（表单所有项）（为特定格式）
 * @evaluation_questions_answers Array：问卷答案（为特定格式）
 * 注：问卷格式和问卷答案格式参考components/inquiry目录下formItem/index.vue组件
*/
export function validate(questions,evaluation_questions_answers){
    var validate_OK = true
    for(let i = 0; i < evaluation_questions_answers.length; i++){
        let question = questions.filter(item => {
            return item.question_info.id == evaluation_questions_answers[i].question_id
        })[0]
        if(!question){
            continue
        }
        let rules = question.question_info.checking_rules.split('#drone#'),//取出验证规则，并将其转化为数组
            validateResult,
            tovalidateValue//需要验证的答案

        /* 从对象中取出需要验证的答案 */
        //目前问卷答案值的存在形式有两个种，一种为选择形式，答案放在option_content中，一种为填写形式，答案放在text_answer中
        if(Number(question.question_info.question_type) == 0){//如果为选择型问题，则验证option_content是否有值
            tovalidateValue = evaluation_questions_answers[i].option_content
        }else{//填写类型，验证text_answer是否有值
            tovalidateValue = evaluation_questions_answers[i].text_answer
        }
        /* 从对象中取出需要验证的答案 end */

        //开始验证，如果通过，则validateResult为true，如果不通过，则为一段提示文字
        validateResult = _validate(tovalidateValue, evaluation_questions_answers[i].question_content, rules)
        if(validateResult !== true){
            toast(validateResult)
            return validate_OK = false
        }
        /* 以下代码为临时添加的代码，用来限定输入的结果必须为整数 将来可配合后端，将下面的功能拓展为新的验证规则*/
        if(Number(evaluation_questions_answers[i].text_answer) != NaN && /\./.test(evaluation_questions_answers[i].text_answer) ){
            toast(evaluation_questions_answers[i].question_content + '必须为整数')
            return validate_OK = false
        }
        /* 以下代码为临时添加的代码，用来限定输入的结果必须为整数 将来可配合后端，将下面的功能拓展为新的验证规则 end */
    }
    return validate_OK
}

