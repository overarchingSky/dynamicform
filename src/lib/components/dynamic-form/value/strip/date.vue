<template>
  <div>
    {{currentvalue}}
  </div>
</template>

<script>
import Date from "./Date-utils";
export default {
	name: "v-date",
	props: {
		value: {
			type: [Number, String],
			default: function() {
				return "";
			}
		}
	},
	data() {
		return {
			currentvalue: (this.value && Date.format(this.value, "date")) || ""
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
