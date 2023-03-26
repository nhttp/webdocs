"use strict";(self.webpackChunknhttp_webdoc=self.webpackChunknhttp_webdoc||[]).push([[511],{4137:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),l=p(r),m=o,f=l["".concat(i,".").concat(m)]||l[m]||d[m]||a;return r?n.createElement(f,u(u({ref:t},c),{},{components:r})):n.createElement(f,u({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,u=new Array(a);u[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[l]="string"==typeof e?e:o,u[1]=s;for(var p=2;p<a;p++)u[p]=r[p];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7388:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>u,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(7462),o=(r(7294),r(4137));const a={sidebar_position:4},u="Router",s={unversionedId:"usage/router",id:"usage/router",title:"Router",description:"A router like application, you can add HTTP method (get, put, post, or other) to",source:"@site/docs/usage/router.md",sourceDirName:"usage",slug:"/usage/router",permalink:"/docs/usage/router",draft:!1,editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/usage/router.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Middleware",permalink:"/docs/usage/middleware"},next:{title:"Cloudflare Workers",permalink:"/docs/usage/cloudflare-workers"}},i={},p=[],c={toc:p},l="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(l,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"router"},"Router"),(0,o.kt)("p",null,"A router like application, you can add HTTP method (get, put, post, or other) to\nit. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import nhttp from "https://deno.land/x/nhttp@1.2.8/mod.ts";\n\nconst app = nhttp();\n\n// user router\nconst userRouter = nhttp.Router();\n// or\n// const userRouter = nhttp.Router({ base: "/user" });\n\nuserRouter.get("/user", ({ response }) => {\n  response.send("hello user");\n});\n\n// item router\nconst itemRouter = nhttp.Router();\nitemRouter.get("/item", ({ response }) => {\n  response.send("hello item");\n});\n\n// register the router\napp.use("/api", [userRouter, itemRouter]);\n\napp.listen(3000);\n')))}d.isMDXComponent=!0}}]);