import { NavDropdown, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFile } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from "react-router-dom";

function ConsultantMenu() {
    const navigate = useNavigate();

    return (
        <>
            <NavDropdown title="Plantillas">
                <NavDropdown.Item onClick={()=>navigate("./examform")}>
                    <Container>
                        <Row style={{ flexWrap: 'nowrap' }}>
                            <Col xs={1}  ><FontAwesomeIcon icon={faFile} /></Col>
                            <Col>Crear Plantilla</Col>
                        </Row>
                    </Container>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={()=>navigate("./examSearch")}>
                    <Container>
                        <Row style={{ flexWrap: 'nowrap' }}>
                            <Col xs={1} ><FontAwesomeIcon icon={faMagnifyingGlass} /></Col>
                            <Col>Buscar Plantilla</Col>
                        </Row>
                    </Container>
                </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Estadísticas">
                    <NavDropdown.Item onClick={()=>navigate("./fetchExample")}>Total informes recibidos</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>navigate("./reduxExample")}>Valoraciones alumnos</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>navigate("./degreesTable")}>Titulaciones</NavDropdown.Item>
                    <NavDropdown.Item href="#action/4.3">Estadísticas de los informes test de una asignatura</NavDropdown.Item>
                    <NavDropdown.Item href="#action/4.4">Estadísticas de un informe test</NavDropdown.Item>
                    <NavDropdown.Item href="#action/4.5">Estadísticas de valoraciones de un alumno</NavDropdown.Item>
                    <NavDropdown.Item href="#action/4.5">Listado de alumnos sin responder plantillas</NavDropdown.Item>
             </NavDropdown>
        </>
    );
}

export default ConsultantMenu;