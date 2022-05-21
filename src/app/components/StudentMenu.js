import { NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFile } from '@fortawesome/free-solid-svg-icons';

function StudentMenu() {
    return (
        <>
            <NavDropdown title="Plantillas e informes">
                <NavDropdown.Item href="./examform">
                    <Container>
                        <Row style={{flexWrap: 'nowrap'}}>
                            <Col xs={1}  ><FontAwesomeIcon icon={faFile} /></Col>
                            <Col>Crear Informe</Col>
                        </Row>
                    </Container> 
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Buscar Informes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Buscar informes finalizados</NavDropdown.Item>
            </NavDropdown>

        </>
    );
}    

export default StudentMenu;