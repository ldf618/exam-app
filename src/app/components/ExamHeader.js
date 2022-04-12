import { Card, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import Exam from './Exam';

function ExamHeader(props) {

    const exam = props.exam;
    var type;
    switch(exam.type){
        case 'I': type = 'Individual'; break;
        case 'G': type = 'Grupal'; break;
        default: type ='';
    }

    return (
        <Card >
            <Card.Body>
                <Card.Title className="text-primary text-center">Examen: {exam.name}</Card.Title>
                <Card.Text>
                    <Container>
                        <Row>
                            <Col xs={2} className="fw-bold">
                                Tipo examen:
                            </Col>
                            <Col>
                                {type}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className="fw-bold">
                                Descripción:
                            </Col>
                            <Col>
                                {exam.instructions}
                            </Col>
                        </Row>                                                
                        <Row>
                            <Col xs={2} className="fw-bold">
                                Fecha límite:
                            </Col>
                            <Col>
                                {exam.publicationDate}
                            </Col>
                        </Row>                                                                        
                    </Container>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ExamHeader;