const decorator = require('./decorator')
const auth = require('./decorator/auth')

// const getData = require('./decorator/getData')

@decorator.Controller({ prefix: '/' })
class HomeController {

    // 设置允许跨域的域名称
    // ctx.set('Access-Control-Allow-Origin', '*')
    // ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    // ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

    // [View] 首页
    @decorator.Request({ url: '/', method: decorator.RequestMethod.GET })
    async index(ctx) {
        // let a = await getData()
        // ctx.status = 401
        ctx.body = 'hello home'
    }

    // [View] 首页
    @decorator.Request({ url: '/test', method: decorator.RequestMethod.GET })
    @auth()
    async test(ctx) {
        ctx.body = 'test'
    }

}
module.exports = HomeController
