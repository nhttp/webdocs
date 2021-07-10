(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[499],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),l=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(i.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=l(t),m=o,f=d["".concat(i,".").concat(m)]||d[m]||c[m]||a;return t?r.createElement(f,s(s({ref:n},u),{},{components:t})):r.createElement(f,s({ref:n},u))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=d;var p={};for(var i in n)hasOwnProperty.call(n,i)&&(p[i]=n[i]);p.originalType=e,p.mdxType="string"==typeof e?e:o,s[1]=p;for(var l=2;l<a;l++)s[l]=t[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1388:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return p},contentTitle:function(){return i},metadata:function(){return l},toc:function(){return u},default:function(){return d}});var r=t(2122),o=t(9756),a=(t(7294),t(3905)),s=["components"],p={sidebar_position:1},i="Usage",l={unversionedId:"usage/usage",id:"usage/usage",isDocsHomePage:!1,title:"Usage",description:"First create file my_app.ts and copy in the code from the example above.",source:"@site/docs/usage/usage.md",sourceDirName:"usage",slug:"/usage/usage",permalink:"/docs/usage/usage",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/usage/usage.md",version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/docs/installation"},next:{title:"Deploy",permalink:"/docs/usage/deploy"}},u=[{value:"Running",id:"running",children:[]}],c={toc:u};function d(e){var n=e.components,t=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"usage"},"Usage"),(0,a.kt)("p",null,"First create file ",(0,a.kt)("inlineCode",{parentName:"p"},"my_app.ts")," and copy in the code from the example above."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { NHttp } from "https://deno.land/x/nhttp@0.7.2/mod.ts";\n\nconst app = new NHttp();\n\napp.get("/hello", (rev) => {\n    rev.response.send(\'Hello\');\n});\n\napp.listen(3000, () => {\n    console.log("> Running on port 3000");\n});\n')),(0,a.kt)("h2",{id:"running"},"Running"),(0,a.kt)("p",null,"Now, run the file ",(0,a.kt)("inlineCode",{parentName:"p"},"my_app.ts"),"."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Note: Deno native http is unstable. so just add --unstable flag.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"deno run --allow-net --allow-read --unstable my_app.ts\n")),(0,a.kt)("p",null,"Example sending json."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"...\napp.get(\"/json\", ({ response }) => {\n    response.json({ name: 'nhttp' });\n});\n....\n")),(0,a.kt)("p",null,"Example using POST method."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'...\napp.post("/save", ({ response, body }) => {\n    response.json(body);\n});\n...\n')))}d.isMDXComponent=!0}}]);