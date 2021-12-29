import styles from "../styles/Import.module.scss";

const Import=()=>{
    return(
        <div className={styles.container}>

             <div className={styles.line}>
                <label>Input your firebase configurations object</label>
                <textarea rows={15} cols={50}></textarea>
            </div>

            <div className={styles.line}>
                <label>Select a JSON file of your exported collection</label>
                <input type="file" accept="application/json" />
            </div>

            <div className={styles.line}>
                <button>Import Now to n</button>
            </div>
        </div>
    );
}

export default Import;