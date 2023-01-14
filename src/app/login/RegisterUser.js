import { useState } from 'react';
import { Button, Form, Row, Col, Container, Figure, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { registerUser, registerUserMultipart } from '../apiCalls/api';
import CustomToastMsg from '../components/CustomToastMsg';
import { dniValidation } from '../utils/Utils';
import StateManager from '../utils/StateManager';


Yup.addMethod(Yup.string, "dniValidation", function (errorMessage) {
    return this.test("test-dni-validation", errorMessage, function (value) {
      const { path, createError } = this;
      return (
        dniValidation(value) ||
        createError({ path, message: errorMessage })
      );
    });
  });

const validationSchema = Yup.object().shape({
    type: Yup.string()
        .required("*Debe seleccionar el tipo de usuario"),
    username: Yup.string()
        .min(6, "*Debe tener al menos 6 caracteres")
        .max(20, "*Debe tener como máximo 20 caracteres")
        .required("*Es obligatorio escribir un nombre de usuario"),
    password1: Yup.string()
        .min(4, "*Debe tener al menos 4 caracteres")
        .max(12, "*Debe tener como máximo 12 caracteres")
        .required("*Es obligatorio escribir una clave"),
    password2: Yup.string()
        .oneOf([Yup.ref('password1'), null], '*La clave no coincide')
        .required("*Es obligatorio escribir una confirmación de clave"),
    firstname: Yup.string()
        .min(2, "*Debe tener al menos 6 caracteres")
        .max(50, "*Debe tener como máximo 20 caracteres")
        .required("*Es obligatorio escribir un nombre"),
    surname1: Yup.string()
        .min(2, "*Debe tener al menos 2 caracteres")
        .max(50, "*Debe tener como máximo 50 caracteres")
        .required("*Es obligatorio escribir el primer apellido"),
    surname2: Yup.string()
        .max(50, "*Debe tener como máximo 50 caracteres"),
    dni: Yup.string()
        .trim()
        .min(2, "*Debe tener al menos 2 caracteres")
        .max(9, "*Debe tener como máximo 9 caracteres")
        .required("*Es obligatorio escribir un DNI")
        .matches(/^\d{1,8}[a-zA-Z]$/,"*Formato incorrecto")
        .dniValidation("Letra incorrecta")
        /*.test("test-name", "Letra incorrecta", 
            function(dni) {
                let dniNumbers = dni.substring(0,dni.length-1);
                let dniLetter = dni.substring(dni.length-1,1);
                let remainder = dniNumbers % 23;
                let validLetters='TRWAGMYFPDXBNJZSQVHLCKET';
                let correctDniLetter=validLetters.substring(remainder,remainder+1);
                console.log(correctDniLetter);
                if (correctDniLetter!=dniLetter.toUpperCase())
                    return false;
                else
                    return true;
            })*/
});

export default function RegisterUser() {
    let navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState();
    const [imageFile, setImageFile] = useState();
    const [showToast, setShowToast] = useState(false);
    const [toastHeader, setToastHeader] = useState('');
    const [toastBody, setToastBody] = useState('');
    const [toastBg, setToastBg] = useState('primary');
    const [saveError, setSaveError] = useState(false);

    var initial = { type: '', username: '', password1: '', password2: '', firstname: '', surname1: '', surname2: '', dni: '', photo:'' };

    let fileReader;

    function showFile() {
        let content = fileReader.result;
        setImageSrc(content);
    }
    
    function uploadFile(event) {
    
        let file = event.target.files[0];
        setImageFile(file);

        if (file) {
            //let data = new FormData();
            //data.append('file', file);
            fileReader = new FileReader();
            fileReader.onloadend = showFile;
            //fileReader.readAsArrayBuffer(file);
            fileReader.readAsDataURL(file);
        }
        else setImageSrc();
    }

    function closeSaveToast(){
        setShowToast(false);
        if (!saveError)
            navigate("/app/initial");
    }

    return (
        <Formik
            initialValues={initial}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={
                (values, { setSubmitting, setFieldError }) => {
                    setSubmitting(true);                    
//                    const {password1, password2, ...user}=values;
                    const {password1, password2, photo, ...user}=values;
                    if (imageFile) user.photo=imageFile;
                    user.password=password1;
                    console.log(user);
                   
                    registerUserMultipart(user)
                    .then(
                        function(res){ 
                            console.log(res);
                            StateManager.saveState('localUser',res);
                            navigate("/app/degreeSelect");
                            setSubmitting(false);                    
                        },      
                        function(err) {
                            Promise.resolve(err).then(err=>{
                                console.log(err.code)
                                if (err.code===409)
                                    setFieldError('username',err.msg);
                                else{
                                    setShowToast(true);
                                    setToastHeader('Error interno');
                                    setToastBody(err.msg);
                                    setToastBg('danger');
                                    setSaveError(true);
                                    }
                                })
                            setSubmitting(false);
                        }
                    )
                }
            }
        >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
                <div minwidth="400px">
                    <div className="m-4">
                        <h1 className="text-primary text-center">Nuevo Usuario</h1>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Form  onSubmit={handleSubmit}>
                            <Container className="m-1 p-2 bg-light border border-primary rounded">
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        {imageSrc && <Figure><Figure.Image width={120} height={120} src={imageSrc} roundedCircle /></Figure>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Usuario:</Form.Label>
                                            <Form.Control id="username" type="text" placeholder="Usuario" value={values.username} isInvalid={touched.username && !!errors.username} onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Control.Feedback type="invalid" >{errors.username}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tipo usuario:</Form.Label>
                                            <Form.Select id="type" defaultValue={-1} /*value={values.type}*/ isInvalid={touched.type && !!errors.type} onChange={handleChange} onBlur={handleBlur}>
                                                <option disabled value={-1}></option>
                                                <option key="Consultant" value={"Consultant"}>Consultor</option>
                                                <option key="Student" value={"Student"}>Alumno</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid" >{errors.type}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Clave:</Form.Label>
                                            <Form.Control id="password1" type="password" value={values.password1} isInvalid={touched.password1 && !!errors.password1} onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Control.Feedback type="invalid" >{errors.password1}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Confirmar clave:</Form.Label>
                                            <Form.Control id="password2" type="password" value={values.password2} isInvalid={touched.password2 && !!errors.password2} onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Control.Feedback type="invalid" >{errors.password2}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Nombre:</Form.Label>
                                            <Form.Control id="firstname" type="text" placeholder="Nombre" value={values.firstname} isInvalid={touched.firstname && !!errors.firstname} onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Control.Feedback type="invalid" >{errors.firstname}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>1<sup>er</sup> apellido:</Form.Label>
                                            <Form.Control id="surname1" type="text" placeholder="Primer apellido" value={values.surname1} isInvalid={touched.surname1 && !!errors.surname1} onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Control.Feedback type="invalid" >{errors.surname1}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>2<sup>do</sup> apellido:</Form.Label>
                                            <Form.Control id="surname2" type="text" placeholder="Segundo apellido" value={values.surname2} isInvalid={touched.surname2 && !!errors.surname2} onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Control.Feedback type="invalid" >{errors.surname2}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Dni:</Form.Label>
                                            <Form.Control id="dni" type="text" value={values.dni} isInvalid={touched.dni && !!errors.dni} onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Control.Feedback type="invalid" >{errors.dni}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Foto:</Form.Label>
                                            <Form.Control id="photo" type="file" value={values.photo} onBlur={handleBlur} accept="image/png, image/gif, image/jpeg" placeholder="Usuario"
                                                onChange={event => {handleChange(event); uploadFile(event)}} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="row justify-content-center">
                                        <Button className="w-50 mb-3" variant="primary" type="submit" disabled={isSubmitting}>
                                            Registrarse
                                        </Button>                                        
                                    </Col>                                    
                                </Row>
                            </Container>
                            <ToastContainer  className="position-fixed" style={{zIndex: "1000"}} position="middle-center">        
                                <CustomToastMsg show={showToast} onClose={closeSaveToast} delay={3000} header={toastHeader} body={toastBody} bg={toastBg}/>
                            </ToastContainer>
                            <Container className="d-flex justify-content-center mt-5">
                                <Row>
                                    <Col>
                                        <p>¿Ya tienes un usuario?...  <Link to="/">Login</Link></p>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </div>
                </div >
            )}
        </Formik>
    )
}