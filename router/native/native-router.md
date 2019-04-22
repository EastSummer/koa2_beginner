### 运行demo

```
cd router\native
node -harmony index.js
```

### 题外话--关于node的[ES6功能](https://nodejs.org/en/docs/es6/)

对于es6的功能分成了3个部分:```shipping```，```staged``` 和 ```in progress```。
* shipping功能: 这些功能是已经稳定的。已经写入了node.js中的，直接就可以使用
* staged功能: 此功能是几乎完成的功能，但是v8团队没有考虑稳定性，需要使用```--harmony```
* in progress功能: 此功能是需要写出标签的，比如```--harmony_destructuring```。你可以通过下面的命令查看
    ```
    node --v8-options | grep 'in progress'
    ```
