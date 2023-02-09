(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[1510],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,l=function(e,n){if(null==e)return{};var t,r,l={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var p=r.createContext({}),i=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=i(e.components);return r.createElement(p.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,l=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=i(t),m=l,g=d["".concat(p,".").concat(m)]||d[m]||c[m]||o;return t?r.createElement(g,a(a({ref:n},u),{},{components:t})):r.createElement(g,a({ref:n},u))}));function m(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var o=t.length,a=new Array(o);a[0]=d;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s.mdxType="string"==typeof e?e:l,a[1]=s;for(var i=2;i<o;i++)a[i]=t[i];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8823:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return i},toc:function(){return u},default:function(){return d}});var r=t(2122),l=t(9756),o=(t(7294),t(3905)),a=["components"],s={sidebar_position:1},p="Routing Controller",i={unversionedId:"3rd-party-lib/routing-controller",id:"3rd-party-lib/routing-controller",isDocsHomePage:!1,title:"Routing Controller",description:"Make router as Controller with simple Decorators.",source:"@site/docs/3rd-party-lib/routing-controller.md",sourceDirName:"3rd-party-lib",slug:"/3rd-party-lib/routing-controller",permalink:"/docs/3rd-party-lib/routing-controller",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/3rd-party-lib/routing-controller.md",version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"rev.waitUntil",permalink:"/docs/request-event/wait-until"},next:{title:"Class Validator",permalink:"/docs/3rd-party-lib/class-validator"}},u=[{value:"Import",id:"import",children:[]},{value:"Usage",id:"usage",children:[]},{value:"@Controller",id:"controller",children:[]},{value:"@Method",id:"method",children:[]},{value:"@Wares",id:"wares",children:[]},{value:"@Upload",id:"upload",children:[]},{value:"@Status",id:"status",children:[]},{value:"@Header",id:"header",children:[]},{value:"@Type",id:"type",children:[]},{value:"@View",id:"view",children:[]},{value:"@Jsx",id:"jsx",children:[]}],c={toc:u};function d(e){var n=e.components,t=(0,l.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"routing-controller"},"Routing Controller"),(0,o.kt)("p",null,"Make router as Controller with simple Decorators."),(0,o.kt)("h3",{id:"import"},"Import"),(0,o.kt)("h4",{id:"deno"},"Deno"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "https://deno.land/x/nhttp@1.1.12/lib/controller.ts";\n')),(0,o.kt)("h4",{id:"deno-npm"},"Deno npm"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "npm:nhttp-land@1.1.12/controller";\n')),(0,o.kt)("h4",{id:"node--bun"},"Node / Bun"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "nhttp-land/controller";\n// or\n// const {...} = require("nhttp-land/controller");\n')),(0,o.kt)("h4",{id:"tsconfig-bunnode"},"tsconfig (bun/node)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'{\n  "compilerOptions": {\n    "types": ["bun-types"],\n    "moduleResolution": "nodenext",\n    "experimentalDecorators": true,\n    "target": "ES5",\n    "lib": [\n      "DOM",\n      "DOM.Iterable",\n      "ESNext"\n    ]\n  },\n}\n')),(0,o.kt)("h3",{id:"usage"},"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { nhttp, RequestEvent } from "https://deno.land/x/nhttp@1.1.12/mod.ts";\nimport { Get, Controller } from "https://deno.land/x/nhttp@1.1.12/lib/controller.ts";\n\n@Controller("/hello")\nclass HelloController {\n\n  @Get("/")\n  hello(rev: RequestEvent) {\n    console.log(rev.url);\n    return "Hello, World";\n  }\n\n}\n\nconst app = nhttp();\n\napp.use("/api/v1", new UserController());\n// or multi controllers\n// app.use("/api/v1", [new UserController(), new HomeController()]);\n\napp.listen(8000);\n')),(0,o.kt)("h3",{id:"controller"},"@Controller"),(0,o.kt)("p",null,"Controller decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller()\n// or\n@Controller("/user")\n// or\n@Controller("/user", ...middlewares);\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {...}\n')),(0,o.kt)("h3",{id:"method"},"@","[Method]"),(0,o.kt)("p",null,"Method Decorators. ",(0,o.kt)("inlineCode",{parentName:"p"},"Get | Post | Delete")," and more methods."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@[Method](path_string);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  // GET/user/123\n  @Get("/:id")\n  findById(rev: RequestEvent) {...}\n\n  // POST/user\n  @Post("/")\n  create(rev: RequestEvent) {...}\n}\n')),(0,o.kt)("h3",{id:"wares"},"@Wares"),(0,o.kt)("p",null,"Middleware decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@Wares(...middlewares);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'class UserMiddleware {\n  use(rev: RequestEvent, next: NextFunction) {\n    rev.user = "john";\n    return next();\n  }\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  @Wares(UserMiddleware)\n  @Get("/")\n  getUser(rev: RequestEvent) {\n    return rev.user;\n    // => john\n  }\n\n}\n')),(0,o.kt)("h3",{id:"upload"},"@Upload"),(0,o.kt)("p",null,"Upload decorators. related to ",(0,o.kt)("a",{parentName:"p",href:"https://nhttp.deno.dev/docs/usage/upload"},"Upload Middleware")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@Upload(config);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  @Upload({ name: "image" })\n  @Post("/")\n  hello(rev: RequestEvent) {\n    console.log(rev.file);\n    return "success upload";\n  }\n\n}\n')),(0,o.kt)("h3",{id:"status"},"@Status"),(0,o.kt)("p",null,"Status decorators. set statusCode in decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@Status(code);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  @Status(201)\n  @Post("/")\n  hello(rev: RequestEvent) {\n    return "success save with status " + rev.response.statusCode;\n  }\n\n}\n')),(0,o.kt)("h3",{id:"header"},"@Header"),(0,o.kt)("p",null,"Header decorators. set Header in decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@Header(key, val);\n@Header(obj);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  @Header("name", "john")\n  @Get("/")\n  hello(rev: RequestEvent) {\n    return "hello";\n  }\n\n}\n')),(0,o.kt)("h3",{id:"type"},"@Type"),(0,o.kt)("p",null,"Type decorators. set Content-Type in decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@Type(contentType);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  @Type("html")\n  @Get("/")\n  hello(rev: RequestEvent) {\n    return "<h1>Hello, World</h1>";\n  }\n\n}\n')),(0,o.kt)("h3",{id:"view"},"@View"),(0,o.kt)("p",null,"View decorators. set View in decorators. requires ",(0,o.kt)("inlineCode",{parentName:"p"},"app.engine")," configs."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@View(name);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  @View("index")\n  @Get("/")\n  hello(rev: RequestEvent) {\n    // set params\n    return { title: "Hello World" };\n  }\n\n}\n')),(0,o.kt)("h4",{id:"appengine"},"app.engine"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import ejs from "npm:ejs";\n\napp.engine(ejs.renderFile, { base: "views", ext: "ejs" });\n')),(0,o.kt)("h3",{id:"jsx"},"@Jsx"),(0,o.kt)("p",null,"Jsx decorators. requires ",(0,o.kt)("inlineCode",{parentName:"p"},"app.engine")," to React / Preact."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@Jsx();\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Controller("/user");\nclass HelloController {\n\n  @Jsx()\n  @Get("/")\n  hello(rev: RequestEvent) {\n    // set params\n    // rev.response.params = { title: "Hello Jsx" };\n\n    // return as jsx\n    return <h1>Hello, Jsx</h1>;\n  }\n\n}\n')),(0,o.kt)("h4",{id:"appengine-1"},"app.engine"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'// @deno-types="npm:@types/react"\nimport React from "npm:react";\n// @deno-types="npm:@types/react-dom/server"\nimport { renderToString } from "npm:react-dom/server";\n\napp.engine(renderToString);\n// or stream\n// app.engine(renderToReadableStream);\n')),(0,o.kt)("p",null,"Or with complex html."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"app.engine((elem, params) => {\n  return `\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>${params.title}</title>\n      </head>\n      <body>\n        ${renderToString(elem)}\n      </body>\n    </html>\n  `;\n});\n")))}d.isMDXComponent=!0}}]);