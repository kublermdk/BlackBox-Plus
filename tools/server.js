//载入express
import express from 'express';
import path from 'path';
var colors = require('colors');
const app = express();

//设置静态文件地址
app.use(express.static(path.resolve(__dirname, '../')));
//监听端口
app.listen(3000);

//页面路径
let views = path.resolve(__dirname, '../src/html');


//默认访问
app.get('/', (req, res) => {

    res.sendfile(views + '/index.html');

})
