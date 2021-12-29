import Link from "next/link"
import styles from "../styles/Nav.module.scss";

const Nav=()=>{
    return (
        <nav className={styles.container}>
            <div>
                <Link href="/"><a>Logo</a></Link>
            </div>
            <ol>
                <li>
                    <Link href="/"><a>Home</a></Link>
                </li>
                <li>
                    <Link href="/export"><a>Export</a></Link>
                </li>
                <li>
                    <Link href="/import"><a>Import</a></Link>
                </li>
            </ol>
        </nav>
    )
}

export default Nav;