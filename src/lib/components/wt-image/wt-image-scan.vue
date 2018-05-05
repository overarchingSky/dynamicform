/*
 * 图片查看组件
 * value:Array，eg：[{thumb:****1thumb.png,full:******1full.png},{thumb:****2thumb.png,full:******2full.png}],推荐传入此格式，thumb字段外缩略图，full为大图，当然为了简便，也可以直接传[***1.png,***2.png]，只是这样用户体验效果略差
 * size:mini,small,large,默认mini,设置组件大小
 */
<template>
	<div class="carousel-imges">
		<template v-if="currentValue.length == 0">无</template>
		<template v-else>
			<div v-for="(item, index) in currentValue" :key="index" style="position: relative;display:inline-block" >
				<img class="wt-preview-img" :src="getThumb(item)" :style="{ width: cellWidth + 'px', height: cellWidth + 'px' }" @click="onPreview(item, index)"/>
			</div>
			<wt-image-preview v-if="previewVisible" @close-preview="closePreview" :value="currentValue" :initial-index="currentIndex"></wt-image-preview>
		</template>
	</div>
</template>
<script>
	import preview from './preview'
	import oss from './oss'

	const sizeMap = {
		'large': 100,
		'small': 40,
		'mini': 22
	};

	export default {
		name: 'wt-image-scan',
		components:{
			[[preview.name]]:preview
		},
		props: {
			value: {
				type: Array,
				required: true
			},
			size: {
				type: String,
				default: 'mini'
			},
			loading:true,
			autoSign: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				els:[],//存放wt-image-item
				previewVisible: false,
				currentIndex: 0,
				timer:null,
			}
		},
		computed: {
			'currentValue'(){
				console.log('scan',this.value)
				return this.createItems(this.value)
			},
			cellWidth: function() {
				return sizeMap[this.size];
			},
		},
		methods: {
			keydownHandler(e){
				clearTimeout(this.timer)
				let action,doAction = false;
				switch(e.keyCode){
					case 37://左
					case 38://上
						action = this.$refs.previewer.prev;
						doAction = true;
						break;
					case 39://右
					case 40://下
						action = this.$refs.previewer.next
						doAction = true;
						break;
					default:
						break;
				}
				this.timer = setTimeout(() => {
					if(doAction){
						action()
					}
				},300)
			},
			getThumb(item) {
				if (this.autoSign) {
					if (typeof(item) == 'String') {
						console.error('Auto sign can only be used when image items are objects');
						return;
					}
					let original = item.original ? item.original: item.path;
					if (!item.thumb) {
						item.thumb = oss.signWithStyle(original, 'web-thumb');
					}
					if (!item.full) {
						item.full = oss.signWithStyle(original, 'web-full');
					}
				}
				if (item.thumb) {
					return item.thumb;
				}
				else if (item.full) {
					return item.full;
				}
				else if (item.original) {
					return item.original;
				}
				else {
					return item;
				}
			},
			/*getFull(item) {
				if (item.full) {
					return item.full;
				}
				else if (item.original) {
					return item.original;
				}
				else {
					return this.getThumb(item);
				}
			},*/
			closePreview(){
				this.previewVisible = false
			},
			onPreview(item, index,callback) {
				this.currentIndex = index;
				this.previewVisible = true;
			},
			createItems(value) {
				return value.map(item => {
					return (item.thumb && item.full) ? item : {thumb:item,full:item}
				})
			},
			handleClickImage(item){
				this.$emit('click', item);
			}
		}
	}
</script>
<style>
.wt-img-button{
	position: absolute;
	border-radius: 5px;
	background: rgba(0,0,0,.5);
}
.wt-img-dialog {
	background: none !important;
	border: none !important;
	text-align: center;
	/*设置为纯色，掩盖背部首尾交换时的过场动画，虽然已经做了降帧处理，但是鼠标滑过下方导航条的时候，还是能*/
	background-color:#000000!important;
}
.wt-img-dialog .el-carousel__item {
	overflow-y: auto !important;
}
.wt-img-dialog .el-loading-mask{
	background-color:hsla(0,0%,100%,0)
}
.wt-image-item{
	width:100%;
	height:100%;
	
	background-size:inherit;
	background-position:center center;
	background-repeat: no-repeat;
}
.wt-full-img {
	max-width: 100%;
}
.wt-preview-img {
	border: 1px solid #c0ccda;
	margin: 0 2px 2px 0;
}
.carousel-imges .el-carousel__indicators--outside button{
	background-color:#fff

}
.carousel-imges .el-carousel__indicators--outside button{
	opacity: 0.5;
}
.carousel-imges .el-carousel__indicator.is-active button{
	opacity: 1;
}
</style>