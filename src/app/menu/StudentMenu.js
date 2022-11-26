import { NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass, faFile } from '@fortawesome/free-solid-svg-icons';

function StudentMenu() {
    const navigate = useNavigate();
    return (
        <>
            <NavDropdown title="Plantillas e informes">
                <NavDropdown.Item onClick={()=>navigate("./studentExamSearch")}>
                    <Container>
                        <Row style={{flexWrap: 'nowrap'}}>
                            <Col xs={1}  ><FontAwesomeIcon icon={faFile} /></Col>
                            <Col>Buscar informes sin iniciar</Col>
                        </Row>
                    </Container> 
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Buscar mis informes iniciados</NavDropdown.Item>
            </NavDropdown>

        </>
    );
}    

export default StudentMenu;