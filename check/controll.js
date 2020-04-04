const file=require('fs')
const readdata=file.readFileSync('data.json', 'utf-8')
const pointinpolygan=require('point-in-polygon')

const checkpoint=(point,polygon)=>
{
   if( pointinpolygan(point,polygon))
   {
       return true;
   }
   else
   return false;
}


module.exports=
{
    checkpoint
}