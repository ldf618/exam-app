import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ExamView from './ExamView';

ModalExamView.propTypes = {
    //show modal
    show: PropTypes.bool.isRequired,
    //callback function for modal hide
    onHide: PropTypes.func,
    //
    exam: PropTypes.object
  };

function ModalExamView(props) {
    console.log(props);
 
    function handleClose () {
        props.onHide();
    }

    
    return (         
        <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false} fullscreen scrollable>
            <Modal.Header closeButton>
                <Modal.Title className="text-primary fw-bold">{props.exam?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ExamView exam={props.exam}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Volver</Button>
            </Modal.Footer>
        </Modal>
    );
}
 

export default ModalExamView;