import Vue from 'vue'
import _ from '../utils/typeof.js'

Vue.directive('focus', {
	inserted:function(el, binding){
		let target = el
		if(!(el.tagName ==='INPUT' && el.tagName !=='TEXTAREA')){
			target = el.querySelector('input')
		}
		target.focus()
	},
})