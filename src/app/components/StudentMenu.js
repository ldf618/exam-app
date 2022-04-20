import { NavDropdown, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBook, faFile } from '@fortawesome/free-solid-svg-icons';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {useNavigate} from "react-router-dom";

function StudentMenu() {
    const navigate = useNavigate();

    return (
        <>
            <NavDropdown title="Informes">
                <NavDropdown.Item href="./examform">
                    <Container>
                        <Row style={{flexWrap: 'nowrap'}}>
                            <Col xs={1}  ><FontAwesomeIcon icon={faFile} /></Col>
                            <Col>Crear informe</Col>
                        </Row>
                    </Container> 
                </NavDropdown.Item>
                <NavDropdown.Item href="./formikexample">
                <Container>
                        <Row style={{flexWrap: 'nowrap'}}>
                            <Col xs={1} ><FontAwesomeIcon icon={faMagnifyingGlass} /></Col>
                            <Col>Buscar informes</Col>
                        </Row>
                </Container> 
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { 
                        sessionStorage.removeItem('degree'); 
                        sessionStorage.removeItem('course'); 
                        navigate('./degreeSelect');}}>
                <Container>
                        <Row style={{flexWrap: 'nowrap'}}>
                            <Col xs={1}><FontAwesomeIcon icon={solid('right-left')} /></Col>
                            <Col>Cambiar de asignatura</Col>
                        </Row>
                </Container> 
                </NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default StudentMenu;