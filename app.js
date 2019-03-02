require("babel-register")

const Koa = require('koa')
const path = require('path')
const app = new Koa()

const middleware = require('./src/middleware')
require('koa-validate')(app)


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

app.use(middleware.bodyParser())
app.use(middleware.serve( path.join(__dirname + '/static') ))
app.use(middleware.compress({ threshold: 0 }))
app.use(middleware.conditional())
app.use(middleware.etag())
app.use(middleware.handler)

app.keys = ['secret']
app.use(middleware.session({
  key: 'koa:sess', maxAge: 1000 * 60 * 60 // 1小时
  // maxAge: 3000
}, app))


// .unless 不需要授权登录（header: Authorization）
// 需要授权：['/api']，不需要授权：['/*', '/api/common', '/api/account/login']
const jwtKoa = require('koa-jwt')
app.use(jwtKoa({ secret: 'secret' }).unless({
    path: [/^\/((?!api).)*$|api\/account\/login|api\/common\//]
}))

// 遍历控制器 Controllers
const Boom = require('boom') // https://github.com/hapijs/boom
const ctls = require('./src/controllers')
ctls.forEach(router => {
    app.use(router.routes())
    app.use(router.allowedMethods({
        throw: true,
        notImplemented: () => Boom.notImplemented(),
        methodNotAllowed: () => Boom.methodNotAllowed()
    }))
})


// 创建用户
// const now = new Date()
// const models = require(__dirname + '/app/sequelize/models')
// models.Users.create({
//   username: 'bbb', password: '123456',
//   createdAt: now, updatedAt: now
// })

module.exports = app


// 反向代理
// var httpProxy = require('http-proxy')
// httpProxy.createServer({
//   target:''
// }).listen(8081)


