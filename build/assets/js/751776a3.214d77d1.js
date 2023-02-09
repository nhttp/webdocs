(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[31],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,f=d["".concat(c,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4714:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return s},default:function(){return d}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i=["components"],l={},c="app.listen",p={unversionedId:"application/listen",id:"application/listen",isDocsHomePage:!1,title:"app.listen",description:"Listen the server.",source:"@site/docs/application/listen.md",sourceDirName:"application",slug:"/application/listen",permalink:"/docs/application/listen",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/application/listen.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"app.handle",permalink:"/docs/application/handle"},next:{title:"app.method",permalink:"/docs/application/method"}},s=[{value:"Using Callback",id:"using-callback",children:[]},{value:"Using Object Option",id:"using-object-option",children:[]},{value:"Using Https",id:"using-https",children:[]},{value:"Using HTTP/2",id:"using-http2",children:[]},{value:"Signal for abort",id:"signal-for-abort",children:[]}],u={toc:s};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"applisten"},"app.listen"),(0,o.kt)("p",null,"Listen the server."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"...\n// some code\napp.listen(8000);\n")),(0,o.kt)("h3",{id:"using-callback"},"Using Callback"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'...\n// some code\napp.listen(8000, (err, opts) => {\n  if (err) throw err;\n  console.log("Running on server " + opts.port);\n});\n')),(0,o.kt)("h3",{id:"using-object-option"},"Using Object Option"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"...\n// some code\napp.listen({ port: 8000, hostname: 'localhost' }, callback);\n")),(0,o.kt)("h3",{id:"using-https"},"Using Https"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'...\n// some code\napp.listen({ \n  port: 443,\n  cert: "./path/to/localhost.crt",\n  key: "./path/to/localhost.key",\n}, callback);\n')),(0,o.kt)("h3",{id:"using-http2"},"Using HTTP/2"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'...\n// some code\napp.listen({ \n  port: 443,\n  cert: "./path/to/localhost.crt",\n  key: "./path/to/localhost.key",\n  alpnProtocols: ["h2", "http/1.1"]\n}, callback);\n')),(0,o.kt)("h3",{id:"signal-for-abort"},"Signal for abort"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'...\nconst app = nhttp();\n\nconst ac = new AbortController();\n\napp.get("/shutdown", () => {\n  ac.abort();\n  return "bye";\n})\n\napp.listen({ port: 8000, signal: ac.signal });\n')))}d.isMDXComponent=!0}}]);