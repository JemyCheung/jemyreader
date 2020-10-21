const should = require('should');
var tools = require('./tools.js');

describe('test tools', function() {

  it('test dealwithTxt', function(done) {
    tools.dealwithTxt();
    done();
  });

  it('test searchBooks', function(done) {
    var bookname = '就这么简单';
    tools.searchBooks(bookname, (url) => {
      console.log(url);
    });
    done();
  });
});
