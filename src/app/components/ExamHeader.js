import { Card, Button } from 'react-bootstrap';
import React from 'react';

function ExamHeader(props) {

    const exam = props.exam;
    var type;
    switch(exam.type){
        case 'I': type = 'Individual'; break;
        case 'G': type = 'Grupal'; break;
        default: type ='';
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
                                {(new Date(exam.publicationDate)).toLocaleDateString()}
                            </td>
                        </tr> 
                        <tr >
                            <td colSpan={2}>

                            </td>
                        </tr>  
                        </tbody>                      
                    </table>
                    <Button  variant="primary" size="sm" onClick={changeEditable}>Modificar</Button>                                                
                </Card.Body>
        </Card>
    );
}

export default ExamHeader;