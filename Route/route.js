const express = require("express")
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require("../middleware/multerMiddleWare")

// register

router.post('/register',userController.register)

// login
router.post('/login',userController.login)

// add-project
// router specific middleware
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

//getHomeProjects
router.get('/home-project',projectController.getHomeProjects)

//getallProjects
router.get('/all-project',jwtMiddleware,projectController.getAllProjects)

//getuserProjects
router.get('/user-project',jwtMiddleware,projectController.getUserProjects)

//updateProject
router.put('/projects/:pid/update',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProjects)

//deleteProject
router.delete('/projects/:pid/delete',jwtMiddleware,projectController.deleteProjects)

module.exports=router