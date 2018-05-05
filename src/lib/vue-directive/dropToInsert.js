import Vue from 'vue'
import _ from '../utils/typeof.js'
/**
 * v-dropToInsert
 * 用法 v-dropToInsert:selector="[{label:'选项一',value:1},{label:'选项二',value2}]"
 * 如果传入selector，指令会在内部通过querySelector查找当前绑定元素的子元素(一般用于将指令绑定到vue组件上时，toggle的元素在组件内部)
 */
Vue.directive('dropToInsert', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, binding) {
		// 聚焦元素
		if(!_.isArray(binding.value)) return console.warn(binding.name + '指令必须接收一个数组作为值,eg:[{label:"选项一",value:1},{label:"选项二",value2}]')
		let options = binding.value
		let target = el
		if(binding.arg){
			target = el.querySelector(binding.arg)
		}
		

		let backgroundColor = '#799645'

		let wapper = document.createElement('div')
		wapper.className = 'dropToInsert'
		wapper.style.position = 'fixed'
		wapper.style.padding = '0.4rem 0'
		wapper.style.backgroundColor = backgroundColor
		wapper.style.display = 'none'
		wapper.style.zIndex = 99999
		
    let template = ''
		options.forEach(item =>{
			let option = document.createElement('div')
			option.style = "width:8rem;color:aliceblue;padding:0 1rem;cursor: pointer;line-height:2.6rem;"
			option.innerText = item.label
			option.addEventListener('mouseover',function(){
				option.style.backgroundColor = '#6C8441'
			})
			option.addEventListener('mouseout',function(){
				option.style.backgroundColor = backgroundColor
			})
			option.addEventListener('click',function(){
				handlerSelect(item.value)
			})

			wapper.appendChild(option)

		})
		document.body.appendChild(wapper)

		function enableNativeRightMenu (){//启用浏览器右键菜单
			console.log('enable')
			document.oncontextmenu = function(){
				return true;
			} 
		}

		function disableNativeRightMenu (){//禁用浏览器右键菜单
			console.log('disable')
			document.oncontextmenu = function(){
				return false;
			} 
		}

		function showMenu (x,y){
			wapper.style.left = x + 'px'
			wapper.style.top = y + 'px'
			wapper.style.display = 'block'
			target.contentEditable = true
			document.addEventListener('click',function(){
				hideMenu()
			})
		}

		function hideMenu (){
			wapper.style.display = 'none'
			target.contentEditable = false
		}

		function handlerSelect(val){//选择后的处理
			target.focus()
			document.execCommand('insertHTML',false,val)
			//hideMenu()
		}
		
		

		target.addEventListener('focus',disableNativeRightMenu)
		target.addEventListener('blur',enableNativeRightMenu)
		target.addEventListener('mousedown',function(e){
			if(e.button ==2){//点击鼠标右键
				showMenu(e.pageX,e.pageY)
			}
		})
  }
})