'use strict';

const app = 'https://dry-fortress-35321.herokuapp.com/reviews';
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('API testing Automated', function(){

    let review = {
                "textReview":"from QA automated gentur nice",
                "gambar": "mantap.jpg",
                "jmlBintang":"5",
                "user":"ariyadi",
                "waktu":"11 desember 18"
            }
    let id

    describe('## create review', ()=>{
        it('should create a review', (done) => {
            request(app)
              .post('/create')
              .send(review)
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.equal('Reviews Created successfully');
                // review = res.body;
                done();
              });
          });
    })

    describe('## get a review', ()=>{
        id = '5d989407bec46400164396a9'
        it('should get a review', (done) => {
            request(app)
              .get('/'+id)
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('textReview')
                expect(res.body).to.have.property('gambar')
                expect(res.body).to.have.property('jmlBintang')
                expect(res.body).to.have.property('user')
                expect(res.body).to.have.property('waktu')
                done();
              });
          });
    })

    describe('Update a review by id', function() {
        it('should modify a review', function(done) {
         review.textReview = 'update testing QA gentur'
         review.gambar = 'gambar.jpg'
         review.jmlBintang = '5'
         review.user = 'gentur'
         review.waktu = '11 oktober 19'
         id = '5d989407bec46400164396a9'
          request(app)
            .put('/'+id +'/update')
            .send(review)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.equal("Reviews udpated.");
              done();
            });
        });
      });

    describe('Delete a review by id', function() {
        id = '5d98733afb7b9a0016c4bf76' 
        it('should delete a review', function(done) {
          request(app)
            .delete('/' + id + '/delete')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.equal('Deleted successfully!');
              done();
            });
        });
      });

    describe('# Get all reviews', function() {
        it('should get all tasks', function(done) {
          request(app)
            .get('/getall')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('array');
              expect(res.body)
                    .to.have.deep.nested.property('[1]', {
                          "__v": 0,
                          "_id": "5d98736efb7b9a0016c4bf77",
                          "gambar": "mantap.jpg",
                          "jmlBintang": 5,
                          "textReview": "gilee",
                          "user": "ariyadi",
                          "waktu": "11 desember 18",
                        });
              done();
            });
        });
      });

});