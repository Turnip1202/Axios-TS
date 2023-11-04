import axios from "../../src/index";

// axios({
//   method: "get",
//   url: "/base/get",
//   params: {
//     foo: ["bar", "baz"]
//   }
// });

// axios({
//   method: "get",
//   url: "/base/get",
//   params: {
//     //注意Firefox浏览器会自动解析
//     foo: {
//       bar: "baz"
//     }
//   }
// });

// const date = new Date();

// axios({
//   method: "get",
//   url: "/base/get",
//   params: {
//     date
//   }
// });

// axios({
//   method: "get",
//   url: "/base/get",
//   params: {
//     foo: "@:$, "
//   }
// });

// axios({
//   method: "get",
//   url: "/base/get",
//   params: {
//     foo: "bar",
//     baz: null
//   }
// });

// axios({
//   method: "get",
//   url: "/base/get#hash",
//   params: {
//     foo: "bar"
//   }
// });

// axios({
//   method: "get",
//   url: "/base/get?foo=bar",
//   params: {
//     bar: "baz"
//   }
// });

// axios({
//   method: "post",
//   url: "/base/post",
//   //注意：若这里没有设置Headers，会使得服务端无法正确解析发送过去的数据
//   data: {
//     a: 1,
//     b: 2
//   }
// });

// const arr = new Int32Array([21, 31]);

// axios({
//   method: "post",
//   url: "/base/buffer",
//   data: arr
// });
// axios({
//   method: "post",
//   url: "/base/post",
//   data: {
//     a: 1,
//     b: 3
//   }
// });

// axios({
//   method: "post",
//   url: "/base/post",
//   headers: {
//     "content-type": "application/json;charset=utf-8"
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// });

// const paramsString = "q=URLUtils.searchParams&topic=api";
// const searchParams = new URLSearchParams(paramsString);

// axios({
//   method: "post",
//   url: "/base/post",
//   data: searchParams
// });
axios({
  method: "post",
  url: "/base/post",
  data: {
    a: 1,
    b: 2
  }
}).then((res: any) => {
  console.log(res);
});
axios({
  method: "post",
  url: "/base/post",
  responseType: "json",
  data: {
    a: 3,
    b: 4
  }
}).then((res: any) => {
  console.log(res);
});
