
**如何使用:**

```
npm install
```

打开index.js设置端口号，若不设置默认3000，npm安装成功后直接运行gulp命令，然后在浏览器中输入：

```
http://127.0.0.1:3000/#/
```

**目录结构:**


	/根目录
	|__ dest 压缩合并后目录
	|__ dev 开发目录
	|	|__ images 图片目录
	|	|__ lib 库文件
	|	|__ scripts angluar 脚步文件
	|	|	|__ common 公用文件
	|	|	|__ controllers 控制器
	|	|	|__ directives 指令
	|	|	|__ filter 过滤器
	|	|	|__ services 服务
	|	|	|__ app.js 
	|	|	|__ bootstrap.js
	|	|	|__ routes.js 路由
	|	|__ styles 样式
	|	|__ views 模板
	|	|__ a.main.js 主文件
	|__ public 放置一些静态文件（可弃用）
	|__ index.js express路由


**问题:**

由于用了gulp-htmlmin、gulp-imagemin插件，在压缩html和img的时候会出错，目前的解决方式只有重启，还没找到合适的插件。