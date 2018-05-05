<template>
    <div class="form-item">
        <!-- text 单行输入-->
        <el-form-item :label="question_info.label" prop="contact_phone" v-if="type(question_info.question_type) == 'text'"><!-- v-if="!hideLabel" -->
            <el-input v-model="Value.value" :placeholder="question_info.hints || '请填写'"></el-input>
            <span class="unit">{{question_info.unit}}</span>
        </el-form-item>
        <!-- textarea -->
        <el-form-item :label="question_info.label" prop="contact_phone" v-if="type(question_info.question_type) == 'textarea'"><!-- v-if="!hideLabel" -->
            <el-input type="textarea" v-model="Value.value" :placeholder="question_info.hints || '请填写'"></el-input>
            <span class="unit">{{question_info.unit}}</span>
        </el-form-item>
        <!-- radio -->
        <el-form-item :label="question_info.label" prop="contact_phone" v-if="type(question_info.question_type) == 'radio'"><!-- v-if="!hideLabel" -->
            <el-radio-group v-model="Value.value">
                <el-radio v-for="(item,index) in options" :key="index" :label="JSON.stringify({key:'' + item.key,label:item.label})">{{item.label}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- check -->
        <el-form-item :label="question_info.label" prop="contact_phone" v-if="type(question_info.question_type) == 'checkbox'"><!-- v-if="!hideLabel" -->
            <el-checkbox-group v-model="Value.value">
                <div class="check-group">
                <el-checkbox v-for="(item,index) in options" :key="index" :label="JSON.stringify({key:'' + item.key,label:item.label})">{{item.label}}</el-checkbox>
                </div>
            </el-checkbox-group>
        </el-form-item>
    </div>
</template>
<script>
import childFormItem from './form-item'
// <li class="form-item clearfix" :class="[question_info.slug,{'disabled':question_info.disabled}]">
//        <!-- text 单行输入-->
//        <span class="ill-label" v-text="question_info.content" v-if="!hideLabel"></span>

//        <span class="wt-require" v-if="isRequire">*</span>
//         <span v-if="type(question_info.question_type) == 'text'" class="ill-value right">
//             <!-- 数字 -->
//             <input type="number" v-model="text_answer" pattern="[0-9]*" v-if="isNumber"
//             :placeholder="question_info.hints || '请填写'" />
//             <!-- 文本 -->
//             <input type="text" v-model="text_answer" v-else-if="!isNumber"
//             :placeholder="question_info.hints || '请填写'" />
//             {{question_info.unit}}
//         </span>
//         <!-- number -->
//         <!-- <span v-else-if="question_info.type=='number'" class="ill-value right">
//             <input type="number" v-model.number="question_info.value" 
//             :placeholder="question_info.placeholder || '请填写'"
//             :require="question_info.validate.require" />
//             {{question_info.unit}}
//         </span> -->
//         <!-- textarea -->
//         <span v-else-if="type(question_info.question_type)=='textarea'" class="ill-evaluate-value">
//             <textarea class="bdr-top" v-model="text_answer" :placeholder="question_info.hints || '请填写'"></textarea>
//             {{question_info.unit}}
//         </span>
//         <!-- radio -->
//         <span :class="{'ill-value':true,'right':!hideLabel}" v-else-if="type(question_info.question_type) == 'radio'">
//             <label  v-for="(item,index) in options" :key="index" :for="question_info.id  + '-' + index + '-' + question_info.content">
//                 <input type="radio" :name="question_info.id" :id="question_info.id  + '-' + index + '-' + question_info.content" class="hide" v-model="text_answer" checked :value="JSON.stringify({key:'' + item.id,label:item.content})" :ref="question_info.id + index"/>
//                 <i :class="((isStringifyObject(text_answer) && JSON.parse(text_answer).label == item.content) 
//                 || (/*如果text_answer没有值或为null，则设置为默认值*/!text_answer && isSelected(index))) 
//                 ? 'selected-circle' : 'circle'"></i>
//                 <span v-text="item.content"></span>
//             </label>
//         </span>


//         <span v-else-if="type(question_info.question_type)=='date'" :class="{'ill-value':true,'right':!hideLabel}">
//             <a v-text="text_answer" @click="openDatePicker" class="datePicker"></a>
//             <i class="iconfont icon-xiayiye"></i>
            
//         </span>
//         <div class="hr"></div>
//    </li>


    //type用来解析question_type为对应表单输入类型
    import type from './input_type.js'
    export default{
        name:'form-item',
        props:{
            data:{
                type:Object,
                default:{},
            },
            hideLabel:{
                type:Boolean,
                default:false
            },
            formKey:{
                type:String,
                defalut:null
            },
            values:{
                type:Array,
                default:function(){
                    return []
                }
            },
            value:{
                type:Object
            }
        },
        components:{
            childFormItem
        },
        data(){
            return {        
                question_info:this.data.question_info,
                options:this.data.options,
                Value:{
                    key:this.data.question_info.key,
                    unit:this.data.question_info.unit,
                    label:this.data.question_info.label,
                    value:String(this.data.question_info.mult) == 'true' ? [] : ''
                },
                isNumber:false,
                text_answer:this.isMult ? [] : '',
            }   
        },
        mounted(){
            if(type(this.question_info.question_type)=='date'){//设置默认时间
                this.$refs.picker.confirm()
            }
        },
        created(){
            //设置单项值
            this.setValue(this.value)
            
            // if(this.options){
            //     this.question_info.value = this.options[this.question_info.value]
            // }  
            // //递归调用，第二次进入本组件时，将key传入到question_info中
            // this.question_info.key = this.question_info.key || this.formKey
            this.onValueChange()
            //默认就触发input事件一次，将表单项加到答案中
            this.$emit("input",this.Value)
        },
        computed:{
           isRequire:function(){
               return /.*require.*/.test(this.data.question_info.checking_rules)
           },
           isMult(){
               return String(this.data.question_info.mult) == 'true'
           },
        },
        beforeDestroy(){
            this.$emit("delete",this.Value)
        },
        watch:{
            'Value.value':function(val){
                console.log('val',this.Value)
                let realatedFieldId = this.getRealatedFieldId()
                this.$emit("input",this.Value)
                this.$emit("toggleRealatedField",this.question_info.id, realatedFieldId)
            },
            values:function(val){
                this.onValueChange()
            }
        },
        methods:{
            type:type,
            //当传入的value发生改变时
            onValueChange:function(){
                if(this.values.length){
                    this.Value = this.getValue(this.question_info.key) || this.Value
                    if(this.Value.text_answer){
                        this.text_answer = this.Value.text_answer
                    }else if(this.Value.label){
                        this.text_answer = {'label':'' + this.Value.label,'key':'' + this.Value.key}
                    }
                    if(typeof(this.text_answer) == 'object'){
                        this.text_answer = JSON.stringify(this.text_answer)
                    }
                    //this.$emit("input",this.Value)
                }
            },
            confirmDate:function(val){
                switch(this.question_info.dateType){
                    case 'date':
                        this.text_answer = date.format(val,'y-m-d')
                        break;
                    case 'time':
                        this.text_answer = val
                        break;
                    case 'datetime':
                        this.text_answer = date.format(val,'y-m-d h:i')
                        break;
                    default:
                        this.text_answer = date.format(val,'y-m-d')
                }
                
               //this.text_answer = 
            },
            getValue:function(key){
				return this.values.find(item => {
                    return item && item.key == key
                    })
			},
            isStringifyObject:function(data){
                return /^\{.*\}$/.test(data)
            },
            getRealatedFieldId:function(){
               //let text_answer = ththis.isStringifyObject(this.Value.value)?JSON.parse(this.Value.value):this.Value.value,
                let tmp = this.options && this.options.filter(item => {
                                                    return this.Value.label == item.label
                                                })[0],
                   next_question_id = this.options ?
                                        (tmp ? tmp.next_question_id : undefined):
                                        this.question_info.next_question_id
               return next_question_id
               //return next_question_id && 
               //this.question_info.display && (question_info.display == true || question_info.display == 'true')
           },
            // isSelected:function(index){
            //     if(JSON.parse(this.options[index].selected) == 1){
            //         //如果默认选中，则设置text_answer值
            //         this.setDefaultValue(index)
            //         return true
            //     }
            //     return false
            // },
            // 设置选项默认值
            // setDefaultValue:function(index){//设置text_answer的值，这里手动设置值，是因为设置input radio的checked不生效，导致通过v-model绑定的text_answer无法自动设置为默认值
            //     this.$nextTick(_ => {
            //         let radio = this.$refs[this.question_info.id + index][0]
            //         ,val = radio.value
            //         this.text_answer = val
            //     })
            // },
            setValue:function(val){
                if(this.isMult){
                    if(val === undefined){
                        return
                    }
                    if(val && Object.prototype.toString.call(val) == "[object Array]"){
                        //根据val值，从选项（options）中匹配到对应的对象
                        let checkedItem
                        for(let i in val){
                            let item = val[i]
                            checkedItem = this.options.find(atem => {
                                return atem.key == item || atem.label == item
                            })
                            if(checkedItem){
                                checkedItem = JSON.stringify(checkedItem)
                                break;
                            }
                        }
                        
                        if(!checkedItem) {//如果没有对应选项，提示没有匹配到
                            this.Value.value = []
                            console.warn('the value of ' + this.question_info.label + ' dese not match options available')
                        }else{//成功匹配到选项
                            this.Value.value = checkedItem
                        }
                        
                    }else{
                        this.Value.value = [val]
                        console.warn('the value of' + this.question_info.label + ' must be a Array')
                    }
                    
                }else{
                    this.Value.value = val
                }
                
                console.log(this.Value)
                return



                val = this.isStringifyObject(val)?JSON.parse(val):val
                
                if(Object.prototype.toString.call(val) == '[object Array]'){
                    this.Value.value = []
                }
                console.log(this.Value)
                return
                if(typeof(val) == 'object'){
                    for(let i in val){
                        this.Value[i] = val[i]
                    }
                    
                    return  
                }
                this.Value.question_unit = this.question_info.unit
                
                this.Value['text_answer'] = val
            },
        }
    }
</script>
<style lang="less">
.form-item{
    padding: 0 12px;
    line-height: 40px;
    border-bottom: 1px #eee solid;
    background-color: #FFF;
    position:relative;
    border:none!important;
    .hide{
        display:none;
    }
    
    .unit{
        position: relative;
        margin-left:-2rem;
        color:#ccc;
    }

    input[type='text'],
    input[type='number']{
        padding-right:2rem;
    }
}


</style>
