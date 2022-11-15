import request from 'src/utils/request';

const wechatPrefix = 'https://api.weixin.qq.com';
// 根据微信用户信息
export const getWechatUserInfo = (data?: any) =>
  request({
    url: wechatPrefix + '/sns/userinfo',
    method: 'get',
    data,
  });

export const getWechatAccessToken = (data?: any) =>
  request({
    url: wechatPrefix + '/sns/oauth2/access_token',
    method: 'get',
    data,
  });
