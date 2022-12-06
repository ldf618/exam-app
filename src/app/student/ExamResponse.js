import { Stack, Card, ListGroup, Alert, Badge, Form, Button } from 'react-bootstrap';
import { showQuestionType, isFreetextQuestion,questionCheckType, isIndividualEvalQuestion, isOptionsQuestion } from '../utils/Utils.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
export default function ExamResponse(/*{ exam }*/) {
    
    const examAnswer = useSelector((state) => state.answer.value);
    console.log(examAnswer);
    const exam = examAnswer.exam;
    const navigate = useNavigate();

    const handleChange = (event) => {
        //setParams({ ...params, [event.target.name]: event.target.value });
    };    

    return (
        <>
        <h3 className="text-primary fw-bold">{exam?.name}</h3>
        <Stack>
            <Alert variant="warning">
                <div><strong>fecha Límite: </strong>{(new Date(exam.deadline)).toLocaleDateString()}</div>
                <div><strong>Instrucciones: </strong>{exam?.instructions}</div>
            </Alert>
            <h3>Preguntas:</h3>
            {(exam !== undefined) &&
                exam.examQuestions.map((question, index) => {
                    return (
                        <>
                            <Card>
                                <Card.Header >
                                    <Stack direction="horizontal" gap={3}>
                                        <strong>{question.wording}</strong>
                                        <Badge className="ms-auto" bg="secondary">{showQuestionType(question.type, question.isMultipleSelection)}</Badge>
                                    </Stack>
                                </Card.Header>
                                {isFreetextQuestion(question.type) &&
                                    <>
                                        <Form.Control id={'response'+index} name="instructions" type="text" as="textarea"
                                            rows={5} maxLength={500} value="" placeholder="Escriba su repuesta"
                                            /*onChange={handleChange} onBlur={handleBlur}*/ />
                                    </>
                                }
                                <ListGroup key={index} as="ol">
                                    {question.examQuestionOptions.map((option, index2) => {
                                        return (
                                            <ListGroup.Item key={index2} as="li" /*className="d-flex flex-row "*/>
                                                <Stack direction="horizontal" gap={3} /*className="align-items-start"*/>
                                                    {isOptionsQuestion(question.type)&&<Form.Check name={"p"+index} type={questionCheckType(question.isMultipleSelection)}></Form.Check>}
                                                    <span>{option.answer}</span>
                                                    {isIndividualEvalQuestion(question.type)&&<Form.Control className="w-auto" maxLength={5} type="number" step={1} min={0} max={10}/>}
                                                </Stack>
                                            </ListGroup.Item>
                                        )
                                    })
                                    }
                                </ListGroup>
                            </Card>
                            <br></br>
                        </>
                    )
                }
                )
            }
        </Stack>
        <Stack direction="horizontal" gap={3}>
            <Button>Guardar</Button>
            <Button>Enviar Examen</Button>
            <Button className="ms-auto" variant="secondary" onClick={()=>navigate('/app/initial')}>Salir</Button>
        </Stack>
        </>
    )
}