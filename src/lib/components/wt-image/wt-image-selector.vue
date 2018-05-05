/*
 * 图片选择，上传组件 
 */
<template>
	<div>
		<!-- 多图 -->
		<el-upload 
			v-if="multiple"
			ref="upload"
			list-type="picture-card" 
			:action="action"
			:file-list="currentValue"
			:show-file-list="multiple"
			:auto-upload="autoUpload"
			:multiple="multiple"
			:on-remove="handleRemove"
			:on-change="handleChange"
			:on-success="handleSuccess"
			:before-upload="handleBeforeUpload"
			v-bind="$attrs"
			:headers="headers"
			accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp"
		>
			<i class="el-icon-plus"></i> 
		</el-upload>
		<!-- 单图 -->
		<el-upload 
			v-if="!multiple"
			ref="upload"
			list-type="picture-card" 
			:action="action"
			:show-file-list="multiple"
			:auto-upload="autoUpload"
			:on-remove="handleRemove"
			:on-change="handleChange"
			:on-success="handleSuccess"
			:before-upload="handleBeforeUpload"
			v-bind="$attrs"
			:headers="headers"
			accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp"
		>
			<img v-if="!multiple && !!currentValue && currentValue.length>0" :src="signalUrl" style="width:100%;height:100%;display:block" />
			<i v-else class="el-icon-plus"></i> 
		</el-upload>
	</div>
