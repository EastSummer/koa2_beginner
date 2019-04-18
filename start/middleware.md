
### generator中间件
```
// ./middleware/logger-generator.js
function log( ctx ) {
  console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return function * ( next ) {
    // 执行中间件的操作
    log( this )

    if ( next ) {
      yield next
    }
  }
}
```
* 在koa1中的使用
```
const koa = require('koa')  // koa v1
const loggerGenerator = require('./middleware/logger-generator')
const app = koa()

app.use(loggerGenerator())

app.use(function *( ) {
  this.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```
* 在koa2中的使用
```
const Koa = require('koa') // koa v2
const convert = require('koa-convert')
const loggerGenerator  = require('./middleware/logger-generator')
const app = new Koa()

app.use(convert(loggerGenerator())) // generator 中间件在koa v2中需要用koa-convert封装一下才能使用

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

### async中间件
```
// ./middleware/logger-generator.js
function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next()
  }
}
```
* 只能在koa2中的使用
```
const Koa = require('koa') // koa v2
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```