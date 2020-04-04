const express=require('express')
const app = express()
const port = process.env.PORT ||3000
const logger=require('./logger/logger')
const controll=require('./check/controll')
const file=require('fs')
const readdata=file.readFileSync('data.json', 'utf-8')
const data=JSON.parse(readdata)
const added=require('./check/add')
const validation=require('geojson-validation')



app.get('/',(req,res)=>{

    res.send("WELCOM ")

});
app.use('/', function (req, res, next) 
{
    console.log('Request Type:', req.method)
    console.log('MIDDLEWARE')
    next()
});


app.get('/gis/testpoint', (req, res)=> 
{
   
    const point =[req.query.lat, req.query.long]
    logger.log('get request ')
    const answer={} 
     
    data.features.forEach(element => 
    {
        if(controll.checkpoint(point,element))
        {
           
            logger.log('finding point')
            logger.log(element.properties.name)
            answer.push(element.properties.name)
        } 
      
       
        
    });
    
       logger.log('error : the point is not in polygon ')  
    res.status(200).send(answer)
});

app.put('/gis/addpolygon', express.json(),(req, res) => 
{

    logger.log('put request');
    const polygon=req.body
    if (!validation.isFeature(polygon) || !validation.isPolygon(polygon.geometry)) 
    {
		logger.log("Error: not a valid polygon.");
		
	}
    added.addpoly(polygon)
    logger.log('success and add polygon in database')
    res.status(200).send(JSON.stringify(data,null));
    
    
  
});








app.listen(port, () => console.log(` listening on port ${port}!`))