import styles from "../styles/Export.module.scss";
import firebase from "firebase";
import "firebase/firestore";
import {server} from "../config";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Export=()=>{

    const router=useRouter();

    const [file,set_file]=useState("");

    const export_collection=(e)=>{
        let config=document.querySelector("textarea").value;
        let collections=document.querySelector("input").value;

        if(config===""){
            alert("You must input your firebase project configuration");
            return;
        }

        if(collections===""){
            alert("You must input at least one collection name");
            return;
        }

        config=config.split("=");
        config=config[1];
        config=config.replace("{","");
        config=config.replace("};","");
        config=config.replace("};","");
        
      
        config=config.split("\n");
       
        const config_obj=[];

        console.log(config);

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

        collections=collections.split(",");
        console.log(collections);


        const lines=[];

        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Please wait...";

        collections.map(async (collection,i)=>{
            const snap=await db.collection(collection).get();
            snap.docs.map((doc)=>{
                const id=doc.id;
                const data=doc.data();
                const line={collection,id,data};
                lines.push(line);
            })

            if(i==collections.length-1){
                
                fetch(`${server}/api/save`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(lines)
                }).then((res)=>{
                    return res.json();
                })
                .then((res)=>{
                    const f=res.file;
                    console.log("the res is ",res)
                    set_file(f);
                    btn.disabled=false;
                    btn.innerHTML="Export Now";
                    btn.style.display="none";
                })
                .catch((err)=>{
                    console.log("there is an error",err)
                    
                })
            }
        })
        

    }

    
    return(
        <div className={styles.container}>
            <div className={styles.line}>
                <label>Input your firebase configurations object</label>
                <textarea rows={8} cols={55}></textarea>
            </div>

            <div className={styles.line}>
                <label>Input the collections</label>
                <input type="text"  placeholder="collection1,collection2,collection3,...." />
            </div>

            <div className={styles.line}>
                <button onClick={export_collection}>Export Now</button>
            </div>

            {file!="" && <div className={styles.line}>
                <a href={`${server}/${file}`} download  className={styles.btn_download}>Download Now</a>
            </div>
            }
        </div>
    );
}

export default Export;