/*
这个文件是utils文件夹内所有工具方法的集合
可以直接引用这个文件
也可以分别引用其他各模块文件

所有的方法见文件末尾
*/
import Vue from 'vue'
import $router from './router/index'

/**
 * [goTo 页面跳转]
 * @Author   
 * @DateTime 2018-12-04
 * @param    {[String]}   path  [要跳转的路径]
 * @param    {[String | Object ]}   query [携带的参数]
 * @param    {[Boolean ]}   replace [是否是替换当前路由]
 * @return   {[type]}         [description]
 */
Vue.prototype.goTo = function(path,query,replace = false) {
  if(!path) return;

  if(!query) {
    replace ? $router.replace(path) : $router.push(path);
    return;
  }

  //有参数，判断是字符串还是对象
  let type = kindOf(query);

  if( !['string','object','Object'].includes(type)) {
    console.error('跳转参数错误，只能是字符串或对象')
    return;
  }

  let extQuery = query;

  if(type == 'string') {
    if(query.indexOf('=') == -1) {
      console.error('跳转参数错误，字符串必须是a=b&c=d形式')
      return 
    }

    extQuery = {};
    let arr = query.split('&');
    arr.forEach(item => {
      let [ key, value ] = item.split('=');
      extQuery[key] = value
    });
  }

  let option = {
    path,
    query:extQuery
  }

  replace ? $router.replace(option) : $router.push(option);
}

/** ------------------------  Object  -------------------------- */

/**
 * [pick 从对象中取出特定项，返回新对象]
 * @Author   
 * @DateTime 2018-09-28
 * @param    {[Object]}   obj        [目标对象]
 * @param    {[Array]}   filtersArr [要筛选的键数组]
 * @return   {[type]}              [description]
 */
Vue.prototype.pick = function(obj,keysArr) {
  let newObj = {};

  keysArr.forEach(key => {
    newObj[key] = obj[key];
  })

  return newObj;
}


/** ------------------------  String  -------------------------- *


/**
 * [getBLen 获取字符串length，中文占两个字符]
 * @Author   
 * @DateTime 2018-09-30
 * @param    {[String]}   str [要计算的字符串]
 * @return   {[type]}       [description]
 */
Vue.prototype.getLen = function(str) { 
  if (!str) return 0;  
  if (typeof str != "string"){    
    str += "";  
  } 

  let strLen = str.length;
  let chinese = str.match(/[\u4e00-\u9fa5]/g);
  let chineseLen = ( chinese && chinese.length ) || 0;

  return strLen + chineseLen;
  // return str.replace(/[^\u4e00-\u9fa5]/g,"01").length;
}

/**
 * [getSliceStr 剪切字符串，需要计算中文长度]
 * @Author   
 * @DateTime 2018-09-30
 * @return   {[type]}   [description]
 */
Vue.prototype.getSliceStr = function(str,len) {
  let sum = 0;
  for (let i = 0 ; i < str.length ; i ++) {
    var c = str.charCodeAt(i);     //单字节加1      
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
      //单字节   
      sum ++;
    } else { 
      //双字节
      sum += 2;
    } 

    if( sum > len) {
      return str.slice(0,i);
      break;
    }
  }
}

/**
 * [getSliceStr 生成指定长度随机字符串]
 * @Author   
 * @DateTime 2018-09-30
 * @param    {[Number]}   len [指定长度]
 * @return   {[type]}   [description]
 */
Vue.prototype.randomStr = function(len) {
  var preinstallStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-$';
  var str = '';

  for(var i = 0 ; i < len ; i ++) {
     var random = Math.ceil(Math.random() * 64);
     str += preinstallStr[random];
  }

  return str
}


/** ------------------------  Date  -------------------------- *


/**
 * 时间格式化  
 * @function
 * @name Lizard.dateFormat
 * @param {date|string} date 日期
 * @return {string}
 * @example
 // 2015-04-14 00:00
 Lizard.dateFormat('2015/04/14', 'yyyy-mm-dd HH:MM')
 // 04-22 周五
 Lizard.dateFormat(_.now(), 'mm-dd 周C')
 */

