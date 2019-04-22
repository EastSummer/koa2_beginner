### GET请求数据获取
1. 使用方法
在koa中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，query返回是格式化好的参数对象，querystring返回的是请求字符串，由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径。
    * 从上下文中直接获取
        * 请求对象ctx.query，返回如 { a:1, b:2 }
        * 请求字符串 ctx.querystring，返回如 a=1&b=2
    * 从上下文的request对象中获取
        * 请求对象ctx.request.query，返回如 { a:1, b:2 }
        * 请求字符串 ctx.request.querystring，返回如 a=1&b=2
2. 运行Demo
    ```  
    cd request
    node get.js
    ```

### POST请求参数获取
1. 原理  
    对于POST请求的处理，koa2没有封装获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req，将POST表单数据解析成query string（例如：a=1&b=2&c=3），再将query string 解析成JSON格式（例如：{"a":"1", "b":"2", "c":"3"}）
    > 注意：ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象，同理ctx.response是context经过封装的响应对象，ctx.res是context提供的node.js原生HTTP请求对象。  
    [具体的 Koa2 API文档](https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxreq)
2. 运行Demo
    ```  
    cd request
    node post.js
    ```

### [koa-body中间件](https://github.com/dlau/koa-body)
    运行Demo
    ```  
    cd request
    node post-middleware.js
    ```

### [koa-bodyparser中间件](https://github.com/koajs/bodyparser)
    上面Demo里中间件替换掉即可

### chrome插件
[**【Github】** json格式化插件(json-formatter)](https://github.com/callumlocke/json-formatter)