import styles from './home.module.css'
import savings from '../img/savings.svg'
import LinkButton from '../components/layout/LinkButton'

export default function Home(){
    return (
        <section className={styles.homeContainer}>
            <h1>Bem-vindo as <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/projects" text="Criar Projeto"/>
            <img src={savings} alt="Cost" />
        </section>
    )
}