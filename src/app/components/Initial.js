import { Card } from 'react-bootstrap';
import React from 'react';

function Initial() {
  /*
  const [searchParams] = useSearchParams();
  const valor = searchParams.get("message")
  */

    return (
        <Card text="white" bg="success">
        <Card.Header>Informes de trabajo en grupo</Card.Header>
        <Card.Body>
          <Card.Title >Seleccione una opción</Card.Title>
          <Card.Text>
            Por favor seleccione una opción en el menú superior para empezar a trabajar.
          </Card.Text>
        </Card.Body>
      </Card>
    );
}    

export default Initial;