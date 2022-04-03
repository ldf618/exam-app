import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import ConsultantMenu  from './ConsultantMenu'
import StudentMenu  from './StudentMenu'
import React from 'react';

function MainMenu(props) {

    const userClass = props.userClass;
    let navigate = useNavigate();


    return (
        <Navbar className="p-1" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Informes de trabajo en grupo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">        
                        <Nav.Link href="#href">Cambio usuario</Nav.Link>
                        {userClass === "Student" &&
                            <StudentMenu/>                     
                        }
                        {userClass === "Consultant" &&
                            <ConsultantMenu/>                     
                        }
                        <Nav.Link onClick={() => {  sessionStorage.clear(); navigate("/");}} >Salir</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default MainMenu;