import axios from "axios";
function fetch(url, mothed, params, orgin = false) {
  return new Promise((resolve, reject) => {
    request(
      url,
      mothed,
      params,
      true,
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      },
      orgin
    );
  });
}

/**
 * 获取指定名称的选项组
 * @param {String} url
 * @param {String} optionsName
 */
function getOptions(url, optionsName) {
  //transfer版本
  return axios({
    method: "POST",
    url: "/transfer",
    data: {
      method: "GET",
      params: {
        name: optionsName
      },
      path: url
    }
  });
}
// function getOptions(url, optionsName) {
//   return axios({
//     method: "get",
//     url: url,
//     params: {
//       name: optionsName
//     }
//   });
// }

/**
 * 添加选项到指定名称的选项组
 * @param {String} url
 * @param {String} optionsName 选项组的名称
 * @param {Object} optionCinfig 要添加的选项定义
 */
function addOptions(path, optionsName, optionCinfig) {
  //transfer版本
  return axios({
    method: "post",
    url: "/transfer",
    data: {
      method: "post",
      params: {
        body: optionCinfig.map(item => ({
          name: optionsName,
          ...item
        })),
        _request_content_type: "body"
      },
      path
    }
  });
}
// function addOptions(url, optionsName, optionCinfig) {
//   return axios({
//     method: "post",
//     url: url,
//     data: {
//       name: optionsName,
//       ...optionCinfig
//     }
//   });
// }

export default {
  add: addOptions,
  get: getOptions
};
