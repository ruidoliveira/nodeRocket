const userSchema = require('../models/user');

class UserRepository {
  async create(body) {
    return await userSchema.create(body)
  }

}

module.exports = new UserRepository();