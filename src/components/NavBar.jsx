import { Link } from "react-router-dom"
import styles from './NavBar.module.css'
import Logo from '../img/costs_logo.png'
import Container from "./layout/Container"

export default function NavBar(){
    return (
        <nav  className={styles.navBar}>
        <Container>
        <Link to="/"><img src={Logo} alt="Costs"/></Link>
        <ul className={styles.list}>
            <li className={styles.item}> <Link to="/">Home</Link></li>
            <li className={styles.item}> <Link to="/empresa">Empresa</Link></li>
            <li className={styles.item}> <Link to="/projectsNews">Projetos</Link></li>
            <li className={styles.item}> <Link to="/projects">Criar Projetos</Link></li>
            <li className={styles.item}> <Link to="/contato">Contatos</Link></li>
        </ul>     
        </Container>
      </nav>
    )
}