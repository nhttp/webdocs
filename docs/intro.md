---
sidebar_position: 1
---

# Intro

[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![deno.land](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fnhttp@1.1.7%2Fmod.ts)](https://deno.land/x/nhttp)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com)
![deps badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
![cache badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fcache-size%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
[![nest.land](https://nest.land/badge.svg)](https://nest.land/package/nhttp)

An Simple http framework for [Deno](https://deno.land/),
[Deno Deploy](https://deno.com/deploy) and
[Cloudflare Workers](https://workers.cloudflare.com).

> Note: Deno native HTTP/2 [Hyper](https://hyper.rs/) requires Deno version
> 1.9.0 or higher.

## Features

- Fast. see [benchmarks](https://github.com/herudi/deno_benchmarks#output).
- HTTP/2 support.
- Middleware support.
- Router support.
- Includes body parser (json, urlencoded, raw, multipart).
- Return directly on handlers.
- No third party modules and no std/lib by default.
- Easy deploy to [Deno Deploy](https://deno.com/deploy) and
  [Cloudflare Workers](https://workers.cloudflare.com).

[See examples](https://github.com/nhttp/nhttp/tree/master/examples)
