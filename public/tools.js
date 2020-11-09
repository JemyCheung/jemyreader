const readline = require('readline');
var conf = require('./config.js');
//Readline是Node.js里实现标准输入输出的封装好的模块，通过这个模块我们可以以逐行的方式读取数据流。使用require(“readline”)可以引用模块。
const fs = require('fs');
var fetch = require("node-fetch");

//dealwithTxt();
/**工具类：部署前，资源处理
1.所有小说文件上传到七牛存储，工具qshell
2.用qshell从七牛进行list所有文件清单
3.将list.txt文件进行处理，转换为“文件名 url格式”的txt文件newList.txt
**/
exports.dealwithTxt = function(postfix) {
  const r1 = readline.createInterface({
    input: fs.createReadStream(conf.RESPATH)
  });
  r1.on('line', function(line,postfix) { //事件监听
    var newLine = getNewLine(line);
    //写入新的文件 newList.txt
    writeFile(conf.LOCALPATH, newLine);
  });
}


/**工具类：部署后，文件拉取
download dbook.txt
**/

exports.downloadTxt = function() {
  //下载文件到本地
  download(conf.WEBOOKS, conf.LOCALPATH);
}

/**
读取本地的dbook.txt，根据传入的文件名搜索，返回对应的url
**/
exports.searchBooks = function(bookname, callback) {
  const r1 = readline.createInterface({
    input: fs.createReadStream(conf.LOCALPATH)
  });
  var resbooks = '';
  r1.on('line', function(line) { //事件监听
    if (line.includes(bookname)) {
      var y = line.indexOf(".mobi"); //y will also be 4
      console.log(line.substr(y + 5));
      resbooks = resbooks + line.substr(y + 5) + "\n";
    }

  });
  r1.on('pause', function() {
    callback(resbooks);
  });
}

function download(url, localpath) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/force-download'
    },
  }).then(res => res.buffer()).then(_ => {
    fs.writeFile(localpath, _, "binary", function(err) {
      console.log(err || localpath);
    });
  });
}

function getNewLine(line,postfix) {
  var y = line.indexOf(postfix); //y will also be 4
  var newLine = line.substr(0, y + 5);
  return newLine + " " + conf.WEURL + newLine + "\n";
}

function writeFile(filePath, contents) {
  fs.appendFile(filePath, contents, (error) => {
    if (error) return console.log("追加文件失败" + error.message);
    console.log("追加成功");
  });
}

exports.deleteNoUse = function() {
  const r1 = readline.createInterface({
    input: fs.createReadStream(conf.LOCALPATH)
  });

  r1.on('line', function(line) { //事件监听
    if (line.length != 32) {
      line+='\n';
      writeFile(conf.NEWLOCALPATH, line);
    }

  });
}
