import request from "@/router/axios";

/**
 * 文件流返回
 * @param url 接口地址
 * @param params 接口参数
 */
export const exportBlob = (url, params) => {
  debugger
  return request({
    url: url,
    params: params,
    method: 'get',
    responseType: 'blob'
  })
}
