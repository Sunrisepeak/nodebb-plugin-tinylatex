# TinyLaTex

A tiny latex plugins for nodebb/d2learn-forums

## Core Logic

1. add static/tinylatex-loader.js
2. plugin.json: add tinylatex-loader.js
3. main.js to load:
    if (window.TinyLaTeX?.tryLoadMathJax) {
        window.TinyLaTeX.tryLoadMathJax();
    }
4. ~add admin panel: templates/plugins/tinylatex.tpl~
5. ~lib/controllers.js: 渲染设置值 meta.settings.get()~

## Installation

```bash
npm install nodebb-plugin-tinylatex
```

or

```bash
git clone https://github.com/Sunrisepeak/nodebb-plugin-tinylatex.git
cd nodebb-plugin-tinylatex
npm link
cd yourNodeBB
npm link nodebb-plugin-tinylatex
./nodebb activate nodebb-plugin-tinylatex
./nodebb build && ./nodebb restart
```

## Screenshots

![Image](https://github.com/user-attachments/assets/651614be-3211-4fec-bb35-4665666f3258)

[**更多示例/交流讨论**](http://forum.d2learn.org/post/489)
