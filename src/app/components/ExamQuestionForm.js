import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import {useState, useContext  } from 'react';
import { QuestionsContext, actions } from './Exam';

function ExamQuestionForm({question, handleSubmit}) {
   
    //const { setQuestions } = useContext(QuestionsContext);
    const { dispatch } = useContext(QuestionsContext);
    const [enunciado,setEnunciado] = useState('');
    
    function addQuestion(question) {
        dispatch({type: actions.ADD,payload:question});
    }

    function submit (e){
        e.preventDefault();
        console.log("submit from form");
        console.log(question);
        //setQuestions(enunciado);
        addQuestion(enunciado);
        handleSubmit();
    }
  
    return (
                <Card>
                    <Card.Header className="text-white bg-secondary"><div className="mx-auto fw-bold">{question}</div></Card.Header>
                    <Card.Body>
                        <Form onSubmit={submit} id="questionForm">
                            <Container>
                                <Row className="mb-3">
                                    <Col className="fw-bold">
                                    <Form.Label>Enunciado</Form.Label>
                                    <Form.Control id="enunciado" name="enunciado" type="text" as="textarea"
                                            rows={5} maxLength={500} placeholder="Enunciado de la pregunto o apartado" 
                                            onChange={(e)=>setEnunciado(e.target.value)}/>
                                    </Col>
                                </Row>
                                {/*<Row>
                                    <Col className="row justify-content-center">
                                        <Button className="w-50 mb-3" variant="primary" type="submit">
                                            Añadir Apartado
                                        </Button>
                                    </Col>
                                </Row>*/}
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>

            )
}

export default ExamQuestionForm;