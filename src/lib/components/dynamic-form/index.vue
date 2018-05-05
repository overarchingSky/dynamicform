<template>
  <el-container>
  <el-aside width="250px" v-if="isEdit">
	<warehouse></warehouse>
  </el-aside>
  <el-container>
    <el-header v-if="isEdit">
		<el-radio-group v-model="column">
			<el-radio label="1">1列</el-radio>
			<el-radio label="2">2列</el-radio>
			<el-radio label="3">3列</el-radio>
  		</el-radio-group>
	</el-header>
	<el-container :class="flexDirection">
		<el-main v-for="index in Number(column)" :key="index" class="drag-target"
		@dragenter.native.self="onDragenter" 
		@dragleave.native.self="onDragleave" 
		@dragover.native.self="onDragover"
		@drop.native="onDrop"
		:data-index="index - 1">

		<template v-if="type == 'view'">
			<dynamic-form-view :options="options[index - 1]" :key="index" v-if="matchValue(index - 1)" :layout="layout" :value="matchValue(index - 1).values"  @on-load-client-extra-field-value="(payload,next) => findExtraFieldValue(index - 1,payload,next)"
				@on-load-remote-field-value="(payload,next) => loadRemoteFieldValue(index - 1,payload,next)"></dynamic-form-view>
			<dynamic-form-view :options="options[index - 1]" :key="index" :layout="layout" v-else  @on-load-client-extra-field-value="(payload,next) => findExtraFieldValue(index - 1,payload,next)"
				@on-load-remote-field-value="(payload,next) => loadRemoteFieldValue(index - 1,payload,next)"></dynamic-form-view>
		</template>
		
		<template v-else>
			<dynamic-form :options="options[index - 1]" :edit="isEdit" ref="form" :key="index + '-has-value'" v-if="matchValue(index - 1)"
				:type="type"
				:layout="layout"
				:value="matchValue(index - 1).values"
				@on-value-change="val => setValue(index - 1, val)"
				@on-field-select="(payload, toggleSelect,selectd) => onFieldSelect(index - 1,payload,toggleSelect,selectd)"
			 	@on-copy="key => onCopy(index - 1,key)"
			 	@on-delete="key => onDelete(index - 1,key)"
				@on-load-client-field-value="(payload,next) => findOtherFieldValue(index - 1,payload,next)"
				@on-load-client-extra-field-value="(payload,next) => findExtraFieldValue(index - 1,payload,next)"
				@on-load-remote-field-value="(payload,next) => loadRemoteFieldValue(index - 1,payload,next)"
				></dynamic-form>
			<dynamic-form :options="options[index - 1]" :edit="isEdit" ref="form" :key="index + '-non-value'" v-else
				:type="type"
				:layout="layout"
				@on-value-change="val => setValue(index - 1, val)"
				@on-field-select="(payload, toggleSelect,selectd) => onFieldSelect(index - 1,payload,toggleSelect,selectd)"
			 	@on-copy="key => onCopy(index - 1,key)"
			 	@on-delete="key => onDelete(index - 1,key)"
				@on-load-client-field-value="(payload,next) => findOtherFieldValue(index - 1,payload,next)"
				@on-load-client-extra-field-value="(payload,next) => findExtraFieldValue(index - 1,payload,next)"
				@on-load-remote-field-value="(payload,next) => loadRemoteFieldValue(index - 1,payload,next)"
				></dynamic-form>
		</template>
		
		</el-main>
	</el-container>
  </el-container>
  <el-aside width="300px" v-if="isEdit">
	  <edit-panel style="height:99%;" :activeTab="activeTab" :options="activeFieldConfig"></edit-panel>
  </el-aside>
</el-container>
</template>

