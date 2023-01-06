import { Stack, Card, ListGroup, Alert, Badge, Form, Button, Spinner, ToastContainer } from 'react-bootstrap';
import { showQuestionType, isFreetextQuestion, questionCheckType, 
         isIndividualEvalQuestion, isOptionsQuestion, deepCopyObject,
         getCurrentDate } from '../utils/Utils.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set } from '../slices/answerSlice'
import { saveExamAnswer } from '../apiCalls/api';
import CustomToastMsg from '../components/CustomToastMsg';
import ConfirmDialog from '../components/ConfirmDialog';


export default function ExamResponse() {

    const examAnswer = useSelector((state) => state.answer.value);
    console.log(examAnswer);
    const exam = examAnswer.exam;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showSpinner, setShowSpinner] = useState(false);

    const [saveError, setSaveError] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastHeader, setToastHeader] = useState('');
    const [toastBody, setToastBody] = useState('');
    const [toastBg, setToastBg] = useState('primary');

    const [showConfirm, setShowConfirm] = useState(false);

    function handleChangeControl(event) {
        let examAnswerClone = deepCopyObject(examAnswer);
        console.log(event.target.id + " = " + "'" + event.target.value + "'");
        eval(event.target.id + " = " + "'" + event.target.value + "'");
        dispatch(set(examAnswerClone));
    };

    function handleChangeCheck (event) {
        let questionIndex = event.target.name;
        let optionIndex = event.target.value;
        let examAnswerClone = deepCopyObject(examAnswer);
        if (event.target.type==='radio'){
            examAnswerClone.examQuestionAnswers[questionIndex].examQuestionOptionAnswer.forEach(option=>option.selected=false)
        }
        examAnswerClone.examQuestionAnswers[questionIndex].examQuestionOptionAnswer[optionIndex].selected= event.target.checked;
        //eval(event.target.id + " = " + event.target.checked);
        dispatch(set(examAnswerClone));
    };

    function closeSaveToast(){
        setShowToast(false);
        if (!saveError)
            navigate("/app/initial");
    }

    function handleConfirm() {
        setShowConfirm(false);
        saveExamAnswers(true);
    }

    function handleCancel() {
        setShowConfirm(false);
    }

    function showConfirmDialog() {
        setShowConfirm(true);
    }

    function saveExamAnswers(finished) {
        setShowSpinner(true);
        let examAnswerClone = deepCopyObject(examAnswer);
        examAnswerClone.changeDate=getCurrentDate().toJSON();
        if (finished)
            examAnswerClone.finished=true;
        saveExamAnswer(examAnswerClone)
        .then(
            function(res){ 
                dispatch(set(examAnswerClone));
                setShowSpinner(false);
                setSaveError(false);
                if (finished){
                    setToastHeader('Enviado');
                    setToastBody('El examen se ha enviado correctamente!');
                }
                else{
                    setToastHeader('Guardado');
                    setToastBody('El examen se ha guardado correctamente!');
                }                    
                setToastBg('light');
                setShowToast(true);
            },
            function(err) {
                setShowSpinner(false);
                //Promise.resolve(err) 'cause err can be a Promise or not
                setToastHeader('Error');
                setToastBody('Ha ocurrido un error, el examen NO se ha guardado correctamente');
                setToastBg('danger');
                setShowToast(true);
                setSaveError(true);
                Promise.resolve(err).then(err=>{console.error(err.toString())/*setSaveError(err.toString())*/})
            }
        )
    }

    return (
        <>
            <h3 className="text-primary fw-bold">{exam?.name}</h3>
            <Stack>
                <Alert variant="warning">
                    <div><strong>fecha Límite: </strong>{(new Date(exam.deadline)).toLocaleDateString()}</div>
                    <div><strong>Instrucciones: </strong>{exam?.instructions}</div>
                </Alert>
                <h3>Preguntas:</h3>
                {(examAnswer !== undefined) &&
                    examAnswer.examQuestionAnswers.map((question, index) => {
                        return (
                            <>
                                <Card className="mb-3">
                                    <Card.Header >
                                        <Stack direction="horizontal" gap={3}>
                                            <strong>{question.examQuestion.wording}</strong>
                                            <Badge className="ms-auto" bg="secondary">{showQuestionType(question.examQuestion.type, question.examQuestion.isMultipleSelection)}</Badge>
                                        </Stack>
                                    </Card.Header>
                                    {isFreetextQuestion(question.examQuestion.type) &&
                                            <Form.Control id={"examAnswerClone.examQuestionAnswers[" + index + "].answer"} type="text" as="textarea"
                                                rows={5} maxLength={500} value={question.answer ?? ''} placeholder="Escriba su repuesta"
                                                onChange={handleChangeControl} />
                                    }
                                    <ListGroup key={index} as="ol">
                                        {question.examQuestionOptionAnswer.map((option, index2) => {
                                            return (
                                                <ListGroup.Item key={index2} as="li" /*className="d-flex flex-row "*/>
                                                    <Stack direction="horizontal" gap={3} /*className="align-items-start"*/>
                                                        {isOptionsQuestion(question.examQuestion.type) &&
                                                            <Form.Check
                                                                name={index} value={index2}
                                                                id={"examAnswerClone.examQuestionAnswers[" + index + "].examQuestionOptionAnswer[" + index2 + "].selected"}
                                                                type={questionCheckType(question.examQuestion.isMultipleSelection)}
                                                                onChange={handleChangeCheck} />
                                                        }
                                                        <span>{option.examQuestionOption.answer}</span>
                                                        {isIndividualEvalQuestion(question.examQuestion.type) &&
                                                            <Form.Control className="w-auto"
                                                                onChange={handleChangeControl}
                                                                id={"examAnswerClone.examQuestionAnswers[" + index + "].examQuestionOptionAnswer[" + index2 + "].answer"}
                                                                maxLength={5} type="number" step={1} min={0} max={10} />
                                                        }
                                                    </Stack>
                                                </ListGroup.Item>
                                            )
                                        })
                                        }
                                    </ListGroup>
                                </Card>
                            </>
                        )
                    }
                    )
                }
            </Stack>
            <ToastContainer className="position-fixed" style={{ zIndex: "1000" }} position="middle-center">
                  <CustomToastMsg show={showToast} onClose={()=>closeSaveToast()} delay={3000} header={toastHeader} body={toastBody} bg={toastBg} />
                  <ConfirmDialog show={showConfirm} message="¿Seguro que desea enviar el examen?. Una vez enviado no se podrán modificar las respuestas"
                     onConfirm={handleConfirm} onCancel={handleCancel} />
            </ToastContainer>
            <Stack direction="horizontal" gap={3}>
                <Button onClick={()=>saveExamAnswers(false)}>Guardar</Button>
                <Button onClick={()=>showConfirmDialog()}>Enviar Examen</Button>
                {showSpinner&&<Spinner animation="border" variant="primary" size="sm" />}
                <Button className="ms-auto" variant="secondary" onClick={() => navigate('/app/initial')}>Salir</Button>
            </Stack>
        </>
    )
}