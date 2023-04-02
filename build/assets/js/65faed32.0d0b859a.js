"use strict";(self.webpackChunknhttp_webdoc=self.webpackChunknhttp_webdoc||[]).push([[1183],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>b});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),p=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},c=function(e){var r=p(e.components);return n.createElement(l.Provider,{value:r},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(t),m=a,b=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return t?n.createElement(b,s(s({ref:r},c),{},{components:t})):n.createElement(b,s({ref:r},c))}));function b(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=m;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i[u]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=t[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4058:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=t(7462),a=(t(7294),t(3905));const o={},s="Body Parser",i={unversionedId:"usage/body-parser",id:"usage/body-parser",title:"Body Parser",description:"NHttp automatically parses the body.",source:"@site/docs/usage/body-parser.md",sourceDirName:"usage",slug:"/usage/body-parser",permalink:"/docs/usage/body-parser",draft:!1,editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/usage/body-parser.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Other Runtime",permalink:"/docs/usage/runtime"},next:{title:"Throw Error",permalink:"/docs/usage/throw-error"}},l={},p=[{value:"Config And Limit",id:"config-and-limit",level:2},{value:"Disable Body Parser",id:"disable-body-parser",level:3},{value:"Limit Body Parser",id:"limit-body-parser",level:3}],c={toc:p},u="wrapper";function d(e){let{components:r,...t}=e;return(0,a.kt)(u,(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"body-parser"},"Body Parser"),(0,a.kt)("p",null,"NHttp automatically parses the body. "),(0,a.kt)("p",null,"Support ",(0,a.kt)("inlineCode",{parentName:"p"},"json / urlencoded / multipart / raw"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const app = nhttp();\n\napp.post("/save", (rev) => {\n  console.log(rev.body);\n  return "success save";\n});\n\n// inline bodyParser\n// app.post("/save", bodyParser(), (rev) => {...});\n\n')),(0,a.kt)("h2",{id:"config-and-limit"},"Config And Limit"),(0,a.kt)("h3",{id:"disable-body-parser"},"Disable Body Parser"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const app = nhttp({ \n  bodyParser: false /* default to true */ \n});\n")),(0,a.kt)("h3",{id:"limit-body-parser"},"Limit Body Parser"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const app = nhttp({ \n  bodyParser: {\n    json: "1mb",       /* default 3mb */\n    urlencoded: "1mb", /* default 3mb */\n    raw: "1mb",        /* default 3mb */\n    multipart: "1mb"   /* default 100mb */\n  } \n});\n')))}d.isMDXComponent=!0}}]);