<script>
import warehouse from "./edit/warehouse";
import dynamicForm from "./form";
import dynamicFormView from "./value";
import editPanel from "./edit/edit_panel";
import _ from "./typeof";
import { findFieldByKey, getValueFromFormValue, getStash } from "./utils";
import {
	copyField,
	deleteField,
	createNewField,
	createNewForm
} from "./edit/utils";
export default {
	name: "dynamic-form-group",
	props: {
		options: {
			type: Array,
			default: () => []
		},
		value: {
			//如果传了value，则读取value中的formId，然后获取表单配置

			type: Array
		},
		type: {
			type: String,
			default: "input" //['view','input']
		},
		extra: {
			//目前暂时未实现这个参数
			//额外的依赖，表单中可以依赖此参数传进来对象中的字段，需要注意的是，内部watch了extra，在外部，是通过:extra=“extraFields”传进参数，不能使用extraFields = {...}的方式重新对该参数赋值（任意方式新建对象都不被允许）
			type: Object
		},
		layout: String
	},
	components: {
		warehouse,
		dynamicForm,
		dynamicFormView,
		editPanel
	},
	data() {
		return {
			activeFieldConfig: null, //当前正在编辑的字段所使用的配置
			craeteingField: false,
			activeTab: "1",
			timer: "",
			extraValue: {},
			watcher: {},
			formValues: [],
			extraDep: getStash() //Stash的字段
		};
	},
	computed: {
		flexDirection() {
			return this.layout == "table" ? "layout-column" : "layout-row";
		},
		column() {
			return this.options.length;
		},
		isEdit() {
			return this.type == "edit";
		},
		extraDepString() {
			return getStash();
		}
	},
	watch: {
		column() {
			createNewForm(this.options);
		}
	},
	methods: {
		matchValue(index) {
			return (
				this.value &&
				this.value.find(item => item.slug == this.options[index].slug)
			);
		},
		validate() {
			return Promise.all(this.$refs.form.map(item => item.validate()));
		},
		setValue(index, val) {
			this.$set(this.formValues, index, val);
			this.$emit("on-value-change", this.formValues, this.extraDep);
			//this.formValues[index] = val;
		},
		startWatch(watch, payload) {
			watch.unwatch = this.$watch(
				_ => {
					let res = this.formValues.find(val => {
						return val.slug == payload.slug;
					});
					if (res) {
						return res.values; //这里必须watch一个对象，因为表单每次抛出值都是一个新的对象，如果监听对象里的某个字段，那么最终会失败
					} else if (this.extraDep) {
						if (!this.extraDep[payload.name]) {
							console.warn("stash中没有找到依赖的字段");
							return "";
						}
						return this.extraDep[payload.name];
					} else {
						return "";
					}
				},
				val => {
					if (this.timer) clearTimeout(this.timer);
					let fieldName = payload.name;
					let depValue = getValueFromFormValue(val, fieldName);
					if (!_.isObject(val) && !_.isArray(val)) {
						depValue = val;
					}
					this.extraValue[fieldName] = depValue;
					this.timer = setTimeout(_ => {
						//节流处理
						watch.handler();
					}, 10);
				}
			);
		},
		findExtraFieldValue(index, payload, next) {
			this.$watch(
				_ => this.extra,
				val => {
					next(this.extra);
				},
				{ immediate: true }
			);
		},
		findOtherFieldValue(index, payload, next) {
			//这个回调会先于setValue，所以内部的formValues始终为长度为0的数组，这里对其进行延迟处理(不用太精确，只要在用户操作界面之前执行就行，而这个时间比较充裕)，以确保formValues长度不为0
			//let dependForm this.options.find(option => option.id == payload.formId)
			let key = payload.formId + "_" + payload.name;
			setTimeout(() => {
				if (key in this.watcher) {
					//已经被watch过的字段，重写其watch回调
					var oldHandler = this.watcher[key].handler;
					this.watcher[key].unwatch(); //停止旧的watch
					this.watcher[key] = {
						handler: _ => {
							oldHandler(this.extraValue);
							next(this.extraValue);
						},
						unwatch: ""
					};
					this.startWatch(this.watcher[key], payload);
					return;
				} else {
					this.watcher[key] = {
						unwatch: _ => {}, //unwatch会在startWatch中被重新赋值
						handler: next
					};
					this.startWatch(this.watcher[key], payload);
				}
			}, 300);
		},
		onCopy(index, key) {
			copyField(this.options[index], key);
		},
		onDelete(index, key) {
			deleteField(this.options[index], key);
		},
		onFieldSelect(index, field, toggleSelect, selectd) {
			//取消上一个选中的状态
			this.onFieldSelect.toggleSelect &&
				this.onFieldSelect.toggleSelect !== toggleSelect &&
				this.onFieldSelect.toggleSelect(false);
			this.onFieldSelect.toggleSelect = toggleSelect;
			if (selectd) {
				//保存当前选中的字段
				this.activeFieldConfig = field;
				this.activeTab = "0";
			} else {
				//保存当前选中的字段
				this.activeFieldConfig = null;
				this.activeTab = "1";
			}
		},
		toggleZIndex(els, add) {
			if (els.length > 0) {
				for (let i = 0; i < els.length; i++) {
					const el = els[i];
					el.classList.toggle("toLowLayer", add);
				}
			} else {
				el.classList.toggle("toLowLayer", add);
			}
		},
		onDragenter(e) {
			e.preventDefault();
			let target = e.target;
			this.toggleZIndex(target.children, true);
			let index = target.dataset.index;
			this.craeteingField = true;
			createNewField(this.options[index].fields);
		},
		onDragleave(e) {
			e.preventDefault();
			let relatedTarget = e.relatedTarget;
			let target = e.target;
			this.toggleZIndex(target.children, false);
			let index = target.dataset.index;
			this.options[index].fields.pop();
			this.craeteingField = false;
		},
		onDragover(e) {
			e.preventDefault();
		},
		onDrop(e) {
			let type = "drag-data";
			let target = e.target;
			this.toggleZIndex(target.children, false);
			let data = JSON.parse(e.dataTransfer.getData(type));
			let index = target.dataset.index;
			let fields = this.options[index].fields;
			fields.pop();
			createNewField(fields, data);
			this.craeteingField = false;
			e.dataTransfer.clearData(type);
		}
	},
	created() {}
};
</script>

<style lang="less" scoped>
.el-aside {
	overflow: hidden;
}
.toLowLayer {
	position: relative;
	z-index: -999;
}
.el-main {
	overflow: hidden;
}
.el-container.layout-column {
	display: block;
}
.el-container.layout-row {
	.el-main {
		flex: none;
	}
}
</style>
