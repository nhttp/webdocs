(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[511],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return p},kt:function(){return m}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,u=e.originalType,s=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=c(r),m=o,f=d["".concat(s,".").concat(m)]||d[m]||l[m]||u;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var u=r.length,i=new Array(u);i[0]=d;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var c=2;c<u;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},7666:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var n=r(2122),o=r(9756),u=(r(7294),r(3905)),i=["components"],a={sidebar_position:4},s="Router",c={unversionedId:"usage/router",id:"usage/router",isDocsHomePage:!1,title:"Router",description:"A router like application, you can add HTTP method (get, put, post, or other) to it. For example:",source:"@site/docs/usage/router.md",sourceDirName:"usage",slug:"/usage/router",permalink:"/docs/usage/router",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/usage/router.md",version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Middleware",permalink:"/docs/usage/middleware"},next:{title:"Listen",permalink:"/docs/usage/listen"}},p=[],l={toc:p};function d(e){var t=e.components,r=(0,o.Z)(e,i);return(0,u.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h1",{id:"router"},"Router"),(0,u.kt)("p",null,"A router like application, you can add HTTP method (get, put, post, or other) to it. For example:"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-js"},'import { NHttp, Router } from "https://deno.land/x/nhttp@0.7.2/mod.ts";\n\nconst app = new NHttp();\n\n// user router\nconst userRouter = new Router();\nuserRouter.get("/user", ({ response }) => {\n    response.send("hello user");\n});\n\n// item router\nconst itemRouter = new Router();\nitemRouter.get("/item", ({ response }) => {\n    response.send("hello item");\n});\n\n// register the router\napp.use(\'/api\', [userRouter, itemRouter]);\n// or with middleware\n// app.use(\'/api\', mid1, mid2, [userRouter, itemRouter]);\n\napp.listen(3000);\n')))}d.isMDXComponent=!0}}]);