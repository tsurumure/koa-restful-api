const router = require('koa-router')()

/**
 * @desc 获得首页接口
 * @module GetHome
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
  ctx.body = 'index!'
})


/**
* @desc 获得首页接口B
* @func GetHomeB
* @param {string} title - 书本的标题.
* @default 1
* @example /api/GetHomeA
* @returns {string|*} 返回当前的书本名称
*/
router.get('/a', function (ctx, next) {
  ctx.body = 'index aaaaaa!'
})

module.exports = router
