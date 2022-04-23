import { Modal, Button, Card } from 'react-bootstrap';
import React from 'react';

function ConfirmDialog({ show, message, onConfirm, onCancel }) {


    return (
        <Modal centered show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirmacion: ¿Estas seguro?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDialog;
