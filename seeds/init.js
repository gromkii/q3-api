
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users')
          .insert({
            username:'Dax',
            password:'testing',
            avatar_url:'http://fillmurray.com/200/200',
            location:'Austin, TX'
          }),
        knex('users')
          .insert({
            username:'Dax2',
            password:'testing',
            avatar_url:'http://fillmurray.com/200/200',
            location:'Austin, TX'
          }),
        knex('users')
          .insert({
            username:'Dax3',
            password:'testing',
            avatar_url:'http://fillmurray.com/200/200',
            location:'Austin, TX'
          })
      ]);
    }).then(function(){
      return knex('listings').del()
        .then(function(){
          return Promise.all([
            knex('listings')
              .insert({
                user_id:1,
                item_name:'Shirt',
                item_desc:'It\'s a fuckin\' shirt, dude.',
                price:19.99,
                img_url:'http://stevensegallery.com/200/200'
              }),
            knex('listings')
              .insert({
                user_id:1,
                item_name:'Shirt',
                item_desc:'It\'s a fuckin\' shirt, dude.',
                price:19.99,
                img_url:'http://stevensegallery.com/200/200'
              }),
            knex('listings')
              .insert({
                user_id:1,
                item_name:'Shirt',
                item_desc:'It\'s a fuckin\' shirt, dude.',
                price:19.99,
                img_url:'http://stevensegallery.com/200/200'
              })
          ])
        })
    }).then(function(){
      return knex('messages').del()
        .then(function(){
          return Promise.all([
            knex('messages')
              .insert({
                sender_id:1,
                reciever_id:2,
                message_title:'What up.',
                message_body:'What the fuck is good?'
              }),
            knex('messages')
              .insert({
                sender_id:1,
                reciever_id:2,
                message_title:'What up.',
                message_body:'What the fuck is good?'
              }),
            knex('messages')
              .insert({
                sender_id:1,
                reciever_id:2,
                message_title:'What up.',
                message_body:'What the fuck is good?'
              })
          ])
        })
    });
};
