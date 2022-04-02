
import { Button, Form, Row, Col, Container,Stack } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import 'bootstrap/dist/css/bootstrap.min.css';
import { faAngry } from '@fortawesome/free-regular-svg-icons';
import 'App.css';


function Example() {
/*d-flex justify-content-center*/
const longw = {width: '400px'}
  return (
    <>
    <div className="m-4">
        <h1 className="text-primary text-center">Autenticación</h1>
        <h2 className="text-primary text-center">Informes de Trabajo en Grupo</h2>
        <i className="fa fa-eye" aria-hidden="true"></i>
    </div>      
    <div className="mx-auto" style={longw}>  
      <Form >
        <br></br>
        <Container className="p-3 bg-light border border-primary rounded">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formUser">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control type="text" placeholder="usuario" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Clave:</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="row justify-content-center">
              <Button className="w-50 mb-3" variant="primary" type="submit">
                Login <FontAwesomeIcon icon={faAngry} />    
              </Button>
            </Col>
          </Row>
        </Container>      
      </Form>
    </div>


<FontAwesomeIcon icon={solid('user-secret')} />
<FontAwesomeIcon icon={faAngry} />                
<FontAwesomeIcon icon={regular('angry')} />
<FontAwesomeIcon icon={brands('twitter')} />

    </>    
  );
}

export default Example;
