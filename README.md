# auto-generate-vitepress-config

## What is it ?

Usually, if we want to add an article on vitepress, we have to go through the following two steps:

1. write a new post
2. add relative config in .vitepress/config.js

One post is ok. However, if we write a lot of articles at once，do we need to add configuration information one by one?

That's too terrible.

auto-generate-vitepress-config can help you automaticlly generate right configuration.

All you need to do is write posts.

## How to use ?

1. download the index.js script and put it in the ./vitepress
2. Import it using commonJS in ./vitepress/config.js
3. Pass the original config object into the function

```js
const auto_generate_config = require('./auto-generate-config');

// The outermost directory where the article is stored
const ROOTFOLDERPATH = 'handbook';

const config = {
  title: "Vitepress",
  description: "Write My Mind",
  base: "/Blog",
  themeConfig: {
    sidebar: []
  }
}

module.exports = auto_generate_config(config, ROOTFOLDERPATH);
```

## Note
---
Currently, this is a simple version, which only meet basic demand.After that, I will constantly improve its functionality and release it as an npm package。

If it helps you, please help me star.