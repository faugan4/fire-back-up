import { useEffect, useState } from "react";
import styles from "../styles/Import.module.scss";
import firebase  from "firebase";
import { server } from "../config";
import { delBasePath } from "next/dist/shared/lib/router/router";
const Import=()=>{
    
    const [content,set_content]=useState([]);
    

    const import_from_json=async (e)=>{
        
       
        let config=document.querySelector("textarea").value;
        if(config===""){
            alert("You must input your firebase project configuration");
            return;
        }

        config=config.split("=");
        config=config[1];
        config=config.replace("{","");
        config=config.replace("};","");
        config=config.replace("};","");
        
      
        config=config.split("\n");
       
        const config_obj=[];

        //console.log(config);

        for(let i=0; i<config.length; i++){
            let line=config[i];
            line=line.trim();
            if(line!=""){
                
                line=line.split(": ");
                
                let name=line[0];
                name=name.trim();

                let value=line[1];
                value=value.replace('\"',"");
                value=value.replace('",',"");
                value=value.replace('"',"");
                //console.log(value);
                config_obj[name]=value;
            }
            
        }
        const res=Object.assign({},config_obj);
        
        let app=firebase.initializeApp(res);
        const db=app.firestore();
        
        console.log("configuration done");

        if(content.length===0){
            alert("No JSON file is attached");
            return;
        }

        content.map(async(line)=>{
            const {id,collection,data}=line;
            
            console.log("tour de ",id);
            await db.collection(collection).doc(id).set(data);
        })


    }

    

    const get_data=(e)=>{
        var reader = new FileReader();

        reader.onload = function(e) {
          var jsonObj = JSON.parse(e.target.result);
          set_content(jsonObj.data);
        }
      
        reader.readAsText(e.target.files[0]);
    }
    return(
        <div className={styles.container}>

             <div className={styles.line}>
                <label>Input your firebase configurations object</label>
                <textarea rows={8} cols={55}></textarea>
            </div>

            <div className={styles.line}>
                <label>Select a JSON file of your exported collection</label>
                <input type="file" accept="application/json" onChange={get_data}/>
            </div>

            <div className={styles.line}>
                <button onClick={import_from_json}>Import Now</button>
            </div>
        </div>
    );
}

export default Import;