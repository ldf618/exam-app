import { Accordion, Form, Row, Col, Container, Stack, Button } from 'react-bootstrap';
import ExamList from './ExamList';

function ExamSearchForm(props) {

    return (
        <>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" >
                <Accordion.Header><h5 className="mx-auto">Busqueda de plantillas</h5></Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Container>
                            <Row className="mb-1">
                                <Col>
                                    <Form.Group>
                                        <Form.Label as="strong">Título de la plantilla:&nbsp; </Form.Label>
                                        <Form.Control type="text" placeholder="Título" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <Stack gap={2}>
                                        <fieldset className="border p-2">
                                            <legend className="float-none w-auto">Tipo:</legend>
                                            <Form.Group >
                                                <Form.Check type="radio" name="type" value="I" inline label="Plantilla individual" />
                                                <Form.Check type="radio" name="type" value="G" inline label="Plantilla grupal" />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </fieldset>
                                        <fieldset className="border p-2">
                                            <legend className="float-none w-auto">Estado:</legend>
                                            <Form.Group>
                                                <Form.Check type="radio" name="type" value="I" inline label="Publicada" />
                                                <Form.Check type="radio" name="type" value="G" inline label="Sin Publicar" />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </fieldset>
                                    </Stack>
                                </Col>
                                <Col>
                                    <fieldset className="border p-2">
                                        <legend className="float-none w-auto">Fecha creación</legend>
                                        <Form.Group >
                                            <Form.Label as="strong">Desde:&nbsp; </Form.Label>
                                            <Form.Control type="date" placeholder="Título" />
                                            <Form.Label as="strong">Hasta:&nbsp; </Form.Label>
                                            <Form.Control type="date" placeholder="Título" />
                                        </Form.Group>
                                    </fieldset>
                                </Col>                               
                            </Row>
                            <Row className="text-center">
                                <Col><Button  className="w-50 mt-2">Buscar</Button></Col>
                            </Row>
                        </Container>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        <ExamList></ExamList>
</>
    );

}

export default ExamSearchForm;