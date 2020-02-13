
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
let logger = require('../logger')

var config = {
    token: 'wechatexpress',
    appid: 'wx248231b29d9e7467',
    appsecret: '38dfd17e4f07f77e516bd8f0e40cfb32',
    encodingAESKey: ''
};

router.use(express.query());

router.get('/', function (req, res, next) {
    logger.info(`get wechat api request, headers is ${JSON.stringify(req.headers)}`)
    res.send('success')
});

// router.use('/', wechat(config, function (req, res, next) {
//     console.log(req.weixin);
//     logger.info('get request from req')
//     var message = req.weixin;
//     //文本
//     if (message.Content === '1') {
//         res.reply('hello');
//     } else {
//         res.reply('hello world!');
//     }
// }));

module.exports = router;
