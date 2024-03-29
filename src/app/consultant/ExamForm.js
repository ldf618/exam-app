import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import StateManager from '../utils/StateManager';

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
    deadline: Yup.date()
        .nullable()
        .required("*Debe escribir una fecha de publicación")
        .min(new Date() + 1, "debe ser posterior a la fecha actual")

});

function ExamForm(props) {

    let navigate = useNavigate();
    const exam = props.exam;
    const modify = props.modify;
    var initial = {};

    if (exam === undefined)
        initial = { type: '', name: '', instructions: '', deadline: '' };
    else
        initial = exam;

    return (
        <Formik
            initialValues={initial}
            enableReinitialize={true}
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

            onSubmit={
                (values, { setSubmitting }) => {
                    setSubmitting(true);
                    StateManager.saveState('exam', values);
                    if (modify) {
                        props.changeEditable(false);
                    } else {
                        navigate("/app/exam");
                    }
                }
            }
        >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
                <Card >
                    <Card.Header><div className="mx-auto fw-bold">{modify ? "Modificar" : "Crear"} una plantilla</div></Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Container>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label as="strong">Tipo:&nbsp; </Form.Label>
                                            <Form.Check type="radio" name="type" value="INDIVIDUAL" checked={values.type == 'INDIVIDUAL' ? true : false}
                                                inline label="Plantilla individual" onChange={handleChange} onBlur={handleBlur} />
                                            <Form.Check type="radio" name="type" value="GROUP" checked={values.type ==   'GROUP' ? true : false}
                                                inline label="Plantilla grupal" onChange={handleChange} onBlur={handleBlur} />
                                            <ErrorMessage name="type">
                                                {msg => <Form.Text className="text-danger">{msg}</Form.Text>}</ErrorMessage>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">

                                    <Col>
                                        <Form.Label as="strong">Título:&nbsp; </Form.Label>
                                        <Form.Control id="name" name="name" type="text" placeholder="Escribe el título de la plantilla"
                                            maxLength={100} value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="name">
                                            {msg => <Form.Text className="text-danger">{msg}</Form.Text>}</ErrorMessage>
                                        {/*errors.name&&touched.name&&<Form.Text className="text-danger">{errors.name}</Form.Text>*/}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Label as="strong">Descripción:&nbsp; </Form.Label>
                                        <Form.Control id="instructions" name="instructions" type="text" as="textarea"
                                            rows={5} maxLength={500} value={values.instructions} placeholder="instrucciones de la plantilla"
                                            onChange={handleChange} onBlur={handleBlur} />
                                        {errors.instructions && touched.instructions && <Form.Text className="text-danger">{errors.instructions}</Form.Text>}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col lg="2">
                                        <Form.Label as="strong">Fecha Límite:&nbsp; </Form.Label>
                                        <Form.Control name="deadline" id="deadline" type="date" value={values.deadline}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        {errors.deadline && touched.deadline && <Form.Text className="text-danger">{errors.deadline}</Form.Text>}
                                    </Col>
                                </Row>
                                <Row>
                                {modify &&
                                    <Col className="row justify-content-center">
                                        <Button className="w-75 mb-3" variant="secondary" onClick={() => props.changeEditable(false)}>
                                            Cancelar
                                        </Button>
                                    </Col>
                                }
                                    <Col className="row justify-content-center">
                                        <Button className="w-75 mb-3" variant="primary" type="submit" disabled={isSubmitting}>
                                            {modify ? "Modificar" : "Crear"} 
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

export default ExamForm;