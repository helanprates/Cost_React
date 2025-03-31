import React from 'react';
import styles from './projectsCards.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function ProjectsCards({ projects, removeProject}) {
  

  return (
    <div className={styles.content}>
      {projects.length === 0 && <p>No projects to show</p>}
      {projects.map((project) => (
        <div key={project.id} className={styles.project_card}>
          <h3>{project.name}</h3>
          <p>Orçamento : {project.budget}</p>
          <p>Categoria: {project.category.name}</p>
          <div className={styles.project_card_actions}>
          <Link to={`/project/${project.id}`}><BsPencil />Edit</Link>
            <button
              className={styles.deleteBtn}
              onClick={() => removeProject(project.id)}
            >
              <BsFillTrashFill /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}