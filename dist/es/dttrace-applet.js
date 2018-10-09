
  /*!
   * dttrace-applet-sdk v1.0.0
   * (c) 2018-2018 Rui Chengping
   */
function warning(message) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {}
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) return false;

  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

var options = {
  appKey: '',
  server: 'https://log.dtstack.net:7001',
  code2SessionUrl: 'https://api.weixin.qq.com/sns/jscode2session',
  appletId: '',
  appletSecret: ''
};

var get$1 = function get$$1(name) {
  if (name) {
    return options[name];
  } else {
    return options;
  }
};

var set$1 = function set$$1(newOption) {
  if (isPlainObject(newOption)) {
    return _extends(options, newOption);
  } else {
    warning("Expected the argument to be a plain object");
  }
};
var options$1 = {
  get: get$1,
  set: set$1
};

function createRandomString(length) {
  var str = '';
  while (length > 0) {
    var fragment = Math.random().toString(16).substring(2);
    if (length > fragment.length) {
      str += fragment;
      length -= fragment.length;
    } else {
      str += fragment.substring(0, length);
      length = 0;
    }
  }
  return str;
}

function uuid() {
  return createRandomString(8) + '-' + createRandomString(4) + '-' + createRandomString(4) + '-' + createRandomString(4) + '-' + createRandomString(12);
}

//SDK预置参数
var defaultParams = {
  $DTTID: uuid()
  //用户自定义参数
};var customParams = {};

//获取系统信息
function getSystemInfo() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      brand = _wx$getSystemInfoSync.brand,
      model = _wx$getSystemInfoSync.model,
      pixelRatio = _wx$getSystemInfoSync.pixelRatio,
      screenWidth = _wx$getSystemInfoSync.screenWidth,
      screenHeight = _wx$getSystemInfoSync.screenHeight,
      windowWidth = _wx$getSystemInfoSync.windowWidth,
      windowHeight = _wx$getSystemInfoSync.windowHeight,
      statusBarHeight = _wx$getSystemInfoSync.statusBarHeight,
      system = _wx$getSystemInfoSync.system,
      language = _wx$getSystemInfoSync.language,
      version = _wx$getSystemInfoSync.version,
      platform = _wx$getSystemInfoSync.platform,
      fontSizeSetting = _wx$getSystemInfoSync.fontSizeSetting,
      SDKVersion = _wx$getSystemInfoSync.SDKVersion,
      benchmarkLevel = _wx$getSystemInfoSync.benchmarkLevel;

  return {
    $device_model: model,
    $brand: brand,
    $pixel_ratio: pixelRatio,
    $screen_width: screenWidth,
    $screen_height: screenHeight,
    $window_width: windowWidth,
    $window_height: windowHeight,
    $status_bar_height: statusBarHeight,
    $os: system.split(' ')[0],
    $os_version: system.split(' ')[1],
    $language: language,
    $wx_version: version,
    $platform: platform,
    $font_size_setting: fontSizeSetting,
    $wx_sdk_version: SDKVersion,
    $bench_mark_level: benchmarkLevel
  };
}

var get$2 = function get$$1(name) {
  var currentParams = _extends({}, defaultParams, getSystemInfo(), customParams);
  if (name) {
    return currentParams[name];
  } else {
    return currentParams;
  }
};

var set$2 = function set$$1(newParams) {
  if (isPlainObject) {
    _extends(customParams, newParams);
  } else {
    warning('Expected argument to be an object');
  }
};

var params = {
  get: get$2,
  set: set$2
};

function http(method, url, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: method,
      data: data,
      success: function success(res) {
        return resolve(res);
      },
      fail: function fail(err) {
        return reject(err.errMsg);
      }
    });
  });
}

var http$1 = {
  post: function post(url, data) {
    return http('post', url, data);
  },
  get: function get(url, data) {
    return http('get', url, data);
  }
};

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
function b64_md5(s) {
  return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}
function str_md5(s) {
  return binl2str(core_md5(str2binl(s), s.length * chrsz));
}
function hex_hmac_md5(key, data) {
  return binl2hex(core_hmac_md5(key, data));
}
function b64_hmac_md5(key, data) {
  return binl2b64(core_hmac_md5(key, data));
}
function str_hmac_md5(key, data) {
  return binl2str(core_hmac_md5(key, data));
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16),
      opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
  }return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < bin.length * 32; i += chrsz) {
    str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
  }return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
  var hex_tab = "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
    }
  }
  return str;
}

