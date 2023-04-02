"use strict";(self.webpackChunknhttp_webdoc=self.webpackChunknhttp_webdoc||[]).push([[31],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=c(n),g=a,m=u["".concat(i,".").concat(g)]||u[g]||d[g]||o;return n?r.createElement(m,l(l({ref:t},s),{},{components:n})):r.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=g;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[u]="string"==typeof e?e:a,l[1]=p;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},7698:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={},l="app.listen",p={unversionedId:"application/listen",id:"application/listen",title:"app.listen",description:"Listen the server.",source:"@site/docs/application/listen.md",sourceDirName:"application",slug:"/application/listen",permalink:"/docs/application/listen",draft:!1,editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/application/listen.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"app.handle",permalink:"/docs/application/handle"},next:{title:"app.method",permalink:"/docs/application/method"}},i={},c=[{value:"Using Callback",id:"using-callback",level:3},{value:"Using Object Option",id:"using-object-option",level:3},{value:"Using Https",id:"using-https",level:3},{value:"Using HTTP/2",id:"using-http2",level:3},{value:"Signal for abort",id:"signal-for-abort",level:3}],s={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"applisten"},"app.listen"),(0,a.kt)("p",null,"Listen the server."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"...\n// some code\napp.listen(8000);\n")),(0,a.kt)("h3",{id:"using-callback"},"Using Callback"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'...\n// some code\napp.listen(8000, (err, opts) => {\n  if (err) throw err;\n  console.log("Running on server " + opts.port);\n});\n')),(0,a.kt)("h3",{id:"using-object-option"},"Using Object Option"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"...\n// some code\napp.listen({ port: 8000, hostname: 'localhost' }, callback);\n")),(0,a.kt)("h3",{id:"using-https"},"Using Https"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'...\n// some code\napp.listen({ \n  port: 443,\n  cert: "./path/to/localhost.crt",\n  key: "./path/to/localhost.key",\n}, callback);\n')),(0,a.kt)("h3",{id:"using-http2"},"Using HTTP/2"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'...\n// some code\napp.listen({ \n  port: 443,\n  cert: "./path/to/localhost.crt",\n  key: "./path/to/localhost.key",\n  alpnProtocols: ["h2", "http/1.1"]\n}, callback);\n')),(0,a.kt)("h3",{id:"signal-for-abort"},"Signal for abort"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'...\nconst app = nhttp();\n\nconst ac = new AbortController();\n\napp.get("/shutdown", () => {\n  ac.abort();\n  return "bye";\n})\n\napp.listen({ port: 8000, signal: ac.signal });\n')))}d.isMDXComponent=!0}}]);