(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[9639],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return i},kt:function(){return m}});var r=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,s=function(e,n){if(null==e)return{};var t,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=r.createContext({}),u=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},i=function(e){var n=u(e.components);return r.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),d=u(t),m=s,h=d["".concat(l,".").concat(m)]||d[m]||c[m]||o;return t?r.createElement(h,a(a({ref:n},i),{},{components:t})):r.createElement(h,a({ref:n},i))}));function m(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var o=t.length,a=new Array(o);a[0]=d;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p.mdxType="string"==typeof e?e:s,a[1]=p;for(var u=2;u<o;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},7408:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return p},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return i},default:function(){return d}});var r=t(2122),s=t(9756),o=(t(7294),t(3905)),a=["components"],p={},l="rev.response",u={unversionedId:"request-event/response",id:"request-event/response",isDocsHomePage:!1,title:"rev.response",description:"The response http server.",source:"@site/docs/request-event/response.md",sourceDirName:"request-event",slug:"/request-event/response",permalink:"/docs/request-event/response",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/request-event/response.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"rev.respondWith",permalink:"/docs/request-event/respond-with"},next:{title:"rev.responseInit",permalink:"/docs/request-event/responseInit"}},i=[{value:"response.header",id:"responseheader",children:[]},{value:"response.type",id:"responsetype",children:[]},{value:"response.attachment",id:"responseattachment",children:[]},{value:"response.status",id:"responsestatus",children:[]},{value:"response.statusCode",id:"responsestatuscode",children:[]},{value:"response.send",id:"responsesend",children:[]},{value:"response.json",id:"responsejson",children:[]},{value:"response.redirect",id:"responseredirect",children:[]},{value:"response.cookie",id:"responsecookie",children:[]},{value:"response.sendStatus",id:"responsesendstatus",children:[]}],c={toc:i};function d(e){var n=e.components,t=(0,s.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"revresponse"},"rev.response"),(0,o.kt)("p",null,"The response http server."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'...\n// example with status and headers\napp.get("/hello", (rev) => {\n  rev.response\n    .status(200)\n    .header("key", "value")\n    .send("hello");\n})\n...\n')),(0,o.kt)("h3",{id:"responseheader"},"response.header"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// key and value\nresponse.header("key", "value");\n\n// with object\nresponse.header({\n  "key": "value",\n  "some": "value",\n});\n\n// delete\nresponse.header().delete("key");\n\n// append\nresponse.header().append("key", "value2");\n')),(0,o.kt)("h3",{id:"responsetype"},"response.type"),(0,o.kt)("p",null,"Shorthand for Content-Type headers."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'response.type("html");\n// or\nresponse.type("text/html");\n')),(0,o.kt)("h3",{id:"responseattachment"},"response.attachment"),(0,o.kt)("p",null,"Shorthand for Content-Disposition headers."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'response.attachment();\n// or\nresponse.attachment("myfile.css");\n')),(0,o.kt)("h3",{id:"responsestatus"},"response.status"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"status: (code?: number | undefined) => HttpResponse | number;")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// set status\nresponse.status(201);\n\n// get status\nconsole.log(response.status());\n// => 201\n")),(0,o.kt)("h3",{id:"responsestatuscode"},"response.statusCode"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// set status\nresponse.statusCode = 201;\n\n// get status\nconsole.log(response.statusCode);\n// => 201\n")),(0,o.kt)("h3",{id:"responsesend"},"response.send"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"send: (body?: any) => void"),"."),(0,o.kt)("p",null,"Support\n(",(0,o.kt)("inlineCode",{parentName:"p"},"string | json | Uint8Array | Blob | Response | null | undefined | ReadableStream | number"),")."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// string\nresponse.send("hello");\n// json\nresponse.send({ name: "john" });\n\n// more\n')),(0,o.kt)("h3",{id:"responsejson"},"response.json"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'response.json({ name: "john" });\n')),(0,o.kt)("h3",{id:"responseredirect"},"response.redirect"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'response.redirect("/");\n// or permanently\nresponse.redirect("/", 301);\n')),(0,o.kt)("h3",{id:"responsecookie"},"response.cookie"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'...\nresponse.cookie("key", "value", {\n  httpOnly: true,\n  maxAge: 60 * 60,\n  // encode value\n  encode: true\n})\n...\n')),(0,o.kt)("h3",{id:"responsesendstatus"},"response.sendStatus"),(0,o.kt)("p",null,"Send only status and statusText"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"response.sendStatus(201);\n\n// => 201 Created\n")),(0,o.kt)("p",null,"Type Cookie"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'type Cookie = {\n  expires?: Date;\n  maxAge?: number;\n  domain?: string;\n  path?: string;\n  secure?: boolean;\n  httpOnly?: boolean;\n  sameSite?: "Strict" | "Lax" | "None";\n  other?: string[];\n  encode?: boolean;\n};\n')))}d.isMDXComponent=!0}}]);