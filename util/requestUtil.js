let request = require('request')
let logger = require('../logger')

async function getJson(url, query, headers) {
    let queryUrl = getQueryStr(url, query)
    logger.info(`start get Json url is ${queryUrl}`)
    let options = {
        url: queryUrl,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            logger.info(typeof body)
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(error)
            }
        })
    })
}

async function postJson(url, query, requestData, headers) {
    let queryUrl = getQueryStr(url, query)
    logger.info(`start post Json url is ${queryUrl} requestData is ${JSON.stringify(requestData)}`)
    return new Promise((resolve, reject) => {
        request({
            url: queryUrl,
            method: "POST",
            headers,
            body: JSON.stringify(requestData)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                reject(error)
            }
        })
    })
}

function getQueryStr(url, query) {
    const queryStr = Object.keys(query)
        .reduce((ary, key) => {
            if (query[key]) {
                ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
            }
            return ary
        }, [])
        .join('&')
    url += `?${queryStr}`
    return url
}

module.exports = {
    getJson,
    postJson
}
