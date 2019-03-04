const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const debug = require('debug')('demo:server')
// JsDoc
// https://www.html.cn/doc/jsdoc/tags-example.html
const app = new Koa()
app.use(static( path.join(__dirname + '/docs/dist') ))

module.exports = app

// const serverDocs = require('http').createServer(app.callback())
// serverDocs.listen(3001)
// serverDocs.on('listening', onListening)

// function onListening() {
//   var addr = serverDocs.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }
