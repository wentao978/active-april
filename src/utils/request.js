require('es6-promise').polyfill();
require('isomorphic-fetch');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// 以同步的方式书写异步代码，await是同步阻塞代码，返回后根据response执行相对于的代码
export default async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  return await response.json();   
}
	