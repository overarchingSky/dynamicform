<template>
  <div>
    <!-- type参数不可少 某些如infinityTable组件会用到-->
	<component :is="'v-' + componsentType"  v-bind="$attrs" v-on="$listeners" type="view"></component>
  </div>
</template>

<script>
import address from "./address";
import date from "./date";
import base from "./base";
// import infinityTable from "../../form/components/InfinityTable";
export default {
	name: "v-strip",
	props: {
		type: {
			type: String,
			default: ""
		}
	},
	components: {
		[address.name]: address,
		[base.name]: base,
		[date.name]: date,
		"v-infinityTable": base
	},
	computed: {
		componsentType() {
			switch (this.type.toLocaleLowerCase()) {
				case "address":
					return "address";
				case "infinityTable":
					return "infinityTable";
				case "date":
					return "date";
				default:
					return "base";
			}
		}
	},
	methods: {
		sss() {
			alert();
		}
	}
};
</script>

<style lang="less">

</style>
