---
sidebar_position: 1
---

# Intro

[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![deno.land](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fnhttp@0.7.4%2Fmod.ts)](https://deno.land/x/nhttp)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com)
![deps badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
![cache badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fcache-size%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
[![nest.land](https://nest.land/badge.svg)](https://nest.land/package/nhttp)

NHttp a just native HTTP/2 micro framework for [Deno](https://deno.land/). so hot :rocket:

> Note: Deno native HTTP/2 [Hyper](https://hyper.rs/) requires Deno version 1.9.0 or higher.

## Features

* HTTP/2 support.
* Middleware support.
* Router support.
* Includes body parser (jsonBody, urlencodedBody).
* No third party modules and no std/lib by default.

## Benchmark
`autocannon -c 100 http://localhost:3000/`

| Name     | Req/sec | Throughput |
|----------|---------|------------|
| Native   | 21433   | 2.5 MB     |
| NHttp    | 21127   | 2.5 MB     |
| std/http | 14569   | 626 KB     |

> Note: maybe not relevant if compared with std/http or other Deno framework using std/http. nhttp uses native deno http. 