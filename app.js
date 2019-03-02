const Koa = require('koa')
const compress = require('koa-compress')
const session = require('koa-session')
const Router = require('koa-router')

// 缓存
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')

const app = new Koa()
app.use(compress({ threshold: 0 }))
app.use(conditional())
app.use(etag())

app.keys = ['secret']
app.use(session({
  key: 'koa:sess', maxAge: 1000 * 60 * 60 // 1小时
  // maxAge: 3000
}, app))


// .unless 不需要授权登录（header: Authorization）
// 需要授权：['/api']，不需要授权：['/*', '/api/common', '/api/account/login']
const jwtKoa = require('koa-jwt')
app.use(jwtKoa({ secret: 'secret' }).unless({
    path: [/^\/((?!api).)*$|api\/account\/login|api\/common\//]
}))

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

// Routers
const router = new Router()
router.get('/', async (ctx) => {
    ctx.body = 'home'
})
app.use(router.routes())
app.use(router.allowedMethods({
    throw: true, // (Boolean) 抛出错误，而不是设置状态和头文件
    notImplemented: function () {} // (function) 无提示错误的返回值
}))

module.exports = app