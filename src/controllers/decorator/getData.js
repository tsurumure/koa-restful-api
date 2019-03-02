// test
const superagent = require('superagent')
module.exports = () => {
    return new Promise((resolve, reject) => {
        superagent.get('https://www.zdzp.cn/Config/Area.xml').end((err, rs) => {
            resolve(rs.text)
        })
    })
}
