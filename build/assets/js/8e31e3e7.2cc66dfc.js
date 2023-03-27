"use strict";(self.webpackChunknhttp_webdoc=self.webpackChunknhttp_webdoc||[]).push([[6499],{4137:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>m});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),l=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},s=function(e){var r=l(e.components);return n.createElement(c.Provider,{value:r},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=l(t),d=o,m=u["".concat(c,".").concat(d)]||u[d]||f[d]||a;return t?n.createElement(m,p(p({ref:r},s),{},{components:t})):n.createElement(m,p({ref:r},s))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=d;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i[u]="string"==typeof e?e:o,p[1]=i;for(var l=2;l<a;l++)p[l]=t[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4214:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>p,default:()=>f,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var n=t(7462),o=(t(7294),t(4137));const a={},p="app.onError",i={unversionedId:"application/error",id:"application/error",title:"app.onError",description:"Custom send error response globaly.",source:"@site/docs/application/error.md",sourceDirName:"application",slug:"/application/error",permalink:"/docs/application/error",draft:!1,editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/application/error.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"app.engine",permalink:"/docs/application/engine"},next:{title:"app.handle",permalink:"/docs/application/handle"}},c={},l=[],s={toc:l},u="wrapper";function f(e){let{components:r,...t}=e;return(0,o.kt)(u,(0,n.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"apponerror"},"app.onError"),(0,o.kt)("p",null,"Custom send error response globaly."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'\napp.get("/", (rev) => {\n  rev.noop();\n});\n\napp.onError((err, rev) => {\n  return err.message;\n  // => rev.noop is a not function\n});\n\n')))}f.isMDXComponent=!0}}]);