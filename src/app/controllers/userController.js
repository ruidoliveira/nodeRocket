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
      if (await User.findOne({ email }))
      return res.status(200).send({ msg: 'achou' })
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

  async delete(req, res) {
    try {
        await Project.findByIdAndRemove(req.params.projectId);
        return res.status(204);
    } catch (err) {
        return res.sendStatus(400).send({ error: 'Error deleting project' });
    }
}

async update(req, res) {
  try {
      const { title, description, tasks } = req.body;

      const project = await Project.findByIdAndUpdate(req.params.projectId, {
          title,
          description,
          tasks
      }, { new: true });

      project.tasks = [];
      await Task.remove({ project: project._id });

      await Promise.all(task.map(async task => {

          const projectTask = new Task({ ...task, project: project._id });

          await projectTask.save();

          project.tasks.push(projectTask);

      }));

      return res.send({ project });
  } catch (err) {
      return res.sendStatus(400).send({ error: 'Error loading project' });
  }
};

}

module.exports = new UserController()