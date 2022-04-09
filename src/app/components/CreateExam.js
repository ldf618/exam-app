import { Card, Form, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateExam() {
    const navigate = useNavigate();

    function submit(event) {
        event.preventDefault();
        alert("submit");
    }

    return (
        <Card >
            <Card.Header><div className="mx-auto fw-bold">Crear una plantilla</div></Card.Header>
            <Card.Body>
                <Form onSubmit={submit}>
                    <Container>
                        <Row className="mb-3">
                            <Col xs={2} className="fw-bold">
                                Tipo:
                            </Col>
                            <Col>
                                <Form.Check type="radio" name="tipoPlantilla" inline label="Plantilla individual" id=""></Form.Check>
                                <Form.Check type="radio" name="tipoPlantilla" inline label="Plantilla grupal" id=""></Form.Check>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={2} className="fw-bold">
                                Título:
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Escribe el título de la plantilla" maxLength={100} />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={2} className="fw-bold">
                                Descripción:
                            </Col>
                            <Col>
                                <Form.Control type="text" as="textarea" rows={5} maxLength={500}
                                    placeholder="instrucciones de la plantilla" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={2} className="fw-bold">
                                Fecha límite:
                            </Col>
                            <Col>
                                <Form.Control type="date" />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="row justify-content-center">
                                <Button className="w-50 mb-3" variant="primary" type="submit">
                                    Crear Plantilla
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Card.Body>
        </Card>
    );

}

export default CreateExam;