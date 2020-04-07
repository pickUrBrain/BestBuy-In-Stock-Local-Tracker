# @flet/xml-nodes

[![Build Status](https://img.shields.io/travis/timhudson/xml-nodes.svg?style=flat-square)](https://travis-ci.org/timhudson/xml-nodes)

[![NPM](https://nodei.co/npm/@flet/xml-nodes.png?downloads=true&downloadRank=true)](https://nodei.co/npm/xml-nodes/)

Streaming XML node splitter

Have a large XML file and only interesting in one type of tag? `xml-nodes` accepts a tag name and returns a stream which emits each tag as a string.

## NOTE: This package is meant to be a placeholder until [this bugfix PR](https://github.com/timhudson/xml-nodes/pull/5) gets merged!

## Install

With [npm](https://npmjs.org/) do:

```
npm install @flet/xml-nodes
```


## Example

```javascript
var request = require('request')
var xmlNodes = require('xml-nodes')

request('http://news.yahoo.com/rss/entertainment')
  .pipe(xmlNodes('item'))
  .pipe(process.stdout)
```

## License

MIT
