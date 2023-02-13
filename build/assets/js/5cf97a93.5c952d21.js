(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[4572],{3905:function(e,r,t){"use strict";t.d(r,{Zo:function(){return s},kt:function(){return y}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?u(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)t=u[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)t=u[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),p=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},s=function(e){var r=p(e.components);return n.createElement(i.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,u=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),f=p(t),y=o,m=f["".concat(i,".").concat(y)]||f[y]||l[y]||u;return t?n.createElement(m,a(a({ref:r},s),{},{components:t})):n.createElement(m,a({ref:r},s))}));function y(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var u=t.length,a=new Array(u);a[0]=f;var c={};for(var i in r)hasOwnProperty.call(r,i)&&(c[i]=r[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var p=2;p<u;p++)a[p]=t[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},6084:function(e,r,t){"use strict";t.r(r),t.d(r,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return s},default:function(){return f}});var n=t(2122),o=t(9756),u=(t(7294),t(3905)),a=["components"],c={},i="rev.query",p={unversionedId:"request-event/query",id:"request-event/query",isDocsHomePage:!1,title:"rev.query",description:"Object query parameters.",source:"@site/docs/request-event/query.md",sourceDirName:"request-event",slug:"/request-event/query",permalink:"/docs/request-event/query",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/request-event/query.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"rev.path",permalink:"/docs/request-event/path"},next:{title:"rev.request",permalink:"/docs/request-event/request"}},s=[],l={toc:s};function f(e){var r=e.components,t=(0,o.Z)(e,a);return(0,u.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,u.kt)("h1",{id:"revquery"},"rev.query"),(0,u.kt)("p",null,"Object query parameters."),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-js"},'// example: /user?name=john&foo[bar][baz]=foobarbaz\napp.get("/user", (rev) => {\n  console.log(rev.query);\n  // => { name: "john", foo: { bar: { baz: "foobarbaz" } } }\n\n  return rev.query;\n});\n')))}f.isMDXComponent=!0}}]);