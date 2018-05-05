<template>
  <div>{{currentvalue.province.value}}-{{currentvalue.city.value}}-{{currentvalue.area.value}}</div>
</template>

<script>
export default {
	name: "v-address",
	props: {
		value: {
			type: Object,
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			currentvalue: this.value
		};
	},
	watch: {
		value() {
			this.currentvalue = this.value;
		}
	}
};
</script>

<style lang="less">

</style>
