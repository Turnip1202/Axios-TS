const toString = Object.prototype.toString
//判断是否为Date类型，这里使用了类型谓词，即知参数val为Date类型
export function isDate(val: any): val is Date {
  //  return val instanceof Date;
  return toString.call(val) === '[object Date]'
}

//判断是否是继承自Object类型
export function isObject(val: any): val is Object {
  // return val instanceof Object;
  return val !== null && typeof val === 'object'
}

// 判断是否是普通对象
export function isPlainObject(val: any): val is Object {
  // return typeof val === "object" && val !== null && !Array.isArray(val);
  return toString.call(val) === '[object Object]'
}

// 对象混入(把from的属性及值混入to),交叉类型，类型断言
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(<T & U>to)[key] = from[key] as any
  }
  return <T & U>to
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) result[key] = deepMerge(result[key], val)
          else result[key] = deepMerge({}, val)
        } else return (result[key] = val)
      })
    }
  })
  return result
}
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}
