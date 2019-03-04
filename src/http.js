/**
 * 统一配置axios
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
//整个大项目的api地址
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import { 
//   MessageBox,
//  } from 'mint-ui';

// axios 配置
axios.defaults.timeout = 5000;

//测试环境
// let apiUrl = 'https://api.novenblog.xin';
//生产环境
// let apiUrl = 'https://api.novenblog.xin';
// axios.defaults.baseURL = apiUrl;

// console.log(process.env.API_ROOT);
axios.defaults.baseURL = process.env.API_ROOT;
// Vue.prototype.baseURL = process.env.API_ROOT;// main.js

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// http request 拦截器
axios.interceptors.request.use(
    config => {
      config.headers.appCode = 3;
      // 如果方法为get，这里对get所有的额外操作
      if(config.method  === 'get'){
        
      }
      // 如果方法为post，使用qs.stringify实现跨域访问
      if(config.method  === 'post'){
        //下面这句话是必须的
        config.data = qs.stringify(config.data);
      }

      return config;
    },
    err => {
      return Promise.reject(err);
    });

// http response 拦截器
/**
 * 
 * 拦截器也可以判定返回的response成功时的状态码进行拦截
 */
axios.interceptors.response.use(
    res => {
    //res是服务器返回的数据，这里可以统一拦截，返回给业务使用
    
    return res.data;
  },
  error => {
    //ajax出错，比如500之类的，会进入到这里
    return Promise.reject('异常错误');
});

export default axios