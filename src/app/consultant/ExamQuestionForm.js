import { Container, Row, Col, Form, Toast } from 'react-bootstrap';
import { useState, useContext, useReducer, createContext, useRef, useEffect } from 'react';
import { QuestionsContext, actions } from './Exam';
import OptionsForm from './OptionsForm';
import { examQuestionType } from "./Exam";
import PropTypes from 'prop-types';

export const OptionsContext = createContext();

ExamQuestionForm.propTypes = {
    //true: modal for modifying question, false: modal for new question
    modifyQuestion:PropTypes.bool.isRequired, 
    //question's index, only for modification
    questionIndex: PropTypes.number,
    //question type
    questionType: PropTypes.oneOf([1,2,3,4,5]),
    //callback function for submitting form
    handleSubmit: PropTypes.func
  };

function ExamQuestionForm({ handleSubmit, questionType, modifyQuestion, questionIndex}) {

    /*
    const initOptions = [
        { id: 1, text: 'opcion 1', isTrue: false },
        { id: 2, text: 'opcion 2', isTrue: false },
        { id: 3, text: 'Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur enim, consectetur. Cumque deleniti temporibus', isTrue: true }
    ]
    */
      
    //const { setQuestions } = useContext(QuestionsContext);
      const {questions, dispatch } = useContext(QuestionsContext);

    //autoFocus not working
    const inputEnunciado = useRef(null);
    useEffect(() => {
      if (inputEnunciado.current) {
        inputEnunciado.current.focus();
      }
    }, []);

    function reducer(v) {
        return [...v];
    }
    var initOptions = modifyQuestion?JSON.parse(JSON.stringify(questions[questionIndex].examQuestionOptions)):[];//DeepCopy
    const initEditedOptions = modifyQuestion?Array.from(questions[questionIndex].examQuestionOptions,()=>false):[];
    const initDisabledButtons = modifyQuestion?Array.from(questions[questionIndex].examQuestionOptions,()=>false):[];
        

    //const [options, setOptions] = useState(initOptions);
    const [options, setOptions] = useReducer(reducer, initOptions);
    const [editedOptions, setEditedOptions] = useReducer(reducer,initEditedOptions);
    const [disabledButtons, setDisabledButtons] = useReducer(reducer, initDisabledButtons);
    const [enunciado, setEnunciado] = useState(modifyQuestion?questions[questionIndex].wording:'');
    const [validatedForm, setValidatedForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    function addQuestion(question) {
        //console.log("add")
        dispatch({ type: actions.ADD, payload: question });
    }

    function modifyQuestionF(question) {
        //console.log("modify")
        dispatch({ type: actions.MODIFY, payload: question, index: questionIndex });
    }

    function submit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else if ((options.length === 0) && (questionType !== examQuestionType.TEXT_ONLY.id)) {
            setShowAlert(true);
        }
        else {
            //console.log("submit from form");
            //setQuestions(enunciado);
            if (!modifyQuestion)
                addQuestion({ wording: enunciado, category: questionType, examQuestionOptions: [...options] });
            else
                modifyQuestionF({ wording: enunciado, category: questionType, examQuestionOptions: [...options] });
            setEnunciado('');
            setOptions([]);
            handleSubmit();
        }
        setValidatedForm(true);
    }

    return (
        <OptionsContext.Provider value={{ options, setOptions, editedOptions, setEditedOptions, disabledButtons, setDisabledButtons }}>
            <Container>
                <Row className="mb-3">
                    <Col>
                        <Form  noValidate validated={validatedForm} onSubmit={submit} id="questionForm">
                            <Form.Label className="fw-bold">Enunciado</Form.Label>
                            <Form.Control ref={inputEnunciado} required minLength={5}  id="enunciado" name="enunciado" type="text" as="textarea"
                                rows={5} maxLength={500} placeholder="Enunciado de la pregunto o apartado" value={enunciado}
                                onChange={(e) => setEnunciado(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Debe escribir una pregunta de al menos 5 caracteres</Form.Control.Feedback>
                        </Form>
                    </Col>
                </Row>
                {(questionType !== examQuestionType.TEXT_ONLY.id) &&
                    <>
                        <Row className="mb-3">
                            <Col > <OptionsForm questionType={questionType} /></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Toast show={showAlert} bg='danger' onClose={() => setShowAlert(false)} delay={5000} autohide>
                                    <Toast.Header >
                                        <div className="me-auto">Por favor, añada alguna opción</div>
                                    </Toast.Header>
                                </Toast>
                            </Col>
                        </Row>
                    </>
                }
            </Container>
        </OptionsContext.Provider>
    )
}

export default ExamQuestionForm;