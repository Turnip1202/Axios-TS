import { Method } from '../types'
import { deepMerge, isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // 对Content-Type属性名格式化
  normalizeHeaderName(headers, 'Content-Type')
  // console.log(data);

  // 设置Content-Type默认属性值
  if (isPlainObject(data)) {
    /**
     * 注意这里浏览器控制台的打印效果并不是实时的
     * 所以当不传入Headers时，此时headers["Content-Type"]是undefined
     */

    //console.log(Object.keys(headers), headers, headers["Content-Type"]);

    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed
  // console.log(headers);
  //这里使用\r\n更通用一些
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers
  headers = deepMerge(headers?.common, headers[method], headers)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => delete headers[method])
  return headers
}