var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWNC]|'[^']*'|'[^']*'/g;
    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g;

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc, gmt) {

      // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
      if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
        mask = date;
        date = undefined;
      }

      date = date || new Date;

      if(!(date instanceof Date)) {
        date = new Date(date);
      }

      if (isNaN(date)) {
        throw TypeError('Invalid date');
      }

      mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);

      // Allow setting the utc/gmt argument via the mask
      var maskSlice = mask.slice(0, 4);
      if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
        mask = mask.slice(4);
        utc = true;
        if (maskSlice === 'GMT:') {
          gmt = true;
        }
      }

      var _ = utc ? 'getUTC' : 'get';
      var d = date[_ + 'Date']();
      var D = date[_ + 'Day']();
      var m = date[_ + 'Month']();
      var y = date[_ + 'FullYear']();
      var H = date[_ + 'Hours']();
      var M = date[_ + 'Minutes']();
      var s = date[_ + 'Seconds']();
      var L = date[_ + 'Milliseconds']();
      var o = utc ? 0 : date.getTimezoneOffset();
      var W = getWeek(date);
      var N = getDayOfWeek(date);
      var flags = {
        d:    d,
        dd:   pad(d),
        ddd:  dateFormat.i18n.dayNames[D],
        dddd: dateFormat.i18n.dayNames[D + 7],
        m:    m + 1,
        mm:   pad(m + 1),
        mmm:  dateFormat.i18n.monthNames[m],
        mmmm: dateFormat.i18n.monthNames[m + 12],
        yy:   String(y).slice(2),
        yyyy: y,
        h:    H % 12 || 12,
        hh:   pad(H % 12 || 12),
        H:    H,
        HH:   pad(H),
        M:    M,
        MM:   pad(M),
        s:    s,
        ss:   pad(s),
        l:    pad(L, 3),
        L:    pad(Math.round(L / 10)),
        t:    H < 12 ? 'a'  : 'p',
        tt:   H < 12 ? 'am' : 'pm',
        T:    H < 12 ? 'A'  : 'P',
        TT:   H < 12 ? 'AM' : 'PM',
        Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
        o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
        W:    W,
        N:    N,
        C: ['日','一', '二', '三', '四', '五', '六', '日'][N]
      };

      return mask.replace(token, function (match) {
        if (match in flags) {
          return flags[match];
        }
        return match.slice(1, match.length - 1);
      });
    };
};

  dateFormat.masks = {
    'default':               'ddd mmm dd yyyy HH:MM:ss',
    'shortDate':             'm/d/yy',
    'mediumDate':            'mmm d, yyyy',
    'longDate':              'mmmm d, yyyy',
    'fullDate':              'dddd, mmmm d, yyyy',
    'shortTime':             'h:MM TT',
    'mediumTime':            'h:MM:ss TT',
    'longTime':              'h:MM:ss TT Z',
    'isoDate':               'yyyy-mm-dd',
    'isoTime':               'HH:MM:ss',
    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
  };

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

/**
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 *
 * @param  {Object} `date`
 * @return {Number}
 */
function getWeek(date) {
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occured and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 * 
 * @param  {Object} `date`
 * @return {Number}
 */
function getDayOfWeek(date) {
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}

/**
 * kind-of 判断一个变量的类型
 * @param  {*} val
 * @return {String}
 */
function kindOf(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
}


Vue.prototype.dateFormat = dateFormat();


/** ------------------------  其他  -------------------------- */

//触底事件
Vue.prototype.onReachBottom = function(callback) {
  window.onscroll = function() {
    if(getScrollHeight() == getWindowHeight() + getDocumentTop()){
      callback();
    }
  }
}

//文档高度
function getDocumentTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;    return scrollTop;
}
//可视窗口高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
//滚动条滚动高度
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;    return scrollHeight;
}


// let utils = {
//   //object操作
//   pick,  //从对象中取出特定项，返回新对象
//   // goTo,    // 跳转页面
//   //字符串操作
//   getLen,  //获取字符串字节数，中文占两个字符
//   getSliceStr, //剪切字符串，需要计算中文长度
//   randomStr, //生成指定长度随机字符串
//   //Date日期操作
//   dateFormat:dateFormat(), //格式化日期 dateFormat('2015/04/14', 'yyyy-mm-dd HH:MM')
//   onReachBottom, //滚动触底事件
// }

// export default utils