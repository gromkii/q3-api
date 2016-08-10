const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcrypt'),
  User = require('../models/user'),
  Listing = require('../models/listing'),
  Message = require('../models/message');

/*
Returns a list of all users.
 */

router.route('/users')
  // Get all users.
  .get((req, res) => {
    User
      .fetchAll()
      .then( users => {
        res.json(users.toJSON());
      })
  })
  //Add a new user.
  .post((req, res) => {
    var newUser = req.body;

    new User({
      username:newUser.username,
      password:newUser.password,
      avatar_url:newUser.avatar_url,
      location:newUser.location,
    }).save()
      .then( user => {
        res.json(user.toJSON());
      })
  });

router.route('/users/:user_id')
  // Return a specific user.
  .get((req, res) => {
    User
      .where('id',req.params.user_id)
      .fetch()
      .then( user => {
        res.json(user.toJSON());
      })
  })
  .put((req, res) => {
    User
      .where('id',req.params.user_id)
      .fetch()
      .save({
        avatar_url:newUser.avatar_url,
        location:newUser.location
      }).then( user => {
        res.json(user.toJSON());
      });
  });

  // Delete route
    //Check authentication.

    //If user is admin,
      //Delete user where id = user_id


router.route('/listings')
  //Return all listings.
  .get((req, res) => {
    Listing
      .fetchAll()
      .then( listings => {
        res.json(listings.toJSON());
      })
  })

  //Post new listing.
  .post((req, res) => {
    var newList = req.body;

    new Listing({
      user_id:newList.user_id,
      item_name:newList.item_name,
      item_desc:newList.item_desc,
      price:newList.price,
      img_url:newList.img_url
    }).save()
      .then( listing => {
        res.json(listing.toJSON());
      })
  })

router.route('/listings/:item_id')
  // Get specific liting by id.
  .get((req, res) => {
    Listing
      .where('id', req.params.item_id)
      .fetch()
      .then( listing => {
        res.json(listing.toJSON());
      })
  })

  //Put route to edit.

router.route('/messages')
  .get((req, res) => {
    Message
      .fetchAll()
      .then( messages => {
        res.json(messages.toJSON());
      })
  })
  .post((req, res) => {
    new Message({
      //Object.
    }).save()
      .then( message => {
        res.json(message.toJSON());
      })
  });

router.route('/messages/:message_id')
  //Get message by id.
  .get((req, res) => {
    Message
      .where('id', req.params.message_id)
      .fetch()
      .then( message => {
        res.json(message.toJSON());
      })
  })

  //Put

  //Delete

// --- Auth Routes --- //

router.route('/auth/login')
  .post((req,res) => {
    let login = req.body;

    //Find if username exists.
    User
      .where('username', login.username)
      .fetch()
      .then( user => {
        //If username exists, compare the passwords.
        if (user){
          bcrypt.hashCompare(login.password, user.password, (err, res) => {
            if (res){
              res.send({token:'Have you a token.'});
            } else {
              res.send({error:'Passwords do no match.'});
            }
          });
        } else {
          //If user does not exist, throw error.
          res.send({error:'User does not exist.'});
        }
      })

  })


module.exports = router;
