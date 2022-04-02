import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from 'react';

function MainMenu() {
    return (
        <Navbar className="p-1" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Informes de trabajo en grupo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
        
                        <Nav.Link href="#href">Cambio usuario</Nav.Link>
                        <NavDropdown title="Plantillas e informes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Crear plantilla</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Buscar plantilla</NavDropdown.Item>
                            <NavDropdown.Divider />                            
                            <NavDropdown.Item href="#action/3.3">Buscar informes finalizados</NavDropdown.Item>
                        </NavDropdown>                        
                        <NavDropdown title="Estadísticas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/4.1">Total informes recibidos</NavDropdown.Item>
                            <NavDropdown.Item href="#action/4.2">Valoraciones alumnos</NavDropdown.Item>
                            <NavDropdown.Item href="#action/4.3">Estadísticas de los informes test de una asignatura</NavDropdown.Item>
                            <NavDropdown.Item href="#action/4.4">Estadísticas de un informe test</NavDropdown.Item>
                            <NavDropdown.Item href="#action/4.5">Estadísticas de valoraciones de un alumno</NavDropdown.Item>
                            <NavDropdown.Item href="#action/4.5">Listado de alumnos sin responder plantillas</NavDropdown.Item>
                        </NavDropdown>                                                
                        <Nav.Link href="#link">Salir</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default MainMenu;