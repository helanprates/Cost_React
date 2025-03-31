 import Container from '../components/layout/Container'
 import LinkButton from '../components/layout/LinkButton'
 import { useLocation } from 'react-router-dom';
 import ProjectsCards from '../projects/projectsCards';
 import { useState, useEffect } from 'react';
 import Loading from '../components/layout/loading';


 export default function MessageProjectsNews() {

   const location = useLocation();
   const message = location.state?.message;

   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
    setLoading(true); // Ativa o estado de carregamento antes de iniciar a requisição
    setTimeout(() => {
      fetch('http://localhost:5000/projects', { 
        method: 'GET', 
        headers: { 
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProjects(data); // Define os projetos recebidos
          setLoading(false); // Desativa o estado de carregamento após o sucesso
        })
        .catch((err) => {
          console.error(err);
          setLoading(false); // Desativa o estado de carregamento mesmo em caso de erro
        });
    }, 1000); // Adiciona um atraso de 1 segundo (1000ms)
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        const newProjects = projects.filter((project) => project.id !== id);
        setProjects(newProjects); // Atualiza a lista de projetos
      })
      .catch((err) => console.error(err));
  }

  // function editProject(id, updatedProject) {
  //   fetch(`http://localhost:5000/projects/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedProject), // Envia os dados atualizados
  //   })
  //     .then((response) => response.json())
  //     .then((updatedData) => {
  //       const updatedProjects = projects.map((project) =>
  //         project.id === id ? updatedData : project
  //       );
  //       setProjects(updatedProjects); // Atualiza a lista de projetos com o projeto editado
  //     })
  //     .catch((err) => console.error(err));
  // }

   return (
    <Container>
      {loading && <Loading />} {/* Mostra o componente de carregamento */}
      {!loading && (
        <>
          <h1>{message}</h1>
          <ProjectsCards projects={projects} removeProject={removeProject}/>
          <LinkButton to="/projects" text="Criar Projeto" />
        </>
      )}
    </Container>
  );
}