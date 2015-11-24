文件结构

project
	|
	|--app				// 上线代码
		|--assets
			|--bundle.min.css
			|--bundle.min.js
			|--bundle.min-md5.css
			|--bundle.min-md5.js
		|--lib			// 库文件
		|--rev-manifest.json
		|--index.html
	|--node_modules
	|--src				// 开发代码
		|--assets
		|--css
		|--js
		|--lib			// 库文件
		|--styl
		|--index.html
	|--gulpfile.js
	|--package.json



理解服务，首先需要理解模块与服务的关系。

服务依赖模块存在。

服务是模块的多种机制中的一种。其他的机制还有directive 和 filter 等。

AngularJS本身默认有个模块叫ng。ng 提供 $http, $q等服务。

所以，定义模块有两种方法：
	1. 直接在现有的模块上定义服务。
	2. 新建一个模块，在新模块上定义服务。例: ui-router。