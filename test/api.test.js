var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    bcrypt  = require('bcrypt'),
    knex    = require('../db/knex'),
    should  = require('should');

describe('API Routes', () => {
  before( done => {
    knex.migrate.latest().then(() => {
      knex.seed.run().then(() => {
        done();
      })
    })
  });

  after( done => {
    knex.migrate.rollback().then(() => {
      done();
    })
  })

  describe('User Routes', () => {
    it('should return list of all users', done => {
      request
        .get('/api/v1/users')
        .expect(200)
        .end((err, res) => {
          var users = res.body;

          expect(users.length).to.equal(3);
          done();
        });
    });

    it('should return the first user', done => {
      request
        .get('/api/v1/users/1')
        .expect(200)
        .end((err, res) => {
          var user = res.body;

          (user).should.have.property('username', 'Dax');
          done();
        });
    });

    it('should add new user', done => {
      var testUser = {
        username:'username',
        password:'testpass',
        avatar_url:'http://image.com',
        location:'Austin, TX'
      }

      request
        .post('/api/v1/users')
        .expect(200)
        .send(testUser)
        .end((err, res) => {
          request
            .get('/api/v1/users/')
            .expect(200)
            .end((err, res) => {
              var users = res.body;
              expect(users.length).to.eq(4);
              (users[3]).should.have.property('username', 'username');
              expect(bcrypt.compareSync('testpass','$2a$04$VfUzPZpcjYmsL2/1M6jLROURca6Y/wXuxv5s3sLbfbQmzjbtKK7wK')).to.eq(true);
              (users[3]).should.have.property('avatar_url', 'http://image.com');
              (users[3]).should.have.property('location', 'Austin, TX');
              done();
            });
        });
    });
  });

  describe('Listing Routes', () => {
    it('should return all listings', done => {
      request
        .get('/api/v1/listings')
        .expect(200)
        .end((err, res) => {
          var listings = res.body;
          expect(listings.length).to.eq(7);
          done();
        });
    });

    it('should return the first listing', done => {
      request
        .get('/api/v1/listings/1')
        .expect(200)
        .end((err, res) => {
          var listing = res.body;

          (listing).should.have.property('user_id', 1);
          (listing).should.have.property('item_name', 'BDG shorts');
          done();
        });
    });

    it('should post new listing', done => {
      var testPost = {
        user_id:2,
        item_name:'Nothing',
        item_desc:'Your favorite thing.',
        price:19.99,
        img_url:'http://stevensegallery.com/200/200'
      }

      request
        .post('/api/v1/listings')
        .expect(200)
        .send(testPost)
        .end((err, res) => {
          request
            .get('/api/v1/listings')
            .expect(200)
            .end((err, res) => {
              var listings = res.body;

              expect(listings.length).to.eq(8);
              (listings[7]).should.have.property('user_id', 2);
              (listings[7]).should.have.property('item_name', 'Nothing');
              done();
            });
        });
    });
  });

  // describe('Message Routes', () => {
  //   it('should return messages user 1 has received', done => {
  //     done();
  //   })
  // });

  describe('Auth Routes', () => {
    it('should login', done => {
      var testUser = {
        username:'Dax',
        password:'test'
      }

      request
        .post('/api/v1/auth/login')
        .send(testUser)
        .expect(200)
        .end((err, res) => {
          (res.body).should.have.property('access_token', 'Have you a token.')
          done();
        })
    })
  })
});
