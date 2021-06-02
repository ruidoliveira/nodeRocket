const express = require('express')
const authMiddleware = require('../middlewares/auth')

const Project = require("../models/project");
const Task = require("../models/task");

const router = express.Router();
router.use(authMiddleware);

async findProject(req, res){
    try{
        const project = await Project.findById(req.params.projectId).populate('user');
        
        return res.send({project});
     }catch(err){
         return res.sendStatus(400).send({error: 'Error loading project'});
     }
 };
};

router.get('/:projectId', async (req, res)=>{
    res.send({user: req.userId});
});

async newProject(req, res){
    try{
        const {title, description, tasks} = req.body;

       const project = await Project.create(...req.body, user: req.userId);
       
       await Promise.all(tasks.map(task =>{
        const projectTask = new Task({...task, project: project._id})
        
        await projectTask.save();

        project.tasks.push(projectTask);
       }));

        await project.save();
       return res.send({project});
    }catch(err){
        return res.sendStatus(400).send({error: 'Error creating new project'});
    }
});

async loadingProject(req, res){
    try{
        const{title, description, tasks} = req.body;
        
        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            description
        }, {new: true});

        project.tasks = [];
        await Task.remove({project: project._id});
        
        await Promise.all(task.map(async task => {
        
        const projectTask = new Task ({...task, project: project._id});
        
        await projectTask.save();

        project.tasks.push(projectTask);

        }));    


        return res.send({project});
     }catch(err){
         return res.sendStatus(400).send({error: 'Error loading project'});
     }
};

async deleteProjeto(req, res){
    try{
        await Project.findByIdAndRemove(req.params.projectId);
        
        return res.send();
     }catch(err){
         return res.sendStatus(400).send({error: 'Error deleting project'});
     }
 };


module.exports = app => app.use('/projects', router);