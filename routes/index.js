//import express
const express = require('express')

//init express router
const router = express.Router();

const verifyToken = require('../middlewares/auth');

//import register controller
const AuthController = require('../controllers/AuthController');

const projectController = require('../controllers/ProjectController');

const taskController = require('../controllers/TaskController');

const userController = require('../controllers/UserController');

//import validate register
const { validateRegister, validateLogin } = require('../utils/validators/auth');

const { validateProject } = require('../utils/validators/project');

const { validateTask } = require('../utils/validators/task');

const upload = require('../utils/validators/image');

//define route for register
router.post('/register', validateRegister, AuthController.register);

router.post('/login', validateLogin, AuthController.login);

router.get('/user', verifyToken, userController.getUsers);

router.put('/user/:id', verifyToken, upload.single("photo"), userController.updateUsers);

router.delete('/user/:id', verifyToken, userController.deleteUsers);

router.get('/user/projects', verifyToken, projectController.getProjects);

router.get('/user/projects/:id', verifyToken, projectController.getProjectsById);

router.post('/user/projects', verifyToken, validateProject, projectController.createProjects);

router.put('/user/projects/:id', verifyToken, validateProject, projectController.updateProjects);

router.delete('/user/projects/:id', verifyToken, projectController.deleteProjects);

router.get('/user/tasks', verifyToken, taskController.getTasks);

router.get('/user/tasks/:id', verifyToken, taskController.getTasksById);

router.post('/user/tasks', verifyToken, validateTask, taskController.createTasks);

router.put('/user/tasks/:id', verifyToken, validateTask, taskController.updateTasks);

router.delete('/user/tasks/:id', verifyToken, taskController.deleteTasks);

//export router
module.exports = router