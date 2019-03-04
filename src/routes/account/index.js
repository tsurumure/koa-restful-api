const router = require('koa-router')()
router.prefix('/api/account')

const jwt = require('jsonwebtoken')
const Models = require('../../sequelize/models')

/**
 * @desc 账户
 * @module Account
 */

/**
* @desc 登录
* @func [Post] Login
* @param {string} username - 用户名
* @param {string} password - 密码
* @param {string} captcha - 验证码
* @example (post) /api/account/login
* @inner
* @returns {object} { status, msg }
*/
router.post('/login', async function (ctx, next) {

    const username = ctx.checkBody('username').notEmpty().value // .toInt()
    const password = ctx.checkBody('password').notEmpty().value
    // const captcha = ctx.checkBody('captcha').notEmpty().value

    // [Validate] Form
        if (!ctx.errors) {
            // [Validate] Captcha
            // if (ctx.session.captcha_text == captcha.toLowerCase()) {
                const query = await Models.users.findOne({
                    where: { username, password }
                })
                // [Validate] username, password
                if (query) {
                    console.log(`${query.id}, ${query.username}`)
                    const token = jwt.sign({ id: 1 }, 'secret',
                    {
                        // expiresIn: 3000 + 'ms'
                        expiresIn: 1000 * 60 * 60 + 'ms'
                    })
                    ctx.session.token = token
                    ctx.body = { status: 200, token }
                } else {
                    ctx.body = { status: 10201, msg: '用户名或密码错误' }
                }
            // } else {
            //     ctx.body = { status: 10202, msg: '验证码错误' }
            // }
        } else {
            ctx.body = { status: 10203, data: ctx.errors }
        }
})

module.exports = router
