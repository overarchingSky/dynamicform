<!--
参数：
options:下拉选项 eg:[{
          value: '选项1',
          label: '黄金糕',
          template:''//用于选中后，输入框中显示的文本
        }, {
          value: '选项2',
          label: '双皮奶'
        }]
multiple:设置模式是否多选，ture or false 默认单选
value:设置默认值，多选模式下，为一个数组，eg:['选项1','选项2']（取options中的value值），单选模式下，为字符串，eg:'选项1'，与options中某个value字段对应
-->
<template>
  <el-select v-model="selecteds" filterable :multiple="Boolean(multiple)" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.template || item.label"
      :value="item.value">
      <span style="float: left">{{item.label }}</span>
    </el-option>
  </el-select>
</template>
<script>
  export default {
    name:'wt-selector',
    props:{
      options:{
        type:Array,
        required:true
      },
      value:{
        type:[Array,String,Number],
      },
      multiple:{
        type:[Boolean,String],
        default:false
      }
    },
    data() {
      return {
        selecteds: this.value
      }
    },
    watch:{
			value(val) {
				this.selecteds = val
			},
      selecteds(val){
        this.$emit('input',val)
      }
    },
  }
</script>