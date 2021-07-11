function findBase(pathname) {
    let iof = pathname.indexOf("/", 1);
    if (iof !== -1) return pathname.substring(0, iof);
    return pathname;
}
class Router {
    route = {
    };
    c_routes = [];
    midds = [];
    pmidds = {
    };
    get;
    post;
    put;
    patch;
    delete;
    any;
    head;
    options;
    trace;
    connect;
    constructor(){
        this.get = this.on.bind(this, "GET");
        this.post = this.on.bind(this, "POST");
        this.put = this.on.bind(this, "PUT");
        this.patch = this.on.bind(this, "PATCH");
        this.delete = this.on.bind(this, "DELETE");
        this.any = this.on.bind(this, "ANY");
        this.head = this.on.bind(this, "HEAD");
        this.options = this.on.bind(this, "OPTIONS");
        this.trace = this.on.bind(this, "TRACE");
        this.connect = this.on.bind(this, "CONNECT");
    }
    #addMidd = (midds, notFound, fns, url = "/", midAsset)=>{
        if (midAsset !== void 0) {
            let pfx = findBase(url);
            if (midAsset[pfx]) {
                fns = midAsset[pfx].concat(fns);
            }
        }
        if (midds.length) {
            fns = midds.concat(fns);
        }
        return fns = fns.concat([
            notFound
        ]);
    };
    on(method, path, ...handlers) {
        this.c_routes.push({
            method,
            path,
            handlers
        });
        return this;
    }
    findRoute(method, url, notFound) {
        let handlers = [];
        let params = {
        };
        if (this.route[method + url]) {
            let obj = this.route[method + url];
            if (obj.m) {
                handlers = obj.handlers;
            } else {
                handlers = this.#addMidd(this.midds, notFound, obj.handlers);
                this.route[method + url] = {
                    m: true,
                    handlers
                };
            }
            return {
                params,
                handlers
            };
        }
        if (url !== "/" && url[url.length - 1] === "/") {
            let _url = url.slice(0, -1);
            if (this.route[method + _url]) {
                let obj = this.route[method + _url];
                if (obj.m) {
                    handlers = obj.handlers;
                } else {
                    handlers = this.#addMidd(this.midds, notFound, obj.handlers);
                    this.route[method + _url] = {
                        m: true,
                        handlers
                    };
                }
                return {
                    params,
                    handlers
                };
            }
        }
        let i = 0;
        let j = 0;
        let obj = {
        };
        let routes = this.route[method] || [];
        let matches = [];
        let _404 = true;
        if (this.route["ANY"]) {
            routes = routes.concat(this.route["ANY"]);
        }
        let len = routes.length;
        while(i < len){
            obj = routes[i];
            if (obj.pathx && obj.pathx.test(url)) {
                _404 = false;
                if (obj.params) {
                    matches = obj.pathx.exec(url);
                    while(j < obj.params.length){
                        params[obj.params[j]] = matches[++j] || null;
                    }
                    if (params["wild"]) {
                        params["wild"] = params["wild"].split("/");
                    }
                }
                break;
            }
            i++;
        }
        handlers = this.#addMidd(this.midds, notFound, _404 ? [] : obj.handlers || [], url, this.pmidds);
        return {
            params,
            handlers
        };
    }
}
const SERIALIZE_COOKIE_REGEXP = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function findFns(arr) {
    let ret = [], i = 0, len = arr.length;
    for(; i < len; i++){
        if (Array.isArray(arr[i])) ret = ret.concat(findFns(arr[i]));
        else if (typeof arr[i] === "function") ret.push(arr[i]);
    }
    return ret;
}
function toBytes(arg) {
    let sizeList = {
        b: 1,
        kb: 1 << 10,
        mb: 1 << 20,
        gb: 1 << 30,
        tb: Math.pow(1024, 4),
        pb: Math.pow(1024, 5)
    };
    if (typeof arg === "number") return arg;
    let arr = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i.exec(arg), val, unt = "b";
    if (!arr) {
        val = parseInt(val, 10);
        unt = "b";
    } else {
        val = parseFloat(arr[1]);
        unt = arr[4].toLowerCase();
    }
    return Math.floor(sizeList[unt] * val);
}
function toPathx(path, isAny) {
    if (path instanceof RegExp) return {
        params: null,
        pathx: path
    };
    let trgx = /\?|\*|\./;
    if (!trgx.test(path) && isAny === false) {
        let len = (path.match(/\/:/gi) || []).length;
        if (len === 0) return;
    }
    let params = [], pattern = "", strReg = "/([^/]+?)", strRegQ = "(?:/([^/]+?))?";
    if (trgx.test(path)) {
        let arr = path.split("/"), obj, el, i = 0;
        arr[0] || arr.shift();
        for(; i < arr.length; i++){
            obj = arr[i];
            el = obj[0];
            if (el === "*") {
                params.push("wild");
                pattern += "/(.*)";
            } else if (el === ":") {
                let isQuest = obj.indexOf("?") !== -1, isExt = obj.indexOf(".") !== -1;
                if (isQuest && !isExt) pattern += strRegQ;
                else pattern += strReg;
                if (isExt) {
                    let _ext = obj.substring(obj.indexOf("."));
                    let _pattern = pattern + (isQuest ? "?" : "") + "\\" + _ext;
                    _pattern = _pattern.replaceAll(strReg + "\\" + _ext, "/([\\w-]+" + _ext + ")");
                    pattern = _pattern;
                }
            } else pattern += "/" + obj;
        }
    } else pattern = path.replace(/\/:[a-z_-]+/gi, strReg);
    let pathx = new RegExp(`^${pattern}/?$`, "i"), matches = path.match(/\:([a-z_-]+)/gi);
    if (!params.length) {
        params = matches && matches.map((e)=>e.substring(1)
        );
    } else {
        let newArr = matches ? matches.map((e)=>e.substring(1)
        ) : [];
        params = newArr.concat(params);
    }
    return {
        params,
        pathx
    };
}
function needPatch(data, keys, value) {
    if (keys.length === 0) {
        return value;
    }
    let key = keys.shift();
    if (!key) {
        data = data || [];
        if (Array.isArray(data)) {
            key = data.length;
        }
    }
    let index = +key;
    if (!isNaN(index)) {
        data = data || [];
        key = index;
    }
    data = data || {
    };
    let val = needPatch(data[key], keys, value);
    data[key] = val;
    return data;
}
function myParse(arr) {
    let obj = arr.reduce((red, [field, value])=>{
        if (red.hasOwnProperty(field)) {
            if (Array.isArray(red[field])) {
                red[field] = [
                    ...red[field],
                    value
                ];
            } else {
                red[field] = [
                    red[field],
                    value
                ];
            }
        } else {
            let [_, prefix, keys] = field.match(/^([^\[]+)((?:\[[^\]]*\])*)/);
            if (keys) {
                keys = Array.from(keys.matchAll(/\[([^\]]*)\]/g), (m)=>m[1]
                );
                value = needPatch(red[prefix], keys, value);
            }
            red[prefix] = value;
        }
        return red;
    }, {
    });
    return obj;
}
function parseQuery(query) {
    if (query === null) return {
    };
    if (typeof query === "string") {
        let data = new URLSearchParams("?" + query);
        return myParse(Array.from(data.entries()));
    }
    return myParse(Array.from(query.entries()));
}
function serializeCookie(name, value, cookie = {
}) {
    if (!SERIALIZE_COOKIE_REGEXP.test(name)) {
        throw new TypeError("name is invalid");
    }
    if (value !== "" && !SERIALIZE_COOKIE_REGEXP.test(value)) {
        throw new TypeError("value is invalid");
    }
    cookie.encode = !!cookie.encode;
    if (cookie.encode) {
        value = "E:" + btoa(encoder.encode(value).toString());
    }
    let ret = `${name}=${value}`;
    if (name.startsWith("__Secure")) {
        cookie.secure = true;
    }
    if (name.startsWith("__Host")) {
        cookie.path = "/";
        cookie.secure = true;
        delete cookie.domain;
    }
    if (cookie.secure) {
        ret += `; Secure`;
    }
    if (cookie.httpOnly) {
        ret += `; HttpOnly`;
    }
    if (typeof cookie.maxAge === "number" && Number.isInteger(cookie.maxAge)) {
        ret += `; Max-Age=${cookie.maxAge}`;
    }
    if (cookie.domain) {
        if (!SERIALIZE_COOKIE_REGEXP.test(cookie.domain)) {
            throw new TypeError("domain is invalid");
        }
        ret += `; Domain=${cookie.domain}`;
    }
    if (cookie.sameSite) {
        ret += `; SameSite=${cookie.sameSite}`;
    }
    if (cookie.path) {
        if (!SERIALIZE_COOKIE_REGEXP.test(cookie.path)) {
            throw new TypeError("path is invalid");
        }
        ret += `; Path=${cookie.path}`;
    }
    if (cookie.expires) {
        if (typeof cookie.expires.toUTCString !== "function") {
            throw new TypeError("expires is invalid");
        }
        ret += `; Expires=${cookie.expires.toUTCString()}`;
    }
    if (cookie.other) {
        ret += `; ${cookie.other.join("; ")}`;
    }
    return ret;
}
function tryDecode(str) {
    try {
        str = str.substring(2);
        const dec = atob(str);
        const uint = Uint8Array.from(dec.split(","));
        const ret = decoder.decode(uint) || str;
        if (ret !== str) {
            if (ret.startsWith("j:{") || ret.startsWith("j:[")) {
                const json = ret.substring(2);
                return JSON.parse(json);
            }
        }
        return ret;
    } catch (error) {
        return str;
    }
}
function getReqCookies(req, decode, i = 0) {
    const str = req.headers.get("Cookie");
    if (str === null) return {
    };
    const ret = {
    };
    const arr = str.split(";");
    const len = arr.length;
    while(i < len){
        const [key, ...oriVal] = arr[i].split("=");
        let val = oriVal.join("=");
        ret[key.trim()] = decode ? val.startsWith("E:") ? tryDecode(val) : val : val;
        i++;
    }
    return ret;
}
class NHttpError extends Error {
    status;
    constructor(message, status = 500, name1){
        super(message);
        this.message = message;
        this.status = status;
        this.name = name1 || "HttpError";
    }
}
class BadRequestError extends NHttpError {
    constructor(message1){
        super(message1, 400, "BadRequestError");
    }
}
class UnauthorizedError extends NHttpError {
    constructor(message2){
        super(message2, 401, "UnauthorizedError");
    }
}
class PaymentRequiredError extends NHttpError {
    constructor(message3){
        super(message3, 402, "PaymentRequiredError");
    }
}
class ForbiddenError extends NHttpError {
    constructor(message4){
        super(message4, 403, "ForbiddenError");
    }
}
class NotFoundError extends NHttpError {
    constructor(message5){
        super(message5, 404, "NotFoundError");
    }
}
class MethodNotAllowedError extends NHttpError {
    constructor(message6){
        super(message6, 405, "MethodNotAllowedError");
    }
}
class NotAcceptableError extends NHttpError {
    constructor(message7){
        super(message7, 406, "NotAcceptableError");
    }
}
class ProxyAuthRequiredError extends NHttpError {
    constructor(message8){
        super(message8, 407, "ProxyAuthRequiredError");
    }
}
class RequestTimeoutError extends NHttpError {
    constructor(message9){
        super(message9, 408, "RequestTimeoutError");
    }
}
class ConflictError extends NHttpError {
    constructor(message10){
        super(message10, 409, "ConflictError");
    }
}
class GoneError extends NHttpError {
    constructor(message11){
        super(message11, 410, "GoneError");
    }
}
class LengthRequiredError extends NHttpError {
    constructor(message12){
        super(message12, 411, "LengthRequiredError");
    }
}
class PreconditionFailedError extends NHttpError {
    constructor(message13){
        super(message13, 412, "PreconditionFailedError");
    }
}
class RequestEntityTooLargeError extends NHttpError {
    constructor(message14){
        super(message14, 413, "RequestEntityTooLargeError");
    }
}
class RequestURITooLongError extends NHttpError {
    constructor(message15){
        super(message15, 414, "RequestURITooLongError");
    }
}
class UnsupportedMediaTypeError extends NHttpError {
    constructor(message16){
        super(message16, 415, "UnsupportedMediaTypeError");
    }
}
class RequestedRangeNotSatisfiableError extends NHttpError {
    constructor(message17){
        super(message17, 416, "RequestedRangeNotSatisfiableError");
    }
}
class ExpectationFailedError extends NHttpError {
    constructor(message18){
        super(message18, 417, "ExpectationFailedError");
    }
}
class TeapotError extends NHttpError {
    constructor(message19){
        super(message19, 418, "TeapotError");
    }
}
class MisdirectedRequestError extends NHttpError {
    constructor(message20){
        super(message20, 421, "MisdirectedRequestError");
    }
}
class UnprocessableEntityError extends NHttpError {
    constructor(message21){
        super(message21, 422, "UnprocessableEntityError");
    }
}
class LockedError extends NHttpError {
    constructor(message22){
        super(message22, 423, "LockedError");
    }
}
class FailedDependencyError extends NHttpError {
    constructor(message23){
        super(message23, 424, "FailedDependencyError");
    }
}
class TooEarlyError extends NHttpError {
    constructor(message24){
        super(message24, 425, "TooEarlyError");
    }
}
class UpgradeRequiredError extends NHttpError {
    constructor(message25){
        super(message25, 426, "UpgradeRequiredError");
    }
}
class PreconditionRequiredError extends NHttpError {
    constructor(message26){
        super(message26, 428, "PreconditionRequiredError");
    }
}
class TooManyRequestsError extends NHttpError {
    constructor(message27){
        super(message27, 429, "TooManyRequestsError");
    }
}
class RequestHeaderFieldsTooLargeError extends NHttpError {
    constructor(message28){
        super(message28, 431, "RequestHeaderFieldsTooLargeError");
    }
}
class UnavailableForLegalReasonsError extends NHttpError {
    constructor(message29){
        super(message29, 451, "UnavailableForLegalReasonsError");
    }
}
class InternalServerError extends NHttpError {
    constructor(message30){
        super(message30, 500, "InternalServerError");
    }
}
class NotImplementedError extends NHttpError {
    constructor(message31){
        super(message31, 501, "NotImplementedError");
    }
}
class BadGatewayError extends NHttpError {
    constructor(message32){
        super(message32, 502, "BadGatewayError");
    }
}
class ServiceUnavailableError extends NHttpError {
    constructor(message33){
        super(message33, 503, "ServiceUnavailableError");
    }
}
class GatewayTimeoutError extends NHttpError {
    constructor(message34){
        super(message34, 504, "GatewayTimeoutError");
    }
}
class HTTPVersionNotSupportedError extends NHttpError {
    constructor(message35){
        super(message35, 505, "HTTPVersionNotSupportedError");
    }
}
class VariantAlsoNegotiatesError extends NHttpError {
    constructor(message36){
        super(message36, 506, "VariantAlsoNegotiatesError");
    }
}
class InsufficientStorageError extends NHttpError {
    constructor(message37){
        super(message37, 507, "InsufficientStorageError");
    }
}
class LoopDetectedError extends NHttpError {
    constructor(message38){
        super(message38, 508, "LoopDetectedError");
    }
}
class NotExtendedError extends NHttpError {
    constructor(message39){
        super(message39, 510, "NotExtendedError");
    }
}
class NetworkAuthenticationRequiredError extends NHttpError {
    constructor(message40){
        super(message40, 511, "NetworkAuthenticationRequiredError");
    }
}
function getError(err, isStack = false) {
    let status1 = err.status || err.statusCode || err.code || 500;
    if (typeof status1 !== "number") status1 = 500;
    let stack = void 0;
    if (isStack) {
        let arr = err.stack ? err.stack.split("\n") : [
            ""
        ];
        arr.shift();
        stack = arr.filter((line)=>line.indexOf("file://") !== -1
        ).map((line)=>line.trim()
        );
    }
    return {
        status: status1,
        message: err.message || "Something went wrong",
        name: err.name || "HttpError",
        stack
    };
}
const decoder1 = new TextDecoder();
class Multipart {
    #body = async (formData, { parse  } = {
    })=>{
        return parse ? parse(Object.fromEntries(Array.from(formData.keys()).map((key)=>[
                key,
                formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key), 
            ]
        ))) : parseQuery(formData);
    };
    #cleanUp = (body)=>{
        for(const key in body){
            if (Array.isArray(body[key])) {
                for(let i = 0; i < body[key].length; i++){
                    const el = body[key][i];
                    if (el instanceof File) {
                        delete body[key];
                        break;
                    }
                }
            } else if (body[key] instanceof File) {
                delete body[key];
            }
        }
    };
    #validate = async (files, opts)=>{
        let j = 0, len = files.length;
        if (opts?.maxCount) {
            if (len > opts.maxCount) {
                throw new BadRequestError(`${opts.name} no more than ${opts.maxCount} file`);
            }
        }
        while(j < len){
            const file = files[j];
            const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
            if (opts?.accept) {
                if (!opts.accept.includes(ext)) {
                    throw new BadRequestError(`${opts.name} only accept ${opts.accept}`);
                }
            }
            if (opts?.maxSize) {
                if (file.size > toBytes(opts.maxSize)) {
                    throw new BadRequestError(`${opts.name} to large, maxSize = ${opts.maxSize}`);
                }
            }
            j++;
        }
    };
    #upload = async (files, opts)=>{
        const cwd = Deno.cwd();
        let i = 0, len = files.length;
        while(i < len){
            const file = files[i];
            const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
            if (opts?.callback) opts.callback(file);
            let dest = opts.dest || "";
            if (dest.lastIndexOf("/") === -1) {
                dest += "/";
            }
            file.filename = file.filename || Date.now() + file.lastModified.toString() + "_" + file.name.substring(0, 16).replace(/\./g, "") + "." + ext;
            file.path = file.path || (dest !== "/" ? dest : "") + file.filename;
            const arrBuff = await file.arrayBuffer();
            await Deno.writeFile(cwd + "/" + dest + file.filename, new Uint8Array(arrBuff));
            i++;
        }
    };
    default() {
        return async (rev, next)=>{
            if (rev.body === void 0) rev.body = {
            };
            if (rev.request.body && rev.request.bodyUsed === false && rev.request.headers.get("content-type")?.includes("multipart/form-data")) {
                const formData = await rev.request.formData();
                rev.body = await this.#body(formData, {
                    parse: rev.__parseQuery
                });
            }
            next();
        };
    }
    upload(options) {
        return async (rev, next)=>{
            if (rev.body === void 0) rev.body = {
            };
            if (rev.file === void 0) rev.file = {
            };
            if (rev.request.body && rev.request.headers.get("content-type")?.includes("multipart/form-data")) {
                if (rev.request.bodyUsed === false) {
                    const formData = await rev.request.formData();
                    rev.body = await this.#body(formData, {
                        parse: rev.__parseQuery
                    });
                }
                if (Array.isArray(options)) {
                    let j = 0, i = 0, len = options.length;
                    while(j < len){
                        const obj = options[j];
                        if (obj.required && rev.body[obj.name] === void 0) {
                            throw new BadRequestError(`Field ${obj.name} is required`);
                        }
                        if (rev.body[obj.name]) {
                            rev.file[obj.name] = rev.body[obj.name];
                            const objFile = rev.file[obj.name];
                            const files = Array.isArray(objFile) ? objFile : [
                                objFile
                            ];
                            await this.#validate(files, obj);
                        }
                        j++;
                    }
                    while(i < len){
                        const obj = options[i];
                        if (rev.body[obj.name]) {
                            rev.file[obj.name] = rev.body[obj.name];
                            const objFile = rev.file[obj.name];
                            const files = Array.isArray(objFile) ? objFile : [
                                objFile
                            ];
                            await this.#upload(files, obj);
                            delete rev.body[obj.name];
                        }
                        i++;
                    }
                    this.#cleanUp(rev.body);
                } else if (typeof options === "object") {
                    const obj = options;
                    if (obj.required && rev.body[obj.name] === void 0) {
                        throw new BadRequestError(`Field ${obj.name} is required`);
                    }
                    if (rev.body[obj.name]) {
                        rev.file[obj.name] = rev.body[obj.name];
                        const objFile = rev.file[obj.name];
                        const files = Array.isArray(objFile) ? objFile : [
                            objFile
                        ];
                        await this.#validate(files, obj);
                        await this.#upload(files, obj);
                        delete rev.body[obj.name];
                    }
                    this.#cleanUp(rev.body);
                }
            }
            next();
        };
    }
}
async function verifyBody(request, limit) {
    const arrBuff = await request.arrayBuffer();
    if (limit && arrBuff.byteLength > toBytes(limit)) {
        throw new BadRequestError(`Body is too large. max limit ${limit}`);
    }
    const body = decoder1.decode(arrBuff);
    return body;
}
const multipart = new Multipart();
const withBody = async (rev, next, parse, opts)=>{
    rev.body = {
    };
    if (rev.request.body && rev.request.bodyUsed === false) {
        const headers = rev.request.headers;
        if (headers.get("content-type") === "application/json") {
            try {
                const body = await verifyBody(rev.request, opts?.json || "3mb");
                rev.body = JSON.parse(body);
            } catch (error) {
                return next(error);
            }
        } else if (headers.get("content-type") === "application/x-www-form-urlencoded") {
            try {
                const body = await verifyBody(rev.request, opts?.urlencoded || "3mb");
                rev.body = parse(body);
            } catch (error) {
                return next(error);
            }
        }
    }
    next();
};
const JSON_TYPE_CHARSET = "application/json; charset=utf-8";
class JsonResponse extends Response {
    constructor(json, opts1 = {
    }){
        opts1.headers = opts1.headers || new Headers();
        opts1.headers.set("content-type", JSON_TYPE_CHARSET);
        super(JSON.stringify(json), opts1);
    }
}
function response(res, respondWith, opts1) {
    res.header = function(key, value) {
        opts1.headers = opts1.headers || new Headers();
        if (typeof key === "string" && typeof value === "string") {
            opts1.headers.set(key, value);
            return this;
        }
        if (typeof key === "object") {
            if (key instanceof Headers) {
                opts1.headers = key;
            } else {
                for(const k in key){
                    opts1.headers.set(k, key[k]);
                }
            }
            return this;
        }
        if (typeof key === "string") {
            return opts1.headers.get(key);
        }
        return opts1.headers;
    };
    res.status = function(code) {
        if (code) {
            opts1.status = code;
            return this;
        }
        return opts1.status || 200;
    };
    res.type = function(value) {
        this.header("Content-Type", value);
        return this;
    };
    res.send = function(body) {
        if (typeof body === "object") {
            if (body instanceof Uint8Array || body instanceof ReadableStream || typeof body.read === "function") {
                return respondWith(new Response(body, opts1));
            }
            body = JSON.stringify(body);
            opts1.headers = opts1.headers || new Headers();
            opts1.headers.set("Content-Type", JSON_TYPE_CHARSET);
        }
        return respondWith(new Response(body, opts1));
    };
    res.json = function(body) {
        return respondWith(new JsonResponse(body, opts1));
    };
    res.redirect = function(url, status1) {
        return this.header("Location", url).status(status1 || 302).send();
    };
    res.cookie = function(name1, value, _opts = {
    }) {
        _opts.httpOnly = _opts.httpOnly !== false;
        _opts.path = _opts.path || "/";
        if (_opts.maxAge) {
            _opts.expires = new Date(Date.now() + _opts.maxAge);
            _opts.maxAge /= 1000;
        }
        value = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);
        this.header().append("Set-Cookie", serializeCookie(name1, value, _opts));
        return this;
    };
    res.clearCookie = function(name1, _opts = {
    }) {
        _opts.httpOnly = _opts.httpOnly !== false;
        this.header().append("Set-Cookie", serializeCookie(name1, "", {
            ..._opts,
            expires: new Date(0)
        }));
    };
}
class NHttp extends Router {
    #parseQuery;
    #bodyLimit;
    #env;
    server;
    constructor({ parseQuery: parseQuery1 , bodyLimit , env  } = {
    }){
        super();
        this.#parseQuery = parseQuery1 || parseQuery;
        this.#bodyLimit = bodyLimit;
        this.#env = env || "development";
        if (parseQuery1) {
            this.use((rev, next)=>{
                rev.__parseQuery = parseQuery1;
                next();
            });
        }
        this.fetchEventHandler = this.fetchEventHandler.bind(this);
    }
    onError(fn) {
        this.#onError = fn;
    }
    on404(fn) {
        this.#on404 = fn;
    }
    use(...args) {
        const arg = args[0];
        const larg = args[args.length - 1];
        const len = args.length;
        if (len === 1 && typeof arg === "function") {
            this.midds.push(arg);
        } else if (typeof arg === "string" && typeof larg === "function") {
            if (arg === "/" || arg === "") {
                this.midds = this.midds.concat(findFns(args));
            } else {
                this.pmidds[arg] = [
                    (rev, next)=>{
                        rev.url = rev.url.substring(arg.length) || "/";
                        rev.path = rev.path ? rev.path.substring(arg.length) || "/" : "/";
                        next();
                    }, 
                ].concat(findFns(args));
            }
        } else if (typeof larg === "object" && larg.c_routes) {
            this.#addRoutes(arg, args, larg.c_routes);
        } else if (Array.isArray(larg)) {
            let i = 0, len1 = larg.length;
            while(i < len1){
                const el = larg[i];
                if (typeof el === "object" && el.c_routes) {
                    this.#addRoutes(arg, args, el.c_routes);
                } else if (typeof el === "function") {
                    this.midds.push(el);
                }
                i++;
            }
        } else {
            this.midds = this.midds.concat(findFns(args));
        }
        return this;
    }
    on(method, path, ...handlers) {
        let fns = findFns(handlers);
        let obj = toPathx(path, method === "ANY");
        if (obj !== void 0) {
            this.route[method] = this.route[method] || [];
            this.route[method].push({
                ...obj,
                handlers: fns
            });
        } else {
            this.route[method + path] = {
                handlers: fns
            };
        }
        return this;
    }
    handle(rev, i = 0) {
        this.#parseUrl(rev);
        const obj = this.findRoute(rev.request.method, rev._parsedUrl.pathname, this.#on404);
        const next = (err)=>{
            if (err) return this.#onError(err, rev, next);
            let ret;
            try {
                ret = obj.handlers[i++](rev, next);
            } catch (error) {
                return next(error);
            }
            if (ret && typeof ret.then === "function") {
                ret.then(void 0).catch(next);
            }
        };
        rev.params = obj.params;
        rev.path = rev._parsedUrl.pathname;
        rev.query = this.#parseQuery(rev._parsedUrl.query);
        rev.search = rev._parsedUrl.search;
        rev.getCookies = (n)=>getReqCookies(rev.request, n)
        ;
        response(rev.response = {
        }, rev.respondWith, rev.responseInit = {
        });
        withBody(rev, next, this.#parseQuery, this.#bodyLimit);
    }
    fetchEventHandler() {
        return {
            handleEvent: async (event)=>{
                let resp;
                const promise = new Promise((ok)=>resp = ok
                );
                const rw = event.respondWith(promise);
                this.handle({
                    request: event.request,
                    respondWith: resp
                });
                await rw;
            }
        };
    }
    async listen(opts, callback) {
        let isTls = false;
        if (typeof opts === "number") {
            opts = {
                port: opts
            };
        } else if (typeof opts === "object") {
            isTls = opts.certFile !== void 0;
        }
        this.server = isTls ? Deno.listenTls(opts) : Deno.listen(opts);
        try {
            if (callback) {
                callback(undefined, {
                    ...opts,
                    hostname: opts.hostname || "localhost",
                    server: this.server
                });
            }
            while(true){
                try {
                    const conn = await this.server.accept();
                    if (conn) {
                        this.#handleConn(conn);
                    } else {
                        break;
                    }
                } catch (_e) {
                }
            }
        } catch (error) {
            if (callback) {
                callback(error, {
                    ...opts,
                    hostname: opts.hostname || "localhost",
                    server: this.server
                });
            }
        }
    }
    #onError = (err, rev, _)=>{
        let obj = getError(err, this.#env === "development");
        return rev.response.status(obj.status).json(obj);
    };
    #on404 = (rev, _)=>{
        let obj = getError(new NotFoundError(`Route ${rev.request.method}${rev.url} not found`));
        return rev.response.status(obj.status).json(obj);
    };
    #addRoutes = (arg, args, routes)=>{
        let prefix = "";
        let midds = findFns(args);
        let i = 0, len = routes.length;
        if (typeof arg === "string" && arg.length > 1 && arg.charAt(0) === "/") {
            prefix = arg;
        }
        while(i < len){
            let el = routes[i];
            el.handlers = midds.concat(el.handlers);
            this.on(el.method, prefix + el.path, ...el.handlers);
            i++;
        }
    };
    #handleConn = async (conn)=>{
        try {
            const httpConn = Deno.serveHttp(conn);
            for await (const { request , respondWith  } of httpConn){
                let resp;
                const promise = new Promise((ok)=>resp = ok
                );
                const rw = respondWith(promise);
                this.handle({
                    request: request,
                    respondWith: resp
                });
                await rw;
            }
        } catch (_e) {
        }
    };
    #findUrl = (str)=>{
        let idx = [], i = -1;
        while((i = str.indexOf("/", i + 1)) != -1){
            idx.push(i);
            if (idx.length === 3) break;
        }
        return str.substring(idx[2]);
    };
    #parseUrl = (rev)=>{
        let str = rev.url = this.#findUrl(rev.request.url);
        let url = rev._parsedUrl || {
        };
        if (url._raw === str) return;
        let pathname = str, query = null, search = null, i = 0, len = str.length;
        while(i < len){
            if (str.charCodeAt(i) === 63) {
                pathname = str.substring(0, i);
                query = str.substring(i + 1);
                search = str.substring(i);
                break;
            }
            i++;
        }
        url.path = url._raw = url.href = str;
        url.pathname = pathname;
        url.query = query;
        url.search = search;
        rev._parsedUrl = url;
    };
}
const osType = (()=>{
    if (globalThis.Deno != null) {
        return Deno.build.os;
    }
    const navigator = globalThis.navigator;
    if (navigator?.appVersion?.includes?.("Win") ?? false) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
const CHAR_FORWARD_SLASH = 47;
function assertPath(path) {
    if (typeof path !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
    }
}
function isPosixPathSeparator(code) {
    return code === 47;
}
function isPathSeparator(code) {
    return isPosixPathSeparator(code) || code === 92;
}
function isWindowsDeviceRoot(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString(path, allowAboveRoot, separator, isPathSeparator1) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i = 0, len = path.length; i <= len; ++i){
        if (i < len) code = path.charCodeAt(i);
        else if (isPathSeparator1(code)) break;
        else code = CHAR_FORWARD_SLASH;
        if (isPathSeparator1(code)) {
            if (lastSlash === i - 1 || dots === 1) {
            } else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format(sep, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
class DenoStdInternalError extends Error {
    constructor(message41){
        super(message41);
        this.name = "DenoStdInternalError";
    }
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
const sep = "\\";
const delimiter = ";";
function resolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1; i--){
        let path;
        if (i >= 0) {
            path = pathSegments[i];
        } else if (!resolvedDevice) {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path = Deno.cwd();
        } else {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno.env.get(`=${resolvedDevice}`) || Deno.cwd();
            if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path = `${resolvedDevice}\\`;
            }
        }
        assertPath(path);
        const len = path.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator(code)) {
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for(; j < len; ++j){
                        if (isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for(; j < len; ++j){
                            if (!isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for(; j < len; ++j){
                                if (isPathSeparator(path.charCodeAt(j))) break;
                            }
                            if (j === len) {
                                device = `\\\\${firstPart}\\${path.slice(last)}`;
                                rootEnd = j;
                            } else if (j !== last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === 58) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator(path.charCodeAt(2))) {
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            isAbsolute = true;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        } else if (j !== last) {
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute) tail = ".";
    if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return false;
    const code = path.charCodeAt(0);
    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDeviceRoot(code)) {
        if (len > 2 && path.charCodeAt(1) === 58) {
            if (isPathSeparator(path.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i = 0; i < pathsCount; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (joined === undefined) joined = firstPart = path;
            else joined += `\\${path}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart != null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
}
function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    const fromOrig = resolve(from);
    const toOrig = resolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92) {
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92) {
                    lastCommonSep = i;
                } else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath(path) {
    if (typeof path !== "string") return path;
    if (path.length === 0) return "";
    const resolvedPath = resolve(path);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path;
}
function dirname(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return path;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return path;
    }
    for(let i = len - 1; i >= offset; --i){
        if (isPathSeparator(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path.slice(0, end);
}
function basename(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= start; --i){
            const code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if ((--extIdx) === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= start; --i){
            if (isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname(path) {
    assertPath(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 && path.charCodeAt(1) === 58 && isWindowsDeviceRoot(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i = path.length - 1; i >= start; --i){
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("\\", pathObject);
}
function parse(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        } else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        ret.root = ret.dir = path;
        return ret;
    }
    if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= rootEnd; --i){
        code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path.slice(startPart, end);
        }
    } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod = function() {
    return {
        sep: sep,
        delimiter: delimiter,
        resolve: resolve,
        normalize: normalize,
        isAbsolute: isAbsolute,
        join: join,
        relative: relative,
        toNamespacedPath: toNamespacedPath,
        dirname: dirname,
        basename: basename,
        extname: extname,
        format: format,
        parse: parse,
        fromFileUrl: fromFileUrl,
        toFileUrl: toFileUrl
    };
}();
const sep1 = "/";
const delimiter1 = ":";
function resolve1(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
        let path;
        if (i >= 0) path = pathSegments[i];
        else {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno.cwd();
        }
        assertPath(path);
        if (path.length === 0) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const isAbsolute1 = path.charCodeAt(0) === 47;
    const trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeString(path, !isAbsolute1, "/", isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute1) path = ".";
    if (path.length > 0 && trailingSeparator) path += "/";
    if (isAbsolute1) return `/${path}`;
    return path;
}
function isAbsolute1(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
}
function join1(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i = 0, len = paths.length; i < len; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (!joined) joined = path;
            else joined += `/${path}`;
        }
    }
    if (!joined) return ".";
    return normalize1(joined);
}
function relative1(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = resolve1(from);
    to = resolve1(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                    lastCommonSep = i;
                } else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
    }
    let out = "";
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath1(path) {
    return path;
}
function dirname1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const hasRoot = path.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i = path.length - 1; i >= 1; --i){
        if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path.slice(0, end);
}
function basename1(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= 0; --i){
            const code = path.charCodeAt(i);
            if (code === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if ((--extIdx) === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= 0; --i){
            if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname1(path) {
    assertPath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path.length - 1; i >= 0; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format1(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("/", pathObject);
}
function parse1(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path.length === 0) return ret;
    const isAbsolute2 = path.charCodeAt(0) === 47;
    let start;
    if (isAbsolute2) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= start; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute2) {
                ret.base = ret.name = path.slice(1, end);
            } else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute2) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute2) ret.dir = "/";
    return ret;
}
function fromFileUrl1(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl1(path) {
    if (!isAbsolute1(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const mod1 = function() {
    return {
        sep: sep1,
        delimiter: delimiter1,
        resolve: resolve1,
        normalize: normalize1,
        isAbsolute: isAbsolute1,
        join: join1,
        relative: relative1,
        toNamespacedPath: toNamespacedPath1,
        dirname: dirname1,
        basename: basename1,
        extname: extname1,
        format: format1,
        parse: parse1,
        fromFileUrl: fromFileUrl1,
        toFileUrl: toFileUrl1
    };
}();
const path = isWindows ? mod : mod1;
const { basename: basename2 , delimiter: delimiter2 , dirname: dirname2 , extname: extname2 , format: format2 , fromFileUrl: fromFileUrl2 , isAbsolute: isAbsolute2 , join: join2 , normalize: normalize2 , parse: parse2 , relative: relative2 , resolve: resolve2 , sep: sep2 , toFileUrl: toFileUrl2 , toNamespacedPath: toNamespacedPath2 ,  } = path;
const db = JSON.parse(`{\n  "application/1d-interleaved-parityfec": {\n    "source": "iana"\n  },\n  "application/3gpdash-qoe-report+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/3gpp-ims+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/a2l": {\n    "source": "iana"\n  },\n  "application/activemessage": {\n    "source": "iana"\n  },\n  "application/activity+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-costmap+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-costmapfilter+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-directory+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-endpointcost+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-endpointcostparams+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-endpointprop+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-endpointpropparams+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-error+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-networkmap+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-networkmapfilter+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-updatestreamcontrol+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/alto-updatestreamparams+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/aml": {\n    "source": "iana"\n  },\n  "application/andrew-inset": {\n    "source": "iana",\n    "extensions": ["ez"]\n  },\n  "application/applefile": {\n    "source": "iana"\n  },\n  "application/applixware": {\n    "source": "apache",\n    "extensions": ["aw"]\n  },\n  "application/atf": {\n    "source": "iana"\n  },\n  "application/atfx": {\n    "source": "iana"\n  },\n  "application/atom+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["atom"]\n  },\n  "application/atomcat+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["atomcat"]\n  },\n  "application/atomdeleted+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["atomdeleted"]\n  },\n  "application/atomicmail": {\n    "source": "iana"\n  },\n  "application/atomsvc+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["atomsvc"]\n  },\n  "application/atsc-dwd+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["dwd"]\n  },\n  "application/atsc-dynamic-event-message": {\n    "source": "iana"\n  },\n  "application/atsc-held+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["held"]\n  },\n  "application/atsc-rdt+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/atsc-rsat+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rsat"]\n  },\n  "application/atxml": {\n    "source": "iana"\n  },\n  "application/auth-policy+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/bacnet-xdd+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/batch-smtp": {\n    "source": "iana"\n  },\n  "application/bdoc": {\n    "compressible": false,\n    "extensions": ["bdoc"]\n  },\n  "application/beep+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/calendar+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/calendar+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xcs"]\n  },\n  "application/call-completion": {\n    "source": "iana"\n  },\n  "application/cals-1840": {\n    "source": "iana"\n  },\n  "application/captive+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/cbor": {\n    "source": "iana"\n  },\n  "application/cbor-seq": {\n    "source": "iana"\n  },\n  "application/cccex": {\n    "source": "iana"\n  },\n  "application/ccmp+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/ccxml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ccxml"]\n  },\n  "application/cdfx+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["cdfx"]\n  },\n  "application/cdmi-capability": {\n    "source": "iana",\n    "extensions": ["cdmia"]\n  },\n  "application/cdmi-container": {\n    "source": "iana",\n    "extensions": ["cdmic"]\n  },\n  "application/cdmi-domain": {\n    "source": "iana",\n    "extensions": ["cdmid"]\n  },\n  "application/cdmi-object": {\n    "source": "iana",\n    "extensions": ["cdmio"]\n  },\n  "application/cdmi-queue": {\n    "source": "iana",\n    "extensions": ["cdmiq"]\n  },\n  "application/cdni": {\n    "source": "iana"\n  },\n  "application/cea": {\n    "source": "iana"\n  },\n  "application/cea-2018+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/cellml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/cfw": {\n    "source": "iana"\n  },\n  "application/clr": {\n    "source": "iana"\n  },\n  "application/clue+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/clue_info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/cms": {\n    "source": "iana"\n  },\n  "application/cnrp+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/coap-group+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/coap-payload": {\n    "source": "iana"\n  },\n  "application/commonground": {\n    "source": "iana"\n  },\n  "application/conference-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/cose": {\n    "source": "iana"\n  },\n  "application/cose-key": {\n    "source": "iana"\n  },\n  "application/cose-key-set": {\n    "source": "iana"\n  },\n  "application/cpl+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/csrattrs": {\n    "source": "iana"\n  },\n  "application/csta+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/cstadata+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/csvm+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/cu-seeme": {\n    "source": "apache",\n    "extensions": ["cu"]\n  },\n  "application/cwt": {\n    "source": "iana"\n  },\n  "application/cybercash": {\n    "source": "iana"\n  },\n  "application/dart": {\n    "compressible": true\n  },\n  "application/dash+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mpd"]\n  },\n  "application/dashdelta": {\n    "source": "iana"\n  },\n  "application/davmount+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["davmount"]\n  },\n  "application/dca-rft": {\n    "source": "iana"\n  },\n  "application/dcd": {\n    "source": "iana"\n  },\n  "application/dec-dx": {\n    "source": "iana"\n  },\n  "application/dialog-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/dicom": {\n    "source": "iana"\n  },\n  "application/dicom+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/dicom+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/dii": {\n    "source": "iana"\n  },\n  "application/dit": {\n    "source": "iana"\n  },\n  "application/dns": {\n    "source": "iana"\n  },\n  "application/dns+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/dns-message": {\n    "source": "iana"\n  },\n  "application/docbook+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["dbk"]\n  },\n  "application/dots+cbor": {\n    "source": "iana"\n  },\n  "application/dskpp+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/dssc+der": {\n    "source": "iana",\n    "extensions": ["dssc"]\n  },\n  "application/dssc+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xdssc"]\n  },\n  "application/dvcs": {\n    "source": "iana"\n  },\n  "application/ecmascript": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ecma","es"]\n  },\n  "application/edi-consent": {\n    "source": "iana"\n  },\n  "application/edi-x12": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/edifact": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/efi": {\n    "source": "iana"\n  },\n  "application/elm+json": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/elm+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emergencycalldata.cap+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/emergencycalldata.comment+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emergencycalldata.control+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emergencycalldata.deviceinfo+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emergencycalldata.ecall.msd": {\n    "source": "iana"\n  },\n  "application/emergencycalldata.providerinfo+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emergencycalldata.serviceinfo+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emergencycalldata.subscriberinfo+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emergencycalldata.veds+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/emma+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["emma"]\n  },\n  "application/emotionml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["emotionml"]\n  },\n  "application/encaprtp": {\n    "source": "iana"\n  },\n  "application/epp+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/epub+zip": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["epub"]\n  },\n  "application/eshop": {\n    "source": "iana"\n  },\n  "application/exi": {\n    "source": "iana",\n    "extensions": ["exi"]\n  },\n  "application/expect-ct-report+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/fastinfoset": {\n    "source": "iana"\n  },\n  "application/fastsoap": {\n    "source": "iana"\n  },\n  "application/fdt+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["fdt"]\n  },\n  "application/fhir+json": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/fhir+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/fido.trusted-apps+json": {\n    "compressible": true\n  },\n  "application/fits": {\n    "source": "iana"\n  },\n  "application/flexfec": {\n    "source": "iana"\n  },\n  "application/font-sfnt": {\n    "source": "iana"\n  },\n  "application/font-tdpfr": {\n    "source": "iana",\n    "extensions": ["pfr"]\n  },\n  "application/font-woff": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/framework-attributes+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/geo+json": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["geojson"]\n  },\n  "application/geo+json-seq": {\n    "source": "iana"\n  },\n  "application/geopackage+sqlite3": {\n    "source": "iana"\n  },\n  "application/geoxacml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/gltf-buffer": {\n    "source": "iana"\n  },\n  "application/gml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["gml"]\n  },\n  "application/gpx+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["gpx"]\n  },\n  "application/gxf": {\n    "source": "apache",\n    "extensions": ["gxf"]\n  },\n  "application/gzip": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["gz"]\n  },\n  "application/h224": {\n    "source": "iana"\n  },\n  "application/held+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/hjson": {\n    "extensions": ["hjson"]\n  },\n  "application/http": {\n    "source": "iana"\n  },\n  "application/hyperstudio": {\n    "source": "iana",\n    "extensions": ["stk"]\n  },\n  "application/ibe-key-request+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/ibe-pkg-reply+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/ibe-pp-data": {\n    "source": "iana"\n  },\n  "application/iges": {\n    "source": "iana"\n  },\n  "application/im-iscomposing+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/index": {\n    "source": "iana"\n  },\n  "application/index.cmd": {\n    "source": "iana"\n  },\n  "application/index.obj": {\n    "source": "iana"\n  },\n  "application/index.response": {\n    "source": "iana"\n  },\n  "application/index.vnd": {\n    "source": "iana"\n  },\n  "application/inkml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ink","inkml"]\n  },\n  "application/iotp": {\n    "source": "iana"\n  },\n  "application/ipfix": {\n    "source": "iana",\n    "extensions": ["ipfix"]\n  },\n  "application/ipp": {\n    "source": "iana"\n  },\n  "application/isup": {\n    "source": "iana"\n  },\n  "application/its+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["its"]\n  },\n  "application/java-archive": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["jar","war","ear"]\n  },\n  "application/java-serialized-object": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["ser"]\n  },\n  "application/java-vm": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["class"]\n  },\n  "application/javascript": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["js","mjs"]\n  },\n  "application/jf2feed+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/jose": {\n    "source": "iana"\n  },\n  "application/jose+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/jrd+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/jscalendar+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/json": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["json","map"]\n  },\n  "application/json-patch+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/json-seq": {\n    "source": "iana"\n  },\n  "application/json5": {\n    "extensions": ["json5"]\n  },\n  "application/jsonml+json": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["jsonml"]\n  },\n  "application/jwk+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/jwk-set+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/jwt": {\n    "source": "iana"\n  },\n  "application/kpml-request+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/kpml-response+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/ld+json": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["jsonld"]\n  },\n  "application/lgr+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["lgr"]\n  },\n  "application/link-format": {\n    "source": "iana"\n  },\n  "application/load-control+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/lost+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["lostxml"]\n  },\n  "application/lostsync+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/lpf+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/lxf": {\n    "source": "iana"\n  },\n  "application/mac-binhex40": {\n    "source": "iana",\n    "extensions": ["hqx"]\n  },\n  "application/mac-compactpro": {\n    "source": "apache",\n    "extensions": ["cpt"]\n  },\n  "application/macwriteii": {\n    "source": "iana"\n  },\n  "application/mads+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mads"]\n  },\n  "application/manifest+json": {\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["webmanifest"]\n  },\n  "application/marc": {\n    "source": "iana",\n    "extensions": ["mrc"]\n  },\n  "application/marcxml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mrcx"]\n  },\n  "application/mathematica": {\n    "source": "iana",\n    "extensions": ["ma","nb","mb"]\n  },\n  "application/mathml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mathml"]\n  },\n  "application/mathml-content+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mathml-presentation+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-associated-procedure-description+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-deregister+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-envelope+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-msk+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-msk-response+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-protection-description+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-reception-report+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-register+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-register-response+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-schedule+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbms-user-service-description+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mbox": {\n    "source": "iana",\n    "extensions": ["mbox"]\n  },\n  "application/media-policy-dataset+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/media_control+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/mediaservercontrol+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mscml"]\n  },\n  "application/merge-patch+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/metalink+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["metalink"]\n  },\n  "application/metalink4+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["meta4"]\n  },\n  "application/mets+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mets"]\n  },\n  "application/mf4": {\n    "source": "iana"\n  },\n  "application/mikey": {\n    "source": "iana"\n  },\n  "application/mipc": {\n    "source": "iana"\n  },\n  "application/mmt-aei+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["maei"]\n  },\n  "application/mmt-usd+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["musd"]\n  },\n  "application/mods+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mods"]\n  },\n  "application/moss-keys": {\n    "source": "iana"\n  },\n  "application/moss-signature": {\n    "source": "iana"\n  },\n  "application/mosskey-data": {\n    "source": "iana"\n  },\n  "application/mosskey-request": {\n    "source": "iana"\n  },\n  "application/mp21": {\n    "source": "iana",\n    "extensions": ["m21","mp21"]\n  },\n  "application/mp4": {\n    "source": "iana",\n    "extensions": ["mp4s","m4p"]\n  },\n  "application/mpeg4-generic": {\n    "source": "iana"\n  },\n  "application/mpeg4-iod": {\n    "source": "iana"\n  },\n  "application/mpeg4-iod-xmt": {\n    "source": "iana"\n  },\n  "application/mrb-consumer+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xdf"]\n  },\n  "application/mrb-publish+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xdf"]\n  },\n  "application/msc-ivr+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/msc-mixer+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/msword": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["doc","dot"]\n  },\n  "application/mud+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/multipart-core": {\n    "source": "iana"\n  },\n  "application/mxf": {\n    "source": "iana",\n    "extensions": ["mxf"]\n  },\n  "application/n-quads": {\n    "source": "iana",\n    "extensions": ["nq"]\n  },\n  "application/n-triples": {\n    "source": "iana",\n    "extensions": ["nt"]\n  },\n  "application/nasdata": {\n    "source": "iana"\n  },\n  "application/news-checkgroups": {\n    "source": "iana",\n    "charset": "US-ASCII"\n  },\n  "application/news-groupinfo": {\n    "source": "iana",\n    "charset": "US-ASCII"\n  },\n  "application/news-transmission": {\n    "source": "iana"\n  },\n  "application/nlsml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/node": {\n    "source": "iana",\n    "extensions": ["cjs"]\n  },\n  "application/nss": {\n    "source": "iana"\n  },\n  "application/ocsp-request": {\n    "source": "iana"\n  },\n  "application/ocsp-response": {\n    "source": "iana"\n  },\n  "application/octet-stream": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]\n  },\n  "application/oda": {\n    "source": "iana",\n    "extensions": ["oda"]\n  },\n  "application/odm+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/odx": {\n    "source": "iana"\n  },\n  "application/oebps-package+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["opf"]\n  },\n  "application/ogg": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["ogx"]\n  },\n  "application/omdoc+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["omdoc"]\n  },\n  "application/onenote": {\n    "source": "apache",\n    "extensions": ["onetoc","onetoc2","onetmp","onepkg"]\n  },\n  "application/opc-nodeset+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/oscore": {\n    "source": "iana"\n  },\n  "application/oxps": {\n    "source": "iana",\n    "extensions": ["oxps"]\n  },\n  "application/p2p-overlay+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["relo"]\n  },\n  "application/parityfec": {\n    "source": "iana"\n  },\n  "application/passport": {\n    "source": "iana"\n  },\n  "application/patch-ops-error+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xer"]\n  },\n  "application/pdf": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["pdf"]\n  },\n  "application/pdx": {\n    "source": "iana"\n  },\n  "application/pem-certificate-chain": {\n    "source": "iana"\n  },\n  "application/pgp-encrypted": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["pgp"]\n  },\n  "application/pgp-keys": {\n    "source": "iana"\n  },\n  "application/pgp-signature": {\n    "source": "iana",\n    "extensions": ["asc","sig"]\n  },\n  "application/pics-rules": {\n    "source": "apache",\n    "extensions": ["prf"]\n  },\n  "application/pidf+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/pidf-diff+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/pkcs10": {\n    "source": "iana",\n    "extensions": ["p10"]\n  },\n  "application/pkcs12": {\n    "source": "iana"\n  },\n  "application/pkcs7-mime": {\n    "source": "iana",\n    "extensions": ["p7m","p7c"]\n  },\n  "application/pkcs7-signature": {\n    "source": "iana",\n    "extensions": ["p7s"]\n  },\n  "application/pkcs8": {\n    "source": "iana",\n    "extensions": ["p8"]\n  },\n  "application/pkcs8-encrypted": {\n    "source": "iana"\n  },\n  "application/pkix-attr-cert": {\n    "source": "iana",\n    "extensions": ["ac"]\n  },\n  "application/pkix-cert": {\n    "source": "iana",\n    "extensions": ["cer"]\n  },\n  "application/pkix-crl": {\n    "source": "iana",\n    "extensions": ["crl"]\n  },\n  "application/pkix-pkipath": {\n    "source": "iana",\n    "extensions": ["pkipath"]\n  },\n  "application/pkixcmp": {\n    "source": "iana",\n    "extensions": ["pki"]\n  },\n  "application/pls+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["pls"]\n  },\n  "application/poc-settings+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/postscript": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ai","eps","ps"]\n  },\n  "application/ppsp-tracker+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/problem+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/problem+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/provenance+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["provx"]\n  },\n  "application/prs.alvestrand.titrax-sheet": {\n    "source": "iana"\n  },\n  "application/prs.cww": {\n    "source": "iana",\n    "extensions": ["cww"]\n  },\n  "application/prs.cyn": {\n    "source": "iana",\n    "charset": "7-BIT"\n  },\n  "application/prs.hpub+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/prs.nprend": {\n    "source": "iana"\n  },\n  "application/prs.plucker": {\n    "source": "iana"\n  },\n  "application/prs.rdf-xml-crypt": {\n    "source": "iana"\n  },\n  "application/prs.xsf+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/pskc+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["pskcxml"]\n  },\n  "application/pvd+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/qsig": {\n    "source": "iana"\n  },\n  "application/raml+yaml": {\n    "compressible": true,\n    "extensions": ["raml"]\n  },\n  "application/raptorfec": {\n    "source": "iana"\n  },\n  "application/rdap+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/rdf+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rdf","owl"]\n  },\n  "application/reginfo+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rif"]\n  },\n  "application/relax-ng-compact-syntax": {\n    "source": "iana",\n    "extensions": ["rnc"]\n  },\n  "application/remote-printing": {\n    "source": "iana"\n  },\n  "application/reputon+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/resource-lists+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rl"]\n  },\n  "application/resource-lists-diff+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rld"]\n  },\n  "application/rfc+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/riscos": {\n    "source": "iana"\n  },\n  "application/rlmi+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/rls-services+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rs"]\n  },\n  "application/route-apd+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rapd"]\n  },\n  "application/route-s-tsid+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["sls"]\n  },\n  "application/route-usd+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rusd"]\n  },\n  "application/rpki-ghostbusters": {\n    "source": "iana",\n    "extensions": ["gbr"]\n  },\n  "application/rpki-manifest": {\n    "source": "iana",\n    "extensions": ["mft"]\n  },\n  "application/rpki-publication": {\n    "source": "iana"\n  },\n  "application/rpki-roa": {\n    "source": "iana",\n    "extensions": ["roa"]\n  },\n  "application/rpki-updown": {\n    "source": "iana"\n  },\n  "application/rsd+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["rsd"]\n  },\n  "application/rss+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["rss"]\n  },\n  "application/rtf": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rtf"]\n  },\n  "application/rtploopback": {\n    "source": "iana"\n  },\n  "application/rtx": {\n    "source": "iana"\n  },\n  "application/samlassertion+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/samlmetadata+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/sarif+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/sbe": {\n    "source": "iana"\n  },\n  "application/sbml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["sbml"]\n  },\n  "application/scaip+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/scim+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/scvp-cv-request": {\n    "source": "iana",\n    "extensions": ["scq"]\n  },\n  "application/scvp-cv-response": {\n    "source": "iana",\n    "extensions": ["scs"]\n  },\n  "application/scvp-vp-request": {\n    "source": "iana",\n    "extensions": ["spq"]\n  },\n  "application/scvp-vp-response": {\n    "source": "iana",\n    "extensions": ["spp"]\n  },\n  "application/sdp": {\n    "source": "iana",\n    "extensions": ["sdp"]\n  },\n  "application/secevent+jwt": {\n    "source": "iana"\n  },\n  "application/senml+cbor": {\n    "source": "iana"\n  },\n  "application/senml+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/senml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["senmlx"]\n  },\n  "application/senml-etch+cbor": {\n    "source": "iana"\n  },\n  "application/senml-etch+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/senml-exi": {\n    "source": "iana"\n  },\n  "application/sensml+cbor": {\n    "source": "iana"\n  },\n  "application/sensml+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/sensml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["sensmlx"]\n  },\n  "application/sensml-exi": {\n    "source": "iana"\n  },\n  "application/sep+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/sep-exi": {\n    "source": "iana"\n  },\n  "application/session-info": {\n    "source": "iana"\n  },\n  "application/set-payment": {\n    "source": "iana"\n  },\n  "application/set-payment-initiation": {\n    "source": "iana",\n    "extensions": ["setpay"]\n  },\n  "application/set-registration": {\n    "source": "iana"\n  },\n  "application/set-registration-initiation": {\n    "source": "iana",\n    "extensions": ["setreg"]\n  },\n  "application/sgml": {\n    "source": "iana"\n  },\n  "application/sgml-open-catalog": {\n    "source": "iana"\n  },\n  "application/shf+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["shf"]\n  },\n  "application/sieve": {\n    "source": "iana",\n    "extensions": ["siv","sieve"]\n  },\n  "application/simple-filter+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/simple-message-summary": {\n    "source": "iana"\n  },\n  "application/simplesymbolcontainer": {\n    "source": "iana"\n  },\n  "application/sipc": {\n    "source": "iana"\n  },\n  "application/slate": {\n    "source": "iana"\n  },\n  "application/smil": {\n    "source": "iana"\n  },\n  "application/smil+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["smi","smil"]\n  },\n  "application/smpte336m": {\n    "source": "iana"\n  },\n  "application/soap+fastinfoset": {\n    "source": "iana"\n  },\n  "application/soap+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/sparql-query": {\n    "source": "iana",\n    "extensions": ["rq"]\n  },\n  "application/sparql-results+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["srx"]\n  },\n  "application/spirits-event+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/sql": {\n    "source": "iana"\n  },\n  "application/srgs": {\n    "source": "iana",\n    "extensions": ["gram"]\n  },\n  "application/srgs+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["grxml"]\n  },\n  "application/sru+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["sru"]\n  },\n  "application/ssdl+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["ssdl"]\n  },\n  "application/ssml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ssml"]\n  },\n  "application/stix+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/swid+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["swidtag"]\n  },\n  "application/tamp-apex-update": {\n    "source": "iana"\n  },\n  "application/tamp-apex-update-confirm": {\n    "source": "iana"\n  },\n  "application/tamp-community-update": {\n    "source": "iana"\n  },\n  "application/tamp-community-update-confirm": {\n    "source": "iana"\n  },\n  "application/tamp-error": {\n    "source": "iana"\n  },\n  "application/tamp-sequence-adjust": {\n    "source": "iana"\n  },\n  "application/tamp-sequence-adjust-confirm": {\n    "source": "iana"\n  },\n  "application/tamp-status-query": {\n    "source": "iana"\n  },\n  "application/tamp-status-response": {\n    "source": "iana"\n  },\n  "application/tamp-update": {\n    "source": "iana"\n  },\n  "application/tamp-update-confirm": {\n    "source": "iana"\n  },\n  "application/tar": {\n    "compressible": true\n  },\n  "application/taxii+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/td+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/tei+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["tei","teicorpus"]\n  },\n  "application/tetra_isi": {\n    "source": "iana"\n  },\n  "application/thraud+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["tfi"]\n  },\n  "application/timestamp-query": {\n    "source": "iana"\n  },\n  "application/timestamp-reply": {\n    "source": "iana"\n  },\n  "application/timestamped-data": {\n    "source": "iana",\n    "extensions": ["tsd"]\n  },\n  "application/tlsrpt+gzip": {\n    "source": "iana"\n  },\n  "application/tlsrpt+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/tnauthlist": {\n    "source": "iana"\n  },\n  "application/toml": {\n    "compressible": true,\n    "extensions": ["toml"]\n  },\n  "application/trickle-ice-sdpfrag": {\n    "source": "iana"\n  },\n  "application/trig": {\n    "source": "iana"\n  },\n  "application/ttml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ttml"]\n  },\n  "application/tve-trigger": {\n    "source": "iana"\n  },\n  "application/tzif": {\n    "source": "iana"\n  },\n  "application/tzif-leap": {\n    "source": "iana"\n  },\n  "application/ubjson": {\n    "compressible": false,\n    "extensions": ["ubj"]\n  },\n  "application/ulpfec": {\n    "source": "iana"\n  },\n  "application/urc-grpsheet+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/urc-ressheet+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rsheet"]\n  },\n  "application/urc-targetdesc+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["td"]\n  },\n  "application/urc-uisocketdesc+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vcard+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vcard+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vemmi": {\n    "source": "iana"\n  },\n  "application/vividence.scriptfile": {\n    "source": "apache"\n  },\n  "application/vnd.1000minds.decision-model+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["1km"]\n  },\n  "application/vnd.3gpp-prose+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp-prose-pc3ch+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp-v2x-local-service-information": {\n    "source": "iana"\n  },\n  "application/vnd.3gpp.access-transfer-events+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.bsf+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.gmop+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.interworking-data": {\n    "source": "iana"\n  },\n  "application/vnd.3gpp.mc-signalling-ear": {\n    "source": "iana"\n  },\n  "application/vnd.3gpp.mcdata-affiliation-command+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcdata-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcdata-payload": {\n    "source": "iana"\n  },\n  "application/vnd.3gpp.mcdata-service-config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcdata-signalling": {\n    "source": "iana"\n  },\n  "application/vnd.3gpp.mcdata-ue-config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcdata-user-profile+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-affiliation-command+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-floor-request+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-location-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-service-config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-signed+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-ue-config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-ue-init-config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcptt-user-profile+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-location-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-service-config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-transmission-request+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-ue-config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mcvideo-user-profile+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.mid-call+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.pic-bw-large": {\n    "source": "iana",\n    "extensions": ["plb"]\n  },\n  "application/vnd.3gpp.pic-bw-small": {\n    "source": "iana",\n    "extensions": ["psb"]\n  },\n  "application/vnd.3gpp.pic-bw-var": {\n    "source": "iana",\n    "extensions": ["pvb"]\n  },\n  "application/vnd.3gpp.sms": {\n    "source": "iana"\n  },\n  "application/vnd.3gpp.sms+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.srvcc-ext+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.srvcc-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.state-and-event-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp.ussd+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp2.bcmcsinfo+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.3gpp2.sms": {\n    "source": "iana"\n  },\n  "application/vnd.3gpp2.tcap": {\n    "source": "iana",\n    "extensions": ["tcap"]\n  },\n  "application/vnd.3lightssoftware.imagescal": {\n    "source": "iana"\n  },\n  "application/vnd.3m.post-it-notes": {\n    "source": "iana",\n    "extensions": ["pwn"]\n  },\n  "application/vnd.accpac.simply.aso": {\n    "source": "iana",\n    "extensions": ["aso"]\n  },\n  "application/vnd.accpac.simply.imp": {\n    "source": "iana",\n    "extensions": ["imp"]\n  },\n  "application/vnd.acucobol": {\n    "source": "iana",\n    "extensions": ["acu"]\n  },\n  "application/vnd.acucorp": {\n    "source": "iana",\n    "extensions": ["atc","acutc"]\n  },\n  "application/vnd.adobe.air-application-installer-package+zip": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["air"]\n  },\n  "application/vnd.adobe.flash.movie": {\n    "source": "iana"\n  },\n  "application/vnd.adobe.formscentral.fcdt": {\n    "source": "iana",\n    "extensions": ["fcdt"]\n  },\n  "application/vnd.adobe.fxp": {\n    "source": "iana",\n    "extensions": ["fxp","fxpl"]\n  },\n  "application/vnd.adobe.partial-upload": {\n    "source": "iana"\n  },\n  "application/vnd.adobe.xdp+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xdp"]\n  },\n  "application/vnd.adobe.xfdf": {\n    "source": "iana",\n    "extensions": ["xfdf"]\n  },\n  "application/vnd.aether.imp": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.afplinedata": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.afplinedata-pagedef": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.cmoca-cmresource": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.foca-charset": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.foca-codedfont": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.foca-codepage": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.modca": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.modca-cmtable": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.modca-formdef": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.modca-mediummap": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.modca-objectcontainer": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.modca-overlay": {\n    "source": "iana"\n  },\n  "application/vnd.afpc.modca-pagesegment": {\n    "source": "iana"\n  },\n  "application/vnd.ah-barcode": {\n    "source": "iana"\n  },\n  "application/vnd.ahead.space": {\n    "source": "iana",\n    "extensions": ["ahead"]\n  },\n  "application/vnd.airzip.filesecure.azf": {\n    "source": "iana",\n    "extensions": ["azf"]\n  },\n  "application/vnd.airzip.filesecure.azs": {\n    "source": "iana",\n    "extensions": ["azs"]\n  },\n  "application/vnd.amadeus+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.amazon.ebook": {\n    "source": "apache",\n    "extensions": ["azw"]\n  },\n  "application/vnd.amazon.mobi8-ebook": {\n    "source": "iana"\n  },\n  "application/vnd.americandynamics.acc": {\n    "source": "iana",\n    "extensions": ["acc"]\n  },\n  "application/vnd.amiga.ami": {\n    "source": "iana",\n    "extensions": ["ami"]\n  },\n  "application/vnd.amundsen.maze+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.android.ota": {\n    "source": "iana"\n  },\n  "application/vnd.android.package-archive": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["apk"]\n  },\n  "application/vnd.anki": {\n    "source": "iana"\n  },\n  "application/vnd.anser-web-certificate-issue-initiation": {\n    "source": "iana",\n    "extensions": ["cii"]\n  },\n  "application/vnd.anser-web-funds-transfer-initiation": {\n    "source": "apache",\n    "extensions": ["fti"]\n  },\n  "application/vnd.antix.game-component": {\n    "source": "iana",\n    "extensions": ["atx"]\n  },\n  "application/vnd.apache.thrift.binary": {\n    "source": "iana"\n  },\n  "application/vnd.apache.thrift.compact": {\n    "source": "iana"\n  },\n  "application/vnd.apache.thrift.json": {\n    "source": "iana"\n  },\n  "application/vnd.api+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.aplextor.warrp+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.apothekende.reservation+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.apple.installer+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mpkg"]\n  },\n  "application/vnd.apple.keynote": {\n    "source": "iana",\n    "extensions": ["key"]\n  },\n  "application/vnd.apple.mpegurl": {\n    "source": "iana",\n    "extensions": ["m3u8"]\n  },\n  "application/vnd.apple.numbers": {\n    "source": "iana",\n    "extensions": ["numbers"]\n  },\n  "application/vnd.apple.pages": {\n    "source": "iana",\n    "extensions": ["pages"]\n  },\n  "application/vnd.apple.pkpass": {\n    "compressible": false,\n    "extensions": ["pkpass"]\n  },\n  "application/vnd.arastra.swi": {\n    "source": "iana"\n  },\n  "application/vnd.aristanetworks.swi": {\n    "source": "iana",\n    "extensions": ["swi"]\n  },\n  "application/vnd.artisan+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.artsquare": {\n    "source": "iana"\n  },\n  "application/vnd.astraea-software.iota": {\n    "source": "iana",\n    "extensions": ["iota"]\n  },\n  "application/vnd.audiograph": {\n    "source": "iana",\n    "extensions": ["aep"]\n  },\n  "application/vnd.autopackage": {\n    "source": "iana"\n  },\n  "application/vnd.avalon+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.avistar+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.balsamiq.bmml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["bmml"]\n  },\n  "application/vnd.balsamiq.bmpr": {\n    "source": "iana"\n  },\n  "application/vnd.banana-accounting": {\n    "source": "iana"\n  },\n  "application/vnd.bbf.usp.error": {\n    "source": "iana"\n  },\n  "application/vnd.bbf.usp.msg": {\n    "source": "iana"\n  },\n  "application/vnd.bbf.usp.msg+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.bekitzur-stech+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.bint.med-content": {\n    "source": "iana"\n  },\n  "application/vnd.biopax.rdf+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.blink-idb-value-wrapper": {\n    "source": "iana"\n  },\n  "application/vnd.blueice.multipass": {\n    "source": "iana",\n    "extensions": ["mpm"]\n  },\n  "application/vnd.bluetooth.ep.oob": {\n    "source": "iana"\n  },\n  "application/vnd.bluetooth.le.oob": {\n    "source": "iana"\n  },\n  "application/vnd.bmi": {\n    "source": "iana",\n    "extensions": ["bmi"]\n  },\n  "application/vnd.bpf": {\n    "source": "iana"\n  },\n  "application/vnd.bpf3": {\n    "source": "iana"\n  },\n  "application/vnd.businessobjects": {\n    "source": "iana",\n    "extensions": ["rep"]\n  },\n  "application/vnd.byu.uapi+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.cab-jscript": {\n    "source": "iana"\n  },\n  "application/vnd.canon-cpdl": {\n    "source": "iana"\n  },\n  "application/vnd.canon-lips": {\n    "source": "iana"\n  },\n  "application/vnd.capasystems-pg+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.cendio.thinlinc.clientconf": {\n    "source": "iana"\n  },\n  "application/vnd.century-systems.tcp_stream": {\n    "source": "iana"\n  },\n  "application/vnd.chemdraw+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["cdxml"]\n  },\n  "application/vnd.chess-pgn": {\n    "source": "iana"\n  },\n  "application/vnd.chipnuts.karaoke-mmd": {\n    "source": "iana",\n    "extensions": ["mmd"]\n  },\n  "application/vnd.ciedi": {\n    "source": "iana"\n  },\n  "application/vnd.cinderella": {\n    "source": "iana",\n    "extensions": ["cdy"]\n  },\n  "application/vnd.cirpack.isdn-ext": {\n    "source": "iana"\n  },\n  "application/vnd.citationstyles.style+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["csl"]\n  },\n  "application/vnd.claymore": {\n    "source": "iana",\n    "extensions": ["cla"]\n  },\n  "application/vnd.cloanto.rp9": {\n    "source": "iana",\n    "extensions": ["rp9"]\n  },\n  "application/vnd.clonk.c4group": {\n    "source": "iana",\n    "extensions": ["c4g","c4d","c4f","c4p","c4u"]\n  },\n  "application/vnd.cluetrust.cartomobile-config": {\n    "source": "iana",\n    "extensions": ["c11amc"]\n  },\n  "application/vnd.cluetrust.cartomobile-config-pkg": {\n    "source": "iana",\n    "extensions": ["c11amz"]\n  },\n  "application/vnd.coffeescript": {\n    "source": "iana"\n  },\n  "application/vnd.collabio.xodocuments.document": {\n    "source": "iana"\n  },\n  "application/vnd.collabio.xodocuments.document-template": {\n    "source": "iana"\n  },\n  "application/vnd.collabio.xodocuments.presentation": {\n    "source": "iana"\n  },\n  "application/vnd.collabio.xodocuments.presentation-template": {\n    "source": "iana"\n  },\n  "application/vnd.collabio.xodocuments.spreadsheet": {\n    "source": "iana"\n  },\n  "application/vnd.collabio.xodocuments.spreadsheet-template": {\n    "source": "iana"\n  },\n  "application/vnd.collection+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.collection.doc+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.collection.next+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.comicbook+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.comicbook-rar": {\n    "source": "iana"\n  },\n  "application/vnd.commerce-battelle": {\n    "source": "iana"\n  },\n  "application/vnd.commonspace": {\n    "source": "iana",\n    "extensions": ["csp"]\n  },\n  "application/vnd.contact.cmsg": {\n    "source": "iana",\n    "extensions": ["cdbcmsg"]\n  },\n  "application/vnd.coreos.ignition+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.cosmocaller": {\n    "source": "iana",\n    "extensions": ["cmc"]\n  },\n  "application/vnd.crick.clicker": {\n    "source": "iana",\n    "extensions": ["clkx"]\n  },\n  "application/vnd.crick.clicker.keyboard": {\n    "source": "iana",\n    "extensions": ["clkk"]\n  },\n  "application/vnd.crick.clicker.palette": {\n    "source": "iana",\n    "extensions": ["clkp"]\n  },\n  "application/vnd.crick.clicker.template": {\n    "source": "iana",\n    "extensions": ["clkt"]\n  },\n  "application/vnd.crick.clicker.wordbank": {\n    "source": "iana",\n    "extensions": ["clkw"]\n  },\n  "application/vnd.criticaltools.wbs+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["wbs"]\n  },\n  "application/vnd.cryptii.pipe+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.crypto-shade-file": {\n    "source": "iana"\n  },\n  "application/vnd.ctc-posml": {\n    "source": "iana",\n    "extensions": ["pml"]\n  },\n  "application/vnd.ctct.ws+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.cups-pdf": {\n    "source": "iana"\n  },\n  "application/vnd.cups-postscript": {\n    "source": "iana"\n  },\n  "application/vnd.cups-ppd": {\n    "source": "iana",\n    "extensions": ["ppd"]\n  },\n  "application/vnd.cups-raster": {\n    "source": "iana"\n  },\n  "application/vnd.cups-raw": {\n    "source": "iana"\n  },\n  "application/vnd.curl": {\n    "source": "iana"\n  },\n  "application/vnd.curl.car": {\n    "source": "apache",\n    "extensions": ["car"]\n  },\n  "application/vnd.curl.pcurl": {\n    "source": "apache",\n    "extensions": ["pcurl"]\n  },\n  "application/vnd.cyan.dean.root+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.cybank": {\n    "source": "iana"\n  },\n  "application/vnd.d2l.coursepackage1p0+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.d3m-dataset": {\n    "source": "iana"\n  },\n  "application/vnd.d3m-problem": {\n    "source": "iana"\n  },\n  "application/vnd.dart": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["dart"]\n  },\n  "application/vnd.data-vision.rdz": {\n    "source": "iana",\n    "extensions": ["rdz"]\n  },\n  "application/vnd.datapackage+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dataresource+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dbf": {\n    "source": "iana",\n    "extensions": ["dbf"]\n  },\n  "application/vnd.debian.binary-package": {\n    "source": "iana"\n  },\n  "application/vnd.dece.data": {\n    "source": "iana",\n    "extensions": ["uvf","uvvf","uvd","uvvd"]\n  },\n  "application/vnd.dece.ttml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["uvt","uvvt"]\n  },\n  "application/vnd.dece.unspecified": {\n    "source": "iana",\n    "extensions": ["uvx","uvvx"]\n  },\n  "application/vnd.dece.zip": {\n    "source": "iana",\n    "extensions": ["uvz","uvvz"]\n  },\n  "application/vnd.denovo.fcselayout-link": {\n    "source": "iana",\n    "extensions": ["fe_launch"]\n  },\n  "application/vnd.desmume.movie": {\n    "source": "iana"\n  },\n  "application/vnd.dir-bi.plate-dl-nosuffix": {\n    "source": "iana"\n  },\n  "application/vnd.dm.delegation+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dna": {\n    "source": "iana",\n    "extensions": ["dna"]\n  },\n  "application/vnd.document+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dolby.mlp": {\n    "source": "apache",\n    "extensions": ["mlp"]\n  },\n  "application/vnd.dolby.mobile.1": {\n    "source": "iana"\n  },\n  "application/vnd.dolby.mobile.2": {\n    "source": "iana"\n  },\n  "application/vnd.doremir.scorecloud-binary-document": {\n    "source": "iana"\n  },\n  "application/vnd.dpgraph": {\n    "source": "iana",\n    "extensions": ["dpg"]\n  },\n  "application/vnd.dreamfactory": {\n    "source": "iana",\n    "extensions": ["dfac"]\n  },\n  "application/vnd.drive+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ds-keypoint": {\n    "source": "apache",\n    "extensions": ["kpxx"]\n  },\n  "application/vnd.dtg.local": {\n    "source": "iana"\n  },\n  "application/vnd.dtg.local.flash": {\n    "source": "iana"\n  },\n  "application/vnd.dtg.local.html": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.ait": {\n    "source": "iana",\n    "extensions": ["ait"]\n  },\n  "application/vnd.dvb.dvbisl+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.dvbj": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.esgcontainer": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.ipdcdftnotifaccess": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.ipdcesgaccess": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.ipdcesgaccess2": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.ipdcesgpdd": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.ipdcroaming": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.iptv.alfec-base": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.iptv.alfec-enhancement": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.notif-aggregate-root+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.notif-container+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.notif-generic+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.notif-ia-msglist+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.notif-ia-registration-request+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.notif-ia-registration-response+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.notif-init+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.dvb.pfr": {\n    "source": "iana"\n  },\n  "application/vnd.dvb.service": {\n    "source": "iana",\n    "extensions": ["svc"]\n  },\n  "application/vnd.dxr": {\n    "source": "iana"\n  },\n  "application/vnd.dynageo": {\n    "source": "iana",\n    "extensions": ["geo"]\n  },\n  "application/vnd.dzr": {\n    "source": "iana"\n  },\n  "application/vnd.easykaraoke.cdgdownload": {\n    "source": "iana"\n  },\n  "application/vnd.ecdis-update": {\n    "source": "iana"\n  },\n  "application/vnd.ecip.rlp": {\n    "source": "iana"\n  },\n  "application/vnd.ecowin.chart": {\n    "source": "iana",\n    "extensions": ["mag"]\n  },\n  "application/vnd.ecowin.filerequest": {\n    "source": "iana"\n  },\n  "application/vnd.ecowin.fileupdate": {\n    "source": "iana"\n  },\n  "application/vnd.ecowin.series": {\n    "source": "iana"\n  },\n  "application/vnd.ecowin.seriesrequest": {\n    "source": "iana"\n  },\n  "application/vnd.ecowin.seriesupdate": {\n    "source": "iana"\n  },\n  "application/vnd.efi.img": {\n    "source": "iana"\n  },\n  "application/vnd.efi.iso": {\n    "source": "iana"\n  },\n  "application/vnd.emclient.accessrequest+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.enliven": {\n    "source": "iana",\n    "extensions": ["nml"]\n  },\n  "application/vnd.enphase.envoy": {\n    "source": "iana"\n  },\n  "application/vnd.eprints.data+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.epson.esf": {\n    "source": "iana",\n    "extensions": ["esf"]\n  },\n  "application/vnd.epson.msf": {\n    "source": "iana",\n    "extensions": ["msf"]\n  },\n  "application/vnd.epson.quickanime": {\n    "source": "iana",\n    "extensions": ["qam"]\n  },\n  "application/vnd.epson.salt": {\n    "source": "iana",\n    "extensions": ["slt"]\n  },\n  "application/vnd.epson.ssf": {\n    "source": "iana",\n    "extensions": ["ssf"]\n  },\n  "application/vnd.ericsson.quickcall": {\n    "source": "iana"\n  },\n  "application/vnd.espass-espass+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.eszigno3+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["es3","et3"]\n  },\n  "application/vnd.etsi.aoc+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.asic-e+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.etsi.asic-s+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.etsi.cug+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvcommand+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvdiscovery+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvprofile+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvsad-bc+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvsad-cod+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvsad-npvr+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvservice+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvsync+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.iptvueprofile+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.mcid+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.mheg5": {\n    "source": "iana"\n  },\n  "application/vnd.etsi.overload-control-policy-dataset+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.pstn+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.sci+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.simservs+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.timestamp-token": {\n    "source": "iana"\n  },\n  "application/vnd.etsi.tsl+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.etsi.tsl.der": {\n    "source": "iana"\n  },\n  "application/vnd.eudora.data": {\n    "source": "iana"\n  },\n  "application/vnd.evolv.ecig.profile": {\n    "source": "iana"\n  },\n  "application/vnd.evolv.ecig.settings": {\n    "source": "iana"\n  },\n  "application/vnd.evolv.ecig.theme": {\n    "source": "iana"\n  },\n  "application/vnd.exstream-empower+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.exstream-package": {\n    "source": "iana"\n  },\n  "application/vnd.ezpix-album": {\n    "source": "iana",\n    "extensions": ["ez2"]\n  },\n  "application/vnd.ezpix-package": {\n    "source": "iana",\n    "extensions": ["ez3"]\n  },\n  "application/vnd.f-secure.mobile": {\n    "source": "iana"\n  },\n  "application/vnd.fastcopy-disk-image": {\n    "source": "iana"\n  },\n  "application/vnd.fdf": {\n    "source": "iana",\n    "extensions": ["fdf"]\n  },\n  "application/vnd.fdsn.mseed": {\n    "source": "iana",\n    "extensions": ["mseed"]\n  },\n  "application/vnd.fdsn.seed": {\n    "source": "iana",\n    "extensions": ["seed","dataless"]\n  },\n  "application/vnd.ffsns": {\n    "source": "iana"\n  },\n  "application/vnd.ficlab.flb+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.filmit.zfc": {\n    "source": "iana"\n  },\n  "application/vnd.fints": {\n    "source": "iana"\n  },\n  "application/vnd.firemonkeys.cloudcell": {\n    "source": "iana"\n  },\n  "application/vnd.flographit": {\n    "source": "iana",\n    "extensions": ["gph"]\n  },\n  "application/vnd.fluxtime.clip": {\n    "source": "iana",\n    "extensions": ["ftc"]\n  },\n  "application/vnd.font-fontforge-sfd": {\n    "source": "iana"\n  },\n  "application/vnd.framemaker": {\n    "source": "iana",\n    "extensions": ["fm","frame","maker","book"]\n  },\n  "application/vnd.frogans.fnc": {\n    "source": "iana",\n    "extensions": ["fnc"]\n  },\n  "application/vnd.frogans.ltf": {\n    "source": "iana",\n    "extensions": ["ltf"]\n  },\n  "application/vnd.fsc.weblaunch": {\n    "source": "iana",\n    "extensions": ["fsc"]\n  },\n  "application/vnd.fujitsu.oasys": {\n    "source": "iana",\n    "extensions": ["oas"]\n  },\n  "application/vnd.fujitsu.oasys2": {\n    "source": "iana",\n    "extensions": ["oa2"]\n  },\n  "application/vnd.fujitsu.oasys3": {\n    "source": "iana",\n    "extensions": ["oa3"]\n  },\n  "application/vnd.fujitsu.oasysgp": {\n    "source": "iana",\n    "extensions": ["fg5"]\n  },\n  "application/vnd.fujitsu.oasysprs": {\n    "source": "iana",\n    "extensions": ["bh2"]\n  },\n  "application/vnd.fujixerox.art-ex": {\n    "source": "iana"\n  },\n  "application/vnd.fujixerox.art4": {\n    "source": "iana"\n  },\n  "application/vnd.fujixerox.ddd": {\n    "source": "iana",\n    "extensions": ["ddd"]\n  },\n  "application/vnd.fujixerox.docuworks": {\n    "source": "iana",\n    "extensions": ["xdw"]\n  },\n  "application/vnd.fujixerox.docuworks.binder": {\n    "source": "iana",\n    "extensions": ["xbd"]\n  },\n  "application/vnd.fujixerox.docuworks.container": {\n    "source": "iana"\n  },\n  "application/vnd.fujixerox.hbpl": {\n    "source": "iana"\n  },\n  "application/vnd.fut-misnet": {\n    "source": "iana"\n  },\n  "application/vnd.futoin+cbor": {\n    "source": "iana"\n  },\n  "application/vnd.futoin+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.fuzzysheet": {\n    "source": "iana",\n    "extensions": ["fzs"]\n  },\n  "application/vnd.genomatix.tuxedo": {\n    "source": "iana",\n    "extensions": ["txd"]\n  },\n  "application/vnd.gentics.grd+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.geo+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.geocube+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.geogebra.file": {\n    "source": "iana",\n    "extensions": ["ggb"]\n  },\n  "application/vnd.geogebra.slides": {\n    "source": "iana"\n  },\n  "application/vnd.geogebra.tool": {\n    "source": "iana",\n    "extensions": ["ggt"]\n  },\n  "application/vnd.geometry-explorer": {\n    "source": "iana",\n    "extensions": ["gex","gre"]\n  },\n  "application/vnd.geonext": {\n    "source": "iana",\n    "extensions": ["gxt"]\n  },\n  "application/vnd.geoplan": {\n    "source": "iana",\n    "extensions": ["g2w"]\n  },\n  "application/vnd.geospace": {\n    "source": "iana",\n    "extensions": ["g3w"]\n  },\n  "application/vnd.gerber": {\n    "source": "iana"\n  },\n  "application/vnd.globalplatform.card-content-mgt": {\n    "source": "iana"\n  },\n  "application/vnd.globalplatform.card-content-mgt-response": {\n    "source": "iana"\n  },\n  "application/vnd.gmx": {\n    "source": "iana",\n    "extensions": ["gmx"]\n  },\n  "application/vnd.google-apps.document": {\n    "compressible": false,\n    "extensions": ["gdoc"]\n  },\n  "application/vnd.google-apps.presentation": {\n    "compressible": false,\n    "extensions": ["gslides"]\n  },\n  "application/vnd.google-apps.spreadsheet": {\n    "compressible": false,\n    "extensions": ["gsheet"]\n  },\n  "application/vnd.google-earth.kml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["kml"]\n  },\n  "application/vnd.google-earth.kmz": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["kmz"]\n  },\n  "application/vnd.gov.sk.e-form+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.gov.sk.e-form+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.gov.sk.xmldatacontainer+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.grafeq": {\n    "source": "iana",\n    "extensions": ["gqf","gqs"]\n  },\n  "application/vnd.gridmp": {\n    "source": "iana"\n  },\n  "application/vnd.groove-account": {\n    "source": "iana",\n    "extensions": ["gac"]\n  },\n  "application/vnd.groove-help": {\n    "source": "iana",\n    "extensions": ["ghf"]\n  },\n  "application/vnd.groove-identity-message": {\n    "source": "iana",\n    "extensions": ["gim"]\n  },\n  "application/vnd.groove-injector": {\n    "source": "iana",\n    "extensions": ["grv"]\n  },\n  "application/vnd.groove-tool-message": {\n    "source": "iana",\n    "extensions": ["gtm"]\n  },\n  "application/vnd.groove-tool-template": {\n    "source": "iana",\n    "extensions": ["tpl"]\n  },\n  "application/vnd.groove-vcard": {\n    "source": "iana",\n    "extensions": ["vcg"]\n  },\n  "application/vnd.hal+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.hal+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["hal"]\n  },\n  "application/vnd.handheld-entertainment+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["zmm"]\n  },\n  "application/vnd.hbci": {\n    "source": "iana",\n    "extensions": ["hbci"]\n  },\n  "application/vnd.hc+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.hcl-bireports": {\n    "source": "iana"\n  },\n  "application/vnd.hdt": {\n    "source": "iana"\n  },\n  "application/vnd.heroku+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.hhe.lesson-player": {\n    "source": "iana",\n    "extensions": ["les"]\n  },\n  "application/vnd.hp-hpgl": {\n    "source": "iana",\n    "extensions": ["hpgl"]\n  },\n  "application/vnd.hp-hpid": {\n    "source": "iana",\n    "extensions": ["hpid"]\n  },\n  "application/vnd.hp-hps": {\n    "source": "iana",\n    "extensions": ["hps"]\n  },\n  "application/vnd.hp-jlyt": {\n    "source": "iana",\n    "extensions": ["jlt"]\n  },\n  "application/vnd.hp-pcl": {\n    "source": "iana",\n    "extensions": ["pcl"]\n  },\n  "application/vnd.hp-pclxl": {\n    "source": "iana",\n    "extensions": ["pclxl"]\n  },\n  "application/vnd.httphone": {\n    "source": "iana"\n  },\n  "application/vnd.hydrostatix.sof-data": {\n    "source": "iana",\n    "extensions": ["sfd-hdstx"]\n  },\n  "application/vnd.hyper+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.hyper-item+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.hyperdrive+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.hzn-3d-crossword": {\n    "source": "iana"\n  },\n  "application/vnd.ibm.afplinedata": {\n    "source": "iana"\n  },\n  "application/vnd.ibm.electronic-media": {\n    "source": "iana"\n  },\n  "application/vnd.ibm.minipay": {\n    "source": "iana",\n    "extensions": ["mpy"]\n  },\n  "application/vnd.ibm.modcap": {\n    "source": "iana",\n    "extensions": ["afp","listafp","list3820"]\n  },\n  "application/vnd.ibm.rights-management": {\n    "source": "iana",\n    "extensions": ["irm"]\n  },\n  "application/vnd.ibm.secure-container": {\n    "source": "iana",\n    "extensions": ["sc"]\n  },\n  "application/vnd.iccprofile": {\n    "source": "iana",\n    "extensions": ["icc","icm"]\n  },\n  "application/vnd.ieee.1905": {\n    "source": "iana"\n  },\n  "application/vnd.igloader": {\n    "source": "iana",\n    "extensions": ["igl"]\n  },\n  "application/vnd.imagemeter.folder+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.imagemeter.image+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.immervision-ivp": {\n    "source": "iana",\n    "extensions": ["ivp"]\n  },\n  "application/vnd.immervision-ivu": {\n    "source": "iana",\n    "extensions": ["ivu"]\n  },\n  "application/vnd.ims.imsccv1p1": {\n    "source": "iana"\n  },\n  "application/vnd.ims.imsccv1p2": {\n    "source": "iana"\n  },\n  "application/vnd.ims.imsccv1p3": {\n    "source": "iana"\n  },\n  "application/vnd.ims.lis.v2.result+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ims.lti.v2.toolproxy+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ims.lti.v2.toolproxy.id+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ims.lti.v2.toolsettings+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ims.lti.v2.toolsettings.simple+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.informedcontrol.rms+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.informix-visionary": {\n    "source": "iana"\n  },\n  "application/vnd.infotech.project": {\n    "source": "iana"\n  },\n  "application/vnd.infotech.project+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.innopath.wamp.notification": {\n    "source": "iana"\n  },\n  "application/vnd.insors.igm": {\n    "source": "iana",\n    "extensions": ["igm"]\n  },\n  "application/vnd.intercon.formnet": {\n    "source": "iana",\n    "extensions": ["xpw","xpx"]\n  },\n  "application/vnd.intergeo": {\n    "source": "iana",\n    "extensions": ["i2g"]\n  },\n  "application/vnd.intertrust.digibox": {\n    "source": "iana"\n  },\n  "application/vnd.intertrust.nncp": {\n    "source": "iana"\n  },\n  "application/vnd.intu.qbo": {\n    "source": "iana",\n    "extensions": ["qbo"]\n  },\n  "application/vnd.intu.qfx": {\n    "source": "iana",\n    "extensions": ["qfx"]\n  },\n  "application/vnd.iptc.g2.catalogitem+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.iptc.g2.conceptitem+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.iptc.g2.knowledgeitem+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.iptc.g2.newsitem+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.iptc.g2.newsmessage+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.iptc.g2.packageitem+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.iptc.g2.planningitem+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ipunplugged.rcprofile": {\n    "source": "iana",\n    "extensions": ["rcprofile"]\n  },\n  "application/vnd.irepository.package+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["irp"]\n  },\n  "application/vnd.is-xpr": {\n    "source": "iana",\n    "extensions": ["xpr"]\n  },\n  "application/vnd.isac.fcs": {\n    "source": "iana",\n    "extensions": ["fcs"]\n  },\n  "application/vnd.iso11783-10+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.jam": {\n    "source": "iana",\n    "extensions": ["jam"]\n  },\n  "application/vnd.japannet-directory-service": {\n    "source": "iana"\n  },\n  "application/vnd.japannet-jpnstore-wakeup": {\n    "source": "iana"\n  },\n  "application/vnd.japannet-payment-wakeup": {\n    "source": "iana"\n  },\n  "application/vnd.japannet-registration": {\n    "source": "iana"\n  },\n  "application/vnd.japannet-registration-wakeup": {\n    "source": "iana"\n  },\n  "application/vnd.japannet-setstore-wakeup": {\n    "source": "iana"\n  },\n  "application/vnd.japannet-verification": {\n    "source": "iana"\n  },\n  "application/vnd.japannet-verification-wakeup": {\n    "source": "iana"\n  },\n  "application/vnd.jcp.javame.midlet-rms": {\n    "source": "iana",\n    "extensions": ["rms"]\n  },\n  "application/vnd.jisp": {\n    "source": "iana",\n    "extensions": ["jisp"]\n  },\n  "application/vnd.joost.joda-archive": {\n    "source": "iana",\n    "extensions": ["joda"]\n  },\n  "application/vnd.jsk.isdn-ngn": {\n    "source": "iana"\n  },\n  "application/vnd.kahootz": {\n    "source": "iana",\n    "extensions": ["ktz","ktr"]\n  },\n  "application/vnd.kde.karbon": {\n    "source": "iana",\n    "extensions": ["karbon"]\n  },\n  "application/vnd.kde.kchart": {\n    "source": "iana",\n    "extensions": ["chrt"]\n  },\n  "application/vnd.kde.kformula": {\n    "source": "iana",\n    "extensions": ["kfo"]\n  },\n  "application/vnd.kde.kivio": {\n    "source": "iana",\n    "extensions": ["flw"]\n  },\n  "application/vnd.kde.kontour": {\n    "source": "iana",\n    "extensions": ["kon"]\n  },\n  "application/vnd.kde.kpresenter": {\n    "source": "iana",\n    "extensions": ["kpr","kpt"]\n  },\n  "application/vnd.kde.kspread": {\n    "source": "iana",\n    "extensions": ["ksp"]\n  },\n  "application/vnd.kde.kword": {\n    "source": "iana",\n    "extensions": ["kwd","kwt"]\n  },\n  "application/vnd.kenameaapp": {\n    "source": "iana",\n    "extensions": ["htke"]\n  },\n  "application/vnd.kidspiration": {\n    "source": "iana",\n    "extensions": ["kia"]\n  },\n  "application/vnd.kinar": {\n    "source": "iana",\n    "extensions": ["kne","knp"]\n  },\n  "application/vnd.koan": {\n    "source": "iana",\n    "extensions": ["skp","skd","skt","skm"]\n  },\n  "application/vnd.kodak-descriptor": {\n    "source": "iana",\n    "extensions": ["sse"]\n  },\n  "application/vnd.las": {\n    "source": "iana"\n  },\n  "application/vnd.las.las+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.las.las+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["lasxml"]\n  },\n  "application/vnd.laszip": {\n    "source": "iana"\n  },\n  "application/vnd.leap+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.liberty-request+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.llamagraphics.life-balance.desktop": {\n    "source": "iana",\n    "extensions": ["lbd"]\n  },\n  "application/vnd.llamagraphics.life-balance.exchange+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["lbe"]\n  },\n  "application/vnd.logipipe.circuit+zip": {\n    "source": "iana",\n    "compressible": false\n  },\n  "application/vnd.loom": {\n    "source": "iana"\n  },\n  "application/vnd.lotus-1-2-3": {\n    "source": "iana",\n    "extensions": ["123"]\n  },\n  "application/vnd.lotus-approach": {\n    "source": "iana",\n    "extensions": ["apr"]\n  },\n  "application/vnd.lotus-freelance": {\n    "source": "iana",\n    "extensions": ["pre"]\n  },\n  "application/vnd.lotus-notes": {\n    "source": "iana",\n    "extensions": ["nsf"]\n  },\n  "application/vnd.lotus-organizer": {\n    "source": "iana",\n    "extensions": ["org"]\n  },\n  "application/vnd.lotus-screencam": {\n    "source": "iana",\n    "extensions": ["scm"]\n  },\n  "application/vnd.lotus-wordpro": {\n    "source": "iana",\n    "extensions": ["lwp"]\n  },\n  "application/vnd.macports.portpkg": {\n    "source": "iana",\n    "extensions": ["portpkg"]\n  },\n  "application/vnd.mapbox-vector-tile": {\n    "source": "iana"\n  },\n  "application/vnd.marlin.drm.actiontoken+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.marlin.drm.conftoken+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.marlin.drm.license+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.marlin.drm.mdcf": {\n    "source": "iana"\n  },\n  "application/vnd.mason+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.maxmind.maxmind-db": {\n    "source": "iana"\n  },\n  "application/vnd.mcd": {\n    "source": "iana",\n    "extensions": ["mcd"]\n  },\n  "application/vnd.medcalcdata": {\n    "source": "iana",\n    "extensions": ["mc1"]\n  },\n  "application/vnd.mediastation.cdkey": {\n    "source": "iana",\n    "extensions": ["cdkey"]\n  },\n  "application/vnd.meridian-slingshot": {\n    "source": "iana"\n  },\n  "application/vnd.mfer": {\n    "source": "iana",\n    "extensions": ["mwf"]\n  },\n  "application/vnd.mfmp": {\n    "source": "iana",\n    "extensions": ["mfm"]\n  },\n  "application/vnd.micro+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.micrografx.flo": {\n    "source": "iana",\n    "extensions": ["flo"]\n  },\n  "application/vnd.micrografx.igx": {\n    "source": "iana",\n    "extensions": ["igx"]\n  },\n  "application/vnd.microsoft.portable-executable": {\n    "source": "iana"\n  },\n  "application/vnd.microsoft.windows.thumbnail-cache": {\n    "source": "iana"\n  },\n  "application/vnd.miele+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.mif": {\n    "source": "iana",\n    "extensions": ["mif"]\n  },\n  "application/vnd.minisoft-hp3000-save": {\n    "source": "iana"\n  },\n  "application/vnd.mitsubishi.misty-guard.trustweb": {\n    "source": "iana"\n  },\n  "application/vnd.mobius.daf": {\n    "source": "iana",\n    "extensions": ["daf"]\n  },\n  "application/vnd.mobius.dis": {\n    "source": "iana",\n    "extensions": ["dis"]\n  },\n  "application/vnd.mobius.mbk": {\n    "source": "iana",\n    "extensions": ["mbk"]\n  },\n  "application/vnd.mobius.mqy": {\n    "source": "iana",\n    "extensions": ["mqy"]\n  },\n  "application/vnd.mobius.msl": {\n    "source": "iana",\n    "extensions": ["msl"]\n  },\n  "application/vnd.mobius.plc": {\n    "source": "iana",\n    "extensions": ["plc"]\n  },\n  "application/vnd.mobius.txf": {\n    "source": "iana",\n    "extensions": ["txf"]\n  },\n  "application/vnd.mophun.application": {\n    "source": "iana",\n    "extensions": ["mpn"]\n  },\n  "application/vnd.mophun.certificate": {\n    "source": "iana",\n    "extensions": ["mpc"]\n  },\n  "application/vnd.motorola.flexsuite": {\n    "source": "iana"\n  },\n  "application/vnd.motorola.flexsuite.adsi": {\n    "source": "iana"\n  },\n  "application/vnd.motorola.flexsuite.fis": {\n    "source": "iana"\n  },\n  "application/vnd.motorola.flexsuite.gotap": {\n    "source": "iana"\n  },\n  "application/vnd.motorola.flexsuite.kmr": {\n    "source": "iana"\n  },\n  "application/vnd.motorola.flexsuite.ttc": {\n    "source": "iana"\n  },\n  "application/vnd.motorola.flexsuite.wem": {\n    "source": "iana"\n  },\n  "application/vnd.motorola.iprm": {\n    "source": "iana"\n  },\n  "application/vnd.mozilla.xul+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xul"]\n  },\n  "application/vnd.ms-3mfdocument": {\n    "source": "iana"\n  },\n  "application/vnd.ms-artgalry": {\n    "source": "iana",\n    "extensions": ["cil"]\n  },\n  "application/vnd.ms-asf": {\n    "source": "iana"\n  },\n  "application/vnd.ms-cab-compressed": {\n    "source": "iana",\n    "extensions": ["cab"]\n  },\n  "application/vnd.ms-color.iccprofile": {\n    "source": "apache"\n  },\n  "application/vnd.ms-excel": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["xls","xlm","xla","xlc","xlt","xlw"]\n  },\n  "application/vnd.ms-excel.addin.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["xlam"]\n  },\n  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["xlsb"]\n  },\n  "application/vnd.ms-excel.sheet.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["xlsm"]\n  },\n  "application/vnd.ms-excel.template.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["xltm"]\n  },\n  "application/vnd.ms-fontobject": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["eot"]\n  },\n  "application/vnd.ms-htmlhelp": {\n    "source": "iana",\n    "extensions": ["chm"]\n  },\n  "application/vnd.ms-ims": {\n    "source": "iana",\n    "extensions": ["ims"]\n  },\n  "application/vnd.ms-lrm": {\n    "source": "iana",\n    "extensions": ["lrm"]\n  },\n  "application/vnd.ms-office.activex+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ms-officetheme": {\n    "source": "iana",\n    "extensions": ["thmx"]\n  },\n  "application/vnd.ms-opentype": {\n    "source": "apache",\n    "compressible": true\n  },\n  "application/vnd.ms-outlook": {\n    "compressible": false,\n    "extensions": ["msg"]\n  },\n  "application/vnd.ms-package.obfuscated-opentype": {\n    "source": "apache"\n  },\n  "application/vnd.ms-pki.seccat": {\n    "source": "apache",\n    "extensions": ["cat"]\n  },\n  "application/vnd.ms-pki.stl": {\n    "source": "apache",\n    "extensions": ["stl"]\n  },\n  "application/vnd.ms-playready.initiator+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ms-powerpoint": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["ppt","pps","pot"]\n  },\n  "application/vnd.ms-powerpoint.addin.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["ppam"]\n  },\n  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["pptm"]\n  },\n  "application/vnd.ms-powerpoint.slide.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["sldm"]\n  },\n  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["ppsm"]\n  },\n  "application/vnd.ms-powerpoint.template.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["potm"]\n  },\n  "application/vnd.ms-printdevicecapabilities+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ms-printing.printticket+xml": {\n    "source": "apache",\n    "compressible": true\n  },\n  "application/vnd.ms-printschematicket+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.ms-project": {\n    "source": "iana",\n    "extensions": ["mpp","mpt"]\n  },\n  "application/vnd.ms-tnef": {\n    "source": "iana"\n  },\n  "application/vnd.ms-windows.devicepairing": {\n    "source": "iana"\n  },\n  "application/vnd.ms-windows.nwprinting.oob": {\n    "source": "iana"\n  },\n  "application/vnd.ms-windows.printerpairing": {\n    "source": "iana"\n  },\n  "application/vnd.ms-windows.wsd.oob": {\n    "source": "iana"\n  },\n  "application/vnd.ms-wmdrm.lic-chlg-req": {\n    "source": "iana"\n  },\n  "application/vnd.ms-wmdrm.lic-resp": {\n    "source": "iana"\n  },\n  "application/vnd.ms-wmdrm.meter-chlg-req": {\n    "source": "iana"\n  },\n  "application/vnd.ms-wmdrm.meter-resp": {\n    "source": "iana"\n  },\n  "application/vnd.ms-word.document.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["docm"]\n  },\n  "application/vnd.ms-word.template.macroenabled.12": {\n    "source": "iana",\n    "extensions": ["dotm"]\n  },\n  "application/vnd.ms-works": {\n    "source": "iana",\n    "extensions": ["wps","wks","wcm","wdb"]\n  },\n  "application/vnd.ms-wpl": {\n    "source": "iana",\n    "extensions": ["wpl"]\n  },\n  "application/vnd.ms-xpsdocument": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["xps"]\n  },\n  "application/vnd.msa-disk-image": {\n    "source": "iana"\n  },\n  "application/vnd.mseq": {\n    "source": "iana",\n    "extensions": ["mseq"]\n  },\n  "application/vnd.msign": {\n    "source": "iana"\n  },\n  "application/vnd.multiad.creator": {\n    "source": "iana"\n  },\n  "application/vnd.multiad.creator.cif": {\n    "source": "iana"\n  },\n  "application/vnd.music-niff": {\n    "source": "iana"\n  },\n  "application/vnd.musician": {\n    "source": "iana",\n    "extensions": ["mus"]\n  },\n  "application/vnd.muvee.style": {\n    "source": "iana",\n    "extensions": ["msty"]\n  },\n  "application/vnd.mynfc": {\n    "source": "iana",\n    "extensions": ["taglet"]\n  },\n  "application/vnd.ncd.control": {\n    "source": "iana"\n  },\n  "application/vnd.ncd.reference": {\n    "source": "iana"\n  },\n  "application/vnd.nearst.inv+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.nervana": {\n    "source": "iana"\n  },\n  "application/vnd.netfpx": {\n    "source": "iana"\n  },\n  "application/vnd.neurolanguage.nlu": {\n    "source": "iana",\n    "extensions": ["nlu"]\n  },\n  "application/vnd.nimn": {\n    "source": "iana"\n  },\n  "application/vnd.nintendo.nitro.rom": {\n    "source": "iana"\n  },\n  "application/vnd.nintendo.snes.rom": {\n    "source": "iana"\n  },\n  "application/vnd.nitf": {\n    "source": "iana",\n    "extensions": ["ntf","nitf"]\n  },\n  "application/vnd.noblenet-directory": {\n    "source": "iana",\n    "extensions": ["nnd"]\n  },\n  "application/vnd.noblenet-sealer": {\n    "source": "iana",\n    "extensions": ["nns"]\n  },\n  "application/vnd.noblenet-web": {\n    "source": "iana",\n    "extensions": ["nnw"]\n  },\n  "application/vnd.nokia.catalogs": {\n    "source": "iana"\n  },\n  "application/vnd.nokia.conml+wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.nokia.conml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.nokia.iptv.config+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.nokia.isds-radio-presets": {\n    "source": "iana"\n  },\n  "application/vnd.nokia.landmark+wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.nokia.landmark+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.nokia.landmarkcollection+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.nokia.n-gage.ac+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ac"]\n  },\n  "application/vnd.nokia.n-gage.data": {\n    "source": "iana",\n    "extensions": ["ngdat"]\n  },\n  "application/vnd.nokia.n-gage.symbian.install": {\n    "source": "iana",\n    "extensions": ["n-gage"]\n  },\n  "application/vnd.nokia.ncd": {\n    "source": "iana"\n  },\n  "application/vnd.nokia.pcd+wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.nokia.pcd+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.nokia.radio-preset": {\n    "source": "iana",\n    "extensions": ["rpst"]\n  },\n  "application/vnd.nokia.radio-presets": {\n    "source": "iana",\n    "extensions": ["rpss"]\n  },\n  "application/vnd.novadigm.edm": {\n    "source": "iana",\n    "extensions": ["edm"]\n  },\n  "application/vnd.novadigm.edx": {\n    "source": "iana",\n    "extensions": ["edx"]\n  },\n  "application/vnd.novadigm.ext": {\n    "source": "iana",\n    "extensions": ["ext"]\n  },\n  "application/vnd.ntt-local.content-share": {\n    "source": "iana"\n  },\n  "application/vnd.ntt-local.file-transfer": {\n    "source": "iana"\n  },\n  "application/vnd.ntt-local.ogw_remote-access": {\n    "source": "iana"\n  },\n  "application/vnd.ntt-local.sip-ta_remote": {\n    "source": "iana"\n  },\n  "application/vnd.ntt-local.sip-ta_tcp_stream": {\n    "source": "iana"\n  },\n  "application/vnd.oasis.opendocument.chart": {\n    "source": "iana",\n    "extensions": ["odc"]\n  },\n  "application/vnd.oasis.opendocument.chart-template": {\n    "source": "iana",\n    "extensions": ["otc"]\n  },\n  "application/vnd.oasis.opendocument.database": {\n    "source": "iana",\n    "extensions": ["odb"]\n  },\n  "application/vnd.oasis.opendocument.formula": {\n    "source": "iana",\n    "extensions": ["odf"]\n  },\n  "application/vnd.oasis.opendocument.formula-template": {\n    "source": "iana",\n    "extensions": ["odft"]\n  },\n  "application/vnd.oasis.opendocument.graphics": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["odg"]\n  },\n  "application/vnd.oasis.opendocument.graphics-template": {\n    "source": "iana",\n    "extensions": ["otg"]\n  },\n  "application/vnd.oasis.opendocument.image": {\n    "source": "iana",\n    "extensions": ["odi"]\n  },\n  "application/vnd.oasis.opendocument.image-template": {\n    "source": "iana",\n    "extensions": ["oti"]\n  },\n  "application/vnd.oasis.opendocument.presentation": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["odp"]\n  },\n  "application/vnd.oasis.opendocument.presentation-template": {\n    "source": "iana",\n    "extensions": ["otp"]\n  },\n  "application/vnd.oasis.opendocument.spreadsheet": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["ods"]\n  },\n  "application/vnd.oasis.opendocument.spreadsheet-template": {\n    "source": "iana",\n    "extensions": ["ots"]\n  },\n  "application/vnd.oasis.opendocument.text": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["odt"]\n  },\n  "application/vnd.oasis.opendocument.text-master": {\n    "source": "iana",\n    "extensions": ["odm"]\n  },\n  "application/vnd.oasis.opendocument.text-template": {\n    "source": "iana",\n    "extensions": ["ott"]\n  },\n  "application/vnd.oasis.opendocument.text-web": {\n    "source": "iana",\n    "extensions": ["oth"]\n  },\n  "application/vnd.obn": {\n    "source": "iana"\n  },\n  "application/vnd.ocf+cbor": {\n    "source": "iana"\n  },\n  "application/vnd.oci.image.manifest.v1+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oftn.l10n+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.contentaccessdownload+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.contentaccessstreaming+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.cspg-hexbinary": {\n    "source": "iana"\n  },\n  "application/vnd.oipf.dae.svg+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.dae.xhtml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.mippvcontrolmessage+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.pae.gem": {\n    "source": "iana"\n  },\n  "application/vnd.oipf.spdiscovery+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.spdlist+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.ueprofile+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oipf.userprofile+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.olpc-sugar": {\n    "source": "iana",\n    "extensions": ["xo"]\n  },\n  "application/vnd.oma-scws-config": {\n    "source": "iana"\n  },\n  "application/vnd.oma-scws-http-request": {\n    "source": "iana"\n  },\n  "application/vnd.oma-scws-http-response": {\n    "source": "iana"\n  },\n  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.bcast.drm-trigger+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.bcast.imd+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.bcast.ltkm": {\n    "source": "iana"\n  },\n  "application/vnd.oma.bcast.notification+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.bcast.provisioningtrigger": {\n    "source": "iana"\n  },\n  "application/vnd.oma.bcast.sgboot": {\n    "source": "iana"\n  },\n  "application/vnd.oma.bcast.sgdd+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.bcast.sgdu": {\n    "source": "iana"\n  },\n  "application/vnd.oma.bcast.simple-symbol-container": {\n    "source": "iana"\n  },\n  "application/vnd.oma.bcast.smartcard-trigger+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.bcast.sprov+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.bcast.stkm": {\n    "source": "iana"\n  },\n  "application/vnd.oma.cab-address-book+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.cab-feature-handler+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.cab-pcc+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.cab-subs-invite+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.cab-user-prefs+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.dcd": {\n    "source": "iana"\n  },\n  "application/vnd.oma.dcdc": {\n    "source": "iana"\n  },\n  "application/vnd.oma.dd2+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["dd2"]\n  },\n  "application/vnd.oma.drm.risd+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.group-usage-list+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.lwm2m+cbor": {\n    "source": "iana"\n  },\n  "application/vnd.oma.lwm2m+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.lwm2m+tlv": {\n    "source": "iana"\n  },\n  "application/vnd.oma.pal+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.poc.detailed-progress-report+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.poc.final-report+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.poc.groups+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.poc.invocation-descriptor+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.poc.optimized-progress-report+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.push": {\n    "source": "iana"\n  },\n  "application/vnd.oma.scidm.messages+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oma.xcap-directory+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.omads-email+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/vnd.omads-file+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/vnd.omads-folder+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/vnd.omaloc-supl-init": {\n    "source": "iana"\n  },\n  "application/vnd.onepager": {\n    "source": "iana"\n  },\n  "application/vnd.onepagertamp": {\n    "source": "iana"\n  },\n  "application/vnd.onepagertamx": {\n    "source": "iana"\n  },\n  "application/vnd.onepagertat": {\n    "source": "iana"\n  },\n  "application/vnd.onepagertatp": {\n    "source": "iana"\n  },\n  "application/vnd.onepagertatx": {\n    "source": "iana"\n  },\n  "application/vnd.openblox.game+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["obgx"]\n  },\n  "application/vnd.openblox.game-binary": {\n    "source": "iana"\n  },\n  "application/vnd.openeye.oeb": {\n    "source": "iana"\n  },\n  "application/vnd.openofficeorg.extension": {\n    "source": "apache",\n    "extensions": ["oxt"]\n  },\n  "application/vnd.openstreetmap.data+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["osm"]\n  },\n  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.drawing+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["pptx"]\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.slide": {\n    "source": "iana",\n    "extensions": ["sldx"]\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {\n    "source": "iana",\n    "extensions": ["ppsx"]\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.template": {\n    "source": "iana",\n    "extensions": ["potx"]\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["xlsx"]\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {\n    "source": "iana",\n    "extensions": ["xltx"]\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.theme+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.vmldrawing": {\n    "source": "iana"\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["docx"]\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {\n    "source": "iana",\n    "extensions": ["dotx"]\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-package.core-properties+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.openxmlformats-package.relationships+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oracle.resource+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.orange.indata": {\n    "source": "iana"\n  },\n  "application/vnd.osa.netdeploy": {\n    "source": "iana"\n  },\n  "application/vnd.osgeo.mapguide.package": {\n    "source": "iana",\n    "extensions": ["mgp"]\n  },\n  "application/vnd.osgi.bundle": {\n    "source": "iana"\n  },\n  "application/vnd.osgi.dp": {\n    "source": "iana",\n    "extensions": ["dp"]\n  },\n  "application/vnd.osgi.subsystem": {\n    "source": "iana",\n    "extensions": ["esa"]\n  },\n  "application/vnd.otps.ct-kip+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.oxli.countgraph": {\n    "source": "iana"\n  },\n  "application/vnd.pagerduty+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.palm": {\n    "source": "iana",\n    "extensions": ["pdb","pqa","oprc"]\n  },\n  "application/vnd.panoply": {\n    "source": "iana"\n  },\n  "application/vnd.paos.xml": {\n    "source": "iana"\n  },\n  "application/vnd.patentdive": {\n    "source": "iana"\n  },\n  "application/vnd.patientecommsdoc": {\n    "source": "iana"\n  },\n  "application/vnd.pawaafile": {\n    "source": "iana",\n    "extensions": ["paw"]\n  },\n  "application/vnd.pcos": {\n    "source": "iana"\n  },\n  "application/vnd.pg.format": {\n    "source": "iana",\n    "extensions": ["str"]\n  },\n  "application/vnd.pg.osasli": {\n    "source": "iana",\n    "extensions": ["ei6"]\n  },\n  "application/vnd.piaccess.application-licence": {\n    "source": "iana"\n  },\n  "application/vnd.picsel": {\n    "source": "iana",\n    "extensions": ["efif"]\n  },\n  "application/vnd.pmi.widget": {\n    "source": "iana",\n    "extensions": ["wg"]\n  },\n  "application/vnd.poc.group-advertisement+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.pocketlearn": {\n    "source": "iana",\n    "extensions": ["plf"]\n  },\n  "application/vnd.powerbuilder6": {\n    "source": "iana",\n    "extensions": ["pbd"]\n  },\n  "application/vnd.powerbuilder6-s": {\n    "source": "iana"\n  },\n  "application/vnd.powerbuilder7": {\n    "source": "iana"\n  },\n  "application/vnd.powerbuilder7-s": {\n    "source": "iana"\n  },\n  "application/vnd.powerbuilder75": {\n    "source": "iana"\n  },\n  "application/vnd.powerbuilder75-s": {\n    "source": "iana"\n  },\n  "application/vnd.preminet": {\n    "source": "iana"\n  },\n  "application/vnd.previewsystems.box": {\n    "source": "iana",\n    "extensions": ["box"]\n  },\n  "application/vnd.proteus.magazine": {\n    "source": "iana",\n    "extensions": ["mgz"]\n  },\n  "application/vnd.psfs": {\n    "source": "iana"\n  },\n  "application/vnd.publishare-delta-tree": {\n    "source": "iana",\n    "extensions": ["qps"]\n  },\n  "application/vnd.pvi.ptid1": {\n    "source": "iana",\n    "extensions": ["ptid"]\n  },\n  "application/vnd.pwg-multiplexed": {\n    "source": "iana"\n  },\n  "application/vnd.pwg-xhtml-print+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.qualcomm.brew-app-res": {\n    "source": "iana"\n  },\n  "application/vnd.quarantainenet": {\n    "source": "iana"\n  },\n  "application/vnd.quark.quarkxpress": {\n    "source": "iana",\n    "extensions": ["qxd","qxt","qwd","qwt","qxl","qxb"]\n  },\n  "application/vnd.quobject-quoxdocument": {\n    "source": "iana"\n  },\n  "application/vnd.radisys.moml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-audit+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-audit-conf+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-audit-conn+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-audit-dialog+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-audit-stream+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-conf+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-dialog+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-dialog-base+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-dialog-fax-detect+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-dialog-group+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-dialog-speech+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.radisys.msml-dialog-transform+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.rainstor.data": {\n    "source": "iana"\n  },\n  "application/vnd.rapid": {\n    "source": "iana"\n  },\n  "application/vnd.rar": {\n    "source": "iana",\n    "extensions": ["rar"]\n  },\n  "application/vnd.realvnc.bed": {\n    "source": "iana",\n    "extensions": ["bed"]\n  },\n  "application/vnd.recordare.musicxml": {\n    "source": "iana",\n    "extensions": ["mxl"]\n  },\n  "application/vnd.recordare.musicxml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["musicxml"]\n  },\n  "application/vnd.renlearn.rlprint": {\n    "source": "iana"\n  },\n  "application/vnd.restful+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.rig.cryptonote": {\n    "source": "iana",\n    "extensions": ["cryptonote"]\n  },\n  "application/vnd.rim.cod": {\n    "source": "apache",\n    "extensions": ["cod"]\n  },\n  "application/vnd.rn-realmedia": {\n    "source": "apache",\n    "extensions": ["rm"]\n  },\n  "application/vnd.rn-realmedia-vbr": {\n    "source": "apache",\n    "extensions": ["rmvb"]\n  },\n  "application/vnd.route66.link66+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["link66"]\n  },\n  "application/vnd.rs-274x": {\n    "source": "iana"\n  },\n  "application/vnd.ruckus.download": {\n    "source": "iana"\n  },\n  "application/vnd.s3sms": {\n    "source": "iana"\n  },\n  "application/vnd.sailingtracker.track": {\n    "source": "iana",\n    "extensions": ["st"]\n  },\n  "application/vnd.sar": {\n    "source": "iana"\n  },\n  "application/vnd.sbm.cid": {\n    "source": "iana"\n  },\n  "application/vnd.sbm.mid2": {\n    "source": "iana"\n  },\n  "application/vnd.scribus": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.3df": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.csf": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.doc": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.eml": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.mht": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.net": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.ppt": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.tiff": {\n    "source": "iana"\n  },\n  "application/vnd.sealed.xls": {\n    "source": "iana"\n  },\n  "application/vnd.sealedmedia.softseal.html": {\n    "source": "iana"\n  },\n  "application/vnd.sealedmedia.softseal.pdf": {\n    "source": "iana"\n  },\n  "application/vnd.seemail": {\n    "source": "iana",\n    "extensions": ["see"]\n  },\n  "application/vnd.seis+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.sema": {\n    "source": "iana",\n    "extensions": ["sema"]\n  },\n  "application/vnd.semd": {\n    "source": "iana",\n    "extensions": ["semd"]\n  },\n  "application/vnd.semf": {\n    "source": "iana",\n    "extensions": ["semf"]\n  },\n  "application/vnd.shade-save-file": {\n    "source": "iana"\n  },\n  "application/vnd.shana.informed.formdata": {\n    "source": "iana",\n    "extensions": ["ifm"]\n  },\n  "application/vnd.shana.informed.formtemplate": {\n    "source": "iana",\n    "extensions": ["itp"]\n  },\n  "application/vnd.shana.informed.interchange": {\n    "source": "iana",\n    "extensions": ["iif"]\n  },\n  "application/vnd.shana.informed.package": {\n    "source": "iana",\n    "extensions": ["ipk"]\n  },\n  "application/vnd.shootproof+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.shopkick+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.shp": {\n    "source": "iana"\n  },\n  "application/vnd.shx": {\n    "source": "iana"\n  },\n  "application/vnd.sigrok.session": {\n    "source": "iana"\n  },\n  "application/vnd.simtech-mindmapper": {\n    "source": "iana",\n    "extensions": ["twd","twds"]\n  },\n  "application/vnd.siren+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.smaf": {\n    "source": "iana",\n    "extensions": ["mmf"]\n  },\n  "application/vnd.smart.notebook": {\n    "source": "iana"\n  },\n  "application/vnd.smart.teacher": {\n    "source": "iana",\n    "extensions": ["teacher"]\n  },\n  "application/vnd.snesdev-page-table": {\n    "source": "iana"\n  },\n  "application/vnd.software602.filler.form+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["fo"]\n  },\n  "application/vnd.software602.filler.form-xml-zip": {\n    "source": "iana"\n  },\n  "application/vnd.solent.sdkm+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["sdkm","sdkd"]\n  },\n  "application/vnd.spotfire.dxp": {\n    "source": "iana",\n    "extensions": ["dxp"]\n  },\n  "application/vnd.spotfire.sfs": {\n    "source": "iana",\n    "extensions": ["sfs"]\n  },\n  "application/vnd.sqlite3": {\n    "source": "iana"\n  },\n  "application/vnd.sss-cod": {\n    "source": "iana"\n  },\n  "application/vnd.sss-dtf": {\n    "source": "iana"\n  },\n  "application/vnd.sss-ntf": {\n    "source": "iana"\n  },\n  "application/vnd.stardivision.calc": {\n    "source": "apache",\n    "extensions": ["sdc"]\n  },\n  "application/vnd.stardivision.draw": {\n    "source": "apache",\n    "extensions": ["sda"]\n  },\n  "application/vnd.stardivision.impress": {\n    "source": "apache",\n    "extensions": ["sdd"]\n  },\n  "application/vnd.stardivision.math": {\n    "source": "apache",\n    "extensions": ["smf"]\n  },\n  "application/vnd.stardivision.writer": {\n    "source": "apache",\n    "extensions": ["sdw","vor"]\n  },\n  "application/vnd.stardivision.writer-global": {\n    "source": "apache",\n    "extensions": ["sgl"]\n  },\n  "application/vnd.stepmania.package": {\n    "source": "iana",\n    "extensions": ["smzip"]\n  },\n  "application/vnd.stepmania.stepchart": {\n    "source": "iana",\n    "extensions": ["sm"]\n  },\n  "application/vnd.street-stream": {\n    "source": "iana"\n  },\n  "application/vnd.sun.wadl+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["wadl"]\n  },\n  "application/vnd.sun.xml.calc": {\n    "source": "apache",\n    "extensions": ["sxc"]\n  },\n  "application/vnd.sun.xml.calc.template": {\n    "source": "apache",\n    "extensions": ["stc"]\n  },\n  "application/vnd.sun.xml.draw": {\n    "source": "apache",\n    "extensions": ["sxd"]\n  },\n  "application/vnd.sun.xml.draw.template": {\n    "source": "apache",\n    "extensions": ["std"]\n  },\n  "application/vnd.sun.xml.impress": {\n    "source": "apache",\n    "extensions": ["sxi"]\n  },\n  "application/vnd.sun.xml.impress.template": {\n    "source": "apache",\n    "extensions": ["sti"]\n  },\n  "application/vnd.sun.xml.math": {\n    "source": "apache",\n    "extensions": ["sxm"]\n  },\n  "application/vnd.sun.xml.writer": {\n    "source": "apache",\n    "extensions": ["sxw"]\n  },\n  "application/vnd.sun.xml.writer.global": {\n    "source": "apache",\n    "extensions": ["sxg"]\n  },\n  "application/vnd.sun.xml.writer.template": {\n    "source": "apache",\n    "extensions": ["stw"]\n  },\n  "application/vnd.sus-calendar": {\n    "source": "iana",\n    "extensions": ["sus","susp"]\n  },\n  "application/vnd.svd": {\n    "source": "iana",\n    "extensions": ["svd"]\n  },\n  "application/vnd.swiftview-ics": {\n    "source": "iana"\n  },\n  "application/vnd.sycle+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.symbian.install": {\n    "source": "apache",\n    "extensions": ["sis","sisx"]\n  },\n  "application/vnd.syncml+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["xsm"]\n  },\n  "application/vnd.syncml.dm+wbxml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "extensions": ["bdm"]\n  },\n  "application/vnd.syncml.dm+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["xdm"]\n  },\n  "application/vnd.syncml.dm.notification": {\n    "source": "iana"\n  },\n  "application/vnd.syncml.dmddf+wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.syncml.dmddf+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["ddf"]\n  },\n  "application/vnd.syncml.dmtnds+wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.syncml.dmtnds+xml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true\n  },\n  "application/vnd.syncml.ds.notification": {\n    "source": "iana"\n  },\n  "application/vnd.tableschema+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.tao.intent-module-archive": {\n    "source": "iana",\n    "extensions": ["tao"]\n  },\n  "application/vnd.tcpdump.pcap": {\n    "source": "iana",\n    "extensions": ["pcap","cap","dmp"]\n  },\n  "application/vnd.think-cell.ppttc+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.tmd.mediaflex.api+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.tml": {\n    "source": "iana"\n  },\n  "application/vnd.tmobile-livetv": {\n    "source": "iana",\n    "extensions": ["tmo"]\n  },\n  "application/vnd.tri.onesource": {\n    "source": "iana"\n  },\n  "application/vnd.trid.tpt": {\n    "source": "iana",\n    "extensions": ["tpt"]\n  },\n  "application/vnd.triscape.mxs": {\n    "source": "iana",\n    "extensions": ["mxs"]\n  },\n  "application/vnd.trueapp": {\n    "source": "iana",\n    "extensions": ["tra"]\n  },\n  "application/vnd.truedoc": {\n    "source": "iana"\n  },\n  "application/vnd.ubisoft.webplayer": {\n    "source": "iana"\n  },\n  "application/vnd.ufdl": {\n    "source": "iana",\n    "extensions": ["ufd","ufdl"]\n  },\n  "application/vnd.uiq.theme": {\n    "source": "iana",\n    "extensions": ["utz"]\n  },\n  "application/vnd.umajin": {\n    "source": "iana",\n    "extensions": ["umj"]\n  },\n  "application/vnd.unity": {\n    "source": "iana",\n    "extensions": ["unityweb"]\n  },\n  "application/vnd.uoml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["uoml"]\n  },\n  "application/vnd.uplanet.alert": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.alert-wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.bearer-choice": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.bearer-choice-wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.cacheop": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.cacheop-wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.channel": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.channel-wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.list": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.list-wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.listcmd": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.listcmd-wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.uplanet.signal": {\n    "source": "iana"\n  },\n  "application/vnd.uri-map": {\n    "source": "iana"\n  },\n  "application/vnd.valve.source.material": {\n    "source": "iana"\n  },\n  "application/vnd.vcx": {\n    "source": "iana",\n    "extensions": ["vcx"]\n  },\n  "application/vnd.vd-study": {\n    "source": "iana"\n  },\n  "application/vnd.vectorworks": {\n    "source": "iana"\n  },\n  "application/vnd.vel+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.verimatrix.vcas": {\n    "source": "iana"\n  },\n  "application/vnd.veryant.thin": {\n    "source": "iana"\n  },\n  "application/vnd.ves.encrypted": {\n    "source": "iana"\n  },\n  "application/vnd.vidsoft.vidconference": {\n    "source": "iana"\n  },\n  "application/vnd.visio": {\n    "source": "iana",\n    "extensions": ["vsd","vst","vss","vsw"]\n  },\n  "application/vnd.visionary": {\n    "source": "iana",\n    "extensions": ["vis"]\n  },\n  "application/vnd.vividence.scriptfile": {\n    "source": "iana"\n  },\n  "application/vnd.vsf": {\n    "source": "iana",\n    "extensions": ["vsf"]\n  },\n  "application/vnd.wap.sic": {\n    "source": "iana"\n  },\n  "application/vnd.wap.slc": {\n    "source": "iana"\n  },\n  "application/vnd.wap.wbxml": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "extensions": ["wbxml"]\n  },\n  "application/vnd.wap.wmlc": {\n    "source": "iana",\n    "extensions": ["wmlc"]\n  },\n  "application/vnd.wap.wmlscriptc": {\n    "source": "iana",\n    "extensions": ["wmlsc"]\n  },\n  "application/vnd.webturbo": {\n    "source": "iana",\n    "extensions": ["wtb"]\n  },\n  "application/vnd.wfa.dpp": {\n    "source": "iana"\n  },\n  "application/vnd.wfa.p2p": {\n    "source": "iana"\n  },\n  "application/vnd.wfa.wsc": {\n    "source": "iana"\n  },\n  "application/vnd.windows.devicepairing": {\n    "source": "iana"\n  },\n  "application/vnd.wmc": {\n    "source": "iana"\n  },\n  "application/vnd.wmf.bootstrap": {\n    "source": "iana"\n  },\n  "application/vnd.wolfram.mathematica": {\n    "source": "iana"\n  },\n  "application/vnd.wolfram.mathematica.package": {\n    "source": "iana"\n  },\n  "application/vnd.wolfram.player": {\n    "source": "iana",\n    "extensions": ["nbp"]\n  },\n  "application/vnd.wordperfect": {\n    "source": "iana",\n    "extensions": ["wpd"]\n  },\n  "application/vnd.wqd": {\n    "source": "iana",\n    "extensions": ["wqd"]\n  },\n  "application/vnd.wrq-hp3000-labelled": {\n    "source": "iana"\n  },\n  "application/vnd.wt.stf": {\n    "source": "iana",\n    "extensions": ["stf"]\n  },\n  "application/vnd.wv.csp+wbxml": {\n    "source": "iana"\n  },\n  "application/vnd.wv.csp+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.wv.ssp+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.xacml+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.xara": {\n    "source": "iana",\n    "extensions": ["xar"]\n  },\n  "application/vnd.xfdl": {\n    "source": "iana",\n    "extensions": ["xfdl"]\n  },\n  "application/vnd.xfdl.webform": {\n    "source": "iana"\n  },\n  "application/vnd.xmi+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vnd.xmpie.cpkg": {\n    "source": "iana"\n  },\n  "application/vnd.xmpie.dpkg": {\n    "source": "iana"\n  },\n  "application/vnd.xmpie.plan": {\n    "source": "iana"\n  },\n  "application/vnd.xmpie.ppkg": {\n    "source": "iana"\n  },\n  "application/vnd.xmpie.xlim": {\n    "source": "iana"\n  },\n  "application/vnd.yamaha.hv-dic": {\n    "source": "iana",\n    "extensions": ["hvd"]\n  },\n  "application/vnd.yamaha.hv-script": {\n    "source": "iana",\n    "extensions": ["hvs"]\n  },\n  "application/vnd.yamaha.hv-voice": {\n    "source": "iana",\n    "extensions": ["hvp"]\n  },\n  "application/vnd.yamaha.openscoreformat": {\n    "source": "iana",\n    "extensions": ["osf"]\n  },\n  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["osfpvg"]\n  },\n  "application/vnd.yamaha.remote-setup": {\n    "source": "iana"\n  },\n  "application/vnd.yamaha.smaf-audio": {\n    "source": "iana",\n    "extensions": ["saf"]\n  },\n  "application/vnd.yamaha.smaf-phrase": {\n    "source": "iana",\n    "extensions": ["spf"]\n  },\n  "application/vnd.yamaha.through-ngn": {\n    "source": "iana"\n  },\n  "application/vnd.yamaha.tunnel-udpencap": {\n    "source": "iana"\n  },\n  "application/vnd.yaoweme": {\n    "source": "iana"\n  },\n  "application/vnd.yellowriver-custom-menu": {\n    "source": "iana",\n    "extensions": ["cmp"]\n  },\n  "application/vnd.youtube.yt": {\n    "source": "iana"\n  },\n  "application/vnd.zul": {\n    "source": "iana",\n    "extensions": ["zir","zirz"]\n  },\n  "application/vnd.zzazz.deck+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["zaz"]\n  },\n  "application/voicexml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["vxml"]\n  },\n  "application/voucher-cms+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/vq-rtcpxr": {\n    "source": "iana"\n  },\n  "application/wasm": {\n    "compressible": true,\n    "extensions": ["wasm"]\n  },\n  "application/watcherinfo+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/webpush-options+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/whoispp-query": {\n    "source": "iana"\n  },\n  "application/whoispp-response": {\n    "source": "iana"\n  },\n  "application/widget": {\n    "source": "iana",\n    "extensions": ["wgt"]\n  },\n  "application/winhlp": {\n    "source": "apache",\n    "extensions": ["hlp"]\n  },\n  "application/wita": {\n    "source": "iana"\n  },\n  "application/wordperfect5.1": {\n    "source": "iana"\n  },\n  "application/wsdl+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["wsdl"]\n  },\n  "application/wspolicy+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["wspolicy"]\n  },\n  "application/x-7z-compressed": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["7z"]\n  },\n  "application/x-abiword": {\n    "source": "apache",\n    "extensions": ["abw"]\n  },\n  "application/x-ace-compressed": {\n    "source": "apache",\n    "extensions": ["ace"]\n  },\n  "application/x-amf": {\n    "source": "apache"\n  },\n  "application/x-apple-diskimage": {\n    "source": "apache",\n    "extensions": ["dmg"]\n  },\n  "application/x-arj": {\n    "compressible": false,\n    "extensions": ["arj"]\n  },\n  "application/x-authorware-bin": {\n    "source": "apache",\n    "extensions": ["aab","x32","u32","vox"]\n  },\n  "application/x-authorware-map": {\n    "source": "apache",\n    "extensions": ["aam"]\n  },\n  "application/x-authorware-seg": {\n    "source": "apache",\n    "extensions": ["aas"]\n  },\n  "application/x-bcpio": {\n    "source": "apache",\n    "extensions": ["bcpio"]\n  },\n  "application/x-bdoc": {\n    "compressible": false,\n    "extensions": ["bdoc"]\n  },\n  "application/x-bittorrent": {\n    "source": "apache",\n    "extensions": ["torrent"]\n  },\n  "application/x-blorb": {\n    "source": "apache",\n    "extensions": ["blb","blorb"]\n  },\n  "application/x-bzip": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["bz"]\n  },\n  "application/x-bzip2": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["bz2","boz"]\n  },\n  "application/x-cbr": {\n    "source": "apache",\n    "extensions": ["cbr","cba","cbt","cbz","cb7"]\n  },\n  "application/x-cdlink": {\n    "source": "apache",\n    "extensions": ["vcd"]\n  },\n  "application/x-cfs-compressed": {\n    "source": "apache",\n    "extensions": ["cfs"]\n  },\n  "application/x-chat": {\n    "source": "apache",\n    "extensions": ["chat"]\n  },\n  "application/x-chess-pgn": {\n    "source": "apache",\n    "extensions": ["pgn"]\n  },\n  "application/x-chrome-extension": {\n    "extensions": ["crx"]\n  },\n  "application/x-cocoa": {\n    "source": "nginx",\n    "extensions": ["cco"]\n  },\n  "application/x-compress": {\n    "source": "apache"\n  },\n  "application/x-conference": {\n    "source": "apache",\n    "extensions": ["nsc"]\n  },\n  "application/x-cpio": {\n    "source": "apache",\n    "extensions": ["cpio"]\n  },\n  "application/x-csh": {\n    "source": "apache",\n    "extensions": ["csh"]\n  },\n  "application/x-deb": {\n    "compressible": false\n  },\n  "application/x-debian-package": {\n    "source": "apache",\n    "extensions": ["deb","udeb"]\n  },\n  "application/x-dgc-compressed": {\n    "source": "apache",\n    "extensions": ["dgc"]\n  },\n  "application/x-director": {\n    "source": "apache",\n    "extensions": ["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]\n  },\n  "application/x-doom": {\n    "source": "apache",\n    "extensions": ["wad"]\n  },\n  "application/x-dtbncx+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["ncx"]\n  },\n  "application/x-dtbook+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["dtb"]\n  },\n  "application/x-dtbresource+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["res"]\n  },\n  "application/x-dvi": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["dvi"]\n  },\n  "application/x-envoy": {\n    "source": "apache",\n    "extensions": ["evy"]\n  },\n  "application/x-eva": {\n    "source": "apache",\n    "extensions": ["eva"]\n  },\n  "application/x-font-bdf": {\n    "source": "apache",\n    "extensions": ["bdf"]\n  },\n  "application/x-font-dos": {\n    "source": "apache"\n  },\n  "application/x-font-framemaker": {\n    "source": "apache"\n  },\n  "application/x-font-ghostscript": {\n    "source": "apache",\n    "extensions": ["gsf"]\n  },\n  "application/x-font-libgrx": {\n    "source": "apache"\n  },\n  "application/x-font-linux-psf": {\n    "source": "apache",\n    "extensions": ["psf"]\n  },\n  "application/x-font-pcf": {\n    "source": "apache",\n    "extensions": ["pcf"]\n  },\n  "application/x-font-snf": {\n    "source": "apache",\n    "extensions": ["snf"]\n  },\n  "application/x-font-speedo": {\n    "source": "apache"\n  },\n  "application/x-font-sunos-news": {\n    "source": "apache"\n  },\n  "application/x-font-type1": {\n    "source": "apache",\n    "extensions": ["pfa","pfb","pfm","afm"]\n  },\n  "application/x-font-vfont": {\n    "source": "apache"\n  },\n  "application/x-freearc": {\n    "source": "apache",\n    "extensions": ["arc"]\n  },\n  "application/x-futuresplash": {\n    "source": "apache",\n    "extensions": ["spl"]\n  },\n  "application/x-gca-compressed": {\n    "source": "apache",\n    "extensions": ["gca"]\n  },\n  "application/x-glulx": {\n    "source": "apache",\n    "extensions": ["ulx"]\n  },\n  "application/x-gnumeric": {\n    "source": "apache",\n    "extensions": ["gnumeric"]\n  },\n  "application/x-gramps-xml": {\n    "source": "apache",\n    "extensions": ["gramps"]\n  },\n  "application/x-gtar": {\n    "source": "apache",\n    "extensions": ["gtar"]\n  },\n  "application/x-gzip": {\n    "source": "apache"\n  },\n  "application/x-hdf": {\n    "source": "apache",\n    "extensions": ["hdf"]\n  },\n  "application/x-httpd-php": {\n    "compressible": true,\n    "extensions": ["php"]\n  },\n  "application/x-install-instructions": {\n    "source": "apache",\n    "extensions": ["install"]\n  },\n  "application/x-iso9660-image": {\n    "source": "apache",\n    "extensions": ["iso"]\n  },\n  "application/x-java-archive-diff": {\n    "source": "nginx",\n    "extensions": ["jardiff"]\n  },\n  "application/x-java-jnlp-file": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["jnlp"]\n  },\n  "application/x-javascript": {\n    "compressible": true\n  },\n  "application/x-keepass2": {\n    "extensions": ["kdbx"]\n  },\n  "application/x-latex": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["latex"]\n  },\n  "application/x-lua-bytecode": {\n    "extensions": ["luac"]\n  },\n  "application/x-lzh-compressed": {\n    "source": "apache",\n    "extensions": ["lzh","lha"]\n  },\n  "application/x-makeself": {\n    "source": "nginx",\n    "extensions": ["run"]\n  },\n  "application/x-mie": {\n    "source": "apache",\n    "extensions": ["mie"]\n  },\n  "application/x-mobipocket-ebook": {\n    "source": "apache",\n    "extensions": ["prc","mobi"]\n  },\n  "application/x-mpegurl": {\n    "compressible": false\n  },\n  "application/x-ms-application": {\n    "source": "apache",\n    "extensions": ["application"]\n  },\n  "application/x-ms-shortcut": {\n    "source": "apache",\n    "extensions": ["lnk"]\n  },\n  "application/x-ms-wmd": {\n    "source": "apache",\n    "extensions": ["wmd"]\n  },\n  "application/x-ms-wmz": {\n    "source": "apache",\n    "extensions": ["wmz"]\n  },\n  "application/x-ms-xbap": {\n    "source": "apache",\n    "extensions": ["xbap"]\n  },\n  "application/x-msaccess": {\n    "source": "apache",\n    "extensions": ["mdb"]\n  },\n  "application/x-msbinder": {\n    "source": "apache",\n    "extensions": ["obd"]\n  },\n  "application/x-mscardfile": {\n    "source": "apache",\n    "extensions": ["crd"]\n  },\n  "application/x-msclip": {\n    "source": "apache",\n    "extensions": ["clp"]\n  },\n  "application/x-msdos-program": {\n    "extensions": ["exe"]\n  },\n  "application/x-msdownload": {\n    "source": "apache",\n    "extensions": ["exe","dll","com","bat","msi"]\n  },\n  "application/x-msmediaview": {\n    "source": "apache",\n    "extensions": ["mvb","m13","m14"]\n  },\n  "application/x-msmetafile": {\n    "source": "apache",\n    "extensions": ["wmf","wmz","emf","emz"]\n  },\n  "application/x-msmoney": {\n    "source": "apache",\n    "extensions": ["mny"]\n  },\n  "application/x-mspublisher": {\n    "source": "apache",\n    "extensions": ["pub"]\n  },\n  "application/x-msschedule": {\n    "source": "apache",\n    "extensions": ["scd"]\n  },\n  "application/x-msterminal": {\n    "source": "apache",\n    "extensions": ["trm"]\n  },\n  "application/x-mswrite": {\n    "source": "apache",\n    "extensions": ["wri"]\n  },\n  "application/x-netcdf": {\n    "source": "apache",\n    "extensions": ["nc","cdf"]\n  },\n  "application/x-ns-proxy-autoconfig": {\n    "compressible": true,\n    "extensions": ["pac"]\n  },\n  "application/x-nzb": {\n    "source": "apache",\n    "extensions": ["nzb"]\n  },\n  "application/x-perl": {\n    "source": "nginx",\n    "extensions": ["pl","pm"]\n  },\n  "application/x-pilot": {\n    "source": "nginx",\n    "extensions": ["prc","pdb"]\n  },\n  "application/x-pkcs12": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["p12","pfx"]\n  },\n  "application/x-pkcs7-certificates": {\n    "source": "apache",\n    "extensions": ["p7b","spc"]\n  },\n  "application/x-pkcs7-certreqresp": {\n    "source": "apache",\n    "extensions": ["p7r"]\n  },\n  "application/x-pki-message": {\n    "source": "iana"\n  },\n  "application/x-rar-compressed": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["rar"]\n  },\n  "application/x-redhat-package-manager": {\n    "source": "nginx",\n    "extensions": ["rpm"]\n  },\n  "application/x-research-info-systems": {\n    "source": "apache",\n    "extensions": ["ris"]\n  },\n  "application/x-sea": {\n    "source": "nginx",\n    "extensions": ["sea"]\n  },\n  "application/x-sh": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["sh"]\n  },\n  "application/x-shar": {\n    "source": "apache",\n    "extensions": ["shar"]\n  },\n  "application/x-shockwave-flash": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["swf"]\n  },\n  "application/x-silverlight-app": {\n    "source": "apache",\n    "extensions": ["xap"]\n  },\n  "application/x-sql": {\n    "source": "apache",\n    "extensions": ["sql"]\n  },\n  "application/x-stuffit": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["sit"]\n  },\n  "application/x-stuffitx": {\n    "source": "apache",\n    "extensions": ["sitx"]\n  },\n  "application/x-subrip": {\n    "source": "apache",\n    "extensions": ["srt"]\n  },\n  "application/x-sv4cpio": {\n    "source": "apache",\n    "extensions": ["sv4cpio"]\n  },\n  "application/x-sv4crc": {\n    "source": "apache",\n    "extensions": ["sv4crc"]\n  },\n  "application/x-t3vm-image": {\n    "source": "apache",\n    "extensions": ["t3"]\n  },\n  "application/x-tads": {\n    "source": "apache",\n    "extensions": ["gam"]\n  },\n  "application/x-tar": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["tar"]\n  },\n  "application/x-tcl": {\n    "source": "apache",\n    "extensions": ["tcl","tk"]\n  },\n  "application/x-tex": {\n    "source": "apache",\n    "extensions": ["tex"]\n  },\n  "application/x-tex-tfm": {\n    "source": "apache",\n    "extensions": ["tfm"]\n  },\n  "application/x-texinfo": {\n    "source": "apache",\n    "extensions": ["texinfo","texi"]\n  },\n  "application/x-tgif": {\n    "source": "apache",\n    "extensions": ["obj"]\n  },\n  "application/x-ustar": {\n    "source": "apache",\n    "extensions": ["ustar"]\n  },\n  "application/x-virtualbox-hdd": {\n    "compressible": true,\n    "extensions": ["hdd"]\n  },\n  "application/x-virtualbox-ova": {\n    "compressible": true,\n    "extensions": ["ova"]\n  },\n  "application/x-virtualbox-ovf": {\n    "compressible": true,\n    "extensions": ["ovf"]\n  },\n  "application/x-virtualbox-vbox": {\n    "compressible": true,\n    "extensions": ["vbox"]\n  },\n  "application/x-virtualbox-vbox-extpack": {\n    "compressible": false,\n    "extensions": ["vbox-extpack"]\n  },\n  "application/x-virtualbox-vdi": {\n    "compressible": true,\n    "extensions": ["vdi"]\n  },\n  "application/x-virtualbox-vhd": {\n    "compressible": true,\n    "extensions": ["vhd"]\n  },\n  "application/x-virtualbox-vmdk": {\n    "compressible": true,\n    "extensions": ["vmdk"]\n  },\n  "application/x-wais-source": {\n    "source": "apache",\n    "extensions": ["src"]\n  },\n  "application/x-web-app-manifest+json": {\n    "compressible": true,\n    "extensions": ["webapp"]\n  },\n  "application/x-www-form-urlencoded": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/x-x509-ca-cert": {\n    "source": "iana",\n    "extensions": ["der","crt","pem"]\n  },\n  "application/x-x509-ca-ra-cert": {\n    "source": "iana"\n  },\n  "application/x-x509-next-ca-cert": {\n    "source": "iana"\n  },\n  "application/x-xfig": {\n    "source": "apache",\n    "extensions": ["fig"]\n  },\n  "application/x-xliff+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["xlf"]\n  },\n  "application/x-xpinstall": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["xpi"]\n  },\n  "application/x-xz": {\n    "source": "apache",\n    "extensions": ["xz"]\n  },\n  "application/x-zmachine": {\n    "source": "apache",\n    "extensions": ["z1","z2","z3","z4","z5","z6","z7","z8"]\n  },\n  "application/x400-bp": {\n    "source": "iana"\n  },\n  "application/xacml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/xaml+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["xaml"]\n  },\n  "application/xcap-att+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xav"]\n  },\n  "application/xcap-caps+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xca"]\n  },\n  "application/xcap-diff+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xdf"]\n  },\n  "application/xcap-el+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xel"]\n  },\n  "application/xcap-error+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xer"]\n  },\n  "application/xcap-ns+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xns"]\n  },\n  "application/xcon-conference-info+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/xcon-conference-info-diff+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/xenc+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xenc"]\n  },\n  "application/xhtml+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xhtml","xht"]\n  },\n  "application/xhtml-voice+xml": {\n    "source": "apache",\n    "compressible": true\n  },\n  "application/xliff+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xlf"]\n  },\n  "application/xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xml","xsl","xsd","rng"]\n  },\n  "application/xml-dtd": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["dtd"]\n  },\n  "application/xml-external-parsed-entity": {\n    "source": "iana"\n  },\n  "application/xml-patch+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/xmpp+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/xop+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xop"]\n  },\n  "application/xproc+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["xpl"]\n  },\n  "application/xslt+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xsl","xslt"]\n  },\n  "application/xspf+xml": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["xspf"]\n  },\n  "application/xv+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["mxml","xhvml","xvml","xvm"]\n  },\n  "application/yang": {\n    "source": "iana",\n    "extensions": ["yang"]\n  },\n  "application/yang-data+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/yang-data+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/yang-patch+json": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/yang-patch+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "application/yin+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["yin"]\n  },\n  "application/zip": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["zip"]\n  },\n  "application/zlib": {\n    "source": "iana"\n  },\n  "application/zstd": {\n    "source": "iana"\n  },\n  "audio/1d-interleaved-parityfec": {\n    "source": "iana"\n  },\n  "audio/32kadpcm": {\n    "source": "iana"\n  },\n  "audio/3gpp": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["3gpp"]\n  },\n  "audio/3gpp2": {\n    "source": "iana"\n  },\n  "audio/aac": {\n    "source": "iana"\n  },\n  "audio/ac3": {\n    "source": "iana"\n  },\n  "audio/adpcm": {\n    "source": "apache",\n    "extensions": ["adp"]\n  },\n  "audio/amr": {\n    "source": "iana"\n  },\n  "audio/amr-wb": {\n    "source": "iana"\n  },\n  "audio/amr-wb+": {\n    "source": "iana"\n  },\n  "audio/aptx": {\n    "source": "iana"\n  },\n  "audio/asc": {\n    "source": "iana"\n  },\n  "audio/atrac-advanced-lossless": {\n    "source": "iana"\n  },\n  "audio/atrac-x": {\n    "source": "iana"\n  },\n  "audio/atrac3": {\n    "source": "iana"\n  },\n  "audio/basic": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["au","snd"]\n  },\n  "audio/bv16": {\n    "source": "iana"\n  },\n  "audio/bv32": {\n    "source": "iana"\n  },\n  "audio/clearmode": {\n    "source": "iana"\n  },\n  "audio/cn": {\n    "source": "iana"\n  },\n  "audio/dat12": {\n    "source": "iana"\n  },\n  "audio/dls": {\n    "source": "iana"\n  },\n  "audio/dsr-es201108": {\n    "source": "iana"\n  },\n  "audio/dsr-es202050": {\n    "source": "iana"\n  },\n  "audio/dsr-es202211": {\n    "source": "iana"\n  },\n  "audio/dsr-es202212": {\n    "source": "iana"\n  },\n  "audio/dv": {\n    "source": "iana"\n  },\n  "audio/dvi4": {\n    "source": "iana"\n  },\n  "audio/eac3": {\n    "source": "iana"\n  },\n  "audio/encaprtp": {\n    "source": "iana"\n  },\n  "audio/evrc": {\n    "source": "iana"\n  },\n  "audio/evrc-qcp": {\n    "source": "iana"\n  },\n  "audio/evrc0": {\n    "source": "iana"\n  },\n  "audio/evrc1": {\n    "source": "iana"\n  },\n  "audio/evrcb": {\n    "source": "iana"\n  },\n  "audio/evrcb0": {\n    "source": "iana"\n  },\n  "audio/evrcb1": {\n    "source": "iana"\n  },\n  "audio/evrcnw": {\n    "source": "iana"\n  },\n  "audio/evrcnw0": {\n    "source": "iana"\n  },\n  "audio/evrcnw1": {\n    "source": "iana"\n  },\n  "audio/evrcwb": {\n    "source": "iana"\n  },\n  "audio/evrcwb0": {\n    "source": "iana"\n  },\n  "audio/evrcwb1": {\n    "source": "iana"\n  },\n  "audio/evs": {\n    "source": "iana"\n  },\n  "audio/flexfec": {\n    "source": "iana"\n  },\n  "audio/fwdred": {\n    "source": "iana"\n  },\n  "audio/g711-0": {\n    "source": "iana"\n  },\n  "audio/g719": {\n    "source": "iana"\n  },\n  "audio/g722": {\n    "source": "iana"\n  },\n  "audio/g7221": {\n    "source": "iana"\n  },\n  "audio/g723": {\n    "source": "iana"\n  },\n  "audio/g726-16": {\n    "source": "iana"\n  },\n  "audio/g726-24": {\n    "source": "iana"\n  },\n  "audio/g726-32": {\n    "source": "iana"\n  },\n  "audio/g726-40": {\n    "source": "iana"\n  },\n  "audio/g728": {\n    "source": "iana"\n  },\n  "audio/g729": {\n    "source": "iana"\n  },\n  "audio/g7291": {\n    "source": "iana"\n  },\n  "audio/g729d": {\n    "source": "iana"\n  },\n  "audio/g729e": {\n    "source": "iana"\n  },\n  "audio/gsm": {\n    "source": "iana"\n  },\n  "audio/gsm-efr": {\n    "source": "iana"\n  },\n  "audio/gsm-hr-08": {\n    "source": "iana"\n  },\n  "audio/ilbc": {\n    "source": "iana"\n  },\n  "audio/ip-mr_v2.5": {\n    "source": "iana"\n  },\n  "audio/isac": {\n    "source": "apache"\n  },\n  "audio/l16": {\n    "source": "iana"\n  },\n  "audio/l20": {\n    "source": "iana"\n  },\n  "audio/l24": {\n    "source": "iana",\n    "compressible": false\n  },\n  "audio/l8": {\n    "source": "iana"\n  },\n  "audio/lpc": {\n    "source": "iana"\n  },\n  "audio/melp": {\n    "source": "iana"\n  },\n  "audio/melp1200": {\n    "source": "iana"\n  },\n  "audio/melp2400": {\n    "source": "iana"\n  },\n  "audio/melp600": {\n    "source": "iana"\n  },\n  "audio/mhas": {\n    "source": "iana"\n  },\n  "audio/midi": {\n    "source": "apache",\n    "extensions": ["mid","midi","kar","rmi"]\n  },\n  "audio/mobile-xmf": {\n    "source": "iana",\n    "extensions": ["mxmf"]\n  },\n  "audio/mp3": {\n    "compressible": false,\n    "extensions": ["mp3"]\n  },\n  "audio/mp4": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["m4a","mp4a"]\n  },\n  "audio/mp4a-latm": {\n    "source": "iana"\n  },\n  "audio/mpa": {\n    "source": "iana"\n  },\n  "audio/mpa-robust": {\n    "source": "iana"\n  },\n  "audio/mpeg": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["mpga","mp2","mp2a","mp3","m2a","m3a"]\n  },\n  "audio/mpeg4-generic": {\n    "source": "iana"\n  },\n  "audio/musepack": {\n    "source": "apache"\n  },\n  "audio/ogg": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["oga","ogg","spx","opus"]\n  },\n  "audio/opus": {\n    "source": "iana"\n  },\n  "audio/parityfec": {\n    "source": "iana"\n  },\n  "audio/pcma": {\n    "source": "iana"\n  },\n  "audio/pcma-wb": {\n    "source": "iana"\n  },\n  "audio/pcmu": {\n    "source": "iana"\n  },\n  "audio/pcmu-wb": {\n    "source": "iana"\n  },\n  "audio/prs.sid": {\n    "source": "iana"\n  },\n  "audio/qcelp": {\n    "source": "iana"\n  },\n  "audio/raptorfec": {\n    "source": "iana"\n  },\n  "audio/red": {\n    "source": "iana"\n  },\n  "audio/rtp-enc-aescm128": {\n    "source": "iana"\n  },\n  "audio/rtp-midi": {\n    "source": "iana"\n  },\n  "audio/rtploopback": {\n    "source": "iana"\n  },\n  "audio/rtx": {\n    "source": "iana"\n  },\n  "audio/s3m": {\n    "source": "apache",\n    "extensions": ["s3m"]\n  },\n  "audio/silk": {\n    "source": "apache",\n    "extensions": ["sil"]\n  },\n  "audio/smv": {\n    "source": "iana"\n  },\n  "audio/smv-qcp": {\n    "source": "iana"\n  },\n  "audio/smv0": {\n    "source": "iana"\n  },\n  "audio/sofa": {\n    "source": "iana"\n  },\n  "audio/sp-midi": {\n    "source": "iana"\n  },\n  "audio/speex": {\n    "source": "iana"\n  },\n  "audio/t140c": {\n    "source": "iana"\n  },\n  "audio/t38": {\n    "source": "iana"\n  },\n  "audio/telephone-event": {\n    "source": "iana"\n  },\n  "audio/tetra_acelp": {\n    "source": "iana"\n  },\n  "audio/tetra_acelp_bb": {\n    "source": "iana"\n  },\n  "audio/tone": {\n    "source": "iana"\n  },\n  "audio/tsvcis": {\n    "source": "iana"\n  },\n  "audio/uemclip": {\n    "source": "iana"\n  },\n  "audio/ulpfec": {\n    "source": "iana"\n  },\n  "audio/usac": {\n    "source": "iana"\n  },\n  "audio/vdvi": {\n    "source": "iana"\n  },\n  "audio/vmr-wb": {\n    "source": "iana"\n  },\n  "audio/vnd.3gpp.iufp": {\n    "source": "iana"\n  },\n  "audio/vnd.4sb": {\n    "source": "iana"\n  },\n  "audio/vnd.audiokoz": {\n    "source": "iana"\n  },\n  "audio/vnd.celp": {\n    "source": "iana"\n  },\n  "audio/vnd.cisco.nse": {\n    "source": "iana"\n  },\n  "audio/vnd.cmles.radio-events": {\n    "source": "iana"\n  },\n  "audio/vnd.cns.anp1": {\n    "source": "iana"\n  },\n  "audio/vnd.cns.inf1": {\n    "source": "iana"\n  },\n  "audio/vnd.dece.audio": {\n    "source": "iana",\n    "extensions": ["uva","uvva"]\n  },\n  "audio/vnd.digital-winds": {\n    "source": "iana",\n    "extensions": ["eol"]\n  },\n  "audio/vnd.dlna.adts": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.heaac.1": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.heaac.2": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.mlp": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.mps": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.pl2": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.pl2x": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.pl2z": {\n    "source": "iana"\n  },\n  "audio/vnd.dolby.pulse.1": {\n    "source": "iana"\n  },\n  "audio/vnd.dra": {\n    "source": "iana",\n    "extensions": ["dra"]\n  },\n  "audio/vnd.dts": {\n    "source": "iana",\n    "extensions": ["dts"]\n  },\n  "audio/vnd.dts.hd": {\n    "source": "iana",\n    "extensions": ["dtshd"]\n  },\n  "audio/vnd.dts.uhd": {\n    "source": "iana"\n  },\n  "audio/vnd.dvb.file": {\n    "source": "iana"\n  },\n  "audio/vnd.everad.plj": {\n    "source": "iana"\n  },\n  "audio/vnd.hns.audio": {\n    "source": "iana"\n  },\n  "audio/vnd.lucent.voice": {\n    "source": "iana",\n    "extensions": ["lvp"]\n  },\n  "audio/vnd.ms-playready.media.pya": {\n    "source": "iana",\n    "extensions": ["pya"]\n  },\n  "audio/vnd.nokia.mobile-xmf": {\n    "source": "iana"\n  },\n  "audio/vnd.nortel.vbk": {\n    "source": "iana"\n  },\n  "audio/vnd.nuera.ecelp4800": {\n    "source": "iana",\n    "extensions": ["ecelp4800"]\n  },\n  "audio/vnd.nuera.ecelp7470": {\n    "source": "iana",\n    "extensions": ["ecelp7470"]\n  },\n  "audio/vnd.nuera.ecelp9600": {\n    "source": "iana",\n    "extensions": ["ecelp9600"]\n  },\n  "audio/vnd.octel.sbc": {\n    "source": "iana"\n  },\n  "audio/vnd.presonus.multitrack": {\n    "source": "iana"\n  },\n  "audio/vnd.qcelp": {\n    "source": "iana"\n  },\n  "audio/vnd.rhetorex.32kadpcm": {\n    "source": "iana"\n  },\n  "audio/vnd.rip": {\n    "source": "iana",\n    "extensions": ["rip"]\n  },\n  "audio/vnd.rn-realaudio": {\n    "compressible": false\n  },\n  "audio/vnd.sealedmedia.softseal.mpeg": {\n    "source": "iana"\n  },\n  "audio/vnd.vmx.cvsd": {\n    "source": "iana"\n  },\n  "audio/vnd.wave": {\n    "compressible": false\n  },\n  "audio/vorbis": {\n    "source": "iana",\n    "compressible": false\n  },\n  "audio/vorbis-config": {\n    "source": "iana"\n  },\n  "audio/wav": {\n    "compressible": false,\n    "extensions": ["wav"]\n  },\n  "audio/wave": {\n    "compressible": false,\n    "extensions": ["wav"]\n  },\n  "audio/webm": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["weba"]\n  },\n  "audio/x-aac": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["aac"]\n  },\n  "audio/x-aiff": {\n    "source": "apache",\n    "extensions": ["aif","aiff","aifc"]\n  },\n  "audio/x-caf": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["caf"]\n  },\n  "audio/x-flac": {\n    "source": "apache",\n    "extensions": ["flac"]\n  },\n  "audio/x-m4a": {\n    "source": "nginx",\n    "extensions": ["m4a"]\n  },\n  "audio/x-matroska": {\n    "source": "apache",\n    "extensions": ["mka"]\n  },\n  "audio/x-mpegurl": {\n    "source": "apache",\n    "extensions": ["m3u"]\n  },\n  "audio/x-ms-wax": {\n    "source": "apache",\n    "extensions": ["wax"]\n  },\n  "audio/x-ms-wma": {\n    "source": "apache",\n    "extensions": ["wma"]\n  },\n  "audio/x-pn-realaudio": {\n    "source": "apache",\n    "extensions": ["ram","ra"]\n  },\n  "audio/x-pn-realaudio-plugin": {\n    "source": "apache",\n    "extensions": ["rmp"]\n  },\n  "audio/x-realaudio": {\n    "source": "nginx",\n    "extensions": ["ra"]\n  },\n  "audio/x-tta": {\n    "source": "apache"\n  },\n  "audio/x-wav": {\n    "source": "apache",\n    "extensions": ["wav"]\n  },\n  "audio/xm": {\n    "source": "apache",\n    "extensions": ["xm"]\n  },\n  "chemical/x-cdx": {\n    "source": "apache",\n    "extensions": ["cdx"]\n  },\n  "chemical/x-cif": {\n    "source": "apache",\n    "extensions": ["cif"]\n  },\n  "chemical/x-cmdf": {\n    "source": "apache",\n    "extensions": ["cmdf"]\n  },\n  "chemical/x-cml": {\n    "source": "apache",\n    "extensions": ["cml"]\n  },\n  "chemical/x-csml": {\n    "source": "apache",\n    "extensions": ["csml"]\n  },\n  "chemical/x-pdb": {\n    "source": "apache"\n  },\n  "chemical/x-xyz": {\n    "source": "apache",\n    "extensions": ["xyz"]\n  },\n  "font/collection": {\n    "source": "iana",\n    "extensions": ["ttc"]\n  },\n  "font/otf": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["otf"]\n  },\n  "font/sfnt": {\n    "source": "iana"\n  },\n  "font/ttf": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["ttf"]\n  },\n  "font/woff": {\n    "source": "iana",\n    "extensions": ["woff"]\n  },\n  "font/woff2": {\n    "source": "iana",\n    "extensions": ["woff2"]\n  },\n  "image/aces": {\n    "source": "iana",\n    "extensions": ["exr"]\n  },\n  "image/apng": {\n    "compressible": false,\n    "extensions": ["apng"]\n  },\n  "image/avci": {\n    "source": "iana"\n  },\n  "image/avcs": {\n    "source": "iana"\n  },\n  "image/avif": {\n    "compressible": false,\n    "extensions": ["avif"]\n  },\n  "image/bmp": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["bmp"]\n  },\n  "image/cgm": {\n    "source": "iana",\n    "extensions": ["cgm"]\n  },\n  "image/dicom-rle": {\n    "source": "iana",\n    "extensions": ["drle"]\n  },\n  "image/emf": {\n    "source": "iana",\n    "extensions": ["emf"]\n  },\n  "image/fits": {\n    "source": "iana",\n    "extensions": ["fits"]\n  },\n  "image/g3fax": {\n    "source": "iana",\n    "extensions": ["g3"]\n  },\n  "image/gif": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["gif"]\n  },\n  "image/heic": {\n    "source": "iana",\n    "extensions": ["heic"]\n  },\n  "image/heic-sequence": {\n    "source": "iana",\n    "extensions": ["heics"]\n  },\n  "image/heif": {\n    "source": "iana",\n    "extensions": ["heif"]\n  },\n  "image/heif-sequence": {\n    "source": "iana",\n    "extensions": ["heifs"]\n  },\n  "image/hej2k": {\n    "source": "iana",\n    "extensions": ["hej2"]\n  },\n  "image/hsj2": {\n    "source": "iana",\n    "extensions": ["hsj2"]\n  },\n  "image/ief": {\n    "source": "iana",\n    "extensions": ["ief"]\n  },\n  "image/jls": {\n    "source": "iana",\n    "extensions": ["jls"]\n  },\n  "image/jp2": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["jp2","jpg2"]\n  },\n  "image/jpeg": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["jpeg","jpg","jpe"]\n  },\n  "image/jph": {\n    "source": "iana",\n    "extensions": ["jph"]\n  },\n  "image/jphc": {\n    "source": "iana",\n    "extensions": ["jhc"]\n  },\n  "image/jpm": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["jpm"]\n  },\n  "image/jpx": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["jpx","jpf"]\n  },\n  "image/jxr": {\n    "source": "iana",\n    "extensions": ["jxr"]\n  },\n  "image/jxra": {\n    "source": "iana",\n    "extensions": ["jxra"]\n  },\n  "image/jxrs": {\n    "source": "iana",\n    "extensions": ["jxrs"]\n  },\n  "image/jxs": {\n    "source": "iana",\n    "extensions": ["jxs"]\n  },\n  "image/jxsc": {\n    "source": "iana",\n    "extensions": ["jxsc"]\n  },\n  "image/jxsi": {\n    "source": "iana",\n    "extensions": ["jxsi"]\n  },\n  "image/jxss": {\n    "source": "iana",\n    "extensions": ["jxss"]\n  },\n  "image/ktx": {\n    "source": "iana",\n    "extensions": ["ktx"]\n  },\n  "image/ktx2": {\n    "source": "iana",\n    "extensions": ["ktx2"]\n  },\n  "image/naplps": {\n    "source": "iana"\n  },\n  "image/pjpeg": {\n    "compressible": false\n  },\n  "image/png": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["png"]\n  },\n  "image/prs.btif": {\n    "source": "iana",\n    "extensions": ["btif"]\n  },\n  "image/prs.pti": {\n    "source": "iana",\n    "extensions": ["pti"]\n  },\n  "image/pwg-raster": {\n    "source": "iana"\n  },\n  "image/sgi": {\n    "source": "apache",\n    "extensions": ["sgi"]\n  },\n  "image/svg+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["svg","svgz"]\n  },\n  "image/t38": {\n    "source": "iana",\n    "extensions": ["t38"]\n  },\n  "image/tiff": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["tif","tiff"]\n  },\n  "image/tiff-fx": {\n    "source": "iana",\n    "extensions": ["tfx"]\n  },\n  "image/vnd.adobe.photoshop": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["psd"]\n  },\n  "image/vnd.airzip.accelerator.azv": {\n    "source": "iana",\n    "extensions": ["azv"]\n  },\n  "image/vnd.cns.inf2": {\n    "source": "iana"\n  },\n  "image/vnd.dece.graphic": {\n    "source": "iana",\n    "extensions": ["uvi","uvvi","uvg","uvvg"]\n  },\n  "image/vnd.djvu": {\n    "source": "iana",\n    "extensions": ["djvu","djv"]\n  },\n  "image/vnd.dvb.subtitle": {\n    "source": "iana",\n    "extensions": ["sub"]\n  },\n  "image/vnd.dwg": {\n    "source": "iana",\n    "extensions": ["dwg"]\n  },\n  "image/vnd.dxf": {\n    "source": "iana",\n    "extensions": ["dxf"]\n  },\n  "image/vnd.fastbidsheet": {\n    "source": "iana",\n    "extensions": ["fbs"]\n  },\n  "image/vnd.fpx": {\n    "source": "iana",\n    "extensions": ["fpx"]\n  },\n  "image/vnd.fst": {\n    "source": "iana",\n    "extensions": ["fst"]\n  },\n  "image/vnd.fujixerox.edmics-mmr": {\n    "source": "iana",\n    "extensions": ["mmr"]\n  },\n  "image/vnd.fujixerox.edmics-rlc": {\n    "source": "iana",\n    "extensions": ["rlc"]\n  },\n  "image/vnd.globalgraphics.pgb": {\n    "source": "iana"\n  },\n  "image/vnd.microsoft.icon": {\n    "source": "iana",\n    "extensions": ["ico"]\n  },\n  "image/vnd.mix": {\n    "source": "iana"\n  },\n  "image/vnd.mozilla.apng": {\n    "source": "iana"\n  },\n  "image/vnd.ms-dds": {\n    "extensions": ["dds"]\n  },\n  "image/vnd.ms-modi": {\n    "source": "iana",\n    "extensions": ["mdi"]\n  },\n  "image/vnd.ms-photo": {\n    "source": "apache",\n    "extensions": ["wdp"]\n  },\n  "image/vnd.net-fpx": {\n    "source": "iana",\n    "extensions": ["npx"]\n  },\n  "image/vnd.pco.b16": {\n    "source": "iana",\n    "extensions": ["b16"]\n  },\n  "image/vnd.radiance": {\n    "source": "iana"\n  },\n  "image/vnd.sealed.png": {\n    "source": "iana"\n  },\n  "image/vnd.sealedmedia.softseal.gif": {\n    "source": "iana"\n  },\n  "image/vnd.sealedmedia.softseal.jpg": {\n    "source": "iana"\n  },\n  "image/vnd.svf": {\n    "source": "iana"\n  },\n  "image/vnd.tencent.tap": {\n    "source": "iana",\n    "extensions": ["tap"]\n  },\n  "image/vnd.valve.source.texture": {\n    "source": "iana",\n    "extensions": ["vtf"]\n  },\n  "image/vnd.wap.wbmp": {\n    "source": "iana",\n    "extensions": ["wbmp"]\n  },\n  "image/vnd.xiff": {\n    "source": "iana",\n    "extensions": ["xif"]\n  },\n  "image/vnd.zbrush.pcx": {\n    "source": "iana",\n    "extensions": ["pcx"]\n  },\n  "image/webp": {\n    "source": "apache",\n    "extensions": ["webp"]\n  },\n  "image/wmf": {\n    "source": "iana",\n    "extensions": ["wmf"]\n  },\n  "image/x-3ds": {\n    "source": "apache",\n    "extensions": ["3ds"]\n  },\n  "image/x-cmu-raster": {\n    "source": "apache",\n    "extensions": ["ras"]\n  },\n  "image/x-cmx": {\n    "source": "apache",\n    "extensions": ["cmx"]\n  },\n  "image/x-freehand": {\n    "source": "apache",\n    "extensions": ["fh","fhc","fh4","fh5","fh7"]\n  },\n  "image/x-icon": {\n    "source": "apache",\n    "compressible": true,\n    "extensions": ["ico"]\n  },\n  "image/x-jng": {\n    "source": "nginx",\n    "extensions": ["jng"]\n  },\n  "image/x-mrsid-image": {\n    "source": "apache",\n    "extensions": ["sid"]\n  },\n  "image/x-ms-bmp": {\n    "source": "nginx",\n    "compressible": true,\n    "extensions": ["bmp"]\n  },\n  "image/x-pcx": {\n    "source": "apache",\n    "extensions": ["pcx"]\n  },\n  "image/x-pict": {\n    "source": "apache",\n    "extensions": ["pic","pct"]\n  },\n  "image/x-portable-anymap": {\n    "source": "apache",\n    "extensions": ["pnm"]\n  },\n  "image/x-portable-bitmap": {\n    "source": "apache",\n    "extensions": ["pbm"]\n  },\n  "image/x-portable-graymap": {\n    "source": "apache",\n    "extensions": ["pgm"]\n  },\n  "image/x-portable-pixmap": {\n    "source": "apache",\n    "extensions": ["ppm"]\n  },\n  "image/x-rgb": {\n    "source": "apache",\n    "extensions": ["rgb"]\n  },\n  "image/x-tga": {\n    "source": "apache",\n    "extensions": ["tga"]\n  },\n  "image/x-xbitmap": {\n    "source": "apache",\n    "extensions": ["xbm"]\n  },\n  "image/x-xcf": {\n    "compressible": false\n  },\n  "image/x-xpixmap": {\n    "source": "apache",\n    "extensions": ["xpm"]\n  },\n  "image/x-xwindowdump": {\n    "source": "apache",\n    "extensions": ["xwd"]\n  },\n  "message/cpim": {\n    "source": "iana"\n  },\n  "message/delivery-status": {\n    "source": "iana"\n  },\n  "message/disposition-notification": {\n    "source": "iana",\n    "extensions": [\n      "disposition-notification"\n    ]\n  },\n  "message/external-body": {\n    "source": "iana"\n  },\n  "message/feedback-report": {\n    "source": "iana"\n  },\n  "message/global": {\n    "source": "iana",\n    "extensions": ["u8msg"]\n  },\n  "message/global-delivery-status": {\n    "source": "iana",\n    "extensions": ["u8dsn"]\n  },\n  "message/global-disposition-notification": {\n    "source": "iana",\n    "extensions": ["u8mdn"]\n  },\n  "message/global-headers": {\n    "source": "iana",\n    "extensions": ["u8hdr"]\n  },\n  "message/http": {\n    "source": "iana",\n    "compressible": false\n  },\n  "message/imdn+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "message/news": {\n    "source": "iana"\n  },\n  "message/partial": {\n    "source": "iana",\n    "compressible": false\n  },\n  "message/rfc822": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["eml","mime"]\n  },\n  "message/s-http": {\n    "source": "iana"\n  },\n  "message/sip": {\n    "source": "iana"\n  },\n  "message/sipfrag": {\n    "source": "iana"\n  },\n  "message/tracking-status": {\n    "source": "iana"\n  },\n  "message/vnd.si.simp": {\n    "source": "iana"\n  },\n  "message/vnd.wfa.wsc": {\n    "source": "iana",\n    "extensions": ["wsc"]\n  },\n  "model/3mf": {\n    "source": "iana",\n    "extensions": ["3mf"]\n  },\n  "model/e57": {\n    "source": "iana"\n  },\n  "model/gltf+json": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["gltf"]\n  },\n  "model/gltf-binary": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["glb"]\n  },\n  "model/iges": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["igs","iges"]\n  },\n  "model/mesh": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["msh","mesh","silo"]\n  },\n  "model/mtl": {\n    "source": "iana",\n    "extensions": ["mtl"]\n  },\n  "model/obj": {\n    "source": "iana",\n    "extensions": ["obj"]\n  },\n  "model/stl": {\n    "source": "iana",\n    "extensions": ["stl"]\n  },\n  "model/vnd.collada+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["dae"]\n  },\n  "model/vnd.dwf": {\n    "source": "iana",\n    "extensions": ["dwf"]\n  },\n  "model/vnd.flatland.3dml": {\n    "source": "iana"\n  },\n  "model/vnd.gdl": {\n    "source": "iana",\n    "extensions": ["gdl"]\n  },\n  "model/vnd.gs-gdl": {\n    "source": "apache"\n  },\n  "model/vnd.gs.gdl": {\n    "source": "iana"\n  },\n  "model/vnd.gtw": {\n    "source": "iana",\n    "extensions": ["gtw"]\n  },\n  "model/vnd.moml+xml": {\n    "source": "iana",\n    "compressible": true\n  },\n  "model/vnd.mts": {\n    "source": "iana",\n    "extensions": ["mts"]\n  },\n  "model/vnd.opengex": {\n    "source": "iana",\n    "extensions": ["ogex"]\n  },\n  "model/vnd.parasolid.transmit.binary": {\n    "source": "iana",\n    "extensions": ["x_b"]\n  },\n  "model/vnd.parasolid.transmit.text": {\n    "source": "iana",\n    "extensions": ["x_t"]\n  },\n  "model/vnd.rosette.annotated-data-model": {\n    "source": "iana"\n  },\n  "model/vnd.usdz+zip": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["usdz"]\n  },\n  "model/vnd.valve.source.compiled-map": {\n    "source": "iana",\n    "extensions": ["bsp"]\n  },\n  "model/vnd.vtu": {\n    "source": "iana",\n    "extensions": ["vtu"]\n  },\n  "model/vrml": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["wrl","vrml"]\n  },\n  "model/x3d+binary": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["x3db","x3dbz"]\n  },\n  "model/x3d+fastinfoset": {\n    "source": "iana",\n    "extensions": ["x3db"]\n  },\n  "model/x3d+vrml": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["x3dv","x3dvz"]\n  },\n  "model/x3d+xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["x3d","x3dz"]\n  },\n  "model/x3d-vrml": {\n    "source": "iana",\n    "extensions": ["x3dv"]\n  },\n  "multipart/alternative": {\n    "source": "iana",\n    "compressible": false\n  },\n  "multipart/appledouble": {\n    "source": "iana"\n  },\n  "multipart/byteranges": {\n    "source": "iana"\n  },\n  "multipart/digest": {\n    "source": "iana"\n  },\n  "multipart/encrypted": {\n    "source": "iana",\n    "compressible": false\n  },\n  "multipart/form-data": {\n    "source": "iana",\n    "compressible": false\n  },\n  "multipart/header-set": {\n    "source": "iana"\n  },\n  "multipart/mixed": {\n    "source": "iana"\n  },\n  "multipart/multilingual": {\n    "source": "iana"\n  },\n  "multipart/parallel": {\n    "source": "iana"\n  },\n  "multipart/related": {\n    "source": "iana",\n    "compressible": false\n  },\n  "multipart/report": {\n    "source": "iana"\n  },\n  "multipart/signed": {\n    "source": "iana",\n    "compressible": false\n  },\n  "multipart/vnd.bint.med-plus": {\n    "source": "iana"\n  },\n  "multipart/voice-message": {\n    "source": "iana"\n  },\n  "multipart/x-mixed-replace": {\n    "source": "iana"\n  },\n  "text/1d-interleaved-parityfec": {\n    "source": "iana"\n  },\n  "text/cache-manifest": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["appcache","manifest"]\n  },\n  "text/calendar": {\n    "source": "iana",\n    "extensions": ["ics","ifb"]\n  },\n  "text/calender": {\n    "compressible": true\n  },\n  "text/cmd": {\n    "compressible": true\n  },\n  "text/coffeescript": {\n    "extensions": ["coffee","litcoffee"]\n  },\n  "text/cql": {\n    "source": "iana"\n  },\n  "text/cql-expression": {\n    "source": "iana"\n  },\n  "text/cql-identifier": {\n    "source": "iana"\n  },\n  "text/css": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["css"]\n  },\n  "text/csv": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["csv"]\n  },\n  "text/csv-schema": {\n    "source": "iana"\n  },\n  "text/directory": {\n    "source": "iana"\n  },\n  "text/dns": {\n    "source": "iana"\n  },\n  "text/ecmascript": {\n    "source": "iana"\n  },\n  "text/encaprtp": {\n    "source": "iana"\n  },\n  "text/enriched": {\n    "source": "iana"\n  },\n  "text/fhirpath": {\n    "source": "iana"\n  },\n  "text/flexfec": {\n    "source": "iana"\n  },\n  "text/fwdred": {\n    "source": "iana"\n  },\n  "text/gff3": {\n    "source": "iana"\n  },\n  "text/grammar-ref-list": {\n    "source": "iana"\n  },\n  "text/html": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["html","htm","shtml"]\n  },\n  "text/jade": {\n    "extensions": ["jade"]\n  },\n  "text/javascript": {\n    "source": "iana",\n    "compressible": true\n  },\n  "text/jcr-cnd": {\n    "source": "iana"\n  },\n  "text/jsx": {\n    "compressible": true,\n    "extensions": ["jsx"]\n  },\n  "text/less": {\n    "compressible": true,\n    "extensions": ["less"]\n  },\n  "text/markdown": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["markdown","md"]\n  },\n  "text/mathml": {\n    "source": "nginx",\n    "extensions": ["mml"]\n  },\n  "text/mdx": {\n    "compressible": true,\n    "extensions": ["mdx"]\n  },\n  "text/mizar": {\n    "source": "iana"\n  },\n  "text/n3": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["n3"]\n  },\n  "text/parameters": {\n    "source": "iana",\n    "charset": "UTF-8"\n  },\n  "text/parityfec": {\n    "source": "iana"\n  },\n  "text/plain": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["txt","text","conf","def","list","log","in","ini"]\n  },\n  "text/provenance-notation": {\n    "source": "iana",\n    "charset": "UTF-8"\n  },\n  "text/prs.fallenstein.rst": {\n    "source": "iana"\n  },\n  "text/prs.lines.tag": {\n    "source": "iana",\n    "extensions": ["dsc"]\n  },\n  "text/prs.prop.logic": {\n    "source": "iana"\n  },\n  "text/raptorfec": {\n    "source": "iana"\n  },\n  "text/red": {\n    "source": "iana"\n  },\n  "text/rfc822-headers": {\n    "source": "iana"\n  },\n  "text/richtext": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rtx"]\n  },\n  "text/rtf": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["rtf"]\n  },\n  "text/rtp-enc-aescm128": {\n    "source": "iana"\n  },\n  "text/rtploopback": {\n    "source": "iana"\n  },\n  "text/rtx": {\n    "source": "iana"\n  },\n  "text/sgml": {\n    "source": "iana",\n    "extensions": ["sgml","sgm"]\n  },\n  "text/shaclc": {\n    "source": "iana"\n  },\n  "text/shex": {\n    "extensions": ["shex"]\n  },\n  "text/slim": {\n    "extensions": ["slim","slm"]\n  },\n  "text/spdx": {\n    "source": "iana",\n    "extensions": ["spdx"]\n  },\n  "text/strings": {\n    "source": "iana"\n  },\n  "text/stylus": {\n    "extensions": ["stylus","styl"]\n  },\n  "text/t140": {\n    "source": "iana"\n  },\n  "text/tab-separated-values": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["tsv"]\n  },\n  "text/troff": {\n    "source": "iana",\n    "extensions": ["t","tr","roff","man","me","ms"]\n  },\n  "text/turtle": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "extensions": ["ttl"]\n  },\n  "text/ulpfec": {\n    "source": "iana"\n  },\n  "text/uri-list": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["uri","uris","urls"]\n  },\n  "text/vcard": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["vcard"]\n  },\n  "text/vnd.a": {\n    "source": "iana"\n  },\n  "text/vnd.abc": {\n    "source": "iana"\n  },\n  "text/vnd.ascii-art": {\n    "source": "iana"\n  },\n  "text/vnd.curl": {\n    "source": "iana",\n    "extensions": ["curl"]\n  },\n  "text/vnd.curl.dcurl": {\n    "source": "apache",\n    "extensions": ["dcurl"]\n  },\n  "text/vnd.curl.mcurl": {\n    "source": "apache",\n    "extensions": ["mcurl"]\n  },\n  "text/vnd.curl.scurl": {\n    "source": "apache",\n    "extensions": ["scurl"]\n  },\n  "text/vnd.debian.copyright": {\n    "source": "iana",\n    "charset": "UTF-8"\n  },\n  "text/vnd.dmclientscript": {\n    "source": "iana"\n  },\n  "text/vnd.dvb.subtitle": {\n    "source": "iana",\n    "extensions": ["sub"]\n  },\n  "text/vnd.esmertec.theme-descriptor": {\n    "source": "iana",\n    "charset": "UTF-8"\n  },\n  "text/vnd.ficlab.flt": {\n    "source": "iana"\n  },\n  "text/vnd.fly": {\n    "source": "iana",\n    "extensions": ["fly"]\n  },\n  "text/vnd.fmi.flexstor": {\n    "source": "iana",\n    "extensions": ["flx"]\n  },\n  "text/vnd.gml": {\n    "source": "iana"\n  },\n  "text/vnd.graphviz": {\n    "source": "iana",\n    "extensions": ["gv"]\n  },\n  "text/vnd.hans": {\n    "source": "iana"\n  },\n  "text/vnd.hgl": {\n    "source": "iana"\n  },\n  "text/vnd.in3d.3dml": {\n    "source": "iana",\n    "extensions": ["3dml"]\n  },\n  "text/vnd.in3d.spot": {\n    "source": "iana",\n    "extensions": ["spot"]\n  },\n  "text/vnd.iptc.newsml": {\n    "source": "iana"\n  },\n  "text/vnd.iptc.nitf": {\n    "source": "iana"\n  },\n  "text/vnd.latex-z": {\n    "source": "iana"\n  },\n  "text/vnd.motorola.reflex": {\n    "source": "iana"\n  },\n  "text/vnd.ms-mediapackage": {\n    "source": "iana"\n  },\n  "text/vnd.net2phone.commcenter.command": {\n    "source": "iana"\n  },\n  "text/vnd.radisys.msml-basic-layout": {\n    "source": "iana"\n  },\n  "text/vnd.senx.warpscript": {\n    "source": "iana"\n  },\n  "text/vnd.si.uricatalogue": {\n    "source": "iana"\n  },\n  "text/vnd.sosi": {\n    "source": "iana"\n  },\n  "text/vnd.sun.j2me.app-descriptor": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "extensions": ["jad"]\n  },\n  "text/vnd.trolltech.linguist": {\n    "source": "iana",\n    "charset": "UTF-8"\n  },\n  "text/vnd.wap.si": {\n    "source": "iana"\n  },\n  "text/vnd.wap.sl": {\n    "source": "iana"\n  },\n  "text/vnd.wap.wml": {\n    "source": "iana",\n    "extensions": ["wml"]\n  },\n  "text/vnd.wap.wmlscript": {\n    "source": "iana",\n    "extensions": ["wmls"]\n  },\n  "text/vtt": {\n    "source": "iana",\n    "charset": "UTF-8",\n    "compressible": true,\n    "extensions": ["vtt"]\n  },\n  "text/x-asm": {\n    "source": "apache",\n    "extensions": ["s","asm"]\n  },\n  "text/x-c": {\n    "source": "apache",\n    "extensions": ["c","cc","cxx","cpp","h","hh","dic"]\n  },\n  "text/x-component": {\n    "source": "nginx",\n    "extensions": ["htc"]\n  },\n  "text/x-fortran": {\n    "source": "apache",\n    "extensions": ["f","for","f77","f90"]\n  },\n  "text/x-gwt-rpc": {\n    "compressible": true\n  },\n  "text/x-handlebars-template": {\n    "extensions": ["hbs"]\n  },\n  "text/x-java-source": {\n    "source": "apache",\n    "extensions": ["java"]\n  },\n  "text/x-jquery-tmpl": {\n    "compressible": true\n  },\n  "text/x-lua": {\n    "extensions": ["lua"]\n  },\n  "text/x-markdown": {\n    "compressible": true,\n    "extensions": ["mkd"]\n  },\n  "text/x-nfo": {\n    "source": "apache",\n    "extensions": ["nfo"]\n  },\n  "text/x-opml": {\n    "source": "apache",\n    "extensions": ["opml"]\n  },\n  "text/x-org": {\n    "compressible": true,\n    "extensions": ["org"]\n  },\n  "text/x-pascal": {\n    "source": "apache",\n    "extensions": ["p","pas"]\n  },\n  "text/x-processing": {\n    "compressible": true,\n    "extensions": ["pde"]\n  },\n  "text/x-sass": {\n    "extensions": ["sass"]\n  },\n  "text/x-scss": {\n    "extensions": ["scss"]\n  },\n  "text/x-setext": {\n    "source": "apache",\n    "extensions": ["etx"]\n  },\n  "text/x-sfv": {\n    "source": "apache",\n    "extensions": ["sfv"]\n  },\n  "text/x-suse-ymp": {\n    "compressible": true,\n    "extensions": ["ymp"]\n  },\n  "text/x-uuencode": {\n    "source": "apache",\n    "extensions": ["uu"]\n  },\n  "text/x-vcalendar": {\n    "source": "apache",\n    "extensions": ["vcs"]\n  },\n  "text/x-vcard": {\n    "source": "apache",\n    "extensions": ["vcf"]\n  },\n  "text/xml": {\n    "source": "iana",\n    "compressible": true,\n    "extensions": ["xml"]\n  },\n  "text/xml-external-parsed-entity": {\n    "source": "iana"\n  },\n  "text/yaml": {\n    "extensions": ["yaml","yml"]\n  },\n  "video/1d-interleaved-parityfec": {\n    "source": "iana"\n  },\n  "video/3gpp": {\n    "source": "iana",\n    "extensions": ["3gp","3gpp"]\n  },\n  "video/3gpp-tt": {\n    "source": "iana"\n  },\n  "video/3gpp2": {\n    "source": "iana",\n    "extensions": ["3g2"]\n  },\n  "video/bmpeg": {\n    "source": "iana"\n  },\n  "video/bt656": {\n    "source": "iana"\n  },\n  "video/celb": {\n    "source": "iana"\n  },\n  "video/dv": {\n    "source": "iana"\n  },\n  "video/encaprtp": {\n    "source": "iana"\n  },\n  "video/flexfec": {\n    "source": "iana"\n  },\n  "video/h261": {\n    "source": "iana",\n    "extensions": ["h261"]\n  },\n  "video/h263": {\n    "source": "iana",\n    "extensions": ["h263"]\n  },\n  "video/h263-1998": {\n    "source": "iana"\n  },\n  "video/h263-2000": {\n    "source": "iana"\n  },\n  "video/h264": {\n    "source": "iana",\n    "extensions": ["h264"]\n  },\n  "video/h264-rcdo": {\n    "source": "iana"\n  },\n  "video/h264-svc": {\n    "source": "iana"\n  },\n  "video/h265": {\n    "source": "iana"\n  },\n  "video/iso.segment": {\n    "source": "iana"\n  },\n  "video/jpeg": {\n    "source": "iana",\n    "extensions": ["jpgv"]\n  },\n  "video/jpeg2000": {\n    "source": "iana"\n  },\n  "video/jpm": {\n    "source": "apache",\n    "extensions": ["jpm","jpgm"]\n  },\n  "video/mj2": {\n    "source": "iana",\n    "extensions": ["mj2","mjp2"]\n  },\n  "video/mp1s": {\n    "source": "iana"\n  },\n  "video/mp2p": {\n    "source": "iana"\n  },\n  "video/mp2t": {\n    "source": "iana",\n    "extensions": ["ts"]\n  },\n  "video/mp4": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["mp4","mp4v","mpg4"]\n  },\n  "video/mp4v-es": {\n    "source": "iana"\n  },\n  "video/mpeg": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["mpeg","mpg","mpe","m1v","m2v"]\n  },\n  "video/mpeg4-generic": {\n    "source": "iana"\n  },\n  "video/mpv": {\n    "source": "iana"\n  },\n  "video/nv": {\n    "source": "iana"\n  },\n  "video/ogg": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["ogv"]\n  },\n  "video/parityfec": {\n    "source": "iana"\n  },\n  "video/pointer": {\n    "source": "iana"\n  },\n  "video/quicktime": {\n    "source": "iana",\n    "compressible": false,\n    "extensions": ["qt","mov"]\n  },\n  "video/raptorfec": {\n    "source": "iana"\n  },\n  "video/raw": {\n    "source": "iana"\n  },\n  "video/rtp-enc-aescm128": {\n    "source": "iana"\n  },\n  "video/rtploopback": {\n    "source": "iana"\n  },\n  "video/rtx": {\n    "source": "iana"\n  },\n  "video/smpte291": {\n    "source": "iana"\n  },\n  "video/smpte292m": {\n    "source": "iana"\n  },\n  "video/ulpfec": {\n    "source": "iana"\n  },\n  "video/vc1": {\n    "source": "iana"\n  },\n  "video/vc2": {\n    "source": "iana"\n  },\n  "video/vnd.cctv": {\n    "source": "iana"\n  },\n  "video/vnd.dece.hd": {\n    "source": "iana",\n    "extensions": ["uvh","uvvh"]\n  },\n  "video/vnd.dece.mobile": {\n    "source": "iana",\n    "extensions": ["uvm","uvvm"]\n  },\n  "video/vnd.dece.mp4": {\n    "source": "iana"\n  },\n  "video/vnd.dece.pd": {\n    "source": "iana",\n    "extensions": ["uvp","uvvp"]\n  },\n  "video/vnd.dece.sd": {\n    "source": "iana",\n    "extensions": ["uvs","uvvs"]\n  },\n  "video/vnd.dece.video": {\n    "source": "iana",\n    "extensions": ["uvv","uvvv"]\n  },\n  "video/vnd.directv.mpeg": {\n    "source": "iana"\n  },\n  "video/vnd.directv.mpeg-tts": {\n    "source": "iana"\n  },\n  "video/vnd.dlna.mpeg-tts": {\n    "source": "iana"\n  },\n  "video/vnd.dvb.file": {\n    "source": "iana",\n    "extensions": ["dvb"]\n  },\n  "video/vnd.fvt": {\n    "source": "iana",\n    "extensions": ["fvt"]\n  },\n  "video/vnd.hns.video": {\n    "source": "iana"\n  },\n  "video/vnd.iptvforum.1dparityfec-1010": {\n    "source": "iana"\n  },\n  "video/vnd.iptvforum.1dparityfec-2005": {\n    "source": "iana"\n  },\n  "video/vnd.iptvforum.2dparityfec-1010": {\n    "source": "iana"\n  },\n  "video/vnd.iptvforum.2dparityfec-2005": {\n    "source": "iana"\n  },\n  "video/vnd.iptvforum.ttsavc": {\n    "source": "iana"\n  },\n  "video/vnd.iptvforum.ttsmpeg2": {\n    "source": "iana"\n  },\n  "video/vnd.motorola.video": {\n    "source": "iana"\n  },\n  "video/vnd.motorola.videop": {\n    "source": "iana"\n  },\n  "video/vnd.mpegurl": {\n    "source": "iana",\n    "extensions": ["mxu","m4u"]\n  },\n  "video/vnd.ms-playready.media.pyv": {\n    "source": "iana",\n    "extensions": ["pyv"]\n  },\n  "video/vnd.nokia.interleaved-multimedia": {\n    "source": "iana"\n  },\n  "video/vnd.nokia.mp4vr": {\n    "source": "iana"\n  },\n  "video/vnd.nokia.videovoip": {\n    "source": "iana"\n  },\n  "video/vnd.objectvideo": {\n    "source": "iana"\n  },\n  "video/vnd.radgamettools.bink": {\n    "source": "iana"\n  },\n  "video/vnd.radgamettools.smacker": {\n    "source": "iana"\n  },\n  "video/vnd.sealed.mpeg1": {\n    "source": "iana"\n  },\n  "video/vnd.sealed.mpeg4": {\n    "source": "iana"\n  },\n  "video/vnd.sealed.swf": {\n    "source": "iana"\n  },\n  "video/vnd.sealedmedia.softseal.mov": {\n    "source": "iana"\n  },\n  "video/vnd.uvvu.mp4": {\n    "source": "iana",\n    "extensions": ["uvu","uvvu"]\n  },\n  "video/vnd.vivo": {\n    "source": "iana",\n    "extensions": ["viv"]\n  },\n  "video/vnd.youtube.yt": {\n    "source": "iana"\n  },\n  "video/vp8": {\n    "source": "iana"\n  },\n  "video/webm": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["webm"]\n  },\n  "video/x-f4v": {\n    "source": "apache",\n    "extensions": ["f4v"]\n  },\n  "video/x-fli": {\n    "source": "apache",\n    "extensions": ["fli"]\n  },\n  "video/x-flv": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["flv"]\n  },\n  "video/x-m4v": {\n    "source": "apache",\n    "extensions": ["m4v"]\n  },\n  "video/x-matroska": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["mkv","mk3d","mks"]\n  },\n  "video/x-mng": {\n    "source": "apache",\n    "extensions": ["mng"]\n  },\n  "video/x-ms-asf": {\n    "source": "apache",\n    "extensions": ["asf","asx"]\n  },\n  "video/x-ms-vob": {\n    "source": "apache",\n    "extensions": ["vob"]\n  },\n  "video/x-ms-wm": {\n    "source": "apache",\n    "extensions": ["wm"]\n  },\n  "video/x-ms-wmv": {\n    "source": "apache",\n    "compressible": false,\n    "extensions": ["wmv"]\n  },\n  "video/x-ms-wmx": {\n    "source": "apache",\n    "extensions": ["wmx"]\n  },\n  "video/x-ms-wvx": {\n    "source": "apache",\n    "extensions": ["wvx"]\n  },\n  "video/x-msvideo": {\n    "source": "apache",\n    "extensions": ["avi"]\n  },\n  "video/x-sgi-movie": {\n    "source": "apache",\n    "extensions": ["movie"]\n  },\n  "video/x-smv": {\n    "source": "apache",\n    "extensions": ["smv"]\n  },\n  "x-conference/x-cooltalk": {\n    "source": "apache",\n    "extensions": ["ice"]\n  },\n  "x-shader/x-fragment": {\n    "compressible": true\n  },\n  "x-shader/x-vertex": {\n    "compressible": true\n  }\n}`);
const CHAR_FORWARD_SLASH1 = 47;
function assertPath1(path1) {
    if (typeof path1 !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path1)}`);
    }
}
function isPosixPathSeparator1(code) {
    return code === 47;
}
function isPathSeparator1(code) {
    return isPosixPathSeparator1(code) || code === 92;
}
function isWindowsDeviceRoot1(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString1(path1, allowAboveRoot, separator, isPathSeparator2) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i = 0, len = path1.length; i <= len; ++i){
        if (i < len) code = path1.charCodeAt(i);
        else if (isPathSeparator2(code)) break;
        else code = CHAR_FORWARD_SLASH1;
        if (isPathSeparator2(code)) {
            if (lastSlash === i - 1 || dots === 1) {
            } else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path1.slice(lastSlash + 1, i);
                else res = path1.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format1(sep3, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep3 + base;
}
class DenoStdInternalError1 extends Error {
    constructor(message42){
        super(message42);
        this.name = "DenoStdInternalError";
    }
}
function assert1(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError1(msg);
    }
}
const osType1 = (()=>{
    if (globalThis.Deno != null) {
        return Deno.build.os;
    }
    const navigator = globalThis.navigator;
    if (navigator?.appVersion?.includes?.("Win") ?? false) {
        return "windows";
    }
    return "linux";
})();
const isWindows1 = osType1 === "windows";
const sep3 = "\\";
const delimiter3 = ";";
function resolve3(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1; i--){
        let path1;
        if (i >= 0) {
            path1 = pathSegments[i];
        } else if (!resolvedDevice) {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path1 = Deno.cwd();
        } else {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path1 = Deno.env.get(`=${resolvedDevice}`) || Deno.cwd();
            if (path1 === undefined || path1.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path1 = `${resolvedDevice}\\`;
            }
        }
        assertPath1(path1);
        const len = path1.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute3 = false;
        const code = path1.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator1(code)) {
                isAbsolute3 = true;
                if (isPathSeparator1(path1.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for(; j < len; ++j){
                        if (isPathSeparator1(path1.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path1.slice(last, j);
                        last = j;
                        for(; j < len; ++j){
                            if (!isPathSeparator1(path1.charCodeAt(j))) break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for(; j < len; ++j){
                                if (isPathSeparator1(path1.charCodeAt(j))) break;
                            }
                            if (j === len) {
                                device = `\\\\${firstPart}\\${path1.slice(last)}`;
                                rootEnd = j;
                            } else if (j !== last) {
                                device = `\\\\${firstPart}\\${path1.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot1(code)) {
                if (path1.charCodeAt(1) === 58) {
                    device = path1.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator1(path1.charCodeAt(2))) {
                            isAbsolute3 = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator1(code)) {
            rootEnd = 1;
            isAbsolute3 = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path1.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute3;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString1(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator1);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize3(path1) {
    assertPath1(path1);
    const len = path1.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute3 = false;
    const code = path1.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            isAbsolute3 = true;
            if (isPathSeparator1(path1.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator1(path1.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    const firstPart = path1.slice(last, j);
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator1(path1.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator1(path1.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path1.slice(last)}\\`;
                        } else if (j !== last) {
                            device = `\\\\${firstPart}\\${path1.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path1.charCodeAt(1) === 58) {
                device = path1.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path1.charCodeAt(2))) {
                        isAbsolute3 = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString1(path1.slice(rootEnd), !isAbsolute3, "\\", isPathSeparator1);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute3) tail = ".";
    if (tail.length > 0 && isPathSeparator1(path1.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute3) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute3) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute3(path1) {
    assertPath1(path1);
    const len = path1.length;
    if (len === 0) return false;
    const code = path1.charCodeAt(0);
    if (isPathSeparator1(code)) {
        return true;
    } else if (isWindowsDeviceRoot1(code)) {
        if (len > 2 && path1.charCodeAt(1) === 58) {
            if (isPathSeparator1(path1.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join3(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i = 0; i < pathsCount; ++i){
        const path1 = paths[i];
        assertPath1(path1);
        if (path1.length > 0) {
            if (joined === undefined) joined = firstPart = path1;
            else joined += `\\${path1}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert1(firstPart != null);
    if (isPathSeparator1(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator1(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator1(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator1(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize3(joined);
}
function relative3(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    const fromOrig = resolve3(from);
    const toOrig = resolve3(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92) {
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92) {
                    lastCommonSep = i;
                } else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath3(path1) {
    if (typeof path1 !== "string") return path1;
    if (path1.length === 0) return "";
    const resolvedPath = resolve3(path1);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot1(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path1;
}
function dirname3(path1) {
    assertPath1(path1);
    const len = path1.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path1.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator1(path1.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator1(path1.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator1(path1.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator1(path1.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return path1;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path1.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator1(path1.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        return path1;
    }
    for(let i = len - 1; i >= offset; --i){
        if (isPathSeparator1(path1.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path1.slice(0, end);
}
function basename3(path1, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath1(path1);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (path1.length >= 2) {
        const drive = path1.charCodeAt(0);
        if (isWindowsDeviceRoot1(drive)) {
            if (path1.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path1.length) {
        if (ext.length === path1.length && ext === path1) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path1.length - 1; i >= start; --i){
            const code = path1.charCodeAt(i);
            if (isPathSeparator1(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if ((--extIdx) === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path1.length;
        return path1.slice(start, end);
    } else {
        for(i = path1.length - 1; i >= start; --i){
            if (isPathSeparator1(path1.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path1.slice(start, end);
    }
}
function extname3(path1) {
    assertPath1(path1);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path1.length >= 2 && path1.charCodeAt(1) === 58 && isWindowsDeviceRoot1(path1.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i = path1.length - 1; i >= start; --i){
        const code = path1.charCodeAt(i);
        if (isPathSeparator1(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path1.slice(startDot, end);
}
function format3(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format1("\\", pathObject);
}
function parse3(path1) {
    assertPath1(path1);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path1.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path1.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            rootEnd = 1;
            if (isPathSeparator1(path1.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator1(path1.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator1(path1.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator1(path1.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        } else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path1.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path1.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path1;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path1;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        ret.root = ret.dir = path1;
        return ret;
    }
    if (rootEnd > 0) ret.root = path1.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path1.length - 1;
    let preDotState = 0;
    for(; i >= rootEnd; --i){
        code = path1.charCodeAt(i);
        if (isPathSeparator1(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path1.slice(startPart, end);
        }
    } else {
        ret.name = path1.slice(startPart, startDot);
        ret.base = path1.slice(startPart, end);
        ret.ext = path1.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path1.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl3(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path1 = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path1 = `\\\\${url.hostname}${path1}`;
    }
    return path1;
}
function toFileUrl3(path1) {
    if (!isAbsolute3(path1)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path1.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\][^/\\]))?(.*)/);
    const url = new URL("file:///");
    url.pathname = pathname.replace(/%/g, "%25");
    if (hostname != null) {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod2 = function() {
    return {
        sep: sep3,
        delimiter: delimiter3,
        resolve: resolve3,
        normalize: normalize3,
        isAbsolute: isAbsolute3,
        join: join3,
        relative: relative3,
        toNamespacedPath: toNamespacedPath3,
        dirname: dirname3,
        basename: basename3,
        extname: extname3,
        format: format3,
        parse: parse3,
        fromFileUrl: fromFileUrl3,
        toFileUrl: toFileUrl3
    };
}();
const sep4 = "/";
const delimiter4 = ":";
function resolve4(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
        let path1;
        if (i >= 0) path1 = pathSegments[i];
        else {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path1 = Deno.cwd();
        }
        assertPath1(path1);
        if (path1.length === 0) {
            continue;
        }
        resolvedPath = `${path1}/${resolvedPath}`;
        resolvedAbsolute = path1.charCodeAt(0) === CHAR_FORWARD_SLASH1;
    }
    resolvedPath = normalizeString1(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator1);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize4(path1) {
    assertPath1(path1);
    if (path1.length === 0) return ".";
    const isAbsolute4 = path1.charCodeAt(0) === 47;
    const trailingSeparator = path1.charCodeAt(path1.length - 1) === 47;
    path1 = normalizeString1(path1, !isAbsolute4, "/", isPosixPathSeparator1);
    if (path1.length === 0 && !isAbsolute4) path1 = ".";
    if (path1.length > 0 && trailingSeparator) path1 += "/";
    if (isAbsolute4) return `/${path1}`;
    return path1;
}
function isAbsolute4(path1) {
    assertPath1(path1);
    return path1.length > 0 && path1.charCodeAt(0) === 47;
}
function join4(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i = 0, len = paths.length; i < len; ++i){
        const path1 = paths[i];
        assertPath1(path1);
        if (path1.length > 0) {
            if (!joined) joined = path1;
            else joined += `/${path1}`;
        }
    }
    if (!joined) return ".";
    return normalize4(joined);
}
function relative4(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    from = resolve4(from);
    to = resolve4(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                    lastCommonSep = i;
                } else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
    }
    let out = "";
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath4(path1) {
    return path1;
}
function dirname4(path1) {
    assertPath1(path1);
    if (path1.length === 0) return ".";
    const hasRoot = path1.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i = path1.length - 1; i >= 1; --i){
        if (path1.charCodeAt(i) === 47) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path1.slice(0, end);
}
function basename4(path1, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath1(path1);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path1.length) {
        if (ext.length === path1.length && ext === path1) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path1.length - 1; i >= 0; --i){
            const code = path1.charCodeAt(i);
            if (code === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if ((--extIdx) === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path1.length;
        return path1.slice(start, end);
    } else {
        for(i = path1.length - 1; i >= 0; --i){
            if (path1.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path1.slice(start, end);
    }
}
function extname4(path1) {
    assertPath1(path1);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path1.length - 1; i >= 0; --i){
        const code = path1.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path1.slice(startDot, end);
}
function format4(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format1("/", pathObject);
}
function parse4(path1) {
    assertPath1(path1);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path1.length === 0) return ret;
    const isAbsolute5 = path1.charCodeAt(0) === 47;
    let start;
    if (isAbsolute5) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path1.length - 1;
    let preDotState = 0;
    for(; i >= start; --i){
        const code = path1.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute5) {
                ret.base = ret.name = path1.slice(1, end);
            } else {
                ret.base = ret.name = path1.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute5) {
            ret.name = path1.slice(1, startDot);
            ret.base = path1.slice(1, end);
        } else {
            ret.name = path1.slice(startPart, startDot);
            ret.base = path1.slice(startPart, end);
        }
        ret.ext = path1.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path1.slice(0, startPart - 1);
    else if (isAbsolute5) ret.dir = "/";
    return ret;
}
function fromFileUrl4(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl4(path1) {
    if (!isAbsolute4(path1)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = path1.replace(/%/g, "%25").replace(/\\/g, "%5C");
    return url;
}
const mod3 = function() {
    return {
        sep: sep4,
        delimiter: delimiter4,
        resolve: resolve4,
        normalize: normalize4,
        isAbsolute: isAbsolute4,
        join: join4,
        relative: relative4,
        toNamespacedPath: toNamespacedPath4,
        dirname: dirname4,
        basename: basename4,
        extname: extname4,
        format: format4,
        parse: parse4,
        fromFileUrl: fromFileUrl4,
        toFileUrl: toFileUrl4
    };
}();
const path1 = isWindows1 ? mod2 : mod3;
const { basename: basename5 , delimiter: delimiter5 , dirname: dirname5 , extname: extname5 , format: format5 , fromFileUrl: fromFileUrl5 , isAbsolute: isAbsolute5 , join: join5 , normalize: normalize5 , parse: parse5 , relative: relative5 , resolve: resolve5 , sep: sep5 , toFileUrl: toFileUrl5 , toNamespacedPath: toNamespacedPath5 ,  } = path1;
const EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
const TEXT_TYPE_REGEXP = /^text\//i;
const extensions = new Map();
const types = new Map();
function populateMaps(extensions1, types1) {
    const preference = [
        "nginx",
        "apache",
        undefined,
        "iana"
    ];
    for (const type of Object.keys(db)){
        const mime = db[type];
        const exts = mime.extensions;
        if (!exts || !exts.length) {
            continue;
        }
        extensions1.set(type, exts);
        for (const ext of exts){
            const current = types1.get(ext);
            if (current) {
                const from = preference.indexOf(db[current].source);
                const to = preference.indexOf(mime.source);
                if (current !== "application/octet-stream" && (from > to || from === to && current.substr(0, 12) === "application/")) {
                    continue;
                }
            }
            types1.set(ext, type);
        }
    }
}
populateMaps(extensions, types);
function charset(type) {
    const m = EXTRACT_TYPE_REGEXP.exec(type);
    if (!m) {
        return undefined;
    }
    const [match] = m;
    const mime = db[match.toLowerCase()];
    if (mime && mime.charset) {
        return mime.charset;
    }
    if (TEXT_TYPE_REGEXP.test(match)) {
        return "UTF-8";
    }
    return undefined;
}
function lookup(path2) {
    const extension = extname5("x." + path2).toLowerCase().substr(1);
    return types.get(extension);
}
function contentType(str) {
    let mime = str.includes("/") ? str : lookup(str);
    if (!mime) {
        return undefined;
    }
    if (!mime.includes("charset")) {
        const cs = charset(mime);
        if (cs) {
            mime += `; charset=${cs.toLowerCase()}`;
        }
    }
    return mime;
}
function copy(src, dst, off = 0) {
    off = Math.max(0, Math.min(off, dst.byteLength));
    const dstBytesAvailable = dst.byteLength - off;
    if (src.byteLength > dstBytesAvailable) {
        src = src.subarray(0, dstBytesAvailable);
    }
    dst.set(src, off);
    return src.byteLength;
}
const MIN_READ = 32 * 1024;
const MAX_SIZE = 2 ** 32 - 2;
class Buffer {
    #buf;
    #off = 0;
    constructor(ab){
        this.#buf = ab === undefined ? new Uint8Array(0) : new Uint8Array(ab);
    }
    bytes(options = {
        copy: true
    }) {
        if (options.copy === false) return this.#buf.subarray(this.#off);
        return this.#buf.slice(this.#off);
    }
    empty() {
        return this.#buf.byteLength <= this.#off;
    }
    get length() {
        return this.#buf.byteLength - this.#off;
    }
    get capacity() {
        return this.#buf.buffer.byteLength;
    }
    truncate(n) {
        if (n === 0) {
            this.reset();
            return;
        }
        if (n < 0 || n > this.length) {
            throw Error("bytes.Buffer: truncation out of range");
        }
        this.#reslice(this.#off + n);
    }
    reset() {
        this.#reslice(0);
        this.#off = 0;
    }
     #tryGrowByReslice(n) {
        const l = this.#buf.byteLength;
        if (n <= this.capacity - l) {
            this.#reslice(l + n);
            return l;
        }
        return -1;
    }
     #reslice(len) {
        assert(len <= this.#buf.buffer.byteLength);
        this.#buf = new Uint8Array(this.#buf.buffer, 0, len);
    }
    readSync(p) {
        if (this.empty()) {
            this.reset();
            if (p.byteLength === 0) {
                return 0;
            }
            return null;
        }
        const nread = copy(this.#buf.subarray(this.#off), p);
        this.#off += nread;
        return nread;
    }
    read(p) {
        const rr = this.readSync(p);
        return Promise.resolve(rr);
    }
    writeSync(p) {
        const m = this.#grow(p.byteLength);
        return copy(p, this.#buf, m);
    }
    write(p) {
        const n = this.writeSync(p);
        return Promise.resolve(n);
    }
     #grow(n) {
        const m = this.length;
        if (m === 0 && this.#off !== 0) {
            this.reset();
        }
        const i = this.#tryGrowByReslice(n);
        if (i >= 0) {
            return i;
        }
        const c = this.capacity;
        if (n <= Math.floor(c / 2) - m) {
            copy(this.#buf.subarray(this.#off), this.#buf);
        } else if (c + n > MAX_SIZE) {
            throw new Error("The buffer cannot be grown beyond the maximum size.");
        } else {
            const buf = new Uint8Array(Math.min(2 * c + n, MAX_SIZE));
            copy(this.#buf.subarray(this.#off), buf);
            this.#buf = buf;
        }
        this.#off = 0;
        this.#reslice(Math.min(m + n, MAX_SIZE));
        return m;
    }
    grow(n) {
        if (n < 0) {
            throw Error("Buffer.grow: negative count");
        }
        const m = this.#grow(n);
        this.#reslice(m);
    }
    async readFrom(r) {
        let n = 0;
        const tmp = new Uint8Array(MIN_READ);
        while(true){
            const shouldGrow = this.capacity - this.length < MIN_READ;
            const buf = shouldGrow ? tmp : new Uint8Array(this.#buf.buffer, this.length);
            const nread = await r.read(buf);
            if (nread === null) {
                return n;
            }
            if (shouldGrow) this.writeSync(buf.subarray(0, nread));
            else this.#reslice(this.length + nread);
            n += nread;
        }
    }
    readFromSync(r) {
        let n = 0;
        const tmp = new Uint8Array(MIN_READ);
        while(true){
            const shouldGrow = this.capacity - this.length < MIN_READ;
            const buf = shouldGrow ? tmp : new Uint8Array(this.#buf.buffer, this.length);
            const nread = r.readSync(buf);
            if (nread === null) {
                return n;
            }
            if (shouldGrow) this.writeSync(buf.subarray(0, nread));
            else this.#reslice(this.length + nread);
            n += nread;
        }
    }
}
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))", 
].join("|"), "g");
var DiffType;
(function(DiffType1) {
    DiffType1["removed"] = "removed";
    DiffType1["common"] = "common";
    DiffType1["added"] = "added";
})(DiffType || (DiffType = {
}));
class AssertionError extends Error {
    constructor(message43){
        super(message43);
        this.name = "AssertionError";
    }
}
async function readAll(r) {
    const buf = new Buffer();
    await buf.readFrom(r);
    return buf.bytes();
}
async function writeAll(w, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += await w.write(arr.subarray(nwritten));
    }
}
function writeAllSync(w, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += w.writeSync(arr.subarray(nwritten));
    }
}
const DEFAULT_BUF_SIZE = 4096;
const MIN_BUF_SIZE = 16;
const CR = "\r".charCodeAt(0);
const LF = "\n".charCodeAt(0);
class BufferFullError extends Error {
    partial;
    name = "BufferFullError";
    constructor(partial1){
        super("Buffer full");
        this.partial = partial1;
    }
}
class PartialReadError extends Error {
    name = "PartialReadError";
    partial;
    constructor(){
        super("Encountered UnexpectedEof, data only partially read");
    }
}
class BufReader {
    buf;
    rd;
    r = 0;
    w = 0;
    eof = false;
    static create(r, size = 4096) {
        return r instanceof BufReader ? r : new BufReader(r, size);
    }
    constructor(rd1, size1 = 4096){
        if (size1 < 16) {
            size1 = MIN_BUF_SIZE;
        }
        this._reset(new Uint8Array(size1), rd1);
    }
    size() {
        return this.buf.byteLength;
    }
    buffered() {
        return this.w - this.r;
    }
    async _fill() {
        if (this.r > 0) {
            this.buf.copyWithin(0, this.r, this.w);
            this.w -= this.r;
            this.r = 0;
        }
        if (this.w >= this.buf.byteLength) {
            throw Error("bufio: tried to fill full buffer");
        }
        for(let i = 100; i > 0; i--){
            const rr = await this.rd.read(this.buf.subarray(this.w));
            if (rr === null) {
                this.eof = true;
                return;
            }
            assert(rr >= 0, "negative read");
            this.w += rr;
            if (rr > 0) {
                return;
            }
        }
        throw new Error(`No progress after ${100} read() calls`);
    }
    reset(r) {
        this._reset(this.buf, r);
    }
    _reset(buf, rd) {
        this.buf = buf;
        this.rd = rd;
        this.eof = false;
    }
    async read(p) {
        let rr = p.byteLength;
        if (p.byteLength === 0) return rr;
        if (this.r === this.w) {
            if (p.byteLength >= this.buf.byteLength) {
                const rr1 = await this.rd.read(p);
                const nread = rr1 ?? 0;
                assert(nread >= 0, "negative read");
                return rr1;
            }
            this.r = 0;
            this.w = 0;
            rr = await this.rd.read(this.buf);
            if (rr === 0 || rr === null) return rr;
            assert(rr >= 0, "negative read");
            this.w += rr;
        }
        const copied = copy(this.buf.subarray(this.r, this.w), p, 0);
        this.r += copied;
        return copied;
    }
    async readFull(p) {
        let bytesRead = 0;
        while(bytesRead < p.length){
            try {
                const rr = await this.read(p.subarray(bytesRead));
                if (rr === null) {
                    if (bytesRead === 0) {
                        return null;
                    } else {
                        throw new PartialReadError();
                    }
                }
                bytesRead += rr;
            } catch (err) {
                err.partial = p.subarray(0, bytesRead);
                throw err;
            }
        }
        return p;
    }
    async readByte() {
        while(this.r === this.w){
            if (this.eof) return null;
            await this._fill();
        }
        const c = this.buf[this.r];
        this.r++;
        return c;
    }
    async readString(delim) {
        if (delim.length !== 1) {
            throw new Error("Delimiter should be a single character");
        }
        const buffer = await this.readSlice(delim.charCodeAt(0));
        if (buffer === null) return null;
        return new TextDecoder().decode(buffer);
    }
    async readLine() {
        let line;
        try {
            line = await this.readSlice(LF);
        } catch (err) {
            let { partial: partial2  } = err;
            assert(partial2 instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
            if (!(err instanceof BufferFullError)) {
                throw err;
            }
            if (!this.eof && partial2.byteLength > 0 && partial2[partial2.byteLength - 1] === CR) {
                assert(this.r > 0, "bufio: tried to rewind past start of buffer");
                this.r--;
                partial2 = partial2.subarray(0, partial2.byteLength - 1);
            }
            return {
                line: partial2,
                more: !this.eof
            };
        }
        if (line === null) {
            return null;
        }
        if (line.byteLength === 0) {
            return {
                line,
                more: false
            };
        }
        if (line[line.byteLength - 1] == LF) {
            let drop = 1;
            if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
                drop = 2;
            }
            line = line.subarray(0, line.byteLength - drop);
        }
        return {
            line,
            more: false
        };
    }
    async readSlice(delim) {
        let s = 0;
        let slice;
        while(true){
            let i = this.buf.subarray(this.r + s, this.w).indexOf(delim);
            if (i >= 0) {
                i += s;
                slice = this.buf.subarray(this.r, this.r + i + 1);
                this.r += i + 1;
                break;
            }
            if (this.eof) {
                if (this.r === this.w) {
                    return null;
                }
                slice = this.buf.subarray(this.r, this.w);
                this.r = this.w;
                break;
            }
            if (this.buffered() >= this.buf.byteLength) {
                this.r = this.w;
                const oldbuf = this.buf;
                const newbuf = this.buf.slice(0);
                this.buf = newbuf;
                throw new BufferFullError(oldbuf);
            }
            s = this.w - this.r;
            try {
                await this._fill();
            } catch (err) {
                err.partial = slice;
                throw err;
            }
        }
        return slice;
    }
    async peek(n) {
        if (n < 0) {
            throw Error("negative count");
        }
        let avail = this.w - this.r;
        while(avail < n && avail < this.buf.byteLength && !this.eof){
            try {
                await this._fill();
            } catch (err) {
                err.partial = this.buf.subarray(this.r, this.w);
                throw err;
            }
            avail = this.w - this.r;
        }
        if (avail === 0 && this.eof) {
            return null;
        } else if (avail < n && this.eof) {
            return this.buf.subarray(this.r, this.r + avail);
        } else if (avail < n) {
            throw new BufferFullError(this.buf.subarray(this.r, this.w));
        }
        return this.buf.subarray(this.r, this.r + n);
    }
}
class AbstractBufBase {
    buf;
    usedBufferBytes = 0;
    err = null;
    size() {
        return this.buf.byteLength;
    }
    available() {
        return this.buf.byteLength - this.usedBufferBytes;
    }
    buffered() {
        return this.usedBufferBytes;
    }
}
class BufWriter extends AbstractBufBase {
    writer;
    static create(writer, size = 4096) {
        return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
    }
    constructor(writer1, size2 = 4096){
        super();
        this.writer = writer1;
        if (size2 <= 0) {
            size2 = DEFAULT_BUF_SIZE;
        }
        this.buf = new Uint8Array(size2);
    }
    reset(w) {
        this.err = null;
        this.usedBufferBytes = 0;
        this.writer = w;
    }
    async flush() {
        if (this.err !== null) throw this.err;
        if (this.usedBufferBytes === 0) return;
        try {
            await writeAll(this.writer, this.buf.subarray(0, this.usedBufferBytes));
        } catch (e) {
            this.err = e;
            throw e;
        }
        this.buf = new Uint8Array(this.buf.length);
        this.usedBufferBytes = 0;
    }
    async write(data) {
        if (this.err !== null) throw this.err;
        if (data.length === 0) return 0;
        let totalBytesWritten = 0;
        let numBytesWritten = 0;
        while(data.byteLength > this.available()){
            if (this.buffered() === 0) {
                try {
                    numBytesWritten = await this.writer.write(data);
                } catch (e) {
                    this.err = e;
                    throw e;
                }
            } else {
                numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
                this.usedBufferBytes += numBytesWritten;
                await this.flush();
            }
            totalBytesWritten += numBytesWritten;
            data = data.subarray(numBytesWritten);
        }
        numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
        this.usedBufferBytes += numBytesWritten;
        totalBytesWritten += numBytesWritten;
        return totalBytesWritten;
    }
}
class BufWriterSync extends AbstractBufBase {
    writer;
    static create(writer, size = 4096) {
        return writer instanceof BufWriterSync ? writer : new BufWriterSync(writer, size);
    }
    constructor(writer2, size3 = 4096){
        super();
        this.writer = writer2;
        if (size3 <= 0) {
            size3 = DEFAULT_BUF_SIZE;
        }
        this.buf = new Uint8Array(size3);
    }
    reset(w) {
        this.err = null;
        this.usedBufferBytes = 0;
        this.writer = w;
    }
    flush() {
        if (this.err !== null) throw this.err;
        if (this.usedBufferBytes === 0) return;
        try {
            writeAllSync(this.writer, this.buf.subarray(0, this.usedBufferBytes));
        } catch (e) {
            this.err = e;
            throw e;
        }
        this.buf = new Uint8Array(this.buf.length);
        this.usedBufferBytes = 0;
    }
    writeSync(data) {
        if (this.err !== null) throw this.err;
        if (data.length === 0) return 0;
        let totalBytesWritten = 0;
        let numBytesWritten = 0;
        while(data.byteLength > this.available()){
            if (this.buffered() === 0) {
                try {
                    numBytesWritten = this.writer.writeSync(data);
                } catch (e) {
                    this.err = e;
                    throw e;
                }
            } else {
                numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
                this.usedBufferBytes += numBytesWritten;
                this.flush();
            }
            totalBytesWritten += numBytesWritten;
            data = data.subarray(numBytesWritten);
        }
        numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
        this.usedBufferBytes += numBytesWritten;
        totalBytesWritten += numBytesWritten;
        return totalBytesWritten;
    }
}
class StringReader extends Buffer {
    constructor(s){
        super(new TextEncoder().encode(s).buffer);
    }
}
class MultiReader {
    readers;
    currentIndex = 0;
    constructor(...readers){
        this.readers = readers;
    }
    async read(p) {
        const r = this.readers[this.currentIndex];
        if (!r) return null;
        const result = await r.read(p);
        if (result === null) {
            this.currentIndex++;
            return 0;
        }
        return result;
    }
}
class LimitedReader {
    reader;
    limit;
    constructor(reader, limit){
        this.reader = reader;
        this.limit = limit;
    }
    async read(p) {
        if (this.limit <= 0) {
            return null;
        }
        if (p.length > this.limit) {
            p = p.subarray(0, this.limit);
        }
        const n = await this.reader.read(p);
        if (n == null) {
            return null;
        }
        this.limit -= n;
        return n;
    }
}
function readerFromStreamReader(streamReader) {
    const buffer = new Buffer();
    return {
        async read (p) {
            if (buffer.empty()) {
                const res = await streamReader.read();
                if (res.done) {
                    return null;
                }
                await writeAll(buffer, res.value);
            }
            return buffer.read(p);
        }
    };
}
const decoder2 = new TextDecoder();
class StringWriter {
    base;
    chunks = [];
    byteLength = 0;
    cache;
    constructor(base = ""){
        this.base = base;
        const c = new TextEncoder().encode(base);
        this.chunks.push(c);
        this.byteLength += c.byteLength;
    }
    write(p) {
        return Promise.resolve(this.writeSync(p));
    }
    writeSync(p) {
        this.chunks.push(p);
        this.byteLength += p.byteLength;
        this.cache = undefined;
        return p.byteLength;
    }
    toString() {
        if (this.cache) {
            return this.cache;
        }
        const buf = new Uint8Array(this.byteLength);
        let offs = 0;
        for (const chunk of this.chunks){
            buf.set(chunk, offs);
            offs += chunk.byteLength;
        }
        this.cache = decoder2.decode(buf);
        return this.cache;
    }
}
function parseurl(req) {
    let str = req.url, url = req._parsedUrl;
    if (url && url._raw === str) return url;
    let pathname = str, query = null, search = null, i = 0, len = str.length;
    while(i < len){
        if (str.charCodeAt(i) === 63) {
            pathname = str.substring(0, i);
            query = str.substring(i + 1);
            search = str.substring(i);
            break;
        }
        i++;
    }
    url = {
    };
    url.path = url._raw = url.href = str;
    url.pathname = pathname;
    url.query = query;
    url.search = search;
    return req._parsedUrl = url;
}
function _next(req, _, err) {
    let body = err ? err.message || "Something went wrong" : `File or directory ${req.url} not found`;
    let status1 = err ? err.status || err.code || err.statusCode || 500 : 404;
    if (typeof status1 !== "number") status1 = 500;
    req.__respond({
        status: status1,
        body
    });
}
async function existStat(filename) {
    try {
        let stats = await Deno.stat(filename);
        return stats;
    } catch (error) {
        return null;
    }
}
function headersEncoding(headers, name2, pathFile, num) {
    headers.set("Content-Encoding", name2);
    headers.set("Content-Type", contentType(pathFile.substring(0, num)) || "");
}
async function sendFile(pathFile, opts2, req, res, next) {
    let isDirectory = pathFile.slice((pathFile.lastIndexOf(".") - 1 >>> 0) + 2) === "";
    let stats;
    if (opts2.dotfiles === false) {
        let idx = req.url.indexOf("/.");
        if (idx !== -1) {
            if (!opts2.fallthrough) {
                return next(new Error(`File or directory ${req.url} not found`));
            }
            return next();
        }
    } else {
        let exist = await existStat(pathFile);
        if (exist) {
            isDirectory = exist.isDirectory;
            if (exist.isFile) stats = exist;
        } else {
            isDirectory = false;
        }
    }
    if (isDirectory) {
        if (opts2.redirect === true) {
            if (pathFile.lastIndexOf("/") === -1) pathFile += "/";
            pathFile += opts2.index;
        }
    }
    if (stats === void 0) {
        stats = await Deno.stat(pathFile);
    }
    let status1 = 200;
    const headers = new Headers();
    if (opts2.setHeaders !== void 0) {
        opts2.setHeaders(headers, pathFile, stats);
    }
    headers.set("Content-Type", headers.get("Content-Type") || contentType(pathFile.replace("/", "\\")) || "application/octet-stream");
    if (opts2.gzip || opts2.brotli) {
        headers.set("Vary", "Accept-Encoding");
        let xgz = pathFile.lastIndexOf(".gz");
        let xbr = pathFile.lastIndexOf(".br");
        if (xgz !== -1) headersEncoding(headers, "gzip", pathFile, xgz);
        if (xbr !== -1) headersEncoding(headers, "br", pathFile, xbr);
    }
    if (opts2.lastModified === true && stats.mtime) {
        headers.set("Last-Modified", stats.mtime.toUTCString());
    }
    if (opts2.acceptRanges === true) {
        headers.set("Accept-Ranges", "bytes");
    }
    if (req.headers.get("range")) {
        status1 = 206;
        let start = opts2.start || 0;
        let end = opts2.end || stats.size - 1;
        if (start >= stats.size || end >= stats.size) {
            headers.set("Content-Range", `bytes */${stats.size}`);
            return req.__respond({
                status: 416,
                body: "",
                headers
            });
        }
        headers.set("Content-Range", `bytes ${start}-${end}/${stats.size}`);
        headers.set("Content-Length", (end - start + 1).toString());
        headers.set("Accept-Ranges", headers.get("Accept-Ranges") || "bytes");
    }
    if (opts2.cacheControl === true) {
        let _cache = `public, max-age=${opts2.maxAge}`;
        if (opts2.immutable === true) _cache += ", immutable";
        headers.set("Cache-Control", _cache);
    }
    if (opts2.etag === true) {
        headers.set("ETag", `W/"${stats.size}-${stats.mtime?.getTime()}"`);
        if (req.headers.get("if-none-match") === headers.get("ETag")) {
            return req.__respond({
                status: 304
            });
        }
    }
    const body = await Deno.readFile(pathFile);
    return req.__respond({
        status: status1,
        body,
        headers
    });
}
function fromExtensions(req, opts2) {
    if (opts2.extensions === void 0) return null;
    let exts = opts2.extensions;
    let gzips = opts2.gzip && exts.map((x)=>`${x}.gz`
    ).concat("gz");
    let brots = opts2.brotli && exts.map((x)=>`${x}.br`
    ).concat("br");
    let newExts = [
        ""
    ];
    let enc = req.headers.get("accept-encoding") || "";
    if (gzips && enc.includes("gzip")) newExts.unshift(...gzips);
    if (brots && /(br|brotli)/i.test(enc)) newExts.unshift(...brots);
    newExts.push(...exts);
    return newExts;
}
function modRequest(req) {
    req.__respond = req.respond;
    if (req.request && req.respondWith) {
        req.method = req.request.method;
        req.headers = req.request.headers;
        req.url = req.url || new URL(req.request.url).pathname;
        req.__respond = ({ body , headers , status: status1  })=>req.respondWith(new Response(body, {
                status: status1,
                headers
            }))
        ;
    } else if (req.response) {
        if (req.response.headers instanceof Headers || typeof req.response.status === "number") {
            req.__respond = ({ body , headers , status: status1  })=>{
                req.response.status = status1 || 200;
                req.response.headers = headers || new Headers();
                req.response.body = body;
            };
            req.method = req.method || req.request.method;
            req.headers = req.headers || req.request.headers;
            let url = req.url || req.request.url;
            if (url instanceof URL) {
                req.url = url.pathname;
            } else if (url.startsWith("http")) {
                req.url = new URL(url).pathname;
            } else {
                req.url = url;
            }
        }
    }
}
function staticFetch(root = "", opts2 = {
}) {
    return async (req, ...args)=>{
        modRequest(req);
        const res = args[0];
        const next = args[1] || args[0] || ((err)=>_next(req, res, err)
        );
        if (opts2.prefix) {
            if (req.url.includes(opts2.prefix)) {
                req.url = req.url.substring(opts2.prefix.length);
            } else {
                return next();
            }
        }
        try {
            if (opts2.dotfiles === false) {
                let idx = req.url.indexOf("/.");
                if (idx !== -1) {
                    if (!opts2.fallthrough) {
                        return next(new Error(`File or directory ${req.url} not found`));
                    }
                    return next();
                }
            }
            let isDirectory = req.url.slice((req.url.lastIndexOf(".") - 1 >>> 0) + 2) === "";
            let pathFile = root + req.url;
            if (isDirectory && opts2.redirect) {
                if (pathFile[pathFile.length - 1] !== "/") pathFile += "/";
                pathFile += opts2.index;
            }
            const res1 = await fetch(pathFile);
            if (!res1.ok) return next();
            const headers = new Headers();
            if (opts2.setHeaders !== void 0) {
                opts2.setHeaders(headers, pathFile);
            }
            if (opts2.cacheControl === true) {
                let _cache = `public, max-age=${opts2.maxAge}`;
                if (opts2.immutable) _cache += ", immutable";
                headers.set("Cache-Control", _cache);
            }
            if (opts2.etag === true) {
                if (res1.headers.get("ETag")) {
                    headers.set("ETag", res1.headers.get("ETag") || "");
                } else if (res1.headers.get("last-modified")) {
                    const lm = btoa(res1.headers.get("last-modified") || "");
                    if (opts2.lastModified) {
                        headers.set("last-modified", res1.headers.get("last-modified") || "");
                    }
                    headers.set("ETag", `W/"${lm}"`);
                }
                if (req.headers.get("if-none-match") === headers.get("ETag")) {
                    return req.__respond({
                        status: 304
                    });
                }
            }
            if (req.headers.get("range")) {
                headers.set("Accept-Ranges", "bytes");
            }
            const ext = pathFile.substring(pathFile.lastIndexOf("."));
            headers.set("Content-Type", headers.get("Content-Type") || contentType(ext) || "application/octet-stream");
            if (res1.body) {
                const reader1 = readerFromStreamReader(res1.body.getReader());
                const body = await readAll(reader1);
                req.__respond({
                    body,
                    headers
                });
            } else next();
        } catch (error) {
            next(error);
        }
    };
}
function staticFiles(root = "", opts2 = {
}) {
    if (typeof root !== "string") {
        throw new TypeError("root path must be a string");
    }
    if (root[0] === "/") {
        root = root.substring(1);
    }
    opts2.index = opts2.index || "index.html";
    opts2.maxAge = opts2.maxAge || 0;
    opts2.fallthrough = opts2.fallthrough !== false;
    opts2.etag = opts2.etag !== false;
    opts2.acceptRanges = opts2.acceptRanges !== false;
    opts2.lastModified = opts2.lastModified !== false;
    opts2.redirect = opts2.redirect !== false;
    opts2.dotfiles = !!opts2.dotfiles;
    opts2.fetch = !!opts2.fetch;
    opts2.immutable = !!opts2.immutable;
    opts2.brotli = !!opts2.brotli;
    opts2.gzip = !!opts2.gzip;
    opts2.cacheControl = !!opts2.cacheControl;
    if (opts2.setHeaders && typeof opts2.setHeaders !== "function") {
        throw new TypeError("option setHeaders must be function");
    }
    if (opts2.fetch) return staticFetch(root, opts2);
    const rootPath = root.startsWith("file:") ? fromFileUrl2(root) : root;
    return async function(req, ...args) {
        modRequest(req);
        const res = args[0];
        const next = args[1] || args[0] || ((err)=>_next(req, res, err)
        );
        if (opts2.prefix) {
            if (req.url.includes(opts2.prefix)) {
                req.url = req.url.substring(opts2.prefix.length);
            } else {
                return next();
            }
        }
        if (req.method && req.method !== "GET" && req.method !== "HEAD") {
            if (opts2.fallthrough) return next();
            const headers = new Headers();
            headers.set("Allow", "GET, HEAD");
            headers.set("Content-Length", "0");
            return req.__respond({
                status: 405,
                body: "",
                headers
            });
        }
        let path2 = parseurl(req).pathname;
        if (path2 === "/") path2 = "";
        let pathFile = decodeURIComponent(join2(rootPath, path2));
        try {
            await sendFile(pathFile, opts2, req, res, next);
        } catch (err) {
            let exts = fromExtensions(req, opts2);
            if (exts) {
                let stats, i = 0, len = exts.length;
                for(; i < len; i++){
                    const ext = exts[i];
                    const newPathFile = pathFile + "." + ext;
                    stats = await existStat(newPathFile);
                    if (stats !== null) {
                        stats.pathFile = newPathFile;
                        break;
                    }
                }
                if (stats && stats.pathFile) {
                    try {
                        await sendFile(stats.pathFile, opts2, req, res, next);
                        return;
                    } catch (_err) {
                        if (!opts2.fallthrough) return next(_err);
                        return next();
                    }
                }
            }
            if (!opts2.fallthrough) return next(err);
            return next();
        }
    };
}
const url = "https://raw.githubusercontent.com/nhttp/webdocs/master/build";
const app = new NHttp();
app.use(staticFiles(url, {
    fetch: true
}));
app.on404(async ({ response: response1  })=>{
    const res = await fetch(url + "/404.html");
    const data = await res.text();
    response1.status(404).type("text/html").send(data);
});
function deploy() {
    const { handleEvent  } = app.fetchEventHandler();
    addEventListener("fetch", handleEvent);
}
deploy();
