<template>
  <div>
    {{currentvalue}}
  </div>
</template>

<script>
export default {
	name: "v-base",
	props: {
		value: {
			type: [Number, String, Array, Object],
			default: function() {
				return "";
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
