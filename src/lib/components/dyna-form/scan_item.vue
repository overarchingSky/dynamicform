<template>
   <li class="form-item clearfix">
       <label class="wt-label">{{Value.question_content}}：</label>
	   <span class="wt-value">{{Value.text_answer}}</span>
       <span class="wt-value">{{Value.unit}}</span>
   </li>
   
  
</template>
<script>
    //type用来解析question_type为对应表单输入类型
    import type from './input_type.js'
    export default{
        name:'formItem-scan',
        props:{
            data:{
                type:Object,
                default:function(){
					return {}
				},
            },
        },
        data(){
            return {        
                Value:this.data,
            }   
        },
        created(){
            
        },
        computed:{
           
        },
        watch:{
           
        },
        methods:{
           
        }
    }
</script>
<style lang="less">

</style>
