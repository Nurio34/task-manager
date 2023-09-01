
const tasks = require("../6-models/tasks")
const Tasks = require("../6-models/tasks")

const getTasks = async(req,res)=>{
    try {
        const tasks = await Tasks.find({})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createTask = async(req,res)=>{
    try {
        const task = await Tasks.create(req.body)
        console.log(req.body);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAllTasks = async(req,res) =>{
    const tasks = await Tasks.deleteMany()
    res.status(200).json(tasks)
}

const getTask = async(req,res)=>{
    try {
        const task = req.params.id
        const obj = {}
            obj.task = { $regex: task, $options:"i"}

        const x = await Tasks.find(obj)
            res.status(200).json(x)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateTask = async(req,res)=>{
    try {
        const product = await Tasks.findOneAndUpdate({_id:req.params.id}, req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTask = async(req,res)=>{
    try {
        const product = await Tasks.findOneAndDelete({_id:req.params.id})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = { getTasks,createTask,deleteAllTasks, getTask,updateTask,deleteTask}