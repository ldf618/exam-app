import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import ExamQuestionForm from './ExamQuestionForm';
import './modal.css'

function ModalQuestion(props) {
    //console.log(props.show);
 
    function handleClose () {
        props.onHide();
    }

    function handleSubmit(){      
       // console.log("submit from modal");
        handleClose();
    }

    /*dialogClassName="modal"*/
    return (
        <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false} centered size="lg" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Añadir pregunta / apartado de {props.title.toLowerCase()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ExamQuestionForm handleSubmit={handleSubmit} questionType={props.type} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="primary"  type="submit" form="questionForm">Añadir</Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default ModalQuestion;