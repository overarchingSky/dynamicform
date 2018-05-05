import { findFieldByKey, hasSubform, getSubFields } from "../utils";
/**
 *复制字段的定义，添加到当前表单或指定表单（可以是子表单，即含有fields字段的字段）字段的最后一项，
 * @param {Object} srcOptions 当前表单配置
 * @param {String} key 字段名称
 * @param {Object} targetOptions 指定的表单或子表单配置
 */
export function copyField(srcOptions, key, targetOptions) {
  if (hasSubform(srcOptions)) {
    let srcFields = getSubFields(srcOptions);
    let srcFieldOption = findFieldByKey(srcFields, key);
    let copyFieldOption = JSON.parse(JSON.stringify(srcFieldOption));
    copyFieldOption.name = "field_" + Date.now();
    if (targetOptions) {
      if (hasSubform(targetOptions)) {
        let targetFields = getSubFields(targetOptions);
        targetFields.push(copyFieldOption);
      } else {
        console.warn(
          `can't copy field,because the params targetOptions doesn't has fields`
        );
      }
    } else {
      srcFields.push(copyFieldOption);
    }
  } else {
    console.warn(
      `can't copy field,because the params srcOptions doesn't has fields`
    );
  }
}

/**
 *从表单定义中删除指定key的字段定义
 * @param {Object} srcOptions
 * @param {*String} key
 */
export function deleteField(srcOptions, key) {
  if (hasSubform(srcOptions)) {
    let fields = getSubFields(srcOptions);
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (field.name == key) {
        fields.splice(i, 1);
        return;
      }
      if (hasSubform(field)) {
        return deleteField(field, key);
      }
    }
  } else {
    console.warn(
      `can't delete field,because the params srcOptions doesn't has fields`
    );
  }
}

export function createNewForm(options) {
  let newForm = {
    title: "新建表单",
    version: 1,
    multiple: false,
    fields: []
  };
  options.push(newForm);
}

export function createNewField(fields, payload) {
  let newField = {
    name: "field_" + Date.now(),
    label: "",
    type: "any",
    enAbleLabel: false,
    ...payload
  };
  fields.push(newField);
}
