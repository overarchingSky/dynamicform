/*
 *安装依赖swiper： npm install swiper -S
 *value:array，数组中的每个对象具有thumb和full字段，分别为缩略图和大图
 *initialIndex：初始化的index
 *loop:boolean，是否开启循环查看模式
 */
<template>
		<div class="swiper-container image-preview">
		<i class="iconfont icon-close" @click="close"></i>
		<div class="tip">
			双击图片放大查看
		</div>
	    <div class="swiper-wrapper">
	    	<div class="swiper-slide" v-for="(item, index) in value" :key="index">
		        <div class="swiper-zoom-container">
		        	<img :src="item.thumb" :data-src="item.full" class="swiper-lazy"/><!--swiper-no-swiping-->
		        	<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
		        </div>
	    	</div>
	    </div>
	    <!-- 如果需要分页器 -->
	    <div class="swiper-pagination"></div>
	    
	    <!-- 如果需要导航按钮 -->
	    <div class="swiper-button swiper-button-prev swiper-button-white"></div>
	    <div class="swiper-button swiper-button-next swiper-button-white"></div>
	</div>
</template>
<script type="text/javascript">
	import Swiper from 'swiper/dist/js/swiper.js'
	require('swiper/dist/css/swiper.css')
	require('./icon/iconfont.css')
	export default {
		name:'wt-image-preview',
		props:{
			value:{
				type:Array
			},
			initialIndex:{
				type:Number,
				default:0
			},
			loop:{
				type:Boolean,
				default:false,
			}
		},
		data(){
			return {
				mySwiper:null,
			}
		},
		methods:{
			close(){
				this.$emit('close-preview')
			}
		},
		mounted(){
			this.mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    loop: this.loop,
			    initialSlide:this.initialIndex,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			    zoom:true,
			    mousewheelControl:true,
			    lazyLoading:true,
			    noSwiping:true,
			    /*onDoubleTap:function(swiper){
			    	setTimeout(function(){
			    		if(swiper.zoom.scale != 1){
				    		swiper.lockSwipes()
				    	}else{
				    		swiper.unlockSwipes()
				    	}
			    	},50)
					},*/
			   onProgress:function(swiper){
						 /*在图片放大或缩小时进行切换时，先将其缩放状态重置*/
			   		if(swiper.zoom.currentScale != 1){
			   			swiper.zoom.toggleZoom(swiper)
			   		}
			   },
			    // 如果需要前进后退按钮
			    nextButton: '.swiper-button-next',
			    prevButton: '.swiper-button-prev',
			})     
		},
	}
</script>
<style lang="less">
	.swiper-container{
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		width:100%;
		color:#000000;
		background-color:#000;
		z-index:9999;
		.tip{
			position:absolute;
			top:6%;
			width:100%;
			color:#fefefe;
			text-align: center;
		}
		.swiper-wrapper{
			width:100%;
			height:100%;
			.swiper-zoom-container{
				//padding:10% 0;
			}
		}
		.icon-close{
			position:absolute;
			top:2rem;
			right:2rem;
			z-index:999;
			font-size:1.6rem;
			color:#fff;
			cursor:pointer;
		}
	}
	.swiper-pagination-bullet{
		background-color:#fff!important;
	}
	@media screen and (max-width:1280px){
		.swiper-container .tip{
			display:none;
		}
	}
</style>