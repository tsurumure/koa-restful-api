const router = require('koa-router')()
router.prefix('/api/common')

/**
 * @desc 公共接口
 * @module Common
 */

/**
* @desc 获得首页接口A
* @func GetHomeA
* @param {string} title - 书本的标题.
* @param {string} author - 书本的作者.
* @example /api/GetHomeA
* @inner
* @returns {string} 返回当前的书本名称
*/
router.get('/', function (ctx, next) {
    // ctx.body = false
  ctx.body = { status: 200, msg: 'Common index!' }
})

router.get('/a', function (ctx, next) {
  ctx.body = 'Common index aaaaa!'
})

module.exports = router
