
const express = require(`express`)
const app = express()
const http = require("http")
const server = http.createServer(app)
const ip = "127.0.0.1"
    require("dotenv").config()
const port = process.env.PORT || 5500
    require("express-async-errors")

    app.use(express.json())
    app.use(express.static("./1-project"))

const router = require("./3-routers/tasks")
    app.use("/api/v1/tasks",router)

const notFoundMiddleware = require("./2-middlewares/notFound")
const errorHandlerMiddleWare = require("./2-middlewares/error-handler")
    app.use(notFoundMiddleware)
    app.use(errorHandlerMiddleWare)

const connectDB = require("./5-db/connect")
const startServer = async() => {
    await connectDB(process.env.MONGO_URI)
    server.listen(port,ip,()=>{
        console.log(`Server running on ${ip}:${port}`);
    })
}

    startServer()