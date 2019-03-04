const request = require('superagent')
// require('should')
const expect = require('chai').expect
const { URL } = require('../mocha.config.js')

describe('/api/common', () => {
    it ('Get { status: 200 }', (done) => {
        request
            .get(`${URL}/api/common`)
            .end((err, rs) => {
                if (err) return done(err)
                expect(rs.body)
                    .to.be.a('object')
                    .to.have.all.keys('status', 'msg')
                    .to.have.property('status').and.equal(200)
                done()
            })
    })
})
