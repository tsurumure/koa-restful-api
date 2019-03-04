require("babel-register")

const Koa = require('koa')
const path = require('path')
const app = new Koa()

// Logs
const { log, accessLogger } = require('./logs/config')
app.use(accessLogger())
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  // log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

require('koa-validate')(app)

const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const compress = require('koa-compress')
app.use(bodyParser())
app.use(static( path.join(__dirname + '/static') ))
app.use(compress({ threshold: 0 }))

// Cache
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
app.use(conditional())
app.use(etag())

const session = require('koa-session')
app.keys = ['secret']
app.use(session({
  key: 'koa:sess', maxAge: 1000 * 60 * 60 // 1小时
  // maxAge: 3000
}, app))

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
})

// socket.io
// const server = require('http').createServer(app.callback())
// const io = require('socket.io')(server)
// io.on('connection', (socket) => {

//     let user = '游客' + socket.id.substring(0, 6)
//     io.local.emit('user conncet', user + '进入聊天室')

//     socket.on('send', data => {
//         console.log('客户端发送的内容：', data)
//         socket.emit('getMsg', data)
//         socket.broadcast.emit('getMsg', data)
//     })

// })
// server.listen(3001)



// .unless 不需要授权登录（header: Authorization）
// 需要授权：['/api']，不需要授权：['/*', '/api/common', '/api/account/login']
const jwtKoa = require('koa-jwt')
app.use(jwtKoa({ secret: 'secret' }).unless({
    path: [/^\/((?!api).)*$|\/api\/account\/login|\/api\/common/]
}))


// 路由
const Boom = require('boom') // https://github.com/hapijs/boom
const routers = require('./src/router')
routers.forEach(router => {
    app.use(router.routes())
    app.use(router.allowedMethods({
        throw: true,
        notImplemented: () => Boom.notImplemented(),
        methodNotAllowed: () => Boom.methodNotAllowed()
    }))
})



// const docs = require('koa-docs')
// app.use(docs.get('/docs', {
//    title: 'Pet Store API',
//    version: '1.0.0',
//    theme: 'paper',
//    routeHandlers: 'disabled',
//    groups: [
//       { groupName: 'Pets', routes: [/*  ... route specs ...  */] },
//    ]
// }))

// 创建用户
// const now = new Date()
// const models = require(__dirname + '/app/sequelize/models')
// models.Users.create({
//   username: 'bbb', password: '123456',
//   createdAt: now, updatedAt: now
// })




module.exports = app
