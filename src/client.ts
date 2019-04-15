const urllib = require('urllib');
const HttpClient = urllib.HttpClient2;

const client = new HttpClient();

export async function SendNewZhihuRequest(url: string) {
  return client.request(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
      'Host': 'zhuanlan.zhihu.com',
      'Referer': 'https://zhuanlan.zhihu.com/',
    },
    dataType: 'json',
  })
}
