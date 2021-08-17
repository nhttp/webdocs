(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[671],{3905:function(t,e,n){"use strict";n.d(e,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var p=r.createContext({}),s=function(t){var e=r.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},u=function(t){var e=s(t.components);return r.createElement(p.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},c=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,p=t.parentName,u=i(t,["components","mdxType","originalType","parentName"]),c=s(n),m=a,h=c["".concat(p,".").concat(m)]||c[m]||d[m]||o;return n?r.createElement(h,l(l({ref:e},u),{},{components:n})):r.createElement(h,l({ref:e},u))}));function m(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,l=new Array(o);l[0]=c;var i={};for(var p in e)hasOwnProperty.call(e,p)&&(i[p]=e[p]);i.originalType=t,i.mdxType="string"==typeof t?t:a,l[1]=i;for(var s=2;s<o;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},426:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return i},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return u},default:function(){return c}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),l=["components"],i={sidebar_position:1},p="Intro",s={unversionedId:"intro",id:"intro",isDocsHomePage:!1,title:"Intro",description:"License",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/docs/intro",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/intro.md",version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Installation",permalink:"/docs/installation"}},u=[{value:"Features",id:"features",children:[]},{value:"Benchmark",id:"benchmark",children:[]}],d={toc:u};function c(t){var e=t.components,n=(0,a.Z)(t,l);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"intro"},"Intro"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"http://badges.mit-license.org"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/:license-mit-blue.svg",alt:"License"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://deno.land/x/nhttp"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fnhttp@1.0.0%2Fmod.ts",alt:"deno.land"})),"\n",(0,o.kt)("a",{parentName:"p",href:"http://makeapullrequest.com"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/PRs-welcome-blue.svg",alt:"PRs Welcome"})),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts",alt:"deps badge"}),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fcache-size%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts",alt:"cache badge"}),"\n",(0,o.kt)("a",{parentName:"p",href:"https://nest.land/package/nhttp"},(0,o.kt)("img",{parentName:"a",src:"https://nest.land/badge.svg",alt:"nest.land"}))),(0,o.kt)("p",null,"Fast native http framework for ",(0,o.kt)("a",{parentName:"p",href:"https://deno.land/"},"Deno"),". so hot \ud83d\ude80"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Note: Deno native HTTP/2 ",(0,o.kt)("a",{parentName:"p",href:"https://hyper.rs/"},"Hyper")," requires Deno version 1.9.0 or higher.")),(0,o.kt)("h2",{id:"features"},"Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"HTTP/2 support."),(0,o.kt)("li",{parentName:"ul"},"Middleware support."),(0,o.kt)("li",{parentName:"ul"},"Router support."),(0,o.kt)("li",{parentName:"ul"},"Includes body parser (jsonBody, urlencodedBody, rawBody, multipartBody)."),(0,o.kt)("li",{parentName:"ul"},"No third party modules and no std/lib by default."),(0,o.kt)("li",{parentName:"ul"},"Return directly on handlers."),(0,o.kt)("li",{parentName:"ul"},"Easy deploy to ",(0,o.kt)("a",{parentName:"li",href:"https://deno.com/deploy"},"Deno Deploy")," and ",(0,o.kt)("a",{parentName:"li",href:"https://workers.cloudflare.com"},"Cloudflare Workers"),".")),(0,o.kt)("h2",{id:"benchmark"},"Benchmark"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"autocannon -c 100 http://localhost:3000/")),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Req/sec"),(0,o.kt)("th",{parentName:"tr",align:null},"Throughput"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"Native"),(0,o.kt)("td",{parentName:"tr",align:null},"21433"),(0,o.kt)("td",{parentName:"tr",align:null},"2.5 MB")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"NHttp"),(0,o.kt)("td",{parentName:"tr",align:null},"21127"),(0,o.kt)("td",{parentName:"tr",align:null},"2.5 MB")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"std/http"),(0,o.kt)("td",{parentName:"tr",align:null},"14569"),(0,o.kt)("td",{parentName:"tr",align:null},"626 KB")))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Note: maybe not relevant if compared with std/http or other Deno framework using std/http. nhttp uses native deno http.")))}c.isMDXComponent=!0}}]);