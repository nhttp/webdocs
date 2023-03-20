(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[9671],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),i=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},d=function(e){var t=i(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=i(n),m=a,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||o;return n?r.createElement(h,p(p({ref:t},d),{},{components:n})):r.createElement(h,p({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,p[1]=l;for(var i=2;i<o;i++)p[i]=n[i];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},426:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return i},toc:function(){return d},default:function(){return c}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),p=["components"],l={sidebar_position:1},s="Intro",i={unversionedId:"intro",id:"intro",isDocsHomePage:!1,title:"Intro",description:"nhttp ci",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/docs/intro",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/intro.md",version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Installation",permalink:"/docs/installation"}},d=[{value:"Features",id:"features",children:[]},{value:"Installation",id:"installation",children:[{value:"deno.land",id:"denoland",children:[]},{value:"deno-npm",id:"deno-npm",children:[]},{value:"nest.land",id:"nestland",children:[]},{value:"npm/yarn",id:"npmyarn",children:[]}]},{value:"Usage",id:"usage",children:[]},{value:"Run",id:"run",children:[]},{value:"Deno Flash",id:"deno-flash",children:[]},{value:"Middleware",id:"middleware",children:[]},{value:"Body Parser",id:"body-parser",children:[]},{value:"Other Runtime (Node / Bun)",id:"other-runtime-node--bun",children:[{value:"Coudflare Workers",id:"coudflare-workers",children:[]}]},{value:"tsconfig (Bun / Node)",id:"tsconfig-bun--node",children:[]},{value:"Jsx",id:"jsx",children:[]},{value:"License",id:"license",children:[]}],u={toc:d};function c(e){var t=e.components,n=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"intro"},"Intro"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/nhttp/nhttp"},(0,o.kt)("img",{parentName:"a",src:"https://github.com/nhttp/nhttp/workflows/ci/badge.svg",alt:"nhttp ci"})),"\n",(0,o.kt)("a",{parentName:"p",href:"http://badges.mit-license.org"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/:license-mit-blue.svg",alt:"License"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://deno.land/x/nhttp"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fnhttp@1.2.8%2Fmod.ts",alt:"deno.land"})),"\n",(0,o.kt)("a",{parentName:"p",href:"http://makeapullrequest.com"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/PRs-welcome-blue.svg",alt:"PRs Welcome"})),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts",alt:"deps badge"}),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fcache-size%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts",alt:"cache badge"}),"\n",(0,o.kt)("a",{parentName:"p",href:"https://codecov.io/gh/nhttp/nhttp"},(0,o.kt)("img",{parentName:"a",src:"https://codecov.io/gh/nhttp/nhttp/branch/master/graph/badge.svg?token=SJ2NZQ0ZJG",alt:"codecov"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.codefactor.io/repository/github/nhttp/nhttp/overview/master"},(0,o.kt)("img",{parentName:"a",src:"https://www.codefactor.io/repository/github/nhttp/nhttp/badge/master",alt:"CodeFactor"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://nest.land/package/nhttp"},(0,o.kt)("img",{parentName:"a",src:"https://nest.land/badge.svg",alt:"nest.land"}))),(0,o.kt)("h2",{id:"features"},"Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Crazy Fast."),(0,o.kt)("li",{parentName:"ul"},"Easy to use."),(0,o.kt)("li",{parentName:"ul"},"Cross runtime support (Deno, Node, Bun, etc)."),(0,o.kt)("li",{parentName:"ul"},"Low overhead & True handlers (no caching anything)."),(0,o.kt)("li",{parentName:"ul"},"Middleware support."),(0,o.kt)("li",{parentName:"ul"},"Sub router support."),(0,o.kt)("li",{parentName:"ul"},"Template engine support (jsx, ejs, nunjucks, eta, pug, ..etc)."),(0,o.kt)("li",{parentName:"ul"},"Return directly on handlers."),(0,o.kt)("li",{parentName:"ul"},"Auto parses the body (",(0,o.kt)("inlineCode",{parentName:"li"},"json / urlencoded / multipart / raw"),").")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/nhttp/nhttp/tree/master/examples"},"See Examples")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://nhttp.deno.dev/benchmark"},"See Benchmark")),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("h3",{id:"denoland"},"deno.land"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import nhttp from "https://deno.land/x/nhttp@1.2.8/mod.ts";\n')),(0,o.kt)("h3",{id:"deno-npm"},"deno-npm"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import nhttp from "npm:nhttp-land@1.2.8";\n')),(0,o.kt)("h3",{id:"nestland"},"nest.land"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import nhttp from "https://x.nest.land/nhttp@1.2.8/mod.ts";\n')),(0,o.kt)("h3",{id:"npmyarn"},"npm/yarn"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm i nhttp-land\n\n// or\n\nyarn add nhttp-land\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'// module\nimport nhttp from "nhttp-land";\n\n// commonjs\nconst nhttp = require("nhttp-land").default;\n')),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import nhttp from "https://deno.land/x/nhttp@1.2.8/mod.ts";\n\nconst app = nhttp();\n\napp.get("/", () => {\n  return "Hello, World";\n});\n\napp.get("/cat", () => {\n  return { name: "cat" };\n});\n\napp.listen(8000, () => {\n  console.log("> Running on port 8000");\n});\n')),(0,o.kt)("h2",{id:"run"},"Run"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"deno run -A myapp.ts\n")),(0,o.kt)("h2",{id:"deno-flash"},"Deno Flash"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"requires ",(0,o.kt)("inlineCode",{parentName:"p"},"--unstable")," flag.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"const app = nhttp({ flash: true });\n")),(0,o.kt)("h2",{id:"middleware"},"Middleware"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'const app = nhttp();\n\napp.use((rev, next) => {\n  rev.foo = "bar";\n  return next();\n});\n\napp.get("/", ({ foo }) => foo);\n')),(0,o.kt)("h2",{id:"body-parser"},"Body Parser"),(0,o.kt)("p",null,"Support ",(0,o.kt)("inlineCode",{parentName:"p"},"json / urlencoded / multipart / raw"),"."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"note: nhttp automatically parses the body.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'const app = nhttp();\n\n// if you want disable bodyParser\n// const app = nhttp({ bodyParser: false });\n\napp.post("/save", (rev) => {\n  console.log(rev.body);\n  return "success save";\n});\n\n// inline bodyParser\n// app.post("/save", bodyParser(), (rev) => {...});\n')),(0,o.kt)("h2",{id:"other-runtime-node--bun"},"Other Runtime (Node / Bun)"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"for nodejs, requires v18.0.0 or higher. cause it uses\n",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"},"Fetch API"),".")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import nhttp from "nhttp-land";\n\nconst app = nhttp();\n\napp.get("/", () => new Response("hello"));\n\napp.get("/hello", () => "Hello, World");\n\napp.listen(8000, () => {\n  console.log("> Running on port 8000");\n});\n')),(0,o.kt)("h3",{id:"coudflare-workers"},"Coudflare Workers"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import nhttp from "nhttp-land";\n\nconst app = nhttp();\n\napp.get("/hello", () => "Hello, World");\n\nexport default app.module();\n\n// for other just invoke app.handle\n// export default app.handle;\n')),(0,o.kt)("h2",{id:"tsconfig-bun--node"},"tsconfig (Bun / Node)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "compilerOptions": {\n    // if bun\n    // "types": ["bun-types"],\n    "lib": [\n      "DOM",\n      "DOM.Iterable",\n      "ESNext"\n    ]\n  }\n}\n')),(0,o.kt)("h2",{id:"jsx"},"Jsx"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'/** @jsx n */\n/** @jsxFrag n.Fragment */\n\nimport { n, Helmet, renderToHtml, FC } from "https://deno.land/x/nhttp@1.2.8/lib/jsx.ts";\nimport nhttp from "https://deno.land/x/nhttp@1.2.8/mod.ts";\n\nconst Home: FC<{ title: string }> = (props) => {\n  return (\n    <>\n      <Helmet>\n        <title>{props.title}</title>\n      </Helmet>\n      <h1>Home Page</h1>\n    </>\n  );\n};\n\nconst app = nhttp();\n\napp.engine(renderToHtml);\n\napp.get("/", () => <Home title="welcome jsx" />);\n\napp.listen(8000, () => {\n  console.log("> Running on port 8000");\n});\n')),(0,o.kt)("h2",{id:"license"},"License"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/nhttp/nhttp/blob/master/LICENSE"},"MIT")))}c.isMDXComponent=!0}}]);