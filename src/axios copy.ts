// 类型
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosInstance } from './types'
// 库
import xhr from './core/xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { extend } from './helpers/util'
//函数命名本身最好的注释
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res)) //xhr返回的是一个Promise
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // Headers要早于data
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(<string>url, params)
}
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
