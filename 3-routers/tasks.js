
const express = require("express")
const router = express.Router()
const { getTasks,createTask,deleteAllTasks,getTask,updateTask,deleteTask } = require("../4-controllers/tasks")

    router.route("/").get(getTasks).post(createTask).delete(deleteAllTasks)
    router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router