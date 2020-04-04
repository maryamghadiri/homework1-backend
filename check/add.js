const file = require("fs");
const logger = require('./../logger/logger')
const readdata=file.readFileSync('data.json', 'utf-8')
const data=JSON.parse(readdata)

const getpoly=()=>
{
    return data.features;

};

const addpoly=(polygon)=>
{
    data.features.push(polygon)
    file.writeFileSync("data.json",JSON.stringify(data),'utf8','/n',function(err){
        if(err)
        {
            logger.log('error: not add polygon')
            return;
        }
    });
    logger.log('add polygon in data.json');
}

module.exports=
{
    getpoly,addpoly
}
