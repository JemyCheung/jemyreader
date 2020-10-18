var express = require('express')
var app = express();
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

app.post('/getbooks', function(req, res) {
  console.log("requst at");
  getBody(req, (body) => {
    var body = JSON.parse(body);
    console.log(body);
    var bookname = body.bookname;
    //搜索小说，并将url返回
    res.write("http://wetxt.ijemy.com/%E7%AC%AC%E4%B8%83%E5%A4%A9_%E4%BD%99%E5%8D%8E.mobi");
    res.end();
  });
});

//getBody
function getBody(req, callback) {
  var body = [];
  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    callback(body);
  });
}

function loadPage(url) {
  var http = require('http');
  var pm = new Promise(function(resolve, reject) {
    http.get(url, function(res) {
      var html = '';
      res.on('data', function(d) {
        html += d.toString()
      });
      res.on('end', function() {
        resolve(html);
      });
    }).on('error', function(e) {
      reject(e)
    });
  });
  return pm;
}
loadPage('http://wetxt.ijemy.com/books.txt').then(function(d) {
  console.log(d);
});


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
