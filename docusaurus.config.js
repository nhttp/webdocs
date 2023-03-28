// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "NHttp",
  // themes: ['@docusaurus/theme-search-algolia'],
  tagline: "An Simple web-framework for Deno and Friends. so hot 🚀",
  url: "https://nhttp.deno.dev",
  favicon: "img/favicon.ico",
  baseUrl: "/",
  organizationName: "nhttp/nhttp", // Usually your GitHub org/user name.
  projectName: "nhttp", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/nhttp/webdocs/edit/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/nhttp/webdocs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'VUBYD7NZJV',
        apiKey: '694ae9209d1f144bdf06458d65e9925e',
        indexName: 'nhttp',
      },
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        title: "NHttp",
        logo: {
          alt: "NHttp",
          src: "img/deno.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/benchmark", label: "Http Benchmark", position: "left" },
          {
            href: "https://github.com/nhttp/nhttp",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Documentation",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/nhttp/nhttp",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 
          <a href="https://github.com/nhttp/nhttp" target="_blank">NHttp</a>. 
          Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>. 
          Deploy to <a href="https://deno.com/deploy" target="_blank">Deno Deploy</a> 
          and <a href="https://workers.cloudflare.com" target="_blank">Cloudflare Workers</a>. 
          Assets by <a href="https://www.flaticon.com/" target="_blank">Flaticon</a>, 
          <a href="https://github.com/Kirlovon/Deno-Logo" target="_blank">Kirlovon</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
