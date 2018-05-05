<template>
	<div v-loading="loading" element-loading-text="加载中" class="wapper" >
		<wt-re-request-tip message="列表获取失败"
				:reLoad="load"
				:styles="'top:0;left:0;right:0;bottom:40px;'"
				v-show="isShowReloadTip">
		</wt-re-request-tip>
		<slot></slot>
		<el-pagination
			v-if="showPagination"
			@current-change="handleCurrentChange"
			:page-size="pageSize"
			layout="total, prev, pager, next"
			:total="currentTotal">
		</el-pagination>
	</div>
</template>

<script>
	/*
	 基于element-ui的ajax分页列表组件，封装了分页组件以及ajax请求的交互
	 用法：
	 <wt-paged-table>
	 	<!-- 页面渲染的列表数据，可以用vue在前端进行渲染，也可以是服务器端渲染出来的数据 -->
	 </wt-paged-table>
	 Events:
	 	page-loaded
	 */
	import Vue from 'vue'
	import ElementUI from 'element-ui'	
	import WtReRequestTip from "./wt-reRequest-tip"
	import {request, parseError} from '../utils/actions'

	Vue.use(ElementUI);

	export default {
		components: {WtReRequestTip},
		name: 'wt-paged-table',
		props:{
			// ajax接口用于查询数据的url
			url: {
				type: String,
				required: true
			},
			urlMethod: {
				type: String,
				default: 'POST'
			},
			countUrl: {
				type: String,
				default: null
			},
			countUrlMethod: {
				type: String,
				default: 'GET'
			},
			//数据类型的tab标志，当在多个tab之间快速切换时，会有多条请求发出，返回的结果可能会相互竞争，为了避免正确的数据被kill掉，请设置相应的tab名
			tab:{
				type:String,
				default:'tab',
			},
			// url接口查询时的当前页参数名
			pageParam: {
				type: String,
				default: 'index'
			},
			// 从返回数据中获取结果的字段
			resultParam: {
				type: String,
				default: null
			},
			// 从返回结果中获取记录总数的字段
			countParam: {
				type: String,
				default: 'count'
			},			
			// url接口查询时的filter参数名
			filterParam: {
				type: String,
				default: null
			},
			filter: {
				type: String,
				default: ''
			},
			//url接口查询时的其它参数
			extraParams: {
				type: Object,
				default: null
			},
			// 第一次渲染时的初始页
			initialPage: {
				type: Number,
				default: 0
			},
			totalSize:{
				type: Number,
				default: -1
			},
			sizeParam: {
				type: String,
				default: 'number'
			},
			pageSize:{
				type: Number,
				default: 15
			},
			// 如果为true，则组件在mount后会自动进行一次加载
			refresh: {
				type: Boolean,
				default: false
			},
			showPagination: {
				type: Boolean,
				default: true
			}
		},
		computed:{
      isShowReloadTip(){//是否显示加载错误提示，和重新加载按钮
        return !this.loading && this.requestStatus == 'fail';
			},
			// 父组件是否设置了totalSize
			isTotalSizeSet() {
				return this.totalSize > -1
			},
			// 在加载数据时是否还需要请求记录总数
			needRequestTotalSize() {
				return !this.isTotalSizeSet && !this.hasRequestedTotal
			}
		},
		data() {
			return {
				page: this.initialPage,
				loading: false,
				loadOnMounted: this.refresh,
				currentTotal: this.totalSize > -1 ? this.totalSize : 0,
				// 是否有成功请求到记录总数
				hasRequestedTotal: false,
				//请求状态,success,fail
				requestStatus:false,
			}
		},
		watch: {
			'totalSize'(val){
				this.currentTotal = val;
			},
			filter: function(newFilter) {
				this.hasRequestedTotal = false
				this.page = 0
				this.load();
			},
			'extraParams'(val){
				this.hasRequestedTotal = false
				this.page = 0
				this.load();
			},
			'refresh'(val, oldValue) {
				this.loadOnMounted = val;
				console.log(2324525)
			}
		},
		methods:{
			handleCurrentChange: function(currentPage) {
				this.page = currentPage - 1;
				this.load();
			},
			getQueryData: function() {
				let data = {};
				data[this.pageParam] = this.page;
				if (this.filterParam && this.filterParam != '') {
					data[this.filterParam] = this.filter;
				}
				if (this.extraParams != null) {
					for (let item in this.extraParams) {
						data[item] = this.extraParams[item];
					}
				}
				if(this.sizeParam){
					data[this.sizeParam] = this.pageSize;
				}
				return data;
			},
			requestPageData: function() {
				return request(this.url, this.urlMethod, this.getQueryData())
			},
			requestCount: function() {
				if (this.filterParam) {
					let data = {}
					data[this.filterParam] = this.filter
					if (this.extraParams != null) {
						for (let item in this.extraParams) {
							data[item] = this.extraParams[item];
						}
					}
					return request(this.countUrl, this.countUrlMethod, data);
				}
				else {
					return request(this.countUrl, this.countUrlMethod);
				}
			},
			loadRequest: function() {
				if (this.needRequestTotalSize) {
					return this.requestCount().then((response) => {
						this.currentTotal = response.data
						this.hasRequestedTotal = true
						return this.requestPageData()
					})
				}
				else {
					return this.requestPageData()
				}
			},
			load: function() {
				let vm = this;
				this.loading = true;
				let requestSign = this.tab + '-' + this.page;
				this.loadRequest().then(function(response) {
					let curRequestSign = vm.tab + '-' + vm.page
					if (requestSign != curRequestSign) {
						// 页码或分类tab已变化，丢弃数据
						return
					}
					vm.loading = false;
					vm.requestStatus = 'success';
					let data = response;
					let total = null;
					if (data.count !== undefined) {
						total = data.count;
					}
					else if(vm.countParam &&data.hasOwnProperty(vm.countParam)){
						total = data[vm.countParam];
					}
					if (response.data) {
						data = response.data;
					}
					if(typeof(data) == 'string') {
						data = JSON.parse(data);
					}
					if (!Array.isArray(data)) {
						if (data.count !== undefined) {
							total = data.count;
						}
						else if(vm.countParam &&data.hasOwnProperty(vm.countParam)){
							total = data[vm.countParam];
						}
						if (vm.resultParam) {
							data = data[vm.resultParam];
						}
					}
					if (total != null) {
						if (typeof(total) === 'string') {
							total = Number(total);
						}
						vm.currentTotal = total;
					}
					vm.loadOnMounted = false;
					vm.$emit('page-loaded', data);
				}).catch((error) => {
					this.loading = false;
					this.requestStatus = 'fail';
					this.$message.error(parseError(error));
				})
			}
		},
		created() {
			// 对传入的属性做一定的校验
			if (!this.isTotalSizeSet) {
				if (!this.countUrl || this.countUrl == '') {
					console.error('无法获取数据总条数！请传入totalSize，或者设置countUrl！')
				}
			}
		},
		mounted() {
			if (this.loadOnMounted) {
				this.load();
			}
		}
	}
</script>
<style scoped>
	.el-pagination{
		display: flex;
		justify-content:center;
		margin-top: 10px;
	}
	.wapper{
		position:relative;
	}
</style>