</template>
<script>
	import ImageUtils from './orientation.js';

	const Success = 'success';
	const Fail = 'fail';
	const Uploading = 'uploading';
	const Ready = 'ready';

	export default {
		name: 'wt-image-selector',
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
				default: true // 默认为true，未来在使用OSS后使用此种方式上传
			},
			action: {
				type: String,
				default: "/admin/patients/upload"
			}
		},
		data() {
			return {
				currentValue: [],
				currentData: [],
				successCallback: null,
				errorCallback: null,
				startedProcessing: false,
				isUploading: false,
				failFiles:[],//上传失败的图片对象
				timer:undefined
			}
		},
		watch: {
			'value'(val, oldValue) {
				this.reset();
			},
		},
		computed: {
			actionUrl: function() {
				
			},
			//单图模式时图片的url
			signalUrl: function(){
				if(typeof(this.currentValue) == "string"){
					return this.currentValue
				}else{
					return (this.currentValue.length > 0 && this.currentValue[0].raw) ? (URL.createObjectURL(this.currentValue[0].raw)) : this.currentValue[0].url
				}

			},
			//是否有图片上传失败
			hasFilesFailToUpload:function(){
			    return !!this.failFiles.length;
			}
		},
		methods: {
			tryJsonParse:(a, isReturnRes) => {//尝试利用JSON.parse解析a,失败返回false或者本身，这取决于第二个参数
        if(typeof(a) !== 'string'){
            return isReturnRes ? a : false
        }
        a = a && a.trim()
        let arrStr = /^\[.*\]$/,
            objStr = /^\{.*\}$/,
            numStr = /^[0-9]+$/
        return (arrStr.test(a) || objStr.test(a) || numStr.test(a)) ? JSON.parse(a) : (isReturnRes ? a : false)
    	},
			submit(successCallback, errorCallback) {
				this.successCallback = successCallback;
				this.errorCallback = errorCallback;
				if (this.isUploading) {
					return;
				}
				if (this.hasItemToUpload()) {
					this.startedProcessing = true;
					this.$refs.upload.submit();
				}
				else {
					console.log('nothing to upload');
					successCallback();
				}
			},
			reset() {
				this.createItems(this.value);
			},
			/*提交失败后，将status为fail的文件/图片状态重置为ready，以便再次提交*/
			resetFilesStatus(){
				let files = this.$refs.upload.uploadFiles;
				if(!this.multiple){
					for(var i in files){
						if(files[i].status == Fail || files[i].status == Success){
							files[i].status = Ready
						}
					}
				}else{
					for(var i in files){
						if(files[i].status == Fail){
							files[i].status = Ready
						}
					}
				}
			  	
                this.$refs.upload.uploadFiles = files;
			},
			setCurrentData(data) {
				if (this.currentData !== data) {
					this.currentData = data;
				}
				this.$emit('input', this.currentData);
			},
			hasItemToUpload() {
				let files = this.$refs.upload.uploadFiles;
				for (let i = 0; i < files.length; i ++) {
					if (files[i].status != Success) {
						return true;
					}
				}
				return false;
			},
			createItems() {
				let items = [];
				let datas = [];
				let value = this.tryJsonParse(this.value) || this.value;
				if (value) {
					if(typeof(value) == "string"){
						items = value
					}else{
						let source = Object.prototype.toString.call(value) == '[object Array]' ? value : []
						for (let i = 0; i < source.length; i ++) {
							let item = source[i];
							if (item instanceof Object) {
								items.push({
									url: item.full ? item.full: item.original,
									original: item.original,
									status: Success,
								})
								datas.push(item.original);
							}
							else {
								// item 只是一个字符串地址
								items.push({
									url: item,
									original: item,
									status: Success,
								});
								datas.push(item);
							}
						}
					}
				}
				this.currentValue = items;
				this.currentData = datas;
			},
			checkStatus(file,fileList) {
				if(file){
                    if(file.status == Fail){
                        this.failFiles.push(file);
                        this.$refs.upload.uploadFiles.push(file);
                    }else if(file.status == Success){
                        this.failFiles.pop(file);
                    }
				}
				//由于设计的缺陷，在选择图片时，会触发两次checkStatus，这里用setTimeout控制fixed_image_orientation只执行 一次
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(_ => {
					this.fixed_image_orientation(file,fileList)
				},1)
				if (!this.startedProcessing) {
					return;
				}
				let files = this.$refs.upload.uploadFiles;
				let allItemsUploaded = true;
				let hasItemFailed = false;
				let hasItemUploading = false;
				for (let index in files) {
					let item = files[index];
					if (item.status != Success) {
						allItemsUploaded = false;
					}
					if (item.status == Fail) {
						hasItemFailed = true;
					}
					if (item.status == Uploading) {
						hasItemUploading = true;
					}
				}
				this.isUploading = hasItemUploading;
				if (hasItemUploading) {
					return;
				}
				else if (allItemsUploaded) {
					if (this.successCallback) {
						this.successCallback();
						this.successCallback = null;
						this.errorCallback = null;
						this.startedProcessing = false;
					}
					else {
						console.warn('successcallback is null!');
					}
				}
				else if (hasItemFailed) {
					if (this.errorCallback) {
						this.errorCallback();
						this.successCallback = null;
						this.errorCallback = null;
						this.startedProcessing = false;
                        this.resetFilesStatus()
					}
				}
			},
			handleChange(file, fileList) {
				if(!this.multiple){
					this.currentValue = [file]
				}	
				this.checkStatus(file,fileList);
			},
			handleRemove(file, fileList) {
				if (file && file.original) {
					this.currentData.splice(this.currentData.indexOf(file.original), 1)
					this.setCurrentData(this.currentData);
				}
				else {
					console.warn(file);
				}
			},
			handleSuccess(response, file, fileList) {
				file.original = response;	
				this.multiple ? this.currentData.push(file.original) : (this.currentData = [file.original]);
				this.setCurrentData(this.currentData);
			},
            handleBeforeUpload(file){
			    const maxSize = 20*1024*1024;
				if(file.size > maxSize){
				    this.$message("图片"+file.name+"过大，请确保在20M以内")
				    this.$emit("stop")
            return false
				}
				return true

			},
			fixed_image_orientation(file,fileList){
				let index = fileList.indexOf(file)//index，最新添加的图片在fileList中的索引
				ImageUtils.fixed_orientation(file,(res) => {
					this.$nextTick(() => {
						if(this.$children[0].$children[0].$children[0].$slots.default[index]){
							let item = this.$children[0].$children[0].$children[0].$slots.default[index].elm;
							let img = item.getElementsByTagName("img")[0];
							Object.assign(img.style,res.style)
						}
					})
				})
			},
		},
		created() {
			if(typeof(this.value) == "string"){
				this.currentValue = this.value
			}else{
				this.createItems();
			}
			this.$emit('input', this.currentData);
		},
		mounted() {
		}
	}

</script>
<style>

</style>
