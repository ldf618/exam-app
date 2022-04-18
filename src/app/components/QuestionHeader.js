import { Card, DropdownButton, Dropdown, Button, Stack } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

function QuestionHeader({ question, index }) {



    function changeEditable() {
        //props.changeEditable(true);
    }

    return (
        <Card>
            <Card.Header className="text-white bg-secondary">
                <Stack direction="horizontal" gap={2}>
                    <div className="fw-bold">Pregunta : {index + 1} </div>
                    <Button className="ms-auto"><FontAwesomeIcon icon={solid('angles-up')} /></Button>
                    <Button ><FontAwesomeIcon icon={solid('angles-down')} /></Button>
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
                                <DropdownButton drop="start" >
                                    <Dropdown.Item onClick={() => changeEditable}>Borrar Pregunta</Dropdown.Item>
                                    <Dropdown.Item onClick={() => changeEditable}>Modificar Pregunta</Dropdown.Item>
                                </DropdownButton >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
}

export default QuestionHeader;