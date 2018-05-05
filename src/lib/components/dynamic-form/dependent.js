//若无特殊需求，直接使用addDependent方法
import { autoCalculate } from "./formula";
import _ from "./typeof";
import {
  hasSubform,
  getSubFields,
  toggleFieldVisibility,
  findFieldByKey
} from "./utils";

/**
 * 检查是否是依赖于服务端上存在的某个字段值
 * @param {Any} dep
 */
function isRemoteDepField(dep) {
  return _.isObject(dep) && dep.position == "remote";
}

/**
 * 检查依赖的字段是否在传入的value属性中
 * @param {String} dep
 */
function isClientOtherDepField(dep) {
  return _.isObject(dep) && dep.position == "client";
}

/**
 * 检查依赖的字段是否在传入的extra属性中
 * @param {String} dep
 */
function isClientExtraOtherDepField(dep) {
  return _.isObject(dep) && dep.position == "client-extra";
}

function dependentHandle(
  fieldOrOption,
  formValue,
  oldWatcherHandler,
  extraValue
) {
  let rely = fieldOrOption.rely;
  rely.formula &&
  fieldOrOption.name && //这里判断fieldOrOption.name是为了过滤掉option中意外添加了formula字段的情况（原则上，option中不应该存在formula字段）
    autoCalculate(fieldOrOption.name, formValue, rely.formula, extraValue);
  rely.visibility &&
    toggleFieldVisibility(
      fieldOrOption,
      formValue,
      rely.visibility,
      extraValue
    );
  oldWatcherHandler && oldWatcherHandler();
}

/**
 *返回单条记录的watcher，用于this.$watch中
 *eg:{'name':function(){},'admin.name':function(){}},如果传入了path = formValue,则为{'formValue.name':function(){},'formValue.admin.name':function(){}}
 * @param {*Array} fields
 * @param {*Object} formValue
 * @param {*String} path 上级的取值路径
 */
export function initDependence(fields, formValue, path = "", vm) {
  let watcher = {};
  fields.forEach(field => {
    if (field.rely) {
      initWatcher(watcher, field, formValue, fields, path, vm);
    }
    if (field.options && _.isArray(field.options)) {
      //如果含有options，则表示该字段为选择类型（如，select，radio，checkbox等），如果选项存在rely字段，则对其所依赖的字段进行监听
      field.options.forEach(option => {
        if (option.rely) {
          initWatcher(watcher, option, formValue, fields, path, vm);
        }
      });
    }
    //下面是递归watch的逻辑，返回通过'.'连接的多层字符串，实现对对象深层的监听，例如： 'user.childInfo.age':{handler：function(){}，options：{}}，目前暂时没用到，
    //  else if (hasSubform(field)) {
    //   let subFields = getSubFields(field);
    //   watcher = {
    //     ...watcher,
    //     ...initDependence(subFields, formValue, field.name + ".data")
    //   };
    // }
  });
  return watcher;
}

function initWatcher(watcher, fieldOrOption, formValue, fields, path, vm) {
  let rely = fieldOrOption.rely;
  let deps = rely.fields;
  let extraValueCatch = [];
  deps.forEach(dep => {
    // if (!findFieldByKey(fields, dep)) {
    //   return console.warn(
    //     `not find the dependent field '${dep}' during the resloving of '${
    //       field.name
    //     }', please make sure it exist`
    //   );
    // }
    let key = path ? path + "." + dep : dep;
    let oldWatcherHandler;
    if (watcher[key]) {
      //多个字段，依赖用一个字段时，合并其回调方法
      oldWatcherHandler = watcher[key].handler;
    }

    if (isClientOtherDepField(dep)) {
      //如果依赖的字段值在传入的value属性中（从value属性传入的值，不一定是该表单的值，还可以是其它表单的值）
      return vm.$emit("on-load-client-field-value", dep, extraValue => {
        extraValueCatch.push(extraValue);
        dependentHandle(
          fieldOrOption,
          formValue,
          oldWatcherHandler,
          extraValue
        );
      });
    }
    if (isClientExtraOtherDepField(dep)) {
      //如果依赖的字段值在传入的extra属性中(extra格式不同于本组件表单值，而是一个普通键值对格式的对象)
      return vm.$emit("on-load-client-extra-field-value", dep, extraValue => {
        extraValueCatch.push(extraValue);
        dependentHandle(
          fieldOrOption,
          formValue,
          oldWatcherHandler,
          extraValue
        );
      });
    }
    if (isRemoteDepField(dep)) {
      //如果依赖的字段值在远程服务器上
      return vm.$emit("on-load-remote-field-value", dep, extraValue => {
        extraValueCatch.push(extraValue);
        dependentHandle(
          fieldOrOption,
          formValue,
          oldWatcherHandler,
          extraValue
        );
      });
    }
    watcher[key] = {
      handler() {
        if (extraValueCatch.length > 0) {
          dependentHandle(
            fieldOrOption,
            formValue,
            oldWatcherHandler,
            Object.assign(...extraValueCatch)
          );
        } else {
          dependentHandle(fieldOrOption, formValue, oldWatcherHandler);
        }
      },
      options: {
        immediate:
          "visibility" in rely ? true : rely.immediate == true ? true : false
      }
    };
  });
}

/**
 *
 * @param {*Object} vm vue组件实例
 * @param {*Array} fields 表单字段配置
 * @param {*String} formValueKey 指定vm中存放最终值的键名
 * @param {*Number} row（可选） 行号，如果最终值允许多条数据（即最终值是一个数组），则需要传入row，指定行
 */
export function addDependent(vm, fields, formValueKey, row) {
  let watcher, singleFormValue, watchFun;
  if (_.isNumber(row)) {
    singleFormValue = vm[formValueKey][row];
    watchFun = function(key) {
      return function() {
        return eval(`this.${formValueKey}[${row}].${key}`);
      };
    };
  } else {
    singleFormValue = vm[formValueKey];
    watchFun = function(key) {
      return function() {
        return eval(`this.${formValueKey}.${key}`);
      };
    };
  }
  watcher = initDependence(fields, singleFormValue, "", vm);
  vm.watchers = vm.watchers || []; //用来存放解除watch的方法
  let watchers = [];
  for (let i in watcher) {
    let { handler, options } = watcher[i];
    watchers.push(vm.$watch(watchFun(i), handler, options));
  }
  vm.watchers.push(watchers);
}
//目前删除都是整条数据的删除，解除最顶层表格对某行的watch即可完成对该条记录的深层watch（深层watch,即子表的watch，在实例注销时会自动解除）
/**
 *解除vue实例对多行表单值中某行的watch
 * @param {*vue instence} vm
 * @param {*Number} row 行号，用来指定要解除watch的行
 */
export function unWacthRow(vm, row) {
  let toDeleteRowWatchers = vm.watchers[row];
  toDeleteRowWatchers.forEach(unWatch => {
    unWatch();
  });
  vm.watchers.splice(row, 1);
}

/**watchers 二维数组，用来存放每行的多个解除watch的数组
 *减少一行watchers，在删除一行后，直接去掉watchers中最后一项（这里不用指定行号，每个表格对每行的watch规则是一样的，只需要去掉watchers最后一项即可）
 * @param {*vue instence} vm
 * @param {*Number} row 行号，用来指定要解除watch的行
 */
export function unWacthLastRow(vm, row) {
  let lastRow = vm.watchers.length - 1;
  unWacthRow(vm, lastRow);
}
