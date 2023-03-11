(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[2632],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=o,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1605:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return c},default:function(){return d}});var r=n(2122),o=n(9756),a=(n(7294),n(3905)),i=["components"],l={},p="Jsx",s={unversionedId:"3rd-party-lib/jsx",id:"3rd-party-lib/jsx",isDocsHomePage:!1,title:"Jsx",description:"Simple jsx libs.",source:"@site/docs/3rd-party-lib/jsx.md",sourceDirName:"3rd-party-lib",slug:"/3rd-party-lib/jsx",permalink:"/docs/3rd-party-lib/jsx",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/3rd-party-lib/jsx.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Etag",permalink:"/docs/3rd-party-lib/etag"},next:{title:"ServeStatic",permalink:"/docs/3rd-party-lib/serve-static"}},c=[{value:"Import",id:"import",children:[]},{value:"Config",id:"config",children:[]},{value:"Or inline file (tsx)",id:"or-inline-file-tsx",children:[]},{value:"Usage",id:"usage",children:[]},{value:"Expected in browser",id:"expected-in-browser",children:[]}],u={toc:c};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"jsx"},"Jsx"),(0,a.kt)("p",null,"Simple jsx libs."),(0,a.kt)("h3",{id:"import"},"Import"),(0,a.kt)("h4",{id:"deno"},"Deno"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "https://deno.land/x/nhttp@1.2.0/lib/jsx.ts";\n')),(0,a.kt)("h4",{id:"deno-npm"},"Deno npm"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "npm:nhttp-land@1.2.0/jsx";\n')),(0,a.kt)("h4",{id:"node--bun"},"Node / Bun"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "nhttp-land/jsx";\n// or\n// const {...} = require("nhttp-land/jsx");\n')),(0,a.kt)("h3",{id:"config"},"Config"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "jsx": "react",\n  "jsxFactory": "n",\n  "jsxFragmentFactory": "n.Fragment"\n}\n')),(0,a.kt)("h3",{id:"or-inline-file-tsx"},"Or inline file (tsx)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"/** @jsx n */\n/** @jsxFrag n.Fragment */\n")),(0,a.kt)("h3",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'/** @jsx n */\n/** @jsxFrag n.Fragment */\n\nimport { n, Helmet, renderToHtml, FC } from "https://deno.land/x/nhttp@1.2.0/lib/jsx.ts";\nimport { nhttp } from "https://deno.land/x/nhttp@1.2.0/mod.ts";\n\nconst Home: FC<{ title: string }> = (props) => {\n  return (\n    <>\n      <Helmet>\n        <title>{props.title}</title>\n      </Helmet>\n      <h1>Home Page</h1>\n    </>\n  );\n};\n\nconst app = nhttp();\n\napp.engine(renderToHtml);\n\napp.get("/", () => <Home title="welcome jsx" />);\n\napp.listen(8000, () => {\n  console.log("> Running on port 8000");\n});\n')),(0,a.kt)("h3",{id:"expected-in-browser"},"Expected in browser"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>welcome jsx</title>\n  </head>\n  <body>\n    <h1>Home Page</h1>\n  </body>\n</html>\n')))}d.isMDXComponent=!0}}]);