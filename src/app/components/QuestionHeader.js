import { Card, DropdownButton, Dropdown, Button, Stack, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { QuestionsContext, actions } from './Exam';
import ConfirmDialog from './ConfirmDialog';
import ModalQuestion from './ModalQuestion';
import { examQuestionType } from "./Exam";

function QuestionHeader({ moveButtons, question, index }) {
    //console.log(question)

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState();
    
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState();
    

    const { dispatch } = useContext(QuestionsContext);
    const optionHeader = (question.examQuestionOptions!==undefined&&question.examQuestionOptions.length>0)?true:false;

    function handleConfirm() {
        setSelectedQuestion();
        setShowConfirm(false);
        dispatch({ type: actions.REMOVE, payload: selectedQuestion });
    }

    function handleCancel() {
        //console.log("handleCancel");
        setSelectedQuestion();
        setShowConfirm(false);
    }

    function removeQuestion(question) {
        //if (window.confirm("¿Estas seguro?"))
        //dispatch({ type: actions.REMOVE, payload: selectedQuestion });

        //mostrar confirm  
        setSelectedQuestion(question);
        setShowConfirm(true);
    }

    function moveUpQuestion(question) {
        dispatch({ type: actions.MOVE_UP, payload: question });
    }

    function moveDownQuestion(question) {
        dispatch({ type: actions.MOVE_DOWN, payload: question });
    }

    function changeEditable(question) {
        setModalType(question.category);
//        console.log(question)
        setModalTitle(examQuestionType.getDescById(question.category));
        setShowModal(true);
    }

    return (
        <Card>
            <Card.Header as="h6" className="text-white bg-secondary ">
                <Stack direction="horizontal" gap={2}>
                    <div className="fw-bold">Pregunta : {index + 1} &nbsp; {examQuestionType.getDescById(question.category)}</div>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Mover pregunta arriba</Tooltip>}>
                        <Button onClick={() => moveUpQuestion(question)} className="ms-auto" size="sm" disabled={moveButtons}><FontAwesomeIcon icon={solid('angles-up')} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Mover pregunta abajo</Tooltip>}>
                        <Button onClick={() => moveDownQuestion(question)} size="sm" disabled={moveButtons}><FontAwesomeIcon icon={solid('angles-down')} /></Button>
                    </OverlayTrigger>
                </Stack>
            </Card.Header>
            <Card.Body>
                <table className="w-100">
                    <tbody>
                        <tr >
                            <td>
                                {question.wording}
                            </td>
                            <td align="right">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>...</Tooltip>}>
                                    <span className="d-inline-block">
                                        <DropdownButton title=" " drop="start" size="sm" >
                                            <Dropdown.Item onClick={() => removeQuestion(question)}>Borrar Pregunta</Dropdown.Item>
                                            <Dropdown.Item onClick={() => changeEditable(question)}>Modificar Pregunta</Dropdown.Item>
                                        </DropdownButton >
                                        <ConfirmDialog show={showConfirm} message="¿Seguro que desea borrar la pregunta?" onConfirm={handleConfirm} onCancel={handleCancel} />
                                    </span>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        {optionHeader&&
                        <tr>
                            <td colSpan={2}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Enunciado:</th>
                                            <th width="5%">¿Verdadero?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {question.examQuestionOptions.map(
                                            (option, index) => { 
                                                return (
                                                    <tr key={index}>
                                                        <td>{option.answer}</td>
                                                        <td align='center'>{option.isTrue&&<FontAwesomeIcon icon={solid('check')} />}</td>
                                                        </tr>) 
                                                    }
                                            )}
                                    </tbody>
                                </Table>
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
                <ModalQuestion show={showModal} modifyQuestion={true} questionIndex={index} title={modalTitle} type={modalType} onHide={() => setShowModal(false)} />
            </Card.Body >
        </Card >

    );
}

export default QuestionHeader;