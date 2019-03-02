const session = require('koa-session')
const jwt = require('jsonwebtoken')

module.exports = () => {
    return function (target, key, descriptor) {
        let fn = descriptor.value
        descriptor.value = async (ctx) => {
            const token = ctx.session.token
            if (token) {
                jwt.verify(token, 'secret', function(err, decoded) {
                    if (err) {
                        ctx.body = { status: 10401, msg: 'token 已过期' }
                    }
                    if (decoded) { fn(ctx) }
                })
            } else {
                ctx.status = 401
                ctx.body = { status: 401, msg: '未登录' }
                // ctx.render('front/layout/error', { ctx, status: 401, msg: '未登录' })
            }
        }
    }
}

