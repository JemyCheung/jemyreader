var express = require('express')
var app = express();
var fs = require("fs");

var conf = require("./public/config.js");
var tools = require("./public/tools.js");

//使用Demo/public下静态资源
app.use(express.static(__dirname + '/public'));
//返回html必备，views一定要指定到html目录下
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');

//index.html
app.get('/index', function(req, res) {
  console.log("requst at");
  res.render('index.html', {

  });
  res.end();
});

// TODO: 实现小说名本地文件搜索，并返回url
app.post('/getbooks', function(req, res) {
  console.log("requst at");
  getBody(req, (body) => {
    var body = JSON.parse(body);
    var bookname = body.bookname;
    //搜索小说，并将url返回
    tools.searchBooks(bookname, (url) => {
      res.write(url);
      res.end();
    });
  });
});

//post getBody
function getBody(req, callback) {
  var body = [];
  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    callback(body);
  });
}

app.listen('12301', function() {
  console.log('Listening on port %d\n', '12301');
  console.log(
    '▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽  Demos  ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽');
  console.log(
    ' ▹▹▹▹▹▹▹▹▹▹▹▹▹▹▹▹   http://127.0.0.1:12301/index   ◁ ◁ ◁ ◁ ◁ ◁ ◁');
  console.log(
    '△ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △\n'
  );
});
