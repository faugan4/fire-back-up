import Head from "next/head";
import Nav from "../components/Nav";
const Layout=({children})=>{
    return(
        <div>
          <Nav /> 
          {
              children
          }
        </div>
    );
}

export default Layout;