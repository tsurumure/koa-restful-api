# Koa-Restful-API
koa2 +

#### 环境 (Environment)
* NodeJS `v10.13.0`
* MySQL `v8.0.13`
* Koa `v2.6.2`

#### 特点 (Feature)
1. 使用 koa-jwt + jsonwebtoken 的登录验证方式，适用于`MVC`, `RestfulAPI` 的项目架构
2. 使用 ES7 装饰器语法 `decorator` 优(zhuāng)雅(bī)地编写路由和控制器
3. 使用 Sequelize + MySQL 的 ORM 框架
4. 使用 Vue-Cli3 的脚手架搭建

#### 中间件 (Middlewares)
* `koa`, `koa-logjs`, `koa-bodyparser`, `koa-compress`
* `koa-conditional-get`, `koa-etag`, `koa-session`, `koa-router`
* `sequelize`, `mysql2`
* `koa-jwt`, `jsonwebtoken`, `svg-captcha`

#### 安装 (Install)
```
$ yarn global add sequelize
```

#### 启动 (Start)
```
$ yarn install
$ yarn global add nodemon
$ npm start
```
[http://localhost:3000](http://localhost:3000)
