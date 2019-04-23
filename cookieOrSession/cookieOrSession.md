### koa2使用cookie
1. koa提供了从上下文直接读取、写入cookie的方法
    * ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
    * ctx.cookies.set(name, value, [options]) 在上下文中写入cookie
> koa2 中操作的cookies是使用了npm的[cookies模块](https://github.com/pillarjs/cookies)，所以在读写cookie的使用参数与该模块的使用一致
2. 运行Demo
    ```
    cd cookieOrSession
    node cookie.js
    ```
### koa2实现session
1. koa2原生功能只提供了cookie的操作，但是没有提供session操作。session就只用自己实现或者通过第三方中间件实现。在koa2中实现session的方案有一下几种
    * 如果session数据量很小，可以直接存在内存中
    * 如果session数据量很大，则需要存储介质存放session数据
2. 数据库存储方案
    * 将session存放在MySQL数据库中
    * 需要用到中间件
        * ```koa-session-minimal```适用于koa2的session中间件，提供存储介质的读写接口
        * ```koa-mysql-session```为koa-session-minimal中间件提供MySQL数据库的session数据读写操作
        * 将sessionId和对于的数据存到数据库
    * 将数据库的存储的sessionId存到页面的cookie中
    * 根据cookie的sessionId去获取对于的session信息
3. 运行Demo
    ```
    cd cookieOrSession
    node session.js
    ```