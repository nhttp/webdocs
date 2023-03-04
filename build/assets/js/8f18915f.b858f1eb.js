(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[4102],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return c},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=l(t),m=a,g=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return t?r.createElement(g,s(s({ref:n},c),{},{components:t})):r.createElement(g,s({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=d;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=t[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},2041:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return p},metadata:function(){return l},toc:function(){return c},default:function(){return d}});var r=t(2122),a=t(9756),o=(t(7294),t(3905)),s=["components"],i={},p="Swagger",l={unversionedId:"3rd-party-lib/swagger",id:"3rd-party-lib/swagger",isDocsHomePage:!1,title:"Swagger",description:"Make api-docs using Swagger with simple Decorators.",source:"@site/docs/3rd-party-lib/swagger.md",sourceDirName:"3rd-party-lib",slug:"/3rd-party-lib/swagger",permalink:"/docs/3rd-party-lib/swagger",editUrl:"https://github.com/nhttp/webdocs/edit/master/docs/3rd-party-lib/swagger.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ServeStatic",permalink:"/docs/3rd-party-lib/serve-static"}},c=[{value:"Import",id:"import",children:[]},{value:"Usage",id:"usage",children:[]},{value:"@ApiDocument",id:"apidocument",children:[]},{value:"@ApiBearerAuth",id:"apibearerauth",children:[]},{value:"@ApiParameter",id:"apiparameter",children:[]},{value:"@ApiRequestBody",id:"apirequestbody",children:[]}],u={toc:c};function d(e){var n=e.components,t=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"swagger"},"Swagger"),(0,o.kt)("p",null,"Make api-docs using Swagger with simple Decorators."),(0,o.kt)("h3",{id:"import"},"Import"),(0,o.kt)("h4",{id:"deno"},"Deno"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "https://deno.land/x/nhttp@1.1.18/lib/swagger.ts";\n')),(0,o.kt)("h4",{id:"deno-npm"},"Deno npm"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "npm:nhttp-land@1.1.18/swagger";\n')),(0,o.kt)("h4",{id:"node--bun"},"Node / Bun"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import {...} from "nhttp-land/swagger";\n// or\n// const {...} = require("nhttp-land/swagger");\n')),(0,o.kt)("h4",{id:"tsconfig-bunnode"},"tsconfig (bun/node)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'{\n  "compilerOptions": {\n    "types": ["bun-types"],\n    "moduleResolution": "nodenext",\n    "experimentalDecorators": true,\n    "target": "ES5",\n    "lib": [\n      "DOM",\n      "DOM.Iterable",\n      "ESNext"\n    ]\n  },\n}\n')),(0,o.kt)("h3",{id:"usage"},"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { nhttp, RequestEvent } from "https://deno.land/x/nhttp@1.1.18/mod.ts";\nimport {\n  Controller,\n  Get,\n} from "https://deno.land/x/nhttp@1.1.18/lib/controller.ts";\nimport { \n  ApiDocument,\n  ApiOperation,\n  ApiResponse,\n  DocumentBuilder,\n  swagger, \n} from "https://deno.land/x/nhttp@1.1.18/lib/swagger.ts";\n\n@ApiDocument({\n  name: "Doc user 1.0",\n  description: "doc user description",\n})\n@Controller("/user")\nclass UserController {\n\n  @ApiResponse(200, { description: "OK" })\n  @ApiOperation({ summary: "get user" })\n  @Get("/")\n  getUser() {\n    return "Hello";\n  }\n\n}\n\nconst app = nhttp();\n\napp.use("/api/v1", new UserController());\n// or multi controllers\n// app.use("/api/v1", [new UserController(), new HomeController()]);\n\nconst document = new DocumentBuilder()\n  .setInfo({\n    title: "Rest APIs for amazing app",\n    version: "1.0.0",\n    description: "This is the amazing app",\n  })\n  .addServer("http://localhost:8000")\n  .build();\n\n// serve swagger\nswagger(app, "/api-docs", document);\n\napp.listen(8000);\n')),(0,o.kt)("h3",{id:"apidocument"},"@ApiDocument"),(0,o.kt)("p",null,"Initial api document from controller."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@ApiDocument(desc);\n")),(0,o.kt)("h3",{id:"apibearerauth"},"@ApiBearerAuth"),(0,o.kt)("p",null,"Add Api Bearer Auth decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@ApiBearerAuth()\n@ApiDocument({\n  name: "Doc user 1.0",\n  description: "doc user description"\n})\n@Controller("/user")\nclass UserController {...}\n')),(0,o.kt)("h4",{id:"builder"},"builder"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'// builder\nconst document = new DocumentBuilder()\n  .setInfo({\n    title: "Rest APIs for amazing app",\n    version: "1.0.0",\n    description: "This is the amazing app",\n  })\n  .addServer("http://localhost:3000")\n  // add this\n  .addBearerAuth()\n  .build()\n')),(0,o.kt)("h3",{id:"apiparameter"},"@ApiParameter"),(0,o.kt)("p",null,"Add api parameter decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@ApiDocument({\n  name: "Doc user 1.0",\n  description: "doc user description"\n})\n@Controller("/user")\nclass UserController {\n\n  @ApiParameter({\n    name: "id",\n    in: "path"\n  })\n  @ApiParameter({\n    name: "name",\n    in: "query"\n  })\n  @ApiResponse(200, { description: "OK" })\n  @ApiOperation({ summary: "get user id" })\n  @Get("/:id")\n  getUserId() {\n    return "Hello";\n  }\n}\n')),(0,o.kt)("h3",{id:"apirequestbody"},"@ApiRequestBody"),(0,o.kt)("p",null,"Generate request body decorators."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"@ApiRequestBody(config);\n")),(0,o.kt)("h4",{id:"request-body-manual"},"Request Body (manual)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'\n@ApiDocument({\n  name: "Doc user 1.0",\n  description: "doc user description"\n})\n@Controller("/user")\nclass UserController {\n\n    @ApiRequestBody({\n      description: "Save User",\n      required: true,\n      content: {\n        "application/json": {\n          schema: {\n            type: "object",\n            properties: {\n              name: {\n                type: "string"\n              },\n              id: {\n                type: "integer"\n              }\n            }\n          }\n        }\n      }\n    })\n    @ApiResponse(201, { description: "Created" })\n    @ApiOperation({ summary: "save user" })\n    @Post("/")\n    save() {\n      return "Success";\n    }\n}\n')),(0,o.kt)("h4",{id:"request-body-auto"},"Request Body (auto)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import {\n  IsNumber,\n  IsString\n} from "npm:class-validator";\nimport { validationMetadatasToSchemas } from "npm:class-validator-jsonschema";\n\nclass UserCreateDto {\n  @IsString()\n  name!: string;\n\n  @IsNumber()\n  id!: number;\n}\n\n@ApiDocument({\n  name: "Doc user 1.0",\n  description: "doc user description"\n})\n@Controller("/user")\nclass UserController {\n\n  @ApiRequestBody({\n    description: "Save User",\n    required: true,\n    schema: UserCreateDto\n  })\n  @ApiResponse(201, { description: "Created" })\n  @ApiOperation({ summary: "save user" })\n  @Post("/")\n  save() {\n    return "Success";\n  }\n}\n...\n\n// add to options\nconst schemas = validationMetadatasToSchemas();\nswagger(app, "/api-docs", document, { schemas });\n')))}d.isMDXComponent=!0}}]);