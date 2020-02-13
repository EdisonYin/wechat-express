
var express = require('express');
var router = express.Router();
var wechat = require('wechat');

var config = {
    token: 'wxexpress',
    appid: 'wx2e8f977800a3c2b8',
    appsecret: 'c99b4dde849ae0ae58e2026ce5f28f1a',
    encodingAESKey: ''
};

router.use(express.query());

router.use('/', wechat(config, function (req, res, next) {
    console.log(req.weixin);
    var message = req.weixin;
    //文本
    if (message.Content === '1') {
        res.reply('hello');
    }

}));

module.exports = router;
