<template>
<div>
	<el-popover
  ref="tip"
  placement="right-end"
  width="200"
  trigger="manual"
  v-model="visible">
  <div>
	  <div class="popover-header">
		  Tip
		  <i class="el-icon-close" @click="_ => visible = false"></i>
	</div>
	  {{tipMessage}}
  </div>
<el-select slot="reference" ref="select" :allow-create="allowInput" :filterable="allowInput" :placeholder="placeholder" :value="value" @input="updateValue"  v-bind="$attrs" 
 :multiple='multiple'  v-on="$listeners" @focus="_ => visible = false">
		<!-- 这里的mouseover与 mouseup事件是为了防止在用户选择选项，鼠标按下还未放开时触发了el-select的blur事件（该事件会触发对值的校验）-->
		<el-option
		v-for="(item, index) in selectOptions"
		v-if="item.visible !== false"
		:key="index"
		@mouseover.native="disableEventBlur"
		@mouseup.native="enableEventBlur"
		:label="item.label"
		:value="item.value || item.label"
    :disabled="!editable">
		</el-option>
	</el-select>
</el-popover>
    
	</div>
</template>
<script>
export default {
	name: "v-select",
	props: {
		value: {
			type: [String, Array, Number],
			default: ""
		},
		options: {
			type: Object,
			required: true
		},
		editable: Boolean
	},
	data() {
		return {
			allowInput: this.options.allowInput,
			placeholder:
				this.options.placeholder ||
				(this.options.allowInput ? "选择或输入" : "请选择"),
			multiple: this.options.multiple,
			selectOptions: this.options.options,
			label: this.options.label,
			select: null,
			tip: null,
			tipMessage: "",
			visible: false,
			changeOption: {
				enable: [],
				disable: []
			},
			disableOptions: [],
			oldDisableOptionsLength: 0,
			enableTimer: null,
			disableTimer: null,
			timer: null,
			onBlur: this.$listeners.blur
		};
	},
	watch: {
		"changeOption.enable"() {
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				!this.select.value && this.showTip();
				this.changeOption.enable.length = 0; //这里用设置长度为0的方式，避免再次触发watch
				this.changeOption.disable.length = 0;
			}, 50);
		},
		"changeOption.disable"() {
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				!this.select.value && this.showTip();
				this.changeOption.enable.length = 0;
				this.changeOption.disable.length = 0;
			}, 50);
		}
	},
	methods: {
		disableEventBlur() {
			this.select.$off("blur");
		},
		enableEventBlur() {
			this.select.$on("blur", this.onBlur);
		},
		showTip() {
			let enable = "",
				disable = "";
			if (this.changeOption.enable.length) {
				enable = "‘";
				let labels = this.changeOption.enable.map(option => {
					return option.label;
				});
				enable += labels.toString() + "’已启用";
			}
			if (this.changeOption.disable.length) {
				disable = "‘";
				let labels = this.changeOption.disable.map(option => {
					return option.label;
				});
				disable += labels.toString() + "’已禁用";
			}
			this.tipMessage = "选项" + enable + disable;
			this.visible = true;
		},
		updateValue(val) {
			this.$emit("input", val);
			this.$nextTick(_ => this.$emit("blur")); //这里与其他基础组件不同，是在更新值得时候，手动触发blur事件去校验。因为此类选择性组件，在选择的同时，会触发blur,而此时表单值尚未更新（即验证先于值更新了），会导致验证始终是失败。
		}
	},
	mounted() {
		this.select = this.$refs.select;
		this.tip = this.$refs.tip;
	},
	style: {
		"min-width": 120
	},
	created() {
		delete this.$listeners.input; //去掉对input事件的监听
		this.selectOptions.forEach(option => {
			if (option.rely && option.rely.visibility) {
				this.$watch(
					_ => option.visible,
					visible => {
						if (
							this.select.value == option.value ||
							(this.select.value == option.label &&
								visible == false)
						) {
							this.updateValue(); //抛出空值
							this.$nextTick(_ => {
								this.changeOption.disable.push(option);
							});
						} else {
							if (visible) {
								this.changeOption.enable.push(option);
							} else {
								this.changeOption.disable.push(option);
							}
						}
					}
				);
			}
		});
	}
};
</script>
<style lang="less">
.popover-header {
	padding: 0 0 1rem 0;
	text-indent: -0.2rem;
	.el-icon-close {
		cursor: pointer;
		float: right;
	}
}
</style>
