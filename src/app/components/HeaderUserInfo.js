import { Table } from 'react-bootstrap';
import React from 'react';

function HeaderUserInfo(props) {

    const user = props.user;
    //const colspan = user.userClass === "Student" ? 3 : 0;
    const degree = sessionStorage.getItem('degree');
    const course = sessionStorage.getItem('course');

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
                                <td className="fw-bold" width="10%">Usuario:</td>
                                <td width="40%">
                                    {user.firstName + " " + user.surname1 + " " + user.surname2}
                                </td>
                                <td className="fw-bold" width="10%">Perfil:</td>
                                <td width="40%">
                                    {user.userClass}
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bold" width="10%">Aula:</td>
                                <td >{user.classroom.name}</td>
                                {user.userClass === "Student" &&
                                <>
                                    <td className="fw-bold" width="10%">Grupo:</td>
                                    <td >{user.group.name}</td>
                                </>                                    
                                }
                                {user.userClass === "Consultant" &&
                                <>
                                    <td ></td>
                                    <td ></td>
                                </>                                    
                                }                                
                            </tr>
                            {course !=='undefined' && course!==null &&
                            <tr>
                                <td className="fw-bold" width="10%">Titulacion:</td>
                                <td >
                                    {degree}
                                </td>
                                <td className="fw-bold" width="10%">Asignatura:</td>
                                <td >
                                    {course}
                                </td>
                            </tr>  
                            }                          
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