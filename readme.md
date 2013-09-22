# 需求

* 使用 pangu.js 給檔案內的中英文加入空白。

* 打包成 npm package，名稱自選，比如 pangu

* 安裝

      npm install -g pangu

* 用法

比如一個目錄下有幾個 markdown 文件，articles 資料夾下面又有 markdown 文件。

```
├── 1.md
├── 王小明.rb
├── 2.js
└── 3.md
├── articles
│   ├── 001.md
│   ├── 002.md
│   ├── b
│   │   ├── 009.txt
│   ├── 004.md
```

* 單檔加空白

    pangu 1.md

把`1.md`裡的中英文隔開，覆蓋原檔案

* 加完空白，不要覆蓋原始檔案

    pangu 1.md -n

把 `1.md` 裡的中英文隔開，覆蓋原本的檔案。

* 目錄下所有的文件加入空白

    pangu articles

只會給 articles 資料夾下的 001.md,002.md,004.md 加空白

* 目錄下所有的文件加入空白，子目錄下也會

    pangu articles -r

articles 下所有檔案都加入空白

* 副檔名偵測

    pangu *.rst

給當下目錄所有 rst 文件加空白（子目錄不會）