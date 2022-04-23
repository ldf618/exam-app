import { Stack, DropdownButton, Dropdown, Card } from 'react-bootstrap';
import React, { useReducer, createContext, useState } from 'react';
import ExamHeader from './ExamHeader';
import ExamForm from './ExamForm';
import ModalQuestion from './ModalQuestion';
import QuestionHeader from './QuestionHeader';
//import { useNavigate } from "react-router-dom";


export const QuestionsContext = createContext();

export const actions = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    MOVE_UP: "MOVE_UP",
    MOVE_DOWN: "MOVE_DOWN"
};

/*
function reducer(questions, question) {
  return [...questions, question]
}
*/

/*move questions up and down circular*/
function move(arr, item, increment) {
    let index = arr.indexOf(item);
    arr.splice(index, 1);
    if (index == 0 && increment < 0)
        index = arr.length + 1;
    if (index == arr.length && increment > 0)
        index = -1;
    arr.splice(index + increment, 0, item);
    //clone array for re-render
    return arr.slice();
}

function reducer(questions, action) {
    switch (action.type) {
        case actions.ADD:
            return [...questions, action.payload]
        case actions.REMOVE:
            return questions.filter((question) => question !== action.payload);
        case actions.MOVE_UP:
            return move(questions, action.payload, -1);
        case actions.MOVE_DOWN:
            return move(questions, action.payload, +1);
        default:
            return questions;
    }
};

function Exam() {
    // let navigate = useNavigate();

    const [editableHeader, setEditableHeader] = useState(false);
    //    const [questions, setQuestions] = useState([]);
    //const [questions, setQuestions] = useReducer(reducer, []);
    const [questions, dispatch] = useReducer(reducer, []);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    var exam = sessionStorage.getItem('exam');

    function changeEditableHeader(value) {
        setEditableHeader(value);
    }

    function handleShowModal(type) {
        setModalTitle(type);
        setShowModal(true);
    }
    /*
        function addQuestion(value) {
            const data = "Pregunta " + value;
            console.log(data);
            setQuestions([...questions, data]);
        }
    */

    if (exam != undefined)
        exam = JSON.parse(exam);
    else
        exam = null;

    return (
        <QuestionsContext.Provider value={{ questions, dispatch /*setQuestions*/ }}>
            {!editableHeader && <ExamHeader exam={exam} changeEditable={changeEditableHeader} />}
            {editableHeader && <ExamForm exam={exam} modify={true} changeEditable={changeEditableHeader} />}
            <Card className="mt-2">
                <Card.Body>
                    <Card.Title className="text-primary text-center">Preguntas</Card.Title>
                    <hr />
                    <Stack className="m-2" gap={3}>
                        {questions.map((question, index) => {
                            return (
                                <QuestionHeader question={question} index={index} key={index} />
                            )
                        })}
                        <DropdownButton size="sm" title="Añadir Apartado" drop="end" >
                            <Dropdown.Item onClick={() => handleShowModal("Tipo Texto")}>Tipo Texto</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleShowModal("Tipo Test Unirespuesta")}>Tipo Test Unirespuesta</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleShowModal("Tipo Test Multirespuesta")}>Tipo Test Multirespuesta</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleShowModal("Tipo Valoracion Individual")}>Tipo Valoracion Individual</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleShowModal("Tipo Valoracion Grupo")}>Tipo Valoracion Grupo</Dropdown.Item>
                        </DropdownButton >
                    </Stack>
                </Card.Body>
            </Card>
            <ModalQuestion show={showModal} title={modalTitle} onHide={() => setShowModal(false)} />
        </QuestionsContext.Provider>
    );
}

export default Exam;