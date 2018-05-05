import { getParentComponent } from "./utils";

//store.set(this.$attrs.uid, "formValue", this.formValue);

const store = {};

/**
 *获取表单实例中的数据
 * @param {*vue instence} vm
 */
export function get(uid, key) {
  if (!store[uid]) {
    return set(uid, key, []);
  } else {
    console.log("uid", store, uid);
    return store[uid][key];
  }
}

/**
 *在vue原型上的$df字段上添加指定key，并复制
 * @param {*vue instence} vm
 * @param {*String} key
 * @param {*Any} value
 */
export function set(uid, key, value) {
  if (store[uid]) {
    store[uid][key] = value;
  } else {
    store[uid] = {
      [key]: value
    };
  }
  return store[uid][key];
}

export default {
  set,
  get
};
