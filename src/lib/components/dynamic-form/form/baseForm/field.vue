<template>
	<div class="base-form-item" @click="onSelect" :class="selected ? 'dynamic-field-selected' : ''">
		<el-form-item
			:label="options.unit ? `${label}(${options.unit})` : label"
			v-if="enAbleLabel"
			:prop="name"
			:rules="rules"
			>	
				<!-- 这里不能放进core.vue,否则会导致webpack循环引入，使组件导入失败 -->
				<div v-if="!isBaseComponents">
					<component :is="type" :options="options" v-bind="$attrs" v-on="$listeners" parent-form-layout="form-input"></component>
				</div>
				<core v-else :options="options" v-bind="$attrs" v-on="$listeners"></core>
		</el-form-item>
		<template v-else>
			<div class="el-form-item">
				<div class="field-label" v-if="labelStyle == 'block'">{{label}}</div>
				<!-- 这里不能放进core.vue,否则会导致webpack循环引入，使组件导入失败 -->
				<div v-if="!isBaseComponents">
					<component :is="type" :options="options" v-bind="$attrs" v-on="$listeners"></component>
				</div>
				<core v-else :options="options" v-bind="$attrs" v-on="$listeners"></core>
			</div>
		</template>
		<div class="action">
			<el-button type="primary" class="copy edit-btn el-icon-plus" title="复制" @click="onCopy"></el-button>
			<el-button type="primary" class="delete edit-btn el-icon-delete" title="删除" @click="onDelete"></el-button>
		</div>
	</div>
	
</template>

<script>
import core from "../core";
import Inputs from "../base";
import componentFields from "../components";
import _ from "../../typeof";
//import vInfinityTable from "../components/InfinityTable";
export default {
	name: "dynamic-form-field",
	props: {
		options: {
			type: Object,
			required: true
		}
	},
	data() {
		let { label, name, type, enAbleLabel, labelStyle } = this.options;
		return {
			label: label,
			name: name,
			enAbleLabel: enAbleLabel === false ? false : true,
			labelStyle: labelStyle !== undefined ? labelStyle : "inline",
			type:
				"v" +
				this.options.type.charAt(0).toUpperCase() +
				this.options.type.slice(1),
			rules: {
				required: this.options.required,
				//validator: this.validate,
				trigger: "none"
			},
			selected: false
		};
	},
	computed: {
		isBaseComponents() {
			//是否是基础组件？
			return this.type in Inputs;
		}
	},
	components: {
		core,
		...componentFields
	},
	methods: {
		//onCopy,onDelete用于配置表单时
		onCopy() {
			this.$emit("on-copy", this.name);
		},
		onDelete() {
			this.$emit("on-delete", this.name);
		},
		onSelect(status) {
			if (_.isBoolean(status)) {
				this.selected = status;
				this.$emit("on-field-select", this.options, this.onSelect);
			} else {
				this.selected = !this.selected;
				this.$emit(
					"on-field-select",
					this.options,
					this.onSelect,
					this.selected
				);
			}
		}
	},
	created() {
		// if (this.isBaseComponents) {
		//   //如果是基础组件（Inputs目录下的），则启用饿了么表单验证
		//   this.rules = {
		//     ...this.rules,
		//     validator: this.validate,
		//     trigger: "blur"
		//   };
		// }
	},
	beforeDestroy() {
		this.$emit("on-field-removed", this.name);
	}
};
</script>
<style lang="less">
.base-form-item {
	position: relative;
	.action {
		position: absolute;
		z-index: -99;
		opacity: 0;
		.edit-btn {
			transition: all 0.5s ease;

			padding: 12px 14px;
			border-radius: 50%;
		}
	}
}
</style>

