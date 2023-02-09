(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[2886],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return u},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=l(r),f=a,m=d["".concat(c,".").concat(f)]||d[f]||s[f]||o;return r?n.createElement(m,p(p({ref:t},u),{},{components:r})):n.createElement(m,p({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var l=2;l<o;l++)p[l]=r[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8510:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return d}});var n=r(2122),a=r(9756),o=(r(7294),r(3905)),p=["components"],i={},c="app",l={unversionedId:"application/app",id:"application/app",isDocsHomePage:!1,title:"app",description:"Initial Application.",source:"@site/docs/application/app.md",sourceDirName:"application",slug:"/application/app",permalink:"/docs/application/app",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/application/app.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Upload File",permalink:"/docs/usage/upload"},next:{title:"app.engine",permalink:"/docs/application/engine"}},u=[{value:"Config",id:"config",children:[]},{value:"bodyParser",id:"bodyparser",children:[]},{value:"parseQuery",id:"parsequery",children:[]},{value:"flash",id:"flash",children:[]},{value:"stackError",id:"stackerror",children:[]}],s={toc:u};function d(e){var t=e.components,r=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"app"},"app"),(0,o.kt)("p",null,"Initial Application."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { nhttp } from "https://deno.land/x/nhttp@1.1.12/mod.ts";\n\nconst app = nhttp();\n\n// more\n')),(0,o.kt)("h3",{id:"config"},"Config"),(0,o.kt)("p",null,"Configure apps."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"...\nconst app = nhttp(config);\n...\n")),(0,o.kt)("h3",{id:"bodyparser"},"bodyParser"),(0,o.kt)("p",null,"Config body-parser. default to true or auto parses body."),(0,o.kt)("h3",{id:"parsequery"},"parseQuery"),(0,o.kt)("p",null,"Custom parse query. default undefined."),(0,o.kt)("h3",{id:"flash"},"flash"),(0,o.kt)("p",null,"Flash server ",(0,o.kt)("inlineCode",{parentName:"p"},"Deno"),". default to false."),(0,o.kt)("h3",{id:"stackerror"},"stackError"),(0,o.kt)("p",null,"Send error stacks in response for default error handling. default to true."))}d.isMDXComponent=!0}}]);