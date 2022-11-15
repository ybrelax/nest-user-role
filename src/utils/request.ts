import axios from 'axios';
const BaseUrl = '';

interface ParamType {
  method: 'post' | 'get';
  url: string;
  data: any;
}

const request = (param: ParamType): Promise<any> => {
  let url = param.url;
  if (param.url.indexOf('http') < 0) {
    url = BaseUrl + param.url;
  }

  if (param.method === 'post') {
    // POST request
    return axios(url, {
      data: param.data,
      method: param.method,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res: any) => {
        if (
          (res.status && res.status >= 500) ||
          (typeof res.data.code !== 'undefined' && res.data.code !== 200 && res.data.code !== 0)
        ) {
          throw new Error(
            JSON.stringify({
              ...res,
              url,
              params: param.data,
            }),
          );
        }
        return res?.data?.data ?? res?.data ?? res;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  } else if (param.method === 'get') {
    // GET request
    const dataArray = param.data ? Object.keys(param.data) : [];
    dataArray.forEach((key: string, index: number) => {
      index === 0 && (url = url + '?');
      const isChineses = (str: string) => {
        if (escape(str).indexOf('%u') < 0) {
          return false;
        } else {
          return true;
        }
      };
      let textParam = param.data[key];
      textParam = isChineses(textParam) ? encodeURIComponent(textParam) : textParam;
      url = url + key + '=' + textParam + '&';
      index === dataArray.length - 1 && (url = url.slice(0, -1));
    });
    return axios(url, {
      method: param.method,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.data || res;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error;
      });
  }
};

export default request;
