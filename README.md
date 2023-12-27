# 此仓库仅为学习用途！请在 24 小时之内删除！

一个抓取某个网站登录时用户输入的账号和密码的 chrome 扩展

此仓库仅为学习用途，其中的代码是能跑就行，非致命错误本人并不会进行修复

此仓库基本上并没有什么用的，因为你必须在电脑开机时将此扩展装入 chrome 中，并且需要独立服务器（或者有外网 IP 的电脑）运行服务端

而且推送需要 pushplus 的 token，如果怕麻烦请直接退出！！！

## 如何使用

此仓库中的 server 是单独的服务端，请先将此文件夹移出并上传到服务器中

服务端需要**nodejs**的环境！

然后 cd 进上传的目录后`npm i`安装依赖

然后更改`server.js`中的`STATUS`和`PUSHPLUS_TOKEN`，具体是什么看注解

然后运行`node server.js`，如果你是 linux 系统建议安装`screen`然后运行`screen -R <随你写的名字>`进入新窗口之后再运行命令，这样就算不填写`PUSHPLUS_TOKEN`你也可以切换到这个窗口来看讯息

再进入本仓库的根目录修改`content.js`中的`API_URL`为你自己的服务器 IP

然后再打开 chrome/edge 的扩展页面打开开发者模式

![image.png](https://s2.loli.net/2023/12/27/fjslgAmtyUnG4Br.png)

选择`加载解压缩的扩展`然后选择此插件文件夹即可看见类似下图的插件

![image.png](https://s2.loli.net/2023/12/27/C27ZOUvKywnP8gB.png)

然后打开某个网站的登录页面后打开控制台看见这种输出就是已经注入完成！

![image.png](https://s2.loli.net/2023/12/27/fczrZEVgbhIajLG.png)
