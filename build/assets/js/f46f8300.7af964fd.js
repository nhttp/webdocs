(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[8641],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=l(r),d=o,m=f["".concat(u,".").concat(d)]||f[d]||s[d]||a;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},8083:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return p},default:function(){return f}});var n=r(2122),o=r(9756),a=(r(7294),r(3905)),i=["components"],c={},u="rev.file",l={unversionedId:"request-event/file",id:"request-event/file",isDocsHomePage:!1,title:"rev.file",description:"Lookup file. related to Upload Middleware",source:"@site/docs/request-event/file.md",sourceDirName:"request-event",slug:"/request-event/file",permalink:"/docs/request-event/file",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/request-event/file.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"rev.cookies",permalink:"/docs/request-event/cookies"},next:{title:"rev.headers",permalink:"/docs/request-event/headers"}},p=[],s={toc:p};function f(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"revfile"},"rev.file"),(0,a.kt)("p",null,"Lookup file. related to ",(0,a.kt)("a",{parentName:"p",href:"https://nhttp.deno.dev/docs/usage/upload"},"Upload Middleware")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { multipart, nhttp } from "https://deno.land/x/nhttp@1.1.18/mod.ts";\n\nconst app = nhttp();\n\nconst upload = multipart.upload({ name: "image" });\napp.post("/", upload, (rev) => {\n  console.log(rev.file);\n  console.log(rev.body);\n  return "success upload";\n});\n')))}f.isMDXComponent=!0}}]);