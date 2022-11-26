import { Stack, DropdownButton, Dropdown, Card, Button, Spinner, Toast, ToastHeader } from 'react-bootstrap';
import React, { useReducer, createContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import ExamHeader from './ExamHeader';
import ExamForm from './ExamForm';
import ModalQuestion from './ModalQuestion';
import QuestionHeader from './QuestionHeader';
import CustomToastMsg from '../components/CustomToastMsg';
import { useNavigate } from "react-router-dom";
import { saveExam } from '../apiCalls/api';

export const examQuestionType = {
    TEXT_ONLY: { id: 1, desc: "Tipo Texto", type:"FREETEXT" },
    TEST_SINGLE_CHOICE: { id: 2, desc: "Tipo Test Unirespuesta", type:"OPTIONS" },
    TEST_MULTIPLE_CHOICE: { id: 3, desc: "Tipo Test Multirespuesta", type:"OPTIONS" },
    INDIVIDUAL_SCORE: { id: 4, desc: "Tipo Valoracion Individual", type:"INDIVIDUAL_EVALUATION" },
    GRUPAL_SCORE: { id: 5, desc: "Tipo Valoracion Grupo", type:"GROUP_EVALUATION" },
    getDescById: function (id) {
        let value = Object.values(this).find(v => v.id === id);
        if (value === undefined)
            return '';
        else
            return value.desc;
    },
    getTypeById: function (id) {
        console.log(id);
        let value = Object.values(this).find(v => v.id === id);
        console.log(value.type)
        if (value === undefined)
            return '';
        else
            return value.type;
    }
};

const initQuestions = [
    {
        wording: 'Texto de la pregunta 1',
        category: examQuestionType.TEST_SINGLE_CHOICE.id,
        examQuestionOptions: [
            { answer: 'opcion 1', isTrue: false },
            { answer: 'opcion 2', isTrue: false },
            { answer: 'opcion 3', isTrue: true }
        ]
    },
    {
        wording: 'Texto de la pregunta 2',
        category: examQuestionType.TEST_MULTIPLE_CHOICE.id,
        examQuestionOptions: [
            { answer: 'opcion 1', isTrue: false },
            { answer: 'opcion 2', isTrue: true },
            { answer: 'opcion 3', isTrue: true }
        ]
    }
]

export const QuestionsContext = createContext();

export const actions = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    MODIFY: "MODIFY",
    MOVE_UP: "MOVE_UP",
    MOVE_DOWN: "MOVE_DOWN",
    SAVE: "SAVE"
};

/*
function reducer(questions, question) {
  return [...questions, question]
}
*/

function replace(arr, item, index) {
    arr.splice(index, 1, item);
    return arr.slice();
}

/*move questions up and down circular*/
function move(arr, item, increment) {
    let index = arr.indexOf(item);
    arr.splice(index, 1);
    if (index === 0 && increment < 0)
        index = arr.length + 1;
    if (index === arr.length && increment > 0)
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
        case actions.MODIFY:
            return replace(questions, action.payload, action.index); /////////////////////          
        case actions.MOVE_UP:
            return move(questions, action.payload, -1);
        case actions.MOVE_DOWN:
            return move(questions, action.payload, +1);
        case actions.SAVE:
            //return [];
            return questions;
        default:
            return questions;
    }
};

