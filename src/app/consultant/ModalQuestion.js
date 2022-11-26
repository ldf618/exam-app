import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import ExamQuestionForm from './ExamQuestionForm';
//import './modal.css'
import PropTypes from 'prop-types';

ModalQuestion.propTypes = {
    //show modal
    show: PropTypes.bool.isRequired,
    //question title
    title: PropTypes.string,
    //question type
    type: PropTypes.oneOf([1,2,3,4,5]),
    //true: modal for modifying question, false: modal for new question
    modifyQuestion:PropTypes.bool.isRequired, 
    //question's index, only for modification
    questionIndex: PropTypes.number,
    //callback function for modal hide
    onHide: PropTypes.func
  };

function ModalQuestion(props) {
 //   console.log(props);
 
    function handleClose () {
        props.onHide();
    }

    function handleSubmit(){      
       // console.log("submit from modal");
        handleClose();
    }

    const text = props.modifyQuestion?'Modificar':'Añadir';
    
    /*dialogClassName="modal"*/
    return (
        <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false} centered size="lg" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>{text} pregunta / apartado {props.questionIndex+1} de {props.title===undefined?'':props.title.toLowerCase()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ExamQuestionForm handleSubmit={handleSubmit} 
                              questionType={props.type} 
                              modifyQuestion={props.modifyQuestion} 
                              questionIndex={props.modifyQuestion?props.questionIndex:undefined} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary"  type="submit" form="questionForm">{text}</Button>
            </Modal.Footer>
        </Modal>
    );
}
 

export default ModalQuestion;