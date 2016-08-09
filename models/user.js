var bookshelf = require('../db/bookshelf');

require('./listing');
require('./message');

var User = bookshelf.Model.extend({
  tableName:'users',
  listing: function(){
    return this.hasMany('Listing');
  },
  message: function(){
    return this.hasMany('Message')
  }
});

module.exports = bookshelf.model('User', User);
