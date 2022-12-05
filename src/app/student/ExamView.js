import { Stack, Card, ListGroup, Alert, Badge } from 'react-bootstrap';
import { showQuestionType } from '../utils/Utils.js'

export default function ExamView({ exam }) {

    return (
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
                                <ListGroup key={index} as="ol" numbered>
                                    {question.examQuestionOptions.map((option, index2) => {
                                        return (
                                            <ListGroup.Item key={index2} as="li">{option.answer}</ListGroup.Item>
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
    )
}