// 包含n个接口请求函数的模块
// 函数的返回值: promise对象

import ajax from './ajax'
const B_URL = '/api'
// const B_URL = 'http://localhost:3000'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${B_URL}/position/${geohash}`);
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(B_URL + '/index_category');
// 3、根据经纬度获取商铺列
export const reqShops = (latitude, longitude) => ajax(B_URL + '/shops', {latitude, longitude});
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(B_URL + '/search_shops', {geohash, keyword});
// 6、用户名密码登陆
export const reqPwdLogin = (name, pwd, captcha) => ajax(B_URL + '/login_pwd',{name, pwd, captcha},'POST');
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(B_URL + '/sendcode', {phone});
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(B_URL + '/login_sms',{phone, code},'POST');
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(B_URL + '/userinfo');
// 10、用户登出
export const reqLogout = () => ajax(B_URL + '/logout');

// 获取商家信息
export const reqShopInfo = () => ajax('/info');

// 获取上家评价数组
export const reqShopRatings = () => ajax('/ratings');

// 获取商家商品数组
export const reqShopGoods = () => ajax('/goods');
