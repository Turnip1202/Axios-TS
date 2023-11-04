import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'
import { isAbsoluteURL, combineURL } from '../helpers/url'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  thorwIfCancellationRequested(config)
  // 重写config用以格式化发送给服务端的配置(方法、数据、报文等)
  processConfig(config)
  // 这里有一个js的小知识：then函数也返回一个Promise
  return xhr(config).then(res =>
    //处理响应数据
    transformResponseData(res)
  )
}
function processConfig(config: AxiosRequestConfig): void {
  /**
   * 1.格式化url
   * 2.写入默认的headers的Content-Type
   * 3.尝试对data进行JSON字符串解析
   */

  config.url = transformURL(config)
  // Headers要早于data
  // config.headers = transformHeaders(config);
  // config.data = transformRequestData(config);
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
export function transformURL(config: AxiosRequestConfig): string {
  // return buildURL(<string>url, params);
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

function transformRequestData(config: AxiosRequestConfig): any {
  // 如果是普通对象，则将对象变为字符串
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  //当data为对象时，给headers加上Content-Type:application/json;charset=utf-8
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  //尝试对data进行JSON字符串解析
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
function thorwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
