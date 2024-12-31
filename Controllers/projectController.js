const projects = require('../Model/projectSchema')

//addProjects
exports.addProjects=async(req,res)=>{
    console.log("inside add project");
    const{title,languages,overview,github,website}=req.body
    const projectImage = req.file.filename
    const userId = req.payload

    //console.log(title,languages,overview,github,website,projectImage,userId);
    
    try{
        const existingProject = await projects.findOne({github})

        if(existingProject){
            res.status(406).json("Project already exists")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}

// getHomeProjects
exports.getHomeProjects=async(req,res)=>{
    console.log("Inside home projects function");
    
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//getAllProjects
exports.getAllProjects=async(req,res)=>{
    console.log("Inside all projects function");
    const searchKey=req.query.search
    const query={
        languages:{$regex:searchKey,$options:"i"}
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//getuserProjects
exports.getUserProjects=async(req,res)=>{
    console.log("Inside Userprojects function");
    const userId=req.payload
    
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// editProjects
exports.editProjects=async(req,res)=>{
    const{title,languages,overview,github,website,projectImage}=req.body
    const uploadImage = req.file?req.file.filename:projectImage
    const userId = req.payload
    const {pid}  =req.params

    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,languages,overview,github,website,projectImage:uploadImage,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.deleteProjects=async(req,res)=>{
    console.log("Inside delet project function");
    const {pid}=req.params

    try{
        const deleteProject = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteProject)
    }catch(err){
        res.status(401).json(err)
    }
}