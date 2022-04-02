import { Card, Form, Container, Col, Row, Button } from 'react-bootstrap';
import React from 'react';

function DegreeCurseSelect() {
    return (
        <Card>
            <Card.Header><div className="mx-auto fw-bold">Escoger titulación y asignatura</div></Card.Header>
            <Card.Body>
                <Form>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Select aria-label="Default select example">
                                        <option>Titulación</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Select aria-label="Default select example">
                                        <option>Asignatura</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    </Form.Group>
                            </Col>
                        </Row>                               
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 text-center">                             
                                    <Button className="w-50 mb-3 " variant="primary" type="submit">
                                        Seleccionar
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default DegreeCurseSelect;