
import { Button, Form, Row, Col, Container, Alert } from 'react-bootstrap';
import React, { useState }    from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, /*regular, brands*/ } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import 'bootstrap/dist/css/bootstrap.min.css';
//import { faAngry } from '@fortawesome/free-regular-svg-icons';
import {useNavigate} from "react-router-dom";
//import { authenticate } from "../testData/data";
import { authenticateUser, userByName } from '../apiCalls/api';
/*
<FontAwesomeIcon icon={solid('user-secret')} />
<FontAwesomeIcon icon={faAngry} />                
<FontAwesomeIcon icon={regular('angry')} />
<FontAwesomeIcon icon={brands('twitter')} />
*/

function Login() {

  let navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [userPass, setUserPass] = useState();
  const [incorrectUser, setIncorrectUser] = useState(false);

  /*
  function submit (event) {
      event.preventDefault();        
      //alert('A user and password were submitted: '+userName+" "+userPass);
      var authUser = authenticate(userName,userPass);
      if (authUser===undefined){
          setIncorrectUser(true);
          setTimeout(() => {setIncorrectUser(false)}, 5000);
      }
      else{
          setIncorrectUser(false);
          sessionStorage.setItem('localUser',JSON.stringify(authUser));
          navigate("/app/degreeselect");
      }

    }
    */

    function submit(event){
      event.preventDefault(); 
      authenticateUser({"username":userName,"password":userPass})
      .then(
          function(res){ 
              if(res){
                userByName (userName)
                .then(
                  function (authUser){
                    sessionStorage.setItem('localUser',JSON.stringify(authUser));
                    navigate("/app/degreeselect");
                  },
                  function(err2) {
                    //Promise.resolve(err) 'cause err can be a Promise or not
                    Promise.resolve(err2).then(err2=>{console.log(err2.toString())})
                }
                )
              }
              else{
                   setIncorrectUser(true);
                    setTimeout(() => {setIncorrectUser(false)}, 5000);
              }
          },      
          function(err) {
              //Promise.resolve(err) 'cause err can be a Promise or not
              Promise.resolve(err).then(err=>{setIncorrectUser(true);console.log(err.toString())})
          }
      )
  }
/*
    function handleVisible () { 
      setTimeout(() => {setIncorrectUser(false)}, 5000);
    }     

    
    useEffect(() => {
      return () => {
        handleVisible();
      }
    });
*/
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
      <Form  onSubmit={submit}>
        <br></br>
        <Container className="m-1 p-2 bg-light border border-primary rounded">
        {incorrectUser&&<UserAlert/>}
        {!incorrectUser&&<Alert>Introduzca clave y usuario</Alert>}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formUser">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control type="text" placeholder="Usuario" onChange={event => setUserName(event.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Clave:</Form.Label>
                <Form.Control type="password" placeholder="Password" autoComplete="on" onChange={event => setUserPass(event.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="row justify-content-center">
              <Button className="w-50 mb-3" variant="primary" type="submit">
                Login <FontAwesomeIcon icon={solid('right-to-bracket')} />    
              </Button>
            </Col>
          </Row>
        </Container>      
      </Form> 
    </div>
    </>    
  );
}

function UserAlert (){

  return (
    <Alert variant='danger' >
      No existe el usuario o la clave es incorrecta
    </Alert>
  );
}

export default Login;