function Exam() {
    let navigate = useNavigate();
    var exam = sessionStorage.getItem('exam');
    if (exam !== undefined){
        exam = JSON.parse(exam);
        if (exam.examQuestions!==undefined){
            let modifiedQuestions = 
                exam.examQuestions.map(function(q){
                    switch(q.type){                        
                        case 'OPTIONS':
                            q.category=q.isMultipleSelection?examQuestionType.TEST_MULTIPLE_CHOICE.id:examQuestionType.TEST_SINGLE_CHOICE.id;
                            break;
                        case 'FREETEXT':
                            q.category=examQuestionType.TEXT_ONLY.id;
                            break;
                        case 'INDIVIDUAL_EVALUATION':
                            q.category=examQuestionType.INDIVIDUAL_SCORE.id;
                            break;
                        case 'GROUP_EVALUATION':
                            q.category=examQuestionType.GRUPAL_SCORE.id;                           
                            break;
                    }
                    return q;
                });
                exam.examQuestions=modifiedQuestions;
        }
    }
    else
        exam = null;

    //console.log(exam)
    var user = JSON.parse(sessionStorage.getItem('localUser'));
    var course = JSON.parse(sessionStorage.getItem('course'));

    const [editableHeader, setEditableHeader] = useState(false);
    //    const [questions, setQuestions] = useState([]);
    //const [questions, setQuestions] = useReducer(reducer, []);
    const [questions, dispatch] = useReducer(reducer, exam.examQuestions===undefined?initQuestions:exam.examQuestions);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState();
    const [showSpinner, setShowSpinner] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastHeader, setToastHeader] = useState('');
    const [toastBody, setToastBody] = useState('');
    const [toastBg, setToastBg] = useState('primary');
    const [saveError, setSaveError] = useState(false);

    function changeEditableHeader(value) {
        setEditableHeader(value);
    }

    function handleShowModal(type) {
        setModalTitle(type.desc);
        setModalType(type.id);
        setShowModal(true);
    }

    function  save() {
        setShowSpinner(true); 
        questions.forEach((question,i)=>{
                question.category===examQuestionType.TEST_MULTIPLE_CHOICE.id
                    ?question.isMultipleSelection=true
                    :question.isMultipleSelection=false;
                question.type =examQuestionType.getTypeById(question.category);
                question.position=i;
                question.examQuestionOptions.forEach((option,idx)=>option.position=idx);
        });
        exam.examQuestions=questions;
        //exam.type==='I'?exam.type='INDIVIDUAL':exam.type='GROUP';
        let exams;
        ({exams, ...user} = user);
        exam.consultant=user;
        exam.course=course;

//      console.log(questions);
    //  const delay = ms => new Promise(res => setTimeout(res, ms));
    //  setShowSpinner(true);
    //  await delay(1000);
        console.log(exam)

        saveExam(exam)
        .then(
            function(res){ 
                setShowSpinner(false);
                dispatch({ type: actions.SAVE })
                setToastHeader('Guardado');
                setToastBody('El examen se ha guardado correctamente!');
                setToastBg('light');
                setSaveError(false);
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

    function closeSaveToast(){
        setShowToast(false);
        if (!saveError)
            navigate("/app/initial");
    }
    /*
        function addQuestion(value) {
            const data = "Pregunta " + value;
            console.log(data);
            setQuestions([...questions, data]);
        }
    */


    var num = questions.length;

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
                                <QuestionHeader moveButtons={num === 1 ? true : false} question={question} index={index} key={index} />
                            )
                        })}
                    </Stack>
                </Card.Body>
            </Card>
            <div className="p-4 position-sticky bottom-0 end 0">
                <Stack gap={2} direction="horizontal" className="align-items-center">
                    <DropdownButton disabled={editableHeader} size="sm" title="Añadir Apartado" drop="up" >
                        <Dropdown.Item onClick={() => handleShowModal(examQuestionType.TEXT_ONLY)}>{examQuestionType.TEXT_ONLY.desc}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowModal(examQuestionType.TEST_SINGLE_CHOICE)}>{examQuestionType.TEST_SINGLE_CHOICE.desc}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowModal(examQuestionType.TEST_MULTIPLE_CHOICE)}>{examQuestionType.TEST_MULTIPLE_CHOICE.desc}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowModal(examQuestionType.INDIVIDUAL_SCORE)}>{examQuestionType.INDIVIDUAL_SCORE.desc}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowModal(examQuestionType.GRUPAL_SCORE)}>{examQuestionType.GRUPAL_SCORE.desc}</Dropdown.Item>
                    </DropdownButton >
                    <Button disabled={editableHeader} className="rounded-circle" onClick={() => save()}> <FontAwesomeIcon icon={regular('floppy-disk')} /> </Button>
                    {showSpinner&&<Spinner animation="border" variant="primary" size="sm" />}
                    <CustomToastMsg show={showToast} onClose={closeSaveToast} delay={3000} header={toastHeader} body={toastBody} bg={toastBg}/>
                </Stack>
            </div>

            <ModalQuestion show={showModal} questionIndex={questions.length} modifyQuestion={false} title={modalTitle} type={modalType} onHide={() => setShowModal(false)} />
        </QuestionsContext.Provider>
    );
}

export default Exam;