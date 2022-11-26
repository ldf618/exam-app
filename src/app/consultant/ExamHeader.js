import { Card, Button } from 'react-bootstrap';
import React from 'react';

function ExamHeader(props) {

    const exam = props.exam;
    var type;
    switch(exam.type){
        case 'I': type = 'Individual'; break;
        case 'G': type = 'Grupal'; break;
        case 'INDIVIDUAL': type = 'Individual'; break;
        case 'GRUPAL': type = 'Grupal'; break;        
    }

    function changeEditable(){
        props.changeEditable(true);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-primary text-center">Examen: {exam.name}</Card.Title>
                <hr/>
                <table>
                        <tbody>
                        <tr>
                            <td className="fw-bold">
                                Tipo examen:
                            </td>
                            <td colSpan={3}>
                                {type}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">
                                Descripción:
                            </td>
                            <td colSpan={3} style={{ whiteSpace: "pre-wrap" }}>
                                {exam.instructions}
                            </td>
                        </tr>                                                
                        <tr>
                            <td className="fw-bold" width="15%">
                                Fecha límite:
                            </td>
                            <td width="35%">
                                {(new Date(exam.deadline)).toLocaleDateString()}
                            </td>
                            <td className="fw-bold" width="15%">
                                Fecha creación:
                            </td>
                            <td width="35%">
                                {exam.publicationDate===undefined?(new Date()).toLocaleDateString():(new Date(exam.publicationDate)).toLocaleDateString()}
                            </td>
                        </tr> 
        
                        </tbody>                      
                    </table>
                    <br/>
                    <Button  variant="primary" size="sm" onClick={changeEditable}>Modificar</Button>                                                
                </Card.Body>
        </Card>
    );
}

export default ExamHeader;