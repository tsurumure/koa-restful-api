const request = require('superagent')
// require('should')
const expect = require('chai').expect

describe('/api/common', () => {
    it ('Get { status: 200 }', (done) => {
        request.get('http://localhost:3000/api/common').end((err, rs) => {
            expect(rs.body)
                .to.be.a('object')
                .to.have.all.keys('status', 'msg')
                .to.have.property('status').and.equal(200)
            done()
        })
    })
})
