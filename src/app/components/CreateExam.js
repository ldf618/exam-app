import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    type: Yup.string()
    .required("*Debe seleccionar el tipo de plantilla"),
    name: Yup.string()
    .min(2, "*Debe tener al menos 2 caracteres")
    .max(100, "*Debe tener como máximo 100 caracteres")
    .required("*Es obligatorio escribir un título"),
    instructions: Yup.string()
    .min(10, "*Debe tener al menos 10 caracteres")
    .max(1000, "*Debe tener como máximo 1000 caracteres")
    .required("*Es obligatorio escribir las instrucciones"),
    publicationDate: Yup.date()
    .nullable()
    .required("*Debe escribir una fecha de publicación")
    .min(new Date()+1, "debe ser posterior a la fecha actual")

  });

function FormikExample() {
    
    let navigate = useNavigate();
    
    return (
        <Formik
            initialValues={{ type: '', name: '', instructions: '', publicationDate: null }}
            validationSchema={validationSchema}
/*            validate={(values) => {
                let errors = {};

                if (!values.name) {
                    errors.name = 'Escriba un título';
                }

                if (!values.instructions) {
                    errors.instructions = 'Escriba las instrucciones';
                }
                return errors;
            }}*/

            onSubmit=
                {(values,{setSubmitting}) => {
                    setSubmitting(true);
                    console.log(values);
                    sessionStorage.setItem('exam',JSON.stringify(values));
                    navigate("/app/examQuestions");
                    }
                }
        >
            {({errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting}) => (
                <Card >
                    {console.log("RE-RENDER!")}
                    <Card.Header><div className="mx-auto fw-bold">Crear una plantilla</div></Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Container>
                                <Row className="mb-3">
                                    <Col xs={2} className="fw-bold">
                                        Tipo:
                                    </Col>
                                    <Col>
                                        <Form.Check type="radio" name="type" value="I" inline label="Plantilla individual"
                                            onChange={handleChange} onBlur={handleBlur}   />
                                        <Form.Check type="radio" name="type" value="G" inline label="Plantilla grupal" 
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="type">
                                            { msg => <Form.Text className="text-danger">{msg}</Form.Text>}</ErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={2} className="fw-bold">
                                        Título:
                                    </Col>
                                    <Col>
                                        <Form.Control id="name" name="name" type="text" placeholder="Escribe el título de la plantilla"
                                            maxLength={100}  onChange={handleChange} onBlur={handleBlur}/>
                                            <ErrorMessage name="name">
                                            { msg => <Form.Text className="text-danger">{msg}</Form.Text>}</ErrorMessage>
                                        {/*errors.name&&touched.name&&<Form.Text className="text-danger">{errors.name}</Form.Text>*/}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={2} className="fw-bold">
                                        Descripción:
                                    </Col>
                                    <Col>
                                        <Form.Control id="instructions" name="instructions" type="text" as="textarea"
                                            rows={5} maxLength={500} placeholder="instrucciones de la plantilla"
                                            onChange={handleChange} onBlur={handleBlur}/>
                                        {errors.instructions&&touched.instructions&&<Form.Text className="text-danger">{errors.instructions}</Form.Text>}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={2} className="fw-bold">
                                        Fecha límite:
                                    </Col>
                                    <Col>
                                        <Form.Control name="publicationDate" id="publicationDate" type="date"
                                            onChange={handleChange} onBlur={handleBlur} />
                                        {errors.publicationDate&&touched.publicationDate&&<Form.Text className="text-danger">{errors.publicationDate}</Form.Text>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="row justify-content-center">
                                        <Button className="w-50 mb-3" variant="primary" type="submit" disabled={isSubmitting}>
                                            Crear Plantilla
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>

            )}

        </Formik>
    );

}

export default FormikExample;