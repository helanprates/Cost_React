import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from './pages/home'
import Empresa from './pages/empresa'
import Contato from './pages/contato'
import Container from "./components/layout/Container"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import ProjectsNews from "./pages/projectsNews"
import Projects from "./pages/projects"
import Project from "./pages/project"


function App() {
 
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Container customClass="min-height"><Home/></Container>}/>
        <Route path="/empresa" element={<Container customClass="min-height"><Empresa/></Container>}/>
        <Route path="/projectsNews"element={<Container customClass="min-height"><ProjectsNews/></Container>}/>
        <Route path="/project/:id"element={<Container customClass="min-height"><Project/></Container>}/>
        <Route path="/projects"element={<Container customClass="min-height"><Projects/></Container>}/>
        <Route path="/contato"element={<Container customClass="min-height"><Contato/></Container>}/>
      </Routes>
      <Footer/>
    </Router>
    
      
    </>
  )
}

export default App
