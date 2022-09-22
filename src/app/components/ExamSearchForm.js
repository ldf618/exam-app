import { useState } from 'react';
import { Accordion, Form, Row, Col, Container, Stack, Button } from 'react-bootstrap';
import ExamList from './ExamList';
import { searchExam } from '../apiCalls/api';

function ExamSearchForm(props) {    

    const [params, setParams]=useState({name:'',startDate:'',endDate:'',type:'', status:'',pageNumber:0,pageSize:5});
    const [validatedForm, setValidatedForm] = useState(false); 
    const [Exams, setExams] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [searchCriteria, setSearchCriteria] = useState({});
    //const [validDate, setValidDate] = useState(true);

    function submitSearch(e){ 
        const form = e.currentTarget;
        e.preventDefault();
        if (validateData()||form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            //console.log(title); //console.log(startDate); //console.log(endDate); //console.log(type);  //console.log(status);
            //validateData()
            searchExams();
        }
        setValidatedForm(true);        
    }

    function searchExams(){

        const criteria = {};
        for (var member in params) if (params[member]!=='') criteria[member]=params[member];

/*        if (params.name !=='') criteria.name=params.name;
        if (params.startDate !=='') criteria.startDate=params.startDate;
        if (params.endDate !=='') criteria.endDate=params.endDate;
        if (params.type !=='') criteria.type=params.type;
        if (params.status !=='') criteria.status=params.status;
        criteria.pageNumber=params.pageNumber;
        criteria.pageSize=params.pageSize;*/
        
        setSearchCriteria({...criteria});

        searchExam(criteria)
        .then(
            function(data){ 
                setExams(data);
                setIsLoading(false);
            },
            function(err) {
                Promise.resolve(err).then(err=>{console.error(err.toString())/*setSaveError(err.toString())*/})
            }
        )
    }

    function validateData(){ 
/*        console.log(validatedForm);
        console.log(startDate);
        console.log(endDate);*/
        if ((!validatedForm)||(params.startDate === '')||(params.endDate === '')){            
            //console.log("validate Data false");
            return false; //isInvalid=false
        }            
        else if (params.startDate>params.endDate){
            //console.log("validate Data true");
            return true; //isInvalid=true
        }
    }

    const handleChange = (event) => {
        setParams({ ...params, [event.target.name]: event.target.value });
      };


    return (
        <>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" >
                <Accordion.Header><h5 className="mx-auto">Busqueda de plantillas</h5></Accordion.Header>
                <Accordion.Body>
                    <Form id="searchForm" noValidate validated={validatedForm}  onSubmit={submitSearch} >
                        <Container>
                            <Row className="mb-1">
                                <Col>
                                    <Form.Group>
                                        <Form.Label as="strong">Título de la plantilla:&nbsp; </Form.Label>
                                        <Form.Control name="name" type="text" placeholder="Título" value={params.name} onChange={handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col>
                                    <Stack gap={2}>
                                        <fieldset className="border p-2">
                                            <legend className="float-none w-auto">Tipo:</legend>
                                            <Form.Group >
                                                <Form.Check type="radio" name="type" value="I" onChange={handleChange} inline label="Plantilla individual" />
                                                <Form.Check type="radio" name="type" value="G" onChange={handleChange} inline label="Plantilla grupal" />
                                            </Form.Group>
                                        </fieldset>
                                        <fieldset className="border p-2">
                                            <legend className="float-none w-auto">Estado:</legend>
                                            <Form.Group>
                                                <Form.Check type="radio" name="status" value={true} onChange={handleChange} inline label="Publicada" />
                                                <Form.Check type="radio" name="status" value={false} onChange={handleChange} inline label="Sin Publicar" />
                                            </Form.Group>
                                        </fieldset>
                                    </Stack>
                                </Col>
                                <Col>
                                    <fieldset className="border p-2">
                                        <legend className="float-none w-auto">Fecha creación</legend>
                                        <Form.Group>
                                            <Form.Label as="strong">Desde:&nbsp; </Form.Label>
                                            <Form.Control type="date"
                                                    name="startDate" 
                                                    value={params.startDate}
                                                    isInvalid={validateData()}
                                                    onChange={handleChange}/>
                                            <Form.Control.Feedback type="invalid">Fecha Erronea!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label as="strong">Hasta:&nbsp; </Form.Label>
                                            <Form.Control type="date" 
                                                name="endDate"
                                                value={params.endDate}
                                                isInvalid={validateData()}
                                                onChange={handleChange}/>
                                            <Form.Control.Feedback type="invalid">Fecha Erronea!</Form.Control.Feedback>
                                            <Form.Text className="text-muted">La fecha desde debe ser mayor que la fecha hasta.</Form.Text>
                                        </Form.Group>
                                    </fieldset>
                                </Col>                               
                            </Row>
                            <Row className="text-center">
                            <Col><Button  className="w-50 mt-2" type="submit" form="searchForm">Buscar</Button></Col>
                            </Row>
                        </Container>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        {!isLoading && <ExamList pageSize={5} initExams={Exams} searchCriteria={searchCriteria}></ExamList>}
</>
    );

}

export default ExamSearchForm;