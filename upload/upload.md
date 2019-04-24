### 实现上传的中间件
1. [koa-body](https://www.npmjs.com/package/koa-body)
1. [busboy](https://www.npmjs.com/package/busboy)
1. [koa-multer](https://www.npmjs.com/package/koa-multer)

### busboy
1. 使用示例
    ```
    const inspect = require('util').inspect 
    const path = require('path')
    const fs = require('fs')
    const Busboy = require('busboy')

    // req 为node原生请求
    const busboy = new Busboy({ headers: req.headers })

    // ...

    // 监听文件解析事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log(`File [${fieldname}]: filename: ${filename}`)

        // 文件保存到特定路径
        file.pipe(fs.createWriteStream('./upload'))

        // 开始解析文件流
        file.on('data', function(data) {
            console.log(`File [${fieldname}] got ${data.length} bytes`)
        })

        // 解析文件结束
        file.on('end', function() {
            console.log(`File [${fieldname}] Finished`)
        })
    })

    // 监听请求中的字段
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log(`Field [${fieldname}]: value: ${inspect(val)}`)
    })

    // 监听结束事件
    busboy.on('finish', function() {
        console.log('Done parsing form!')
        res.writeHead(303, { Connection: 'close', Location: '/' })
        res.end()
    })
    req.pipe(busboy)
    ```
2. 上传文件简单实现
3. 异步上传图片实现

### koa-body
* 文件上传代码实现
    1. **在koa项目中引用koa-body中间件**
        ```
        const koaBody = require('koa-body');
        app.use(koaBody({
            multipart: true,
            formidable: {
                maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
            }
        }));    
        ```
    2. **获取到文件之后，通过fs将文件保存到服务器的指定目录**
        ```
        // 上传单个文件
        router.post('/uploadfile', async (ctx, next) => {
            const file = ctx.request.files.file; // 获取上传文件
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            return ctx.body = "上传成功！";
        });

        // 上传多个文件
        router.post('/uploadfiles', async (ctx, next) => {
            const files = ctx.request.files.file; // 获取上传文件
            for (let file of files) {
                // 创建可读流
                const reader = fs.createReadStream(file.path);
                // 获取上传文件扩展名
                let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
                // 创建可写流
                const upStream = fs.createWriteStream(filePath);
                // 可读流通过管道写入可写流
                reader.pipe(upStream);
            }
            return ctx.body = "上传成功！";
        });
        ```
    3. **前端代码**
        ```
        <form action="http://localhost:8080/api/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file" id="file" value="" multiple="multiple" />
            <input type="submit" value="提交"/>
        </form>
        ```
   
* [文件上传下载Demo-github](https://github.com/lin-xin/blog/issues/25)