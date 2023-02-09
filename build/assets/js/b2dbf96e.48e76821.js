(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[5231],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return u},kt:function(){return f}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=l(t),f=a,m=d["".concat(c,".").concat(f)]||d[f]||s[f]||o;return t?r.createElement(m,p(p({ref:n},u),{},{components:t})):r.createElement(m,p({ref:n},u))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,p=new Array(o);p[0]=d;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var l=2;l<o;l++)p[l]=t[l];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8178:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return d}});var r=t(2122),a=t(9756),o=(t(7294),t(3905)),p=["components"],i={},c="app.handle",l={unversionedId:"application/handle",id:"application/handle",isDocsHomePage:!1,title:"app.handle",description:"If you plan to custom server, use app.handle.",source:"@site/docs/application/handle.md",sourceDirName:"application",slug:"/application/handle",permalink:"/docs/application/handle",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/application/handle.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"app.onError",permalink:"/docs/application/error"},next:{title:"app.listen",permalink:"/docs/application/listen"}},u=[],s={toc:u};function d(e){var n=e.components,t=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"apphandle"},"app.handle"),(0,o.kt)("p",null,"If you plan to custom server, use ",(0,o.kt)("inlineCode",{parentName:"p"},"app.handle"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// deno\nawait Deno.serve(app.handle);\n\n// node\nhttp.createServer(app.handle).listen(3000);\n\n// bun\nBun.serve({ fetch: app.handle });\n\n// CF-Workers\nexport default { fetch: app.handle };\n")))}d.isMDXComponent=!0}}]);