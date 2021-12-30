const fs=require("fs");
var path = require('path');

var uuid = require('uuid');
const save=(req,res)=>{
    const body=req.body;
    const name=uuid.v4();
    let chemin=path.join(__dirname,"../../public/"+name+"/json");
    
    fs.writeFile(chemin,JSON.stringify({data:body}),(err)=>{
        if(err){
            console.log("there is an error",err);
            res.status(200).json({error:"404",err,chemin});
        }else{
            console.log("we are go on the sever",body)
            res.status(200).json({file:`${name}.json`});
        }
    })
    

}

export default save;