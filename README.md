![mycomponentsvue](/src/assets/mycomponentsvue.svg "mycomponentsvue")


# vue-components


## mycomponentsvue

![mycomponentsvue](https://img.shields.io/badge/download-2-yellow.svg "DOWNLOAD")
![mycomponentsvue](https://img.shields.io/badge/version-0.0.13-blue.svg "VERSION")
![mycomponentsvue](https://img.shields.io/badge/npm-taobao-red.svg "NPM")
![mycomponentsvue](https://img.shields.io/badge/github-vuecomponents-gry.svg "GIT")
![mycomponentsvue](https://img.shields.io/badge/LICENSE-MIT-green.svg "MIT")

> my vue components:包含一些不常用到的交互，做到拿来即用





## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
# 使用
```
npm install mycomponentsvue --save
```

在main.js中引入
```
import mycomponents from 'mycomponentsvue'

Vue.use(mycomponents)


```

在页面中调用
```
eg:

<inputSearch v-model="data"></inputSearch>
```


## 更新淘宝镜像
``` bash
cnpm sync vuefabricmodule
```
自己发布了NPM包，有小伙伴反应，如果是TB源，CNPM上无法获取，不是最新等问题。
排查了下，原来是 CNPM有时候 不能及时同步。
所以需要自己去手工拉取下。
[cnpm镜像](https://npmmirror.com/package/vuefabricmodule).

## 依赖
[vuedraggable@2.24.0](https://sortablejs.github.io/Vue.Draggable/#/nested-with-vmodel).


## 字体规范
字体应用iconfont-tools编译后的base64图片而不是字体文件；


iconfont字体包下载后使用【iconfont-tools】命令步骤如下：
```
设置输出文件夹名称：input
设置输出文件css文件名称：zhiconfontsvg
设置css文件的prefix:zhiconfont
设置字体的大小：16px
是否生产小程序原生组件:NO
*再把/assets/input/zkiconfontsvg.css 就是最终引入文件
```



## 上线发包流程

```
1.改pagckage.json版本号；
2.填写版本记录发布内容；
3.npm run build 生成js生成环境文件；
4.git add . 
  git commit -m 'vxx.xx.xx'
  git push origin master
5.npm publish --otp=xxxxxx;
```

## Changelog


### 2023.07.24

> v0.0.13 \* 项目更新dragGroup组件（2级图层拖拽排序）

- 逻辑添加
- 规则描述
- 交互引用






