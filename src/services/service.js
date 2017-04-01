import request from '../utils/request';

//用于fetch的post提交，如果请求中含有文件，首先修改headers头部中给的content-type，其次，body中可以使用FormData来填充数据
export function search(values) {
  return request('http://localhost:8888/day21kick/servlet/Data', {
    method: 'POST',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "some="+values.some+"&email="+values.email+"&website="+values.website,
  });
}
