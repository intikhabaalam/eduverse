const errorhandler = (err,req,res,next) =>{
      
    let statusCode = res.statusCode <=200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({

        messagge : err.messagge,
        stack : process.env.NODE_ENV ==="development"? err.stack:null
    })

    next()


}

module.exports = errorhandler