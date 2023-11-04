import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) return JSON.stringify(data)
  return data
}

//判断字符串里是否有空值

export function transformResponse(data: any): any {
  //在处理服务器返回来的数据时，有可能会出现空字符的情况
  if (data !== '' && typeof data === 'string')
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log('数据转换失败', e)
    }
  return data
}
