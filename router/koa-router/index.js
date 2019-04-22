const Koa = require('koa')
const router = require('./routers/index')

const app = new Koa()

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})

