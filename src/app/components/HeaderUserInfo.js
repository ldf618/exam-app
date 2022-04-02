import { Table } from 'react-bootstrap';
import React from 'react';

function HeaderUserInfo() {

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
                                <td width="74%" colSpan={3}>
                                    {/*user.firstName + " " + user.surname1 + " " + user.surname2*/}
                                    Alberto Perez Alonso
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Perfil:</td>
                                <td colSpan={3}>
                                    Estudiante{/*user.userClass*/}
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Aula:</td>
                                <td >{/*user.classroom.name*/} Aula 1</td>
                                <td className="fw-bold">Grupo:</td>
                                <td >Grupo 2{/*user.group.name*/}</td>
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