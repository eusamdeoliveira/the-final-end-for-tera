import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../helper/auth';
import logo from "../fic-questions.png";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from 'react-router';

const roleMapper = {
  0: "Administrador",
  1: "Professor",
  2: "Aluno"
}

export const AppNavBar = () => {
  const auth = React.useContext(AuthContext)

  const navigate = useNavigate();
  const location = useLocation();

  const rawFilter = location.search.split('=')[1]

  const filter = rawFilter ? rawFilter : ''

  let [value, setValue] = useState(filter)

  const searchCourse = () => {
    navigate({
      pathname: '/app',
      search: `?filter=${value}`
    })
    navigate(0)
  }

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: '#34678A'}}>
      <Container>
        <Navbar.Brand href="#home"><NavLink to='/'><img src={logo} width={110} height={40}/></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto p-3">
            <NavLink style={{color: 'white'}} to='/home'>Inicial</NavLink>
            {
              !auth.getUser() && (<NavLink style={{color: 'white'}} to='/signin'>Entrar</NavLink>)
            }
            {
              auth.getUser() && (<NavLink style={{color: 'white'}} onClick={auth.logout} to='/signin'>Sair</NavLink>)
            }
          </Nav>
          <Nav className="me-auto p-3">
            {
              auth.getUser() && (<Navbar.Text>{roleMapper[auth.getUser().role]}</Navbar.Text>)
            }
          </Nav>
          {
            auth.getUser() && location.pathname !== '/questions' && (
              <Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Procurar cursos"
                    className="me-2"
                    aria-label="Pesquisa"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                  />
                  <Button variant="outline-danger" onClick={searchCourse}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                    </svg>
                  </Button>
                </Form>
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
)}