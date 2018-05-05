//js工具方法库
let utils = {
  //判定引用类型或基本类型变量值是否相等（一般为string，obj，array，number，null等类型）
  //已知NaN，undefined无法判定
  isEqu: function(a, b = this) {
    if (typeof a != "object" || typeof b != "object") return a == b;
    return utils.contains(a, b) && utils.contains(b, a);
  },
  //判断b中是否包含a中的每项/属性（b是a的超集或‘内容’相等时，返回true）
  contains: function(a, b = this) {
    // if(typeof(b) != 'object') {
    //     return console.warn('参数2必须为数组或对象')
    // }else if(typeof(a) != 'object' && Object.prototype.toString.call(b) !== '[object Array]') {
    //     return console.warn('参数1为基本类型值时，参数2必须为数组')
    // }else if(typeof(a) != 'object' && Object.prototype.toString.call(b) === '[object Array]'){
    //     return
    // }
    let isEq = true;
    for (let i in a) {
      if (typeof a[i] == "object" && a[i] != null && b[i]) {
        isEq = utils.contains(a[i], b[i]);
      } else if (!b[i] || a[i] != b[i]) {
        isEq = false;
      }
    }
    return isEq;
  },
  /*
    *判定b是否包含在a中，可判定对象是否存在于数组中
    *@a:array
    *@b:除NaN，undefined之外的所有类型的值
    */

  indexOf: (a = [], b) => {
    if (typeof b != "object") {
      return a.indexOf(b);
    }
    var index = -1;
    for (let i = 0; i < a.length; i++) {
      if (utils.isEqu(a[i], b)) {
        index = i;
        break;
      }
    }
    return index;
  },
  /*
    * 尝试进行JSON.parse,如果失败，返回false
    * a:string
    */
  tryJsonParse: (a, isReturnRes) => {
    if (typeof a !== "string") {
      return a;
    }
    a = a && a.trim();
    let arrStr = /^\[.*\]$/,
      objStr = /^\{.*\}$/,
      numStr = /^[0-9]+$/;
    return arrStr.test(a) || objStr.test(a) || numStr.test(a)
      ? JSON.parse(a)
      : isReturnRes ? a : false;
  }
};
export default utils;