var md5 = {
  hex_md5: hex_md5,
  b64_md5: b64_md5,
  str_md5: str_md5,
  hex_hmac_md5: hex_hmac_md5,
  b64_hmac_md5: b64_hmac_md5,
  str_hmac_md5: str_hmac_md5
};

var hex_md5$1 = md5.hex_md5;

//检测是否为undefined、null、空字符串
function isNone(arg) {
  return arg === undefined || arg === null || arg === '';
}

//获取openid和unionid
function code2SessionTrace(_ref) {
  var appid = _ref.appid,
      appSecret = _ref.appSecret,
      code2SessionUrl = _ref.code2SessionUrl;

  return new Promise(function (resolve, reject) {
    wx.login({
      timeout: 1000,
      success: function success(loginResponse) {
        var code = loginResponse.code;

        console.log(code);
        wx.request({
          url: code2SessionUrl,
          data: {
            appid: appid,
            appSecret: appSecret,
            js_code: code,
            grant_type: 'authorization_code'
          },
          success: function success(sessionResponse) {
            return resolve(sessionResponse);
          },
          fail: function fail(err) {
            return reject(err);
          }
        });
      },
      fail: function fail(err) {
        return reject(err);
      }
    });
  });
}

//检验必填参数
function checkRequiredConfig(config) {
  var flag = true;
  var appKey = config.appKey,
      appletId = config.appletId,
      appletSecret = config.appletSecret;

  if (isNone(appKey)) {
    warning('Expected the appKey to not be undefined or null or null character string');
    flag = false;
  } else if (isNone(appletId)) {
    warning('Expected the appletId to not be undefined or null or null character string');
    flag = false;
  } else if (isNone(appletSecret)) {
    warning('Expected the appletSecret to not be undefined or null or null character string');
    flag = false;
  }
  return flag;
}

var Dttrace = function () {
  function Dttrace(config) {
    classCallCheck(this, Dttrace);

    this.options = options$1;
    this.params = params;
    if (checkRequiredConfig(config)) {
      var appKey = config.appKey,
          server = config.server,
          appletId = config.appletId,
          appletSecret = config.appletSecret;

      var newOptions = {
        appKey: appKey,
        appletId: appletId,
        appletSecret: appletSecret
      };
      if (server) this.options.set('server', server);
      //全局参数
      if (config.params !== undefined) {
        if (isPlainObject(config.params)) {
          this.params.set(config.params);
        } else {
          warning('Expected the params in config to be an object');
        }
      }
      //设置DTTID
      if (wx.getStorageSync('$DTTID') === '') {
        wx.setStorageSync('$DTTID', uuid());
      }
      this.options.set(newOptions);
    }
  }

  createClass(Dttrace, [{
    key: 'launchRocket',
    value: function launchRocket(eventId, otherParams) {
      var _this = this;

      if (typeof eventId !== 'number') throw new Error('Expected the first argument to be a number');

      var _options$get = this.options.get(),
          server = _options$get.server,
          appKey = _options$get.appKey;

      var defaultParams = this.params.get();
      var timestamp = new Date().getTime();

      new Promise(function (resolve, reject) {
        var openid = _this.params.get('$open_id');
        var unionid = _this.params.get('$union_id');
        console.log(_this.params.get());

        if (isNone(openid) || isNone(unionid)) {
          //获取openid和unionid
          code2SessionTrace({
            appid: _this.options.get('appletId'),
            appSecret: _this.options.get('appletSecret'),
            code2SessionUrl: _this.options.get('code2SessionUrl')
          }).then(function (response) {
            var openid = response.openid,
                unionid = response.unionid;

            _this.params.set({
              $open_id: openid,
              $union_id: unionid
            });
            resolve();
          }).catch(function (err) {
            return reject(err);
          });
        } else {
          resolve();
        }
      }).then(function () {
        wx.getNetworkType({
          success: function success(res) {
            if (res.networkType !== 'none') {
              var finalParams = _extends({}, defaultParams, otherParams, {
                $timestamp: timestamp,
                $token: hex_md5$1(appKey + timestamp.toString()),
                $network_type: res.networkType,
                $event_id: eventId
              });
              console.log(finalParams);
              http$1.post(server, finalParams).then(function (res) {
                var success = res.success,
                    message = res.message;

                if (!success) warning(message);
              });
            } else {
              warning('Network Error');
            }
          }
        });
      }).catch(function (err) {
        warning(err.message);
      });
    }
  }]);
  return Dttrace;
}();

