import { Card, Form, Container, Col, Row, Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { degreesByUserId, coursesByUserIdDegreeId, groupByStudentIdAndCourseId, classroomByUserIdAndCourseId } from '../apiCalls/api';
//import { getCourses } from "./../data";

function DegreeCurseSelect() {
    let navigate = useNavigate();
    var localUser = sessionStorage.getItem('localUser');

    const [degrees,setDegrees] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState(-1);
    const [selectedCourse, setSelectedCourse] = useState(-1);
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(true);
    const [user, setUser] = useState(localUser!==undefined?JSON.parse(localUser):{});

    const getDegrees = () => {

        degreesByUserId(user.id, user.type)
            .then((data) => {
                setDegrees(data);
            })
            .catch((err) => {
                Promise.resolve(err).then(err=>{console.log(err)/*setFetchError(err.toString())*/})
                //setIsLoading(false);
            });
    };

    useEffect(() => {
        getDegrees();
    }, []);

    const getCourses = (courseId) => {
        console.log(user)
        coursesByUserIdDegreeId(user.id,courseId, user.type)
            .then((data) => {
                setCourses(data);
            })
            .catch((err) => {
                Promise.resolve(err).then(err=>{console.log(err)/*setFetchError(err.toString())*/})
                //setIsLoading(false);
            });
    };

    async function storeClassroomAndGroup (studentId, courseId){
        let response;
        if (user.type==='Student'){
            response = await groupByStudentIdAndCourseId(studentId, courseId)
            sessionStorage.setItem('group',JSON.stringify({'id':response[0][0],'name':response[0][1]}));
        }
        response = await classroomByUserIdAndCourseId(studentId, courseId, user.type)
        sessionStorage.setItem('classroom',JSON.stringify({'id':response[0][0],'name':response[0][1]}));        
        navigate("/app/initial");             
    }        


    function selectDegree(event){     
        setSelectedDegree(event.target.value);
        getCourses(event.target.value);
        setSelectedCourse(-1);
    }

    function submit (event) {
        event.preventDefault();  
        if (selectedCourse!=-1){        
            setShow(true);
            const degree = degrees.find(degree=>degree.id==selectedDegree);
            const course = courses.find(course=>course.id==selectedCourse);
            storeClassroomAndGroup(user.id,selectedCourse);
            sessionStorage.setItem('degree',degree.name);     
            sessionStorage.setItem('course',course.name);     
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