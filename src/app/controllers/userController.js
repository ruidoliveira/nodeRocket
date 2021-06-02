const UserRepository = require('../repository/userRepository');
class UserController {
  async create(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: 'User already exists' });

      const user = await UserRepository.create(req.body);

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Registration Failed' });
    }
  };

  async find(req, res) {
    try {
      return res.status(200).send({ msg: 'achou' })
    } catch (err) {
      return res.status(400).send({ error: 'Registration Failed' });
    }
  };

}

module.exports = new UserController()