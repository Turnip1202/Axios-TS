// 类型
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'
// 库
import { extend } from './helpers/util'
import Axios from './core/Axios'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config) //产生对象，获取(get、post等)静态方法
  const instance = Axios.prototype.request.bind(context) //产生函数
  extend(instance, context) //将对象上的方法挂载到函数上
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = config => createInstance(mergeConfig(defaults, config))
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
export default axios
