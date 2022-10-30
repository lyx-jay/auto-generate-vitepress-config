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

1. `npm i auto-generate-vitepress-config`
2. add `{ autoGenerateConfig } = require('auto-generate-vitepress-config');` in .vitepress/config.js
3. delete the content of original config sidebar
4. Pass the config object into the function

### Basic sidebar

```
Vitepress Directory Structure
- Blog
  | - docs
  | | - .vitepress
  | | - handbook  // root path of articles
  | - - - | - react
  | - - - | - vue
  | - node_modules
```

```js
// basic exmaple only one sidebar
const { autoGenerateConfig }= require('auto-generate-vitepress-config');

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

module.exports = autoGenerateConfig(config, ROOTFOLDERPATH);
```


### multi sidebar

```js
Vitepress Directory Structure
- Blog
  | - docs
  | | - .vitepress
  | | - react        // Root directory corresponding to each sidebar, which must have a index.md
  | |  - - | - basic
  | |            | text1.md
  | |            | text2.md 
  | |      | - advance
  | |            | text1.md
  | |            | text2.md 
  | |      | - index.md
  | | | - vue  
  | |  - - | - basic
  | |            | text1.md
  | |            | text2.md 
  | |      | - advance
  | |            | text1.md
  | |            | text2.md 
  | |      | - index.md
```

```js
// multi sidebar
const { autoGenerateConfigMulti }= require('auto-generate-vitepress-config');

const config = {
  title: "Vitepress",
  description: "Write My Mind",
  base: "/Blog",
  themeConfig: {
    nav: []
    sidebar: {}
  }
}

module.exports = autoGenerateConfigMulti(config);
```


## Note
---
Currently, this is a simple version, which only meet basic demand.After that, I will constantly improve its functionality and release it as an npm package。

If it is helpful to you, please help me star.

More abilities is coming...