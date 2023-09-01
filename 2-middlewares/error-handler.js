
const errorHandlerMiddleware = async(err,req,res,next) => {
    console.log(err);
    return res.status(500).json({msg:`Some error occured...Detected by "errorHandlerMiddleWare"`})
}

module.exports = errorHandlerMiddleware