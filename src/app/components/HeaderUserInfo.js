import { Table } from 'react-bootstrap';
import React from 'react';

function HeaderUserInfo(props) {

    const user = props.user;
    var colspan = user.userClass === "Student" ? 3 : 0;
    const courseName = "Asignatura 1";

    return (
        /*
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header ><div className="mx-auto fw-bold">Informes de Trabajo en Grupo</div></Accordion.Header>
                <Accordion.Body className="p-2">
    */
                    <Table bordered size="sm">
                        <tbody >
                            <tr>
                                <td className="fw-bold fs-6" width="26%" >Usuario:</td>
                                <td width="74%" colSpan={colspan}>
                                    {user.firstName + " " + user.surname1 + " " + user.surname2}
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Perfil:</td>
                                <td colSpan={colspan}>
                                    {user.userClass}
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Aula:</td>
                                <td >{user.classroom.name}</td>
                                {user.userClass === "Student" &&
                                <>
                                    <td className="fw-bold">Grupo:</td>
                                    <td >{user.group.name}</td>
                                </>                                    
                                }
                            </tr>
                        </tbody>
                    </Table>
/*
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
*/
    );
}

export default HeaderUserInfo;