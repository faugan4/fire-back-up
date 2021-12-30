const fs=require("fs");
var uuid = require('uuid');
const save=(req,res)=>{
    const body=req.body;
    const name=uuid.v4();
    fs.writeFile(`./public/${name}.json`,JSON.stringify({data:body}),(err)=>{
        if(err){
            console.log("there is an error",err);
            res.status(200).json({error:"404",err});
        }else{
            console.log("we are go on the sever",body)
            res.status(200).json({file:`${name}.json`});
        }
    })
    

}

export default save;