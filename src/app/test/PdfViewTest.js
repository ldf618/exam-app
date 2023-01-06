import React, { useState } from 'react';
import PdfView from '../components/PdfView';
//import Pdf from '../documents/informe.pdf';
import { getBaseUrl } from '../utils/Utils';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PdfViewTest() {
    const pdfPath= getBaseUrl()+'/jasper/report';
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    
    function handleClose () {
        setShow(false);
        navigate('../initial');
    }

    return(
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} fullscreen>
        <Modal.Header closeButton>
            <Modal.Title className="text-primary fw-bold">Informe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <PdfView pdfPath={pdfPath} width="100%" height="99%"/*60vh*/></PdfView>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
        </Modal>
    )
}