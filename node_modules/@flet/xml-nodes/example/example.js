var request = require('request')
var xmlNodes = require('../index.js')

request('http://news.yahoo.com/rss/entertainment')
  .pipe(xmlNodes('item'))
  .pipe(process.stdout)
