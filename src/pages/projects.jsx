import styles from './projects.module.css'
import ProjectsForm from '../projects/ProjectsForm'
import { useNavigate } from 'react-router-dom'

export default function Projects (){

    const navegate = useNavigate()

    function createPost(project){
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(project),

        }).then((response) => response.json())
          .then((data) => {
            console.log(data)
            navegate('/projectsNews', { state:{ message: 'Alguma mensagem!' }})
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newProjects_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectsForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}