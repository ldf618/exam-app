import { Accordion, Form, Row, Col, Container, Card } from 'react-bootstrap';

function ExamSearchForm(props) {

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" >
                <Accordion.Header><h5 className="mx-auto">Busqueda de plantillas</h5></Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Container>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label as="strong">Título de la plantilla:&nbsp; </Form.Label>
                                        <Form.Control type="text" placeholder="Título" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card  >
                                        <Form.Group className="m-3">
                                            <Form.Label as="strong">Tipo:&nbsp; </Form.Label>
                                            <Form.Check type="radio" name="type" value="I" inline label="Plantilla individual" />
                                            <Form.Check type="radio" name="type" value="G" inline label="Plantilla grupal" />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Form.Group  className="m-3">
                                            <Form.Label as="strong">Estado:&nbsp; </Form.Label>
                                            <Form.Check type="radio" name="type" value="I" inline label="Publicada" />
                                            <Form.Check type="radio" name="type" value="G" inline label="Sin Publicar" />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Card>
                                </Col>
                                <Col>
                                <fieldset className="border p-2">
                                    <legend class="float-none w-auto">Fecha creación</legend>
                                        <Form.Group  className="m-1">
                                            <Form.Label as="strong">Desde:&nbsp; </Form.Label>
                                            <Form.Control type="date" placeholder="Título" />
                                            <Form.Label as="strong">Hasta:&nbsp; </Form.Label>
                                            <Form.Control type="date" placeholder="Título" />
                                        </Form.Group>                                   
                                    </fieldset>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    );

}

export default ExamSearchForm;