const should = require('should');
var tools = require('./public/tools.js');

describe('test tools', function() {

//TXT,azw3,mobi,txt,Txt,epub,pdf
  it('test dealwithTxt', function(done) {
    tools.dealwithTxt('.pdf');
    done();
  });

  it('test searchBooks', function(done) {
    var bookname = '就这么简单';
    tools.searchBooks(bookname, (url) => {
      console.log(url);
    });
    done();
  });

  it('test downloadTxt', function(done) {
    tools.downloadTxt();
    done();
  });

  it('test deleteNoUse', function(done) {
    tools.deleteNoUse();
    done();
  });
});
