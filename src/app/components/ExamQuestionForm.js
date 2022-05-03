import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useContext, useReducer, createContext } from 'react';
import { QuestionsContext, actions } from './Exam';
import OptionsForm from './OptionsForm';
import { examQuestionType } from "./Exam";

export const OptionsContext = createContext();

function ExamQuestionForm({ handleSubmit, questionType }) {

    const initOptions = [
        { id: 1, text: 'opcion 1', isTrue: false },
        { id: 2, text: 'opcion 2', isTrue: false },
        { id: 3, text: 'Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur enim, consectetur. Cumque deleniti temporibus', isTrue: true }
    ]    

    //const { setQuestions } = useContext(QuestionsContext);
    const { dispatch } = useContext(QuestionsContext);
    const [enunciado, setEnunciado] = useState('');

    function reducer(options) {
        return [...options];
    }

    //const [options, setOptions] = useState(initOptions);
    const [options, setOptions] = useReducer(reducer, []);

    function addQuestion(question) {
        dispatch({ type: actions.ADD, payload: question });
    }

    function submit(e) {
        e.preventDefault();
        console.log("submit from form");
         //setQuestions(enunciado);
        addQuestion({text:enunciado,type:questionType,options:[...options]});
        setOptions([]);
        handleSubmit();
    }

    return (
        <OptionsContext.Provider value={{ options, setOptions }}> 
        <Form onSubmit={submit} id="questionForm">
            <Container>
                <Row className="mb-3">
                    <Col className="fw-bold">
                        <Form.Label>Enunciado</Form.Label>
                        <Form.Control autoFocus={true} id="enunciado" name="enunciado" type="text" as="textarea"
                            rows={5} maxLength={500} placeholder="Enunciado de la pregunto o apartado"
                            onChange={(e) => setEnunciado(e.target.value)} />
                    </Col>
                </Row>
                {(questionType!==examQuestionType.TEXT_ONLY)&&<OptionsForm questionType={questionType}/>}
            </Container>
        </Form>
        </OptionsContext.Provider>
    )
}

export default ExamQuestionForm;