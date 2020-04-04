const winston = require('winston');
const logger=winston.createLogger({
    level:'info',
    transports:[
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log' }),
    //new winston.transports.File({ filename: 'error.log' , level:"error" })
    
    ]
    
})

const log=(message)=>
{
     logger.info(message)
    
    
}




module.exports=
{
    log : log
}
