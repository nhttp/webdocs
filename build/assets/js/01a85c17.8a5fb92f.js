(self.webpackChunknhttp_website_docu=self.webpackChunknhttp_website_docu||[]).push([[4013],{5601:function(e,t,a){"use strict";a.d(t,{Z:function(){return b}});var r=a(7294),n=a(6010),s=a(6742),l="sidebar_2ahu",i="sidebarItemTitle_2hhb",c="sidebarItemList_2xAf",m="sidebarItem_2UVv",o="sidebarItemLink_1RT6",u="sidebarItemLinkActive_12pM",g=a(4973);function b(e){var t=e.sidebar;return 0===t.items.length?null:r.createElement("nav",{className:(0,n.Z)(l,"thin-scrollbar"),"aria-label":(0,g.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},r.createElement("div",{className:(0,n.Z)(i,"margin-bottom--md")},t.title),r.createElement("ul",{className:c},t.items.map((function(e){return r.createElement("li",{key:e.permalink,className:m},r.createElement(s.Z,{isNavLink:!0,to:e.permalink,className:o,activeClassName:u},e.title))}))))}},94:function(e,t,a){"use strict";a.r(t);var r=a(7294),n=a(6016),s=a(6742),l=a(5601),i=a(4973),c=a(9306);t.default=function(e){var t=e.tags,a=e.sidebar,m=(0,i.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"}),o={};Object.keys(t).forEach((function(e){var t=function(e){return e[0].toUpperCase()}(e);o[t]=o[t]||[],o[t].push(e)}));var u=Object.entries(o).sort((function(e,t){var a=e[0],r=t[0];return a.localeCompare(r)})).map((function(e){var a=e[0],n=e[1];return r.createElement("article",{key:a},r.createElement("h2",null,a),n.map((function(e){return r.createElement(s.Z,{className:"padding-right--md",href:t[e].permalink,key:e},t[e].name," (",t[e].count,")")})),r.createElement("hr",null))})).filter((function(e){return null!=e}));return r.createElement(n.Z,{title:m,wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogTagsListPage,searchMetadatas:{tag:"blog_tags_list"}},r.createElement("div",{className:"container margin-vert--lg"},r.createElement("div",{className:"row"},r.createElement("aside",{className:"col col--3"},r.createElement(l.Z,{sidebar:a})),r.createElement("main",{className:"col col--7"},r.createElement("h1",null,m),r.createElement("section",{className:"margin-vert--lg"},u)))))}}}]);