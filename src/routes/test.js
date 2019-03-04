const router = require('koa-router')()

router.prefix('/test')

router.get('/', function (ctx, next) {
  ctx.body = 'this is test!'
})

router.get('/a', function (ctx, next) {
  ctx.body = 'this is test aaaaaaaa!'
})

module.exports = router
