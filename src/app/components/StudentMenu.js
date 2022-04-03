import { NavDropdown } from 'react-bootstrap';
import React from 'react';

function StudentMenu() {
    return (
        <>
            <NavDropdown title="Informes">
                <NavDropdown.Item href="#action/3.1">Crear informe</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Buscar informes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Cambiar de asignatura</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}    

export default StudentMenu;