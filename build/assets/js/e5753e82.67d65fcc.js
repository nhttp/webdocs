(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[8711],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return p},kt:function(){return m}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),s=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,u=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),f=s(r),m=o,v=f["".concat(i,".").concat(m)]||f[m]||l[m]||u;return r?n.createElement(v,c(c({ref:t},p),{},{components:r})):n.createElement(v,c({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var u=r.length,c=new Array(u);c[0]=f;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var s=2;s<u;s++)c[s]=r[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5102:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return a},contentTitle:function(){return i},metadata:function(){return s},toc:function(){return p},default:function(){return f}});var n=r(2122),o=r(9756),u=(r(7294),r(3905)),c=["components"],a={},i="rev.route",s={unversionedId:"request-event/route",id:"request-event/route",isDocsHomePage:!1,title:"rev.route",description:"Lookup self route.",source:"@site/docs/request-event/route.md",sourceDirName:"request-event",slug:"/request-event/route",permalink:"/docs/request-event/route",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/request-event/route.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"rev.responseInit",permalink:"/docs/request-event/responseInit"},next:{title:"rev.url",permalink:"/docs/request-event/url"}},p=[],l={toc:p};function f(e){var t=e.components,r=(0,o.Z)(e,c);return(0,u.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h1",{id:"revroute"},"rev.route"),(0,u.kt)("p",null,"Lookup self route."),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-js"},'app.get("/user/:username", (rev) => {\n  console.log(rev.route);\n  // {\n  //   path: "/user/:username",\n  //   pattern: RegExp,\n  //   wild: false,\n  //   params: {...},\n  //   query: {...}\n  // }\n\n  return rev.path;\n});\n')))}f.isMDXComponent=!0}}]);