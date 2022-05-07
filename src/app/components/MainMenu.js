import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import ConsultantMenu  from './ConsultantMenu'
import StudentMenu  from './StudentMenu'
import React from 'react';

function MainMenu(props) {

    const userClass = props.userClass;
    const navigate = useNavigate();
    const course = sessionStorage.getItem('course');

    return (
        <Navbar  sticky="top" className="p-1" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Informes de trabajo en grupo</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">        
                        {userClass === "Student" && course!=null &&
                            <StudentMenu/>                     
                        }
                        {userClass === "Consultant" && course!=null &&
                            <ConsultantMenu/>                     
                        }
                        <Nav.Link onClick={() => {  sessionStorage.clear(); navigate("/");}} >Salir</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default MainMenu;