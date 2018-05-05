<template>
<div class="infinity-table">
	<el-dialog
	title="确认手术日"
	:visible.sync="dialogVisible"
	width="30%"
	:before-close="handleClose">
	{{message}}
	<span slot="footer" class="dialog-footer">
		<el-button @click="dialogVisible = false">取 消</el-button>
		<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
	</span>
	</el-dialog>
	<!-- @header-click="signOperateDay" -->
	<el-table
		ref="table"
		class="table-form"
		:data="formValue"
		:header-cell-class-name="addPointer"
		border
		style="width: 100%"
		
		@mousewheel.native.prevent="mousewheel">
		<el-table-column label="时间点" props="tick" fixed class-name="tick" width="100px">
			<template slot-scope="scope">
				{{scope.row.tick}}
			</template>
		</el-table-column>
		<el-table-column v-for="(date,index) in valueDates" :key="index" :label="getLabel(date,index)" border>
			<template v-if="hasSubform(v_options)">
				<el-table-column v-for="field in fields" :key="field.name" :label="field.label" :prop="field.name + '-' + date" min-width="90">
					<template slot-scope='scope'>
						<pure-field  
							v-if="isEdit"
							:value="scope.row[field.name + '-' + date]"
							:options="field"
							@valueUpdate="payload => valueUpdateHandler(scope.row, field.name + '-' + date,payload)"
							:validateField="validateField"
							></pure-field>
							<span v-else>
						{{scope.row[field.name + '-' + date]}}
					</span>
					</template>
				</el-table-column>
			</template>
			<template slot-scope='scope'>
				<pure-field
					v-if="isEdit"
					:value="scope.row[date]"
					:options="v_options"
					@valueUpdate="payload => valueUpdateHandler(scope.row, date,payload)"
					:validateField="validateField"
					></pure-field>
					<span v-else>
						{{scope.row[date]}
					</span>
			</template>
		</el-table-column>
	</el-table>
</div>
</template>
<script>
import dateUtils from "../../../../utils/time";
import _ from "../../../../utils/typeof";
import { getTimeStampFormField } from "../../utils";
import { getKeysFromFormula } from "../../formula";
import pureField from "../core";
const dayStamp = 24 * 3600 * 1000; //一天对应的毫秒数
export default {
	name: "v-infinityTable",
	props: {
		options: {
			type: Object,
			required: true
		},
		type: { type: String, default: "input" }, //['input','view']
		value: Array
	},
	components: {
		pureField
	},
	computed: {
		isEdit() {
			return this.type === "input";
		}
	},
	data() {
		let v_options = {
			...this.options,
			type: this.options.cellInputType || this.options.type
		};
		let { name, groups, startDate, endDate, sign } = v_options;
		let startPointDate = startDate || Date.now();
		let endPointDate = endDate || startPointDate;
		return {
			v_options,
			timer: null,
			step: 3,
			dialogVisible: false,
			message: null,
			operateDay: null,
			name,
			groups,
			startDate: startDate || Date.now(),
			startPointDate,
			endPointDate,
			sign: _.isArray(sign) ? JSON.parse(JSON.stringify(sign)) : [],
			valueDates: [],
			fields: this.getSubFields(this.options),
			formValue: [], //组件内部解析的，特定格式的值（这个值不符合约定输出的格式，需要用formatOutputValue转化）
			outputValue: {} //向组件外部输出的值
		};
	},
	methods: {
		initFormValue() {
			this.groups.forEach(tick => {
				this.formValue.push({
					tick: tick
				});
			});
		},
		valueUpdateHandler(rowData, key, payload) {
			rowData[key] = payload.value;
			this.outputValue = this.formatOutputValue(this.formValue);
			this.$emit("valueUpdate", {
				key: this.name,
				value: this.outputValue
			});
		},
		formatInputValue(value) {},
		formatOutputValue(value) {
			return this.valueDates.map(stamp => {
				let dayData = {};
				for (let i = 0; i < value.length; i++) {
					const rowData = value[i];
					if (this.hasSubform(this.v_options)) {
						this.fields.forEach(field => {
							let newField = {
								[field.name]: rowData[field.name + "-" + stamp]
							};
							dayData[rowData.tick] = {
								...dayData[rowData.tick],
								...newField
							};
						});
					} else {
						// let newField = {
						//   [field.name]: rowData[stamp]
						// };
						dayData[rowData.tick] = rowData[stamp]; //{ ...dayData[rowData.tick], ...newField };
					}
				}
				return dayData;
			});
		},
		addPointer({ ...header }) {
			if (header.rowIndex == 0) {
				return "can-click";
			}
		},
		hasSubform() {
			return !!this.options.repeat;
		},
		getSubFields() {
			return this.options.repeat;
		},
		validateField() {},
		mousewheel(e) {
			if (!this.isEdit) {
				return;
			}
			let dist = e.wheelDelta;
			this.tableWheel(-dist);
		},
		tableWheel: function(dist) {
			let els = this.$refs.table.$children;
			let target = this.$refs.table.$el.getElementsByClassName(
				"el-table__body-wrapper"
			)[0];
			this.ease(d => {
				target.scrollLeft = target.scrollLeft + d;
			}, dist / 8);
			this.scrollLeft(target, dist);
			//表格右侧延伸
			this.scrollRight(target, dist);
		},
		ease(fun, dist) {
			this.timer && clearInterval(this.timer);
			//缓动算法
			let delay = 0;
			this.timer = setInterval(_ => {
				delay = 50;
				if (Math.abs(dist) * 100 < 1) clearInterval(this.timer);
				dist = dist / 1.1;
				fun(dist);
			}, delay);
		},
		scrollLeft(target, dist) {
			if (target.scrollLeft < 100 && dist < 0) {
				//表格左侧延伸
				this.addField(this.step, true);
			}
		},
		scrollRight(target, dist) {
			if (
				target.scrollLeft + target.offsetWidth + 100 >
					target.scrollWidth &&
				dist > 0
			) {
				this.addField(this.step);
			}
		},
		signOperateDay(column, event) {
			//标记为手术日
			if (column.level !== 1) {
				return;
			}
			this.dialogVisible = true;
			let date = dateUtils.format(Number(column.property), "M月D日");
			this.message = `是否将${date}设为手术日？`;
			//this.operateDay = dateUtils.format(Number(column.property), "M月D日");
		},
		handleClose() {
			this.dialogVisible = false;
		},
		getLabel(time, index) {
			if (index == 0) {
				let startDateDescription = this.options.startDateDescription;
				if (startDateDescription) {
					window.a = dateUtils.format;
					return (
						dateUtils.format(Number(time), "M月D日") +
						`（${startDateDescription}）`
					);
				}
			} else if (this.sign) {
				for (let i = 0; i < this.sign.length; i++) {
					const info = this.sign[i];
					if (!info.tick) {
						return dateUtils.format(Number(time), "M月D日");
					}
					if (
						dateUtils.format(Number(info.tick), "M月D日") ==
						dateUtils.format(Number(time), "M月D日")
					) {
						return (
							dateUtils.format(Number(time), "M月D日") +
							`（${info.tip}）`
						);
					}
				}
			}
			return dateUtils.format(Number(time), "M月D日");
		},
		addField: function(days, reserve = false, value) {
			let sdate, fix;
			for (let s = 0; s < days; s++) {
				let dayData = value && value[s];
				if (this.valueDates.length == 0) {
					fix = 0;
				} else {
					fix = 1;
				}
				if (!reserve) {
					sdate = this.endPointDate + fix * dayStamp;
					this.endPointDate = sdate;
					this.valueDates.push(sdate);
				} else {
					sdate = this.startPointDate - fix * dayStamp;
					this.startPointDate = sdate;
					this.valueDates.unshift(sdate);
				}

				for (let i = 0; i < this.formValue.length; i++) {
					const rowData = this.formValue[i];
					let tick = rowData.tick;
					if (this.hasSubform(this.options)) {
						for (let j = 0; j < this.fields.length; j++) {
							const field = this.fields[j];
							let key = field.name + "-" + sdate;
							//填充传入组件的值
							let data =
								dayData &&
								dayData[tick] &&
								dayData[tick][field.name];
							rowData[key] = data || undefined;
						}
					} else {
						let data = dayData && dayData[tick] && dayData[tick];
						console.warn(sdate, sdate);
						rowData[sdate] = data;
					}
				}
			}
		}
	},
	style: {
		"min-width": 1000
	},
	created() {
		this.initFormValue();
		//alert(this.defaultColumnNum);
		let dataCount =
			(this.value && this.value.length) ||
			this.options.defaultColumnNum ||
			6;

		//解析startPointDate
		let depFieldNames = getKeysFromFormula(this.startDate) || [];
		depFieldNames.forEach(field => {
			this.$emit(
				"on-load-client-extra-field-value",
				{ name: field, position: "client-extra" },
				val => {
					try {
						let isRender = false;
						this.sign = this.sign.map(item => {
							if (_.isNumber(item.tick)) {
								//如果已经被解析过
								isRender = true;
								return item;
							}
							let fields = getKeysFromFormula(item.tick) || [];
							let singleFeild = fields[0];
							item.tick = Number(val[singleFeild]);
							return item;
						});
						if (isRender) {
							return;
						}

						let startDate = val.admissionDate;
						this.startPointDate = Number(startDate);
						this.endPointDate =
							this.options.endDate || this.startPointDate; //尚未将endDate公式化，目前只能接受一个时间戳
						this.$nextTick(_ => {
							/*设定允许延伸的方向 */
							if (this.options.startDate) {
								this.scrollLeft = function() {};
								this.addField(dataCount, false, this.value);
							}
							if (this.options.endDate) {
								this.scrollRight = function() {};
								this.addField(dataCount, true, this.value);
							}
						});
					} catch (error) {
						console.error(`${field}不是一个有效的时间戳`);
					}
				}
			);
		});
	},
	mounted() {}
};
</script>
<style lang="less" scoped>
.el-form-item {
	width: 20%;
	.padR-10 {
		padding-right: 10px;
	}
}
.inner-table {
	width: 100%;
}
</style>


<style lang="less">
.infinity-table {
	.el-table .cell,
	.el-table th > div {
		padding-left: 6px !important;
		padding-right: 6px !important;
	}
	.table-form {
		.el-form-item__error {
			position: static;
		}
	}
	.can-click {
		.cell {
			cursor: pointer;
		}
	}
	.el-table td {
		&.tick {
			vertical-align: middle;
		}
	}
}
</style>
