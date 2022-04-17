const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Tasks API Service', function () {
    it('should GET all jobs', function (done) {
        chai
            .request('http://localhost:3000')
            .get('/api/jobs')
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.not.be.eql(0);
                done();
            });
    });

    it('should GET a single job', function (done) {
        const expected = [
            {
                id: 1,
                name: "I'm the first job!",
                created_date: '2020-03-24T05:09:49.000Z',
                status: 'completed',
            },
        ];

        chai
            .request('http://localhost:3000')
            .get('/api/jobs/1')
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.not.be.eql(0);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    it.skip('should POST a single job', function (done) {
        const newJob = {
            name: 'New test job!',
        };
        const expected = { message: 'Add task successfully!' };

        chai
            .request('http://localhost:3000')
            .post('/api/tasks')
            .send(newJob)
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });
});
