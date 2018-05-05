import fecha from 'fecha'

/**
 * 一些预制的可直接通过名称使用的格式，例如format(timeObject, masks.shortDatetime)
 */
const Masks = {
	default: 'YYYY-MM-DD HH:mm:ss',
	shortDatetime: 'YYYY-MM-DD HH:mm',
	date: 'YYYY-MM-DD',
	time: 'HH:mm:ss',
	month: 'YYYY-MM'
}

fecha.masks = Masks

/**
 * 时间格式化工具，可以对Date或者unix timestamp进行快速格式化或转换
 * 用法：
 * import times from '../../../Resources/utils/wt-time-utils'
 * times.format(1494554766)	//格式化unix timestamp
 * times.format(1494554766, 'shortDatetime')	// 用指定格式格式化unix timestamp
 * times.format(new Date())	// 格式化Date
 */

export default {
	/**
	 * 内置的时间格式，可直接通过名称使用
	 */
	masks: Masks,
	/**
	 * 将Date对象转换成unix timestamp
	 */
	dateToTimestamp: function(date) {
		return Math.round(date.getTime());
	},
	/**
	 * 将unix timestamp转换成Date对象
	 * @param {int} timestamp 
	 */
	timestampToDate: function(timestamp) {
		return new Date(timestamp);
	},
	/**
	 * 获取当前时间的unix timestamp
	 */
	getCurrentTimestamp: function() {
		return this.dateToTimestamp(new Date());
	},
	/**
	 * Convert将指定的date值转换成date对象，可以接受timestamp、string或者date
	 */ 
	toDate: function(dateObject) {
		let date = null;
		if (dateObject instanceof Date) {
			date = dateObject;
		}
		else if (typeof dateObject == "string") {
			date = new Date(dateObject);
		}
		else if (typeof dateObject == "number") {
			if (dateObject == 0) {
				date = null;
			}
			else {
				date = this.timestampToDate(dateObject);
			}
		}
		return date;
	},
	/**
	 * 将unix timestamp或者Date对象格式化成用于前端显示的字符串
	 * 可选的格式:
	 * 	'default' - 'YYYY-MM-DD HH:mm:ss'
	 * 	'shortDatetime' - 'YYYY-MM-DD HH:mm'
	 * 	'date' - 'YYYY-MM-DD'
	 * 	'time' - 'HH:mm:ss'
	 */
	format: function(dateObject, format='default') {
		let date = this.toDate(dateObject);
		if (date == null) {
			return '';
		}
		return fecha.format(date, format);
	}
}