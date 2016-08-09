var bookshelf = require('../db/bookshelf');

require('./user');

var Message = bookshelf.Model.extend({
  tableName:'messages',
  user:function(){
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('Message', Message);
