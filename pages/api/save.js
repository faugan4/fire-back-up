const fs=require("fs");
var uuid = require('uuid');
const path=require("path");

const save=(req,res)=>{
    const body=req.body;
    const name=uuid.v4();
    const file_path=`./public/${name}.json`;

    
    const dataFilePath = path.join(process.cwd(), "public", `${name}.json`);
    console.log(dataFilePath);
    fs.writeFile(dataFilePath,JSON.stringify({data:body}),(err)=>{
        if(err){
            console.log("there is an error",err);
            res.status(200).json({error:"404",err,current:process.cwd()});
        }else{
            console.log("we are go on the sever",body)
            res.status(200).json({file:`${name}.json`,current:process.cwd(),dataFilePath});
        }
    })
    

}

export default save;