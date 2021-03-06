
var express = require('express')
var router = express.Router()
var wechat = require('wechat')
let logger = require('../logger')
var crypto = require('crypto')

var config = {
    token: 'wechatexpress',
    appid: 'wx248231b29d9e7467',
    appsecret: '38dfd17e4f07f77e516bd8f0e40cfb32',
    encodingAESKey: ''
}

let testConfig = {
    token: 'wechatexpress',
    appid: 'wxc56cae5cd04b423a',
    appsecret: 'b8021c3002d35511af1c99f3e591956f',
    encodingAESKey: ''
}

var token = "wechatexpress"; //此处是我们自定义的token，需与准备填写到微信配置上的一致！

router.get('/', function (req, res, next) {
    logger.info(`get wechat api request, headers is ${JSON.stringify(req.headers)}, request query is ${JSON.stringify(req.query)}`)
    var signature = req.query.signature
    var timestamp = req.query.timestamp
    var nonce = req.query.nonce
    var echostr = req.query.echostr

    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "")

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1")
    var code = sha1Code.update(str, 'utf-8').digest("hex");

    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
        res.send(echostr)
    } else {
        res.send("error");
    }
});

router.post('/', function(req, res, next) {
    // 获取参数
    var query = req.body
    logger.console.error("post请求：参数", query)
    res.reply('hello world!')
    res.send('hello , world')
});
router.use(express.query());

module.exports = router;
