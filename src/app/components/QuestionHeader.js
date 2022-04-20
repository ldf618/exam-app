import { Card, DropdownButton, Dropdown, Button, Stack, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { QuestionsContext, actions } from './Exam';

function QuestionHeader({ question, index }) {

    const { dispatch } = useContext(QuestionsContext);

    function removeQuestion(question) {
        dispatch({ type: actions.REMOVE, payload: question });
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
            <Card.Header className="text-white bg-secondary">
                <Stack direction="horizontal" gap={2}>
                    <div className="fw-bold">Pregunta : {index + 1} </div>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Mover pregunta arriba</Tooltip>}>
                        <Button onClick={() => moveUpQuestion(question)} className="ms-auto" ><FontAwesomeIcon icon={solid('angles-up')} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Mover pregunta abajo</Tooltip>}>
                        <Button onClick={() => moveDownQuestion(question)} ><FontAwesomeIcon icon={solid('angles-down')} /></Button>
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
                                        <DropdownButton title=" " drop="start" >
                                            <Dropdown.Item onClick={() => removeQuestion(question)}>Borrar Pregunta</Dropdown.Item>
                                            <Dropdown.Item onClick={() => changeEditable}>Modificar Pregunta</Dropdown.Item>
                                        </DropdownButton >
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