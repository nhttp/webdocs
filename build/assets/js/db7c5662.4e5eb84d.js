(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[333],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return l},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},p=Object.keys(e);for(r=0;r<p.length;r++)t=p[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)t=p[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),s=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=s(e.components);return r.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,p=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=s(t),m=o,f=d["".concat(c,".").concat(m)]||d[m]||u[m]||p;return t?r.createElement(f,a(a({ref:n},l),{},{components:t})):r.createElement(f,a({ref:n},l))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var p=t.length,a=new Array(p);a[0]=d;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var s=2;s<p;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1400:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return l},default:function(){return d}});var r=t(2122),o=t(9756),p=(t(7294),t(3905)),a=["components"],i={},c="app.engine",s={unversionedId:"application/engine",id:"application/engine",isDocsHomePage:!1,title:"app.engine",description:"NHttp support template engine.",source:"@site/docs/application/engine.md",sourceDirName:"application",slug:"/application/engine",permalink:"/docs/application/engine",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/application/engine.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"app",permalink:"/docs/application/app"},next:{title:"app.onError",permalink:"/docs/application/error"}},l=[{value:"Usage",id:"usage",children:[]},{value:"Jsx",id:"jsx",children:[]}],u={toc:l};function d(e){var n=e.components,t=(0,o.Z)(e,a);return(0,p.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,p.kt)("h1",{id:"appengine"},"app.engine"),(0,p.kt)("p",null,"NHttp support template engine."),(0,p.kt)("h3",{id:"usage"},"Usage"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-js"},'import { nhttp } from "https://deno.land/x/nhttp@1.1.15/mod.ts";\nimport ejs from "npm:ejs";\n\nconst app = nhttp();\n\napp.engine(ejs.renderFile, { \n  base: "views",\n  ext: "ejs"\n});\n\napp.get("/", async ({ response }) => {\n  await response.render("index", {\n    title: "Hello, World"\n  })\n});\n\napp.listen(8000, () => {\n  console.log("Running on port 8000");\n});\n')),(0,p.kt)("h3",{id:"jsx"},"Jsx"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-js"},'import { nhttp } from "https://deno.land/x/nhttp@1.1.15/mod.ts";\n// @deno-types="npm:@types/react"\nimport React from "npm:react";\n// @deno-types="npm:@types/react-dom/server"\nimport { renderToString } from "npm:react-dom/server";\n\nconst app = nhttp();\n\napp.engine(renderToString);\n\napp.get("/", async ({ response }) => {\n  await response.render(<h1>Hello World</h1>);\n});\n\n')))}d.isMDXComponent=!0}}]);