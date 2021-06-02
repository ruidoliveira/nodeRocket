class ProjectController {
    async findProject(req, res) {
        try {
            const project = await Project.findById(req.params.projectId).populate('user');

            return res.send({ project });
        } catch (err) {
            return res.sendStatus(400).send({ error: 'Error loading project' });
        }
    }

    async findProjectById(req, res) {
        try {
            return res.json({ msg: 'fazer este metodo' });
        } catch (err) {
            return res.sendStatus(400).send({ error: 'Error loading project' });
        }
    }

    async create(req, res) {
        try {
            const { title, description, tasks } = req.body;

            const project = await Project.create({ ...req.body, user: req.userId });

            await Promise.all(tasks.map(task => {
                const projectTask = new Task({ ...task, project: project._id })
                project.tasks.push(projectTask);
            }));

            await project.save();
            return res.send({ project });
        } catch (err) {
            return res.sendStatus(400).send({ error: 'Error creating new project' });
        }
    }

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

module.exports = new ProjectController()