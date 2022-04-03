import { NavDropdown } from 'react-bootstrap';
import React from 'react';

function ConsultantMenu() {
    return (
        <>
            <NavDropdown title="Plantillas e informes">
                <NavDropdown.Item href="#action/3.1">Crear plantilla</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Buscar plantilla</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Buscar informes finalizados</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Estadísticas">
                <NavDropdown.Item href="#action/4.1">Total informes recibidos</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.2">Valoraciones alumnos</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.3">Estadísticas de los informes test de una asignatura</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.4">Estadísticas de un informe test</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.5">Estadísticas de valoraciones de un alumno</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.5">Listado de alumnos sin responder plantillas</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}    

export default ConsultantMenu;