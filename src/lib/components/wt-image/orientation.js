/*
 *检测图片方向：fixed_orientation
 * 应用场景：在input type=file的时候，某些场景下，图片显示方向不正确
 * */
import EXIF from './exif.js'
import BinaryFile from './BinaryFile.js'

/*检测浏览器是否支持transform属性*/
function isSuppertTransform(){
	var node = document.createElement("div")
	var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT']
	var transform;
	for(var i = 0; i < vendors.length; i++){
		transform = vendors[i] + 'ransform';
		if(node.style[transform] !== undefined){
			return true
		}
	}
	return false
}

function fixed_orientation(fileObj,callback) {
	if(!(isSuppertTransform() && FileReader)){
		console.warn('当前浏览器不支持自动修正图片方向功能！')
		return
	}
	var file = fileObj;
    var Orientation = null;    
    if (file) {          	 
		var oReader = new FileReader();  
		if(!oReader.readAsBinaryString){
			console.warn('当前浏览器不支持自动修正图片方向功能！')
			return
		}
		console.log("正在检测图片方向,请稍后...");  
        oReader.onload = function(e) {  
        	var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result))
        	Orientation = exif.Orientation
        	
            if(Orientation != "" && Orientation != 1){  
                        switch(Orientation){  
                            case 6://需要顺时针（向左）90度旋转  
                            	console.log("顺时针90度旋转")
                            	callback({
                            		style:{"transform":"rotate(90deg)"}
                            	})
                                break;  
                            case 8://需要逆时针（向右）90度旋转  
                            	console.log("逆时针90度旋转  ");
                            	callback({
                            		style:{"transform":"rotate(-90deg)"}
                            	})
                                break;  
                            case 3://需要180度旋转  
                            	console.log("180度旋转");
                                callback({
                            		style:{"transform":"rotate(180deg)"}
                            	})
                                break;
                            default:
                            	console.log("图片不需要旋转");
                            	break;
                        }         
                   }
		};
        oReader.readAsBinaryString(file.raw);
    }  
}  
  
export default{
	fixed_orientation:fixed_orientation
}
