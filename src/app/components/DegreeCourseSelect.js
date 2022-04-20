import { Card, Form, Container, Col, Row, Button, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { getDegrees, getCourses } from "./../data";

function DegreeCurseSelect() {
    let degrees = getDegrees();
    let navigate = useNavigate();
    const [selectedDegree, setSelectedDegree] = useState(-1);
    const [selectedCourse, setSelectedCourse] = useState(-1);
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(true);


    function selectDegree(event){     
        setSelectedDegree(event.target.value);
        setCourses(getCourses(event.target.value));
        setSelectedCourse(-1);
    }

    function submit (event) {
        event.preventDefault();  
        if (selectedCourse!=-1){        
            setShow(true);
            const degree = degrees.find(degree=>degree.id==selectedDegree);
            const course = courses.find(course=>course.id==selectedCourse);
            sessionStorage.setItem('degree',degree.name);     
            sessionStorage.setItem('course',course.name);     
            navigate("/app/initial");             
        }
        else{
            setShow(false);
        }
     }
  

    return (
        <Card >
            <Card.Header><div className="mx-auto fw-bold">Escoger titulación y asignatura</div></Card.Header>
            <Card.Body>
                <Form onSubmit={submit}>
                    <Container>
                    <Alert show={show}>Seleccione titulación y asignatura</Alert>
                    <Alert variant="danger" show={!show}>Por favor seleccione titulación y asignatura</Alert>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Select value={selectedDegree} onChange={selectDegree}>
                                        <option disabled value={-1}>Titulación</option>
                                        {degrees.map(degree=>
                                            (
                                            <option key={degree.id} value={degree.id}>{degree.name}</option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Select value={selectedCourse} onChange={event => setSelectedCourse(event.target.value)}>
                                        <option disabled value={-1}>Asignatura</option>
                                        {courses.map(course=>
                                            (
                                            <option key={course.id} value={course.id}>{course.name}</option>
                                            )
                                        )}
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