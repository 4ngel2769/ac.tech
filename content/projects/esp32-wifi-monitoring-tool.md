---
title: 'ESP32 WiFi Monitoring Toolkit'
description: "An ESP32 Based Tool for Monitoring WiFi Networks"
headline: 'An ESP32 Based Tool for Monitoring WiFi Networks'
excerpt: "-"
date: '2024-09-21T14:21:15'
dateUpdated: ''
author: 'Angel Capra'
authorUrl: 'https://github.com/4ngel2769'
tags: ['ESP32', 'WiFi', 'Monitoring', 'Toolkit']
socialImage:
    src: '/default.jpg'
    mime: 'webp'
    alt: 'ESP32 WiFi Monitoring Toolkit'
    width: 1200
    height: 630
---

This is a sample blog post.

## Table of Contents

Headings up to H3 (inclusive) are added to the Table of Contents

### This heading is in the ToC

Lorem ipsum

#### This heading is not in the ToC

##### This heading is not in the ToC either

## Code

Code blocks can be added like this:

```bash
```javascript{1-4}[file.json]
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    css: ['/assets/css/main.css'],
    ssr: true,
    experimental: {
        payloadExtraction: false
    },
    router: {
        options: {
            strict: false
        }
    },
    sourcemap: false,
    content: {
        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: 'github-dark',
            preload: ['java','javascript']
        },
        markdown: {
            // https://github.com/rehypejs/rehype-external-links
            rehypePlugins: [
                [
                    'rehype-external-links',
                    {
                        target: '_blank',
                        rel: 'noopener noreferer'
                    }
                ]
            ]
        }
    }
});
```    
```

This is processed and looks like this:

```javascript{1-4,6}[file.json]
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    css: ['/assets/css/main.css'],
    ssr: true,
    experimental: {
        payloadExtraction: false
    },
    router: {
        options: {
            strict: false
        }
    },
    sourcemap: false,
    content: {
        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: 'github-dark',
            preload: ['java','javascript']
        },
        markdown: {
            // https://github.com/rehypejs/rehype-external-links
            rehypePlugins: [
                [
                    'rehype-external-links',
                    {
                        target: '_blank',
                        rel: 'noopener noreferer'
                    }
                ]
            ]
        }
    }
});
```

You can define language, highlighted lines, and filename.

Inline code is written using \`, and looks like `this`.

## Images

Images should be loaded from the `public` folder. An image is added like this:

```bash
![Alt text goes here](/sample.png)
```

The result of that is:

![Alt text goes here](/sample.png)