import styles from './projetc.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../components/layout/loading';
import  Container from '../components/layout/Container';
import ProjectForm from '../projects/ProjectsForm';
import ServiceForm from '../components/Services/ServiceForm'
import {parse, v4 as uuidv4} from 'uuid';
import ServiceCard from '../components/Services/serviceCard';

export default function Project() {
const {id} = useParams();
const [project, setProject] = useState([]);
const [showProjectForm, setShowProjectForm] = useState(false);
const [showServiceForm, setShowServiceForm] = useState(false);
const [services, setServices] = useState([])

useEffect(() => {
 setTimeout(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        setProject(data);
        setServices(data.services)
    })
    .catch((err) => console.log(err))
 }, 1000);
}, [id]);

function editPost(project) {
    if(project.budget < project.cost) {
        alert('O orçamento não pode ser menor que o custo do projeto');
        return false;
    }

    fetch(`http://localhost:5000/projects/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
        setProject(data);
        setShowProjectForm(false);
    })
    .catch((err) => console.log(err));
}


function createService(project) {
    // last service
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      project.services.pop()
      return false
    }

    // add service cost to project cost total
    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setServices(data.services)
        setShowServiceForm(!showServiceForm)
      })
  }


function toggleProjectForm() {
    setShowProjectForm (!showProjectForm);
}


function toggleServiceForm() {
    setShowServiceForm (!showServiceForm);
}

function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id,
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
      })
  }


    return (<>
    {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button  className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar Projeto'}</button>
                {!showProjectForm ? (
                    <div className={styles.form}>
                        <p><span>Categoria: {project.category.name}</span></p> 
                        <p><span>Orçamento: {project.budget}</span></p>
                        <p><span>Utilizado: {project.cost}</span></p>
                    </div>
                ) : (
                    <div className={styles.form}>
                        <ProjectForm 
                        handleSubmit={editPost}
                        btnText='Concluir edição'
                        projectData={project} />
                    </div>
                )}
                </div>
                <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar Serviço'}
                        </button>
                    <div className={styles.form}>
                        {showServiceForm && (<ServiceForm
                        handleSubmit={createService}
                        btnText="Adicionar serviço"
                        projectData={project}/>
                        )}
                    </div>
                </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                       {services.length > 0 && 
                       services.map((service) => (
                        <ServiceCard
                        id={service.id}
                        nome={service.name}
                        cost={service.cost}
                        description={service.description}
                        key={service.id}
                        handleRemove={removeService}
                        />
                       ))}
                       {services.length === 0 && <p>Nenhum serviço cadastrado</p>}
                    </Container>
                </Container>
        </div>
    ) : (
        <Loading/>
    )}
    </>)
}
