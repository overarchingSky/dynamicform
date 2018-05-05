/**
 * 参数
 * data:Obect,上传文件时额外的参数
 * data	Object, 上传文件时，附带的参数
 * name String, 上传文件的字段名称
 * on-success function, 上传成功回调
 * on-error function, 上传失败回调
 * on-change function, 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用，该方法接收file和fileList两个参数
 */
<template>
	<el-upload
  class="upload-demo"
	ref="upload"
  :action="action"
  :file-list="fileList"
	:auto-upload="autoUpload"
	:headers="headers"
	:multiple="multiple"
	:before-upload="beforeUpload"
	:on-change="handleChange"
	v-bind="$attrs">
	<slot>
  	<el-button size="small" type="primary">{{txt}}</el-button>
	</slot>
</el-upload>
</template>
<script>
  export default {
		name:"wt-file-upload",
    data() {
      return {
				fileList: [],//以上传的文件列表
				readyToUploadFileList:[],//准备上传的文件列表
				upload:''//上传组件
      };
		},
		props: {
			value: {
				type: [Array,String],
				default: null
			},
			// 是否在文件选取后立即上传
			autoUpload: {
				type: Boolean,
				default: true // 默认为true，未来在使用OSS后使用此种方式上传
			},
			headers:{
				type:Object,
				default:function(){
					return {}
				}
			},
			multiple: {
				type: Boolean,
				default: false //是否多图上传
			},
			action: {
				type: String,
				default: "/admin/patients/upload"
			},
			txt: {
				type: String,
				default: "点击上传"
			},
			onChange: {
				type: Function,
				default:() => {}
			}
		},
		watch:{
			fileList:{
				handler(val, old){
					if(val != old){
						this.$emit('input',this.fileList)
						console.log(this.fileList)
					}
				},
				deep:true
			},
		},
		mounted(){
			this.upload = this.$refs.upload
		},
    methods: {
			submit(){
				this.upload.submit()
			},
			handleChange(file, fileList) {
				if(!this.multiple){
					this.upload.clearFiles()
					this.$nextTick(_ => {//下一帧执行，以便能触发动画
						this.upload && (this.upload.uploadFiles = [file])
					})
				}
				this.onChange(file, fileList)
			},
			beforeUpload () {
				if(this.fileList.length >= 1) {
					this.$message({
					type: 'error',
					message: '最多上传1份报告',
					duration: 2000
					})
					return false
				}
			}
		}
  }
</script>
<style lang="less">
.el-upload-list{
	height: 2.5rem;
}
</style>