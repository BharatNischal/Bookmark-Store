/* axios v0.19.2 | (c) 2020 by Matt Zabriskie */
!(function (e, t) { typeof exports === 'object' && typeof module === 'object' ? module.exports = t() : typeof define === 'function' && define.amd ? define([], t) : typeof exports === 'object' ? exports.axios = t() : e.axios = t(); }(this, () => (function (e) { function t(r) { if (n[r]) return n[r].exports; const o = n[r] = { exports: {}, id: r, loaded: !1 }; return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports; } var n = {}; return t.m = e, t.c = n, t.p = '', t(0); }([function (e, t, n) { e.exports = n(1); }, function (e, t, n) {
  function r(e) { const t = new s(e); const n = i(s.prototype.request, t); return o.extend(n, s.prototype, t), o.extend(n, t), n; } var o = n(2); var i = n(3); var s = n(4); const a = n(22); const u = n(10); const c = r(u); c.Axios = s, c.create = function (e) { return r(a(c.defaults, e)); }, c.Cancel = n(23), c.CancelToken = n(24), c.isCancel = n(9), c.all = function (e) { return Promise.all(e); }, c.spread = n(25), e.exports = c, e.exports.default = c;
}, function (e, t, n) {
  function r(e) { return j.call(e) === '[object Array]'; } function o(e) { return typeof e === 'undefined'; } function i(e) { return e !== null && !o(e) && e.constructor !== null && !o(e.constructor) && typeof e.constructor.isBuffer === 'function' && e.constructor.isBuffer(e); } function s(e) { return j.call(e) === '[object ArrayBuffer]'; } function a(e) { return typeof FormData !== 'undefined' && e instanceof FormData; } function u(e) { let t; return t = typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer; } function c(e) { return typeof e === 'string'; } function f(e) { return typeof e === 'number'; } function p(e) { return e !== null && typeof e === 'object'; } function d(e) { return j.call(e) === '[object Date]'; } function l(e) { return j.call(e) === '[object File]'; } function h(e) { return j.call(e) === '[object Blob]'; } function m(e) { return j.call(e) === '[object Function]'; } function y(e) { return p(e) && m(e.pipe); } function g(e) { return typeof URLSearchParams !== 'undefined' && e instanceof URLSearchParams; } function v(e) { return e.replace(/^\s*/, '').replace(/\s*$/, ''); } function x() { return (typeof navigator === 'undefined' || navigator.product !== 'ReactNative' && navigator.product !== 'NativeScript' && navigator.product !== 'NS') && (typeof window !== 'undefined' && typeof document !== 'undefined'); } function w(e, t) { if (e !== null && typeof e !== 'undefined') if (typeof e !== 'object' && (e = [e]), r(e)) for (let n = 0, o = e.length; n < o; n++)t.call(null, e[n], n, e); else for (const i in e)Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e); } function b() { function e(e, n) { typeof t[n] === 'object' && typeof e === 'object' ? t[n] = b(t[n], e) : t[n] = e; } for (var t = {}, n = 0, r = arguments.length; n < r; n++)w(arguments[n], e); return t; } function E() { function e(e, n) { typeof t[n] === 'object' && typeof e === 'object' ? t[n] = E(t[n], e) : typeof e === 'object' ? t[n] = E({}, e) : t[n] = e; } for (var t = {}, n = 0, r = arguments.length; n < r; n++)w(arguments[n], e); return t; } function S(e, t, n) { return w(t, (t, r) => { n && typeof t === 'function' ? e[r] = C(t, n) : e[r] = t; }), e; } var C = n(3); var j = Object.prototype.toString; e.exports = {
    isArray: r, isArrayBuffer: s, isBuffer: i, isFormData: a, isArrayBufferView: u, isString: c, isNumber: f, isObject: p, isUndefined: o, isDate: d, isFile: l, isBlob: h, isFunction: m, isStream: y, isURLSearchParams: g, isStandardBrowserEnv: x, forEach: w, merge: b, deepMerge: E, extend: S, trim: v,
  };
}, function (e, t) {
  e.exports = function (e, t) { return function () { for (var n = new Array(arguments.length), r = 0; r < n.length; r++)n[r] = arguments[r]; return e.apply(t, n); }; };
}, function (e, t, n) {
  function r(e) { this.defaults = e, this.interceptors = { request: new s(), response: new s() }; } const o = n(2); const i = n(5); var s = n(6); const a = n(7); const u = n(22); r.prototype.request = function (e) { typeof e === 'string' ? (e = arguments[1] || {}, e.url = arguments[0]) : e = e || {}, e = u(this.defaults, e), e.method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = 'get'; const t = [a, void 0]; let n = Promise.resolve(e); for (this.interceptors.request.forEach((e) => { t.unshift(e.fulfilled, e.rejected); }), this.interceptors.response.forEach((e) => { t.push(e.fulfilled, e.rejected); }); t.length;)n = n.then(t.shift(), t.shift()); return n; }, r.prototype.getUri = function (e) { return e = u(this.defaults, e), i(e.url, e.params, e.paramsSerializer).replace(/^\?/, ''); }, o.forEach(['delete', 'get', 'head', 'options'], (e) => { r.prototype[e] = function (t, n) { return this.request(o.merge(n || {}, { method: e, url: t })); }; }), o.forEach(['post', 'put', 'patch'], (e) => { r.prototype[e] = function (t, n, r) { return this.request(o.merge(r || {}, { method: e, url: t, data: n })); }; }), e.exports = r;
}, function (e, t, n) {
  function r(e) {
    return encodeURIComponent(e).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  } const o = n(2); e.exports = function (e, t, n) { if (!t) return e; let i; if (n)i = n(t); else if (o.isURLSearchParams(t))i = t.toString(); else { const s = []; o.forEach(t, (e, t) => { e !== null && typeof e !== 'undefined' && (o.isArray(e) ? t += '[]' : e = [e], o.forEach(e, (e) => { o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), s.push(`${r(t)}=${r(e)}`); })); }), i = s.join('&'); } if (i) { const a = e.indexOf('#'); a !== -1 && (e = e.slice(0, a)), e += (e.indexOf('?') === -1 ? '?' : '&') + i; } return e; };
}, function (e, t, n) {
  function r() { this.handlers = []; } const o = n(2); r.prototype.use = function (e, t) { return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1; }, r.prototype.eject = function (e) { this.handlers[e] && (this.handlers[e] = null); }, r.prototype.forEach = function (e) { o.forEach(this.handlers, (t) => { t !== null && e(t); }); }, e.exports = r;
}, function (e, t, n) {
  function r(e) { e.cancelToken && e.cancelToken.throwIfRequested(); } const o = n(2); const i = n(8); const s = n(9); const a = n(10); e.exports = function (e) { r(e), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), o.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (t) => { delete e.headers[t]; }); const t = e.adapter || a.adapter; return t(e).then((t) => (r(e), t.data = i(t.data, t.headers, e.transformResponse), t), (t) => (s(t) || (r(e), t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t))); };
}, function (e, t, n) {
  const r = n(2); e.exports = function (e, t, n) { return r.forEach(n, (n) => { e = n(e, t); }), e; };
}, function (e, t) {
  e.exports = function (e) { return !(!e || !e.__CANCEL__); };
}, function (e, t, n) {
  function r(e, t) { !i.isUndefined(e) && i.isUndefined(e['Content-Type']) && (e['Content-Type'] = t); } function o() { let e; return typeof XMLHttpRequest !== 'undefined' ? e = n(12) : typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]' && (e = n(12)), e; } var i = n(2); const s = n(11); const a = { 'Content-Type': 'application/x-www-form-urlencoded' }; const u = {
    adapter: o(), transformRequest: [function (e, t) { return s(t, 'Accept'), s(t, 'Content-Type'), i.isFormData(e) || i.isArrayBuffer(e) || i.isBuffer(e) || i.isStream(e) || i.isFile(e) || i.isBlob(e) ? e : i.isArrayBufferView(e) ? e.buffer : i.isURLSearchParams(e) ? (r(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString()) : i.isObject(e) ? (r(t, 'application/json;charset=utf-8'), JSON.stringify(e)) : e; }], transformResponse: [function (e) { if (typeof e === 'string') try { e = JSON.parse(e); } catch (e) {} return e; }], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1, validateStatus(e) { return e >= 200 && e < 300; },
  }; u.headers = { common: { Accept: 'application/json, text/plain, */*' } }, i.forEach(['delete', 'get', 'head'], (e) => { u.headers[e] = {}; }), i.forEach(['post', 'put', 'patch'], (e) => { u.headers[e] = i.merge(a); }), e.exports = u;
}, function (e, t, n) {
  const r = n(2); e.exports = function (e, t) { r.forEach(e, (n, r) => { r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]); }); };
}, function (e, t, n) {
  const r = n(2); const o = n(13); const i = n(5); const s = n(16); const a = n(19); const u = n(20); const c = n(14); e.exports = function (e) {
    return new Promise((t, f) => {
      let p = e.data; const d = e.headers; r.isFormData(p) && delete d['Content-Type']; let l = new XMLHttpRequest(); if (e.auth) { const h = e.auth.username || ''; const m = e.auth.password || ''; d.Authorization = `Basic ${btoa(`${h}:${m}`)}`; } const y = s(e.baseURL, e.url); if (l.open(e.method.toUpperCase(), i(y, e.params, e.paramsSerializer), !0), l.timeout = e.timeout, l.onreadystatechange = function () {
        if (l && l.readyState === 4 && (l.status !== 0 || l.responseURL && l.responseURL.indexOf('file:') === 0)) {
          const n = 'getAllResponseHeaders' in l ? a(l.getAllResponseHeaders()) : null; const r = e.responseType && e.responseType !== 'text' ? l.response : l.responseText; const i = {
            data: r, status: l.status, statusText: l.statusText, headers: n, config: e, request: l,
          }; o(t, f, i), l = null;
        }
      }, l.onabort = function () { l && (f(c('Request aborted', e, 'ECONNABORTED', l)), l = null); }, l.onerror = function () { f(c('Network Error', e, null, l)), l = null; }, l.ontimeout = function () { let t = `timeout of ${e.timeout}ms exceeded`; e.timeoutErrorMessage && (t = e.timeoutErrorMessage), f(c(t, e, 'ECONNABORTED', l)), l = null; }, r.isStandardBrowserEnv()) { const g = n(21); const v = (e.withCredentials || u(y)) && e.xsrfCookieName ? g.read(e.xsrfCookieName) : void 0; v && (d[e.xsrfHeaderName] = v); } if ('setRequestHeader' in l && r.forEach(d, (e, t) => { typeof p === 'undefined' && t.toLowerCase() === 'content-type' ? delete d[t] : l.setRequestHeader(t, e); }), r.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), e.responseType) try { l.responseType = e.responseType; } catch (t) { if (e.responseType !== 'json') throw t; } typeof e.onDownloadProgress === 'function' && l.addEventListener('progress', e.onDownloadProgress), typeof e.onUploadProgress === 'function' && l.upload && l.upload.addEventListener('progress', e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((e) => { l && (l.abort(), f(e), l = null); }), void 0 === p && (p = null), l.send(p);
    });
  };
}, function (e, t, n) {
  const r = n(14); e.exports = function (e, t, n) { const o = n.config.validateStatus; !o || o(n.status) ? e(n) : t(r(`Request failed with status code ${n.status}`, n.config, null, n.request, n)); };
}, function (e, t, n) {
  const r = n(15); e.exports = function (e, t, n, o, i) { const s = new Error(e); return r(s, t, n, o, i); };
}, function (e, t) {
  e.exports = function (e, t, n, r, o) {
    return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function () {
      return {
        message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code,
      };
    }, e;
  };
}, function (e, t, n) {
  const r = n(17); const o = n(18); e.exports = function (e, t) { return e && !r(t) ? o(e, t) : t; };
}, function (e, t) {
  e.exports = function (e) { return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e); };
}, function (e, t) {
  e.exports = function (e, t) { return t ? `${e.replace(/\/+$/, '')}/${t.replace(/^\/+/, '')}` : e; };
}, function (e, t, n) {
  const r = n(2); const o = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']; e.exports = function (e) { let t; let n; let i; const s = {}; return e ? (r.forEach(e.split('\n'), (e) => { if (i = e.indexOf(':'), t = r.trim(e.substr(0, i)).toLowerCase(), n = r.trim(e.substr(i + 1)), t) { if (s[t] && o.indexOf(t) >= 0) return; t === 'set-cookie' ? s[t] = (s[t] ? s[t] : []).concat([n]) : s[t] = s[t] ? `${s[t]}, ${n}` : n; } }), s) : s; };
}, function (e, t, n) {
  const r = n(2); e.exports = r.isStandardBrowserEnv() ? (function () {
    function e(e) {
      let t = e; return n && (o.setAttribute('href', t), t = o.href), o.setAttribute('href', t), {
        href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, '') : '', host: o.host, search: o.search ? o.search.replace(/^\?/, '') : '', hash: o.hash ? o.hash.replace(/^#/, '') : '', hostname: o.hostname, port: o.port, pathname: o.pathname.charAt(0) === '/' ? o.pathname : `/${o.pathname}`,
      };
    } let t; var n = /(msie|trident)/i.test(navigator.userAgent); var o = document.createElement('a'); return t = e(window.location.href), function (n) { const o = r.isString(n) ? e(n) : n; return o.protocol === t.protocol && o.host === t.host; };
  }()) : (function () { return function () { return !0; }; }());
}, function (e, t, n) {
  const r = n(2); e.exports = r.isStandardBrowserEnv() ? (function () { return { write(e, t, n, o, i, s) { const a = []; a.push(`${e}=${encodeURIComponent(t)}`), r.isNumber(n) && a.push(`expires=${new Date(n).toGMTString()}`), r.isString(o) && a.push(`path=${o}`), r.isString(i) && a.push(`domain=${i}`), s === !0 && a.push('secure'), document.cookie = a.join('; '); }, read(e) { const t = document.cookie.match(new RegExp(`(^|;\\s*)(${e})=([^;]*)`)); return t ? decodeURIComponent(t[3]) : null; }, remove(e) { this.write(e, '', Date.now() - 864e5); } }; }()) : (function () { return { write() {}, read() { return null; }, remove() {} }; }());
}, function (e, t, n) {
  const r = n(2); e.exports = function (e, t) { t = t || {}; const n = {}; const o = ['url', 'method', 'params', 'data']; const i = ['headers', 'auth', 'proxy']; const s = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath']; r.forEach(o, (e) => { typeof t[e] !== 'undefined' && (n[e] = t[e]); }), r.forEach(i, (o) => { r.isObject(t[o]) ? n[o] = r.deepMerge(e[o], t[o]) : typeof t[o] !== 'undefined' ? n[o] = t[o] : r.isObject(e[o]) ? n[o] = r.deepMerge(e[o]) : typeof e[o] !== 'undefined' && (n[o] = e[o]); }), r.forEach(s, (r) => { typeof t[r] !== 'undefined' ? n[r] = t[r] : typeof e[r] !== 'undefined' && (n[r] = e[r]); }); const a = o.concat(i).concat(s); const u = Object.keys(t).filter((e) => a.indexOf(e) === -1); return r.forEach(u, (r) => { typeof t[r] !== 'undefined' ? n[r] = t[r] : typeof e[r] !== 'undefined' && (n[r] = e[r]); }), n; };
}, function (e, t) {
  function n(e) { this.message = e; }n.prototype.toString = function () { return `Cancel${this.message ? `: ${this.message}` : ''}`; }, n.prototype.__CANCEL__ = !0, e.exports = n;
}, function (e, t, n) {
  function r(e) { if (typeof e !== 'function') throw new TypeError('executor must be a function.'); let t; this.promise = new Promise((e) => { t = e; }); const n = this; e((e) => { n.reason || (n.reason = new o(e), t(n.reason)); }); } var o = n(23); r.prototype.throwIfRequested = function () { if (this.reason) throw this.reason; }, r.source = function () { let e; const t = new r((t) => { e = t; }); return { token: t, cancel: e }; }, e.exports = r;
}, function (e, t) {
  e.exports = function (e) { return function (t) { return e.apply(null, t); }; };
}]))));
// # sourceMappingURL=axios.min.map

axios.defaults.withCredentials = true;

const contextMenuItem = {
  id: 'bookmark',
  title: 'add to Bookmark Store',
  contexts: ['selection'],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData, tab) => {
  if (clickData.menuItemId == 'bookmark' && clickData.selectionText) {
    const data = {
      title: tab.title,
      url: tab.url,
      selection: clickData.selectionText,
    };
    axios.post('https://bookmark-store.herokuapp.com/api/bookmark', { ...data })
      .then((res) => {
        if (res && !res.data.success) {
          chrome.tts.speak('Please Log In First and then try again');
          chrome.tabs.create({ url: 'https://bookmark-store.herokuapp.com/', active: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});
