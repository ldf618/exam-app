import { Card, Table, Button } from 'react-bootstrap';
import React from 'react';
import Exam from './Exam';

function ExamHeader(props) {

    const exam = props.exam;
    var type;
    switch(exam.type){
        case 'I': type = 'Individual'; break;
        case 'G': type = 'Grupal'; break;
        default: type ='';
    }

    function changeEditable(){

        props.changeEditable(false);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-primary text-center">Examen: {exam.name}</Card.Title>
                <hr/>
                <Card.Body>
                <table>
                        <tbody>
                        <tr>
                            <td className="fw-bold">
                                Tipo examen:
                            </td>
                            <td>
                                {type}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">
                                Descripción:
                            </td>
                            <td>
                                {exam.instructions}
                            </td>
                        </tr>                                                
                        <tr>
                            <td className="fw-bold">
                                Fecha límite:
                            </td>
                            <td>
                                {exam.publicationDate}
                            </td>
                        </tr> 
                        <tr>
                            <td colSpan={2}>
                                
                            </td>
                        </tr>  
                        </tbody>                      
                    </table>
                </Card.Body>
                <Button className="table justify-content-center" variant="primary" size="sm" onClick={changeEditable}>Modificar</Button>                
            </Card.Body>
        </Card>
    );
}

export default ExamHeader;