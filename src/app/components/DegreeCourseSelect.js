import { Card, Form, Container, Col, Row, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { getDegrees, getCourses } from "./../data";

function DegreeCurseSelect() {
    let degrees = getDegrees();
    let navigate = useNavigate();
    //let courses = [];
    const [selectedDegree, setSelectedDegree] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(0);
    const [courses, setCourses] = useState([]);

    function selectDegree(event){
        setSelectedDegree(event.target.value);
        //courses=getCourses(event.target.value);
        setCourses(getCourses(event.target.value));
        setSelectedCourse(0);
        courses.map(course=>console.log(course.id ))
    }

    function submit (event) {        
        event.preventDefault();        
        navigate("/app/initial"); 
     }
  

    return (
        <Card >
            <Card.Header><div className="mx-auto fw-bold">Escoger titulación y asignatura</div></Card.Header>
            <Card.Body>
                <Form onSubmit={submit}>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Select value={selectedDegree} onChange={selectDegree}>
                                        <option disabled value={0}>Titulación</option>
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
                                        <option disabled value={0}>Asignatura</option>
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