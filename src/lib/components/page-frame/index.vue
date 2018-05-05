<template>
	<div class="hg-lots mainTab">
		<div class="title">
			<span class="txt" v-text="title"></span>
				<slot name="title"></slot>
		</div>
		<slot></slot>
		<slot name="footer"></slot>
	</div>
</template>
<script>
/**
 * 页面结构组件
 */
import PagedTable from 'lib/components/wt-paged-table'
import LotsTable from 'cpd/lots-list'
export default {
	name: 'page-frame',
	props:{
		title:{
			type:String,
			default:'新建页面',
		}
	}
}
</script>
