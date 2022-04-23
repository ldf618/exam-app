import { Card, DropdownButton, Dropdown, Button, Stack, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { QuestionsContext, actions } from './Exam';
import ConfirmDialog  from './ConfirmDialog';

function QuestionHeader({ question, index }) {

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState();

    const { dispatch } = useContext(QuestionsContext);

    function handleConfirm (){
        setSelectedQuestion();
        setShowConfirm(false);
        dispatch({ type: actions.REMOVE, payload: selectedQuestion });
    }

    function handleCancel (){
        console.log("handleCancel");
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

    function changeEditable() {
        //props.changeEditable(true);
    }

    return (
        <Card>
            <Card.Header as="h6" className="text-white bg-secondary ">
                <Stack direction="horizontal" gap={2}>
                    <div className="fw-bold">Pregunta : {index + 1} </div>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Mover pregunta arriba</Tooltip>}>
                        <Button onClick={() => moveUpQuestion(question)} className="ms-auto" size="sm" ><FontAwesomeIcon icon={solid('angles-up')} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Mover pregunta abajo</Tooltip>}>
                        <Button onClick={() => moveDownQuestion(question)} size="sm"><FontAwesomeIcon icon={solid('angles-down')} /></Button>
                    </OverlayTrigger>
                </Stack>
            </Card.Header>
            <Card.Body>
                <table className="w-100">
                    <tbody>
                        <tr >
                            <td>
                                <p>{question}</p>
                            </td>
                            <td align="right">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>...</Tooltip>}>
                                    <span className="d-inline-block">
                                        <DropdownButton title=" " drop="start" size="sm" >
                                            <Dropdown.Item onClick={() => removeQuestion(question)}>Borrar Pregunta</Dropdown.Item>
                                            <Dropdown.Item onClick={() => changeEditable}>Modificar Pregunta</Dropdown.Item>
                                        </DropdownButton >
                                        <ConfirmDialog show={showConfirm} message="¿Seguro que desea borrar la pregunta?" onConfirm={handleConfirm} onCancel={handleCancel}/>
                                    </span>
                                </OverlayTrigger>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card.Body >            
        </Card >
        
    );
}

export default QuestionHeader;