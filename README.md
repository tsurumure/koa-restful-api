# Koa-Restful-API
koa2 + sequelize
文档 JsDoc
单元测试 Mocha + Chai

#### 环境 (Environment)
* NodeJS `v10.13.0`
* MySQL `v8.0.13`
* Koa `v2.6.2`

#### 特点 (Feature)
1. 使用 koa-jwt + jsonwebtoken 登录验证
2. 使用 Sequelize + MySQL ORM框架

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
Listen: [http://localhost:3000](http://localhost:3000)

#### 文档构建 (jsDoc)
```
$ npm run doc
$ npm run doc-server

```
Listen: [http://localhost:3001](http://localhost:3001)