function autoPageTrace(module, dttrace) {
  if (typeof dttrace === 'string' || dttrace instanceof Dttrace) {
    var pageEnterTime = void 0,
        $url_path = void 0,
        $referrer = void 0,
        $query = void 0;
    var oldLoadHandler = module.onLoad;
    var oldShowHanler = module.onShow;
    var oldHideHanler = module.onHide;

    module.onLoad = function (query) {
      var pages = getCurrentPages();
      $query = query;
      $url_path = pages[pages.length - 1].route;
      $referrer = pages.length > 1 ? pages[pages.length - 2].route : '直接打开';
      typeof oldLoadHandler === 'function' && oldLoadHandler.apply(this, arguments);
    };
    module.onShow = function () {
      var instance = typeof dttrace === 'string' ? this[dttrace] : dttrace;
      pageEnterTime = new Date().getTime();
      instance.launchRocket(3001, {
        $query: $query,
        $url_path: $url_path,
        $referrer: $referrer,
        $enter_time: pageEnterTime
      });
      typeof oldShowHanler === 'function' && oldShowHanler.apply(this, arguments);
    };
    module.onHide = function () {
      var instance = typeof dttrace === 'string' ? this[dttrace] : dttrace;
      var pageLeaveTime = new Date().getTime();
      instance.launchRocket(3002, {
        $url_path: $url_path,
        $referrer: $referrer,
        $enter_time: pageEnterTime,
        $leave_time: pageLeaveTime,
        $stay_time: pageLeaveTime - pageEnterTime
      });
      typeof oldHideHanler === 'function' && oldHideHanler(arguments);
    };
  } else {
    warning('Expected the second argument to be a string or an instance of Dttrace');
  }
  return module;
}

var appEnterTime = void 0;
function autoAppTrace(module, dttrace) {
  if (typeof dttrace === 'string' || dttrace instanceof Dttrace) {
    var isFirst = true;
    var oldLaunchHandler = module.onLaunch;
    var oldShowHanler = module.onShow;
    var oldHideHanler = module.onHide;
    module.onLaunch = function (options) {
      var instance = typeof dttrace === 'string' ? this[dttrace] : dttrace;
      instance.launchRocket(2003, {
        $launch_time: new Date().getTime(),
        $path: options.path,
        $query: options.query,
        $scene: options.scene,
        $share_ticket: options.shareTicket,
        $referrer_info: options.referrerInfo
      });
      typeof oldLaunchHandler === 'function' && oldLaunchHandler.apply(this, arguments);
    };
    module.onShow = function (options) {
      var instance = typeof dttrace === 'string' ? this[dttrace] : dttrace;
      appEnterTime = new Date().getTime();
      if (!isFirst) {
        instance.launchRocket(2008, {
          $enter_time: appEnterTime,
          $path: options.path,
          $query: options.query,
          $scene: options.scene,
          $share_ticket: options.shareTicket,
          $referrer_info: options.referrerInfo
        });
      } else {
        isFirst = false;
      }
      typeof oldShowHanler === 'function' && oldShowHanler.apply(this, arguments);
    };
    module.onHide = function () {
      var instance = typeof dttrace === 'string' ? this[dttrace] : dttrace;
      var appLeaveTime = new Date().getTime();
      instance.launchRocket(2009, {
        $enter_time: appEnterTime,
        $leave_time: appLeaveTime,
        $stay_time: appLeaveTime - appEnterTime
      });
      typeof oldHideHanler === 'function' && oldHideHanler.apply(this, arguments);
    };
  } else {
    warning('Expected the second argument to be a string or an instance of Dttrace');
  }
  return module;
}

function AutoPageTrace(dttrace) {
  return function (target) {
    autoPageTrace(target.prototype, dttrace);
    return target;
  };
}

function AutoAppTrace(dttrace) {
  return function (target) {
    autoAppTrace(target.prototype, dttrace);
    return target;
  };
}

export { Dttrace, autoPageTrace, autoAppTrace, AutoPageTrace, AutoAppTrace };
