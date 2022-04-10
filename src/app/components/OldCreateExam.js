import { Card, Form, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateExam() {
    const navigate = useNavigate();
    
    const [exam, setExam] = useState({type:'N',name:'',instructions:'',publicationDate:new Date()});

    function submit(event) {
        event.preventDefault();
        console.log(exam);
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
                                <Form.Check type="radio" name="tipoPlantilla" inline label="Plantilla individual" id="I"
                                    onChange={event =>  setExam({...exam,type:event.target.id})}/>
                                <Form.Check type="radio" name="tipoPlantilla" inline label="Plantilla grupal" id="G"
                                    onChange={event =>  setExam({...exam,type:event.target.id})}/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={2} className="fw-bold">
                                Título:
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Escribe el título de la plantilla" 
                                    maxLength={100} onChange={event =>  setExam({...exam,name:event.target.value})}/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={2} className="fw-bold">
                                Descripción:
                            </Col>
                            <Col>
                                <Form.Control type="text" as="textarea" rows={5} maxLength={500} placeholder="instrucciones de la plantilla" 
                                    onChange={event =>  setExam({...exam,instructions:event.target.value})}/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={2} className="fw-bold">
                                Fecha límite:
                            </Col>
                            <Col>
                                <Form.Control type="date" onChange={event =>  setExam({...exam,publicationDate:event.target.value})}/>
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