const userSchema = require('../models/user');

class UserRepository {
  async create(body) {
    return await userSchema.create(body);
  }

  async findOne({email}){
    return await userSchema.findOne({email});
  }



}

module.exports = new UserRepository();