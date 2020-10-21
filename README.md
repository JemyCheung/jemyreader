# jemyreader
小说搜索回调
msg到达服务端，返回html。  
搜索条件到达，返回小说url。

## 执行顺序
- npm install
- mocha --grep 'downloadTxt'//将服务器的清单文件拉到本地目录exports.LOCALPATH
- npm start

## 其他  
### 本地文件处理  
//dealwithTxt()方法可以直接实现
/**工具类：部署前，资源处理
1.所有小说文件上传到七牛存储，工具qshell
2.用qshell从七牛进行list所有文件清单
3.将list.txt文件进行处理，转换为“文件名 url格式”的txt文件newList.txt
**/

### 文件拉取  
/**工具类：部署后
download list.txt，保存到本地
**/

### 搜索小说
/**
当搜索条件到达
读取本地的list.txt，根据传入的文件名搜索，返回对应的url
**/
