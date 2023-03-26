"use strict";(self.webpackChunknhttp_webdoc=self.webpackChunknhttp_webdoc||[]).push([[8641],{4137:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=c(r),f=o,m=u["".concat(p,".").concat(f)]||u[f]||d[f]||a;return r?n.createElement(m,l(l({ref:t},s),{},{components:r})):n.createElement(m,l({ref:t},s))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=f;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var c=2;c<a;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},57:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(7462),o=(r(7294),r(4137));const a={},l="rev.file",i={unversionedId:"request-event/file",id:"request-event/file",title:"rev.file",description:"Lookup file. related to Upload Middleware",source:"@site/docs/request-event/file.md",sourceDirName:"request-event",slug:"/request-event/file",permalink:"/docs/request-event/file",draft:!1,editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/request-event/file.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"rev.cookies",permalink:"/docs/request-event/cookies"},next:{title:"rev.headers",permalink:"/docs/request-event/headers"}},p={},c=[],s={toc:c},u="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"revfile"},"rev.file"),(0,o.kt)("p",null,"Lookup file. related to ",(0,o.kt)("a",{parentName:"p",href:"https://nhttp.deno.dev/docs/usage/upload"},"Upload Middleware")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { multipart, nhttp } from "https://deno.land/x/nhttp@1.2.8/mod.ts";\n\nconst app = nhttp();\n\nconst upload = multipart.upload({ name: "image" });\napp.post("/", upload, (rev) => {\n  console.log(rev.file);\n  console.log(rev.body);\n  return "success upload";\n});\n')))}d.isMDXComponent=!0}}]);