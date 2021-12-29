import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
   <div className={styles.container}>
     <h2>With FireBackup, safely:</h2>
     <ol>
       <li>Export your collections and save them in json file</li>
       <li>Restore your an exported collection file</li>
     </ol>

   </div>
    
  )
}
