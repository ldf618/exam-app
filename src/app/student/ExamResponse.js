import { Stack, Card, ListGroup, Alert, Badge, Form } from 'react-bootstrap';
import { showQuestionType, isFreetextQuestion,questionCheckType } from '../utils/Utils.js'
export default function ExamResponse({ exam }) {

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
                                <Card.Header key={index}>
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
                                <ListGroup as="ol" numbered>
                                    {question.examQuestionOptions.map((option, index2) => {
                                        return (
                                            <ListGroup.Item key={index2} as="li">
                                                <Form.Check type={questionCheckType(question.type)}></Form.Check>
                                                {option.answer}                                        
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
        </>
    )
}