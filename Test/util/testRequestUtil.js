let requestUtil = require('../../util/requestUtil')

async function test() {
    let result = await requestUtil.getJson('https://api.weixin.qq.com/cgi-bin/token', {
        grant_type: "client_credential",
        appid: "wxc56cae5cd04b423a",
        secret: "b8021c3002d35511af1c99f3e591956f"
    })
    let requestData = {
        "button": [
            {
                "type": "click",
                "name": "今日歌曲",
                "key": "V1001_TODAY_MUSIC"
            },
            {
                "name": "菜单",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "搜索",
                        "url": "http://www.soso.com/"
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD"
                    }]
            }],
        "matchrule": {
            "tag_id": "2",
            "sex": "1",
            "country": "中国",
            "province": "广东",
            "city": "广州",
            "client_platform_type": "2",
            "language": "zh_CN"
        }
    }
    console.log(typeof result)
    console.log('access_token', result['access_token'])
    let menuresult = await requestUtil.postJson('https://api.weixin.qq.com/cgi-bin/menu/create', { access_token: result.access_token }, { ...requestData })
    console.log(menuresult)
}
test()