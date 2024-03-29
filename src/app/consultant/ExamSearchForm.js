import { useState, useEffect, useRef } from 'react';
import { Accordion, Form, Row, Col, Container, Stack, Button, Alert, ToastContainer } from 'react-bootstrap';
import ExamList from './ExamList';
import { useNavigate} from 'react-router-dom';
import { searchExam, updatePublicationDate, deleteExam as delExam, test } from '../apiCalls/api';
import CustomToastMsg from '../components/CustomToastMsg';
import {firstPageArray, lastPageArray, nextPageArray, prevPageArray, pageClickedArray} from '../components/PaginationComponent';
import StateManager from '../utils/StateManager';

function ExamSearchForm() {   
    
    const messagesEndRef = useRef(null)

    var course = StateManager.loadState('course')??{ "id": 0, "name": "" };
    //course = course !== 'undefined' ? JSON.parse(course) : { "id": 0, "name": "" }
    
    const navigate = useNavigate();

    const [params, setParams]=useState({name:'',startDate:'',endDate:'',type:'', published:''/*,pageNumber:0,pageSize:1*/});
    const [validatedForm, setValidatedForm] = useState(false); 
    const [exams, setExams] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    const [showToast, setShowToast] = useState(false);
    const [toastHeader, setToastHeader] = useState('');
    const [toastBody, setToastBody] = useState('');
    const [toastBg, setToastBg] = useState('primary');
   
    //Number of element data in each page
    const pageSize=6;
       
    //active page in pagination component 
    const [activePage,setActivePage]=useState(1);

    //visible page buttons in pagination component [1,2, ... paginationPages]
    const [pages, setPages]=useState([]);


    function scrollToBottom () {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }   

    function closeSaveToast(){
        setShowToast(false);
    }
    
    function goToPage(page) {
        setActivePage(page);
        searchExams(page -1);
    }

    function pageClick(page) {
        setPages(pageClickedArray(page,exams.totalPages));
        goToPage(page)
    }

    function pageNext() {
        setPages(nextPageArray(pages,exams.totalPages));
        goToPage(activePage + 1);
    }

    function pagePrev() {
        setPages(prevPageArray(pages));
        goToPage(activePage - 1);
    }

    function pageFirst() {
        setPages(firstPageArray(exams.totalPages));
        goToPage(1);
    }

    function pageLast() {
        setPages(lastPageArray(exams.totalPages));
        goToPage(exams.totalPages);
    }

    function publishExam(index){
        let newExams ={...exams}
        newExams.content[index].publicationDate=new Date().toISOString().slice(0, 10);
       //saveExam(newExams.content[index])
       updatePublicationDate({id:newExams.content[index].id,publicationDate:newExams.content[index].publicationDate})
        .then(
            function(data){ 
                //console.log(data);
                setExams(newExams); 
                setToastHeader('Examen publicado!');
                setToastBody('Se ha publicado el examen '+newExams.content[index].name);   
                setToastBg('info');   
                setShowToast(true);
            },
            function(err) {
                Promise.resolve(err).then(err=>{console.error(err.msg)/*setSaveError(err.toString())*/})
                setToastHeader('Error al publicar el examen!');
                setToastBody('No se ha podido publicar el examen '+newExams.content[index].name);   
                setToastBg('danger');   
                setShowToast(true);
            }
        )        
    }

    function deleteExam(index){
        console.log(index);
        let newExams ={...exams}
        //test(newExams.content[index])
        delExam(newExams.content[index])
        .then(
            function(data){ 
                setToastHeader('Examen eliminado!');
                setToastBody('Se ha eliminado el examen '+newExams.content[index].name);   
                setToastBg('info');   
                newExams.content.splice(index,1);
                setExams(newExams);                 
                setShowToast(true);
            },
            function(err) {
                Promise.resolve(err).then(err=>{console.error(err.msg)})
                setToastHeader('Error al borar el examen!');
                setToastBody('No se ha podido borrar el examen '+newExams.content[index].name);   
                setToastBg('danger');   
                setShowToast(true);
            }
        )        

    }

    function modifyExam(index){
        StateManager.saveState('exam', exams.content[index]);
        navigate("/app/exam");
    }

    function submitSearch(e){ 
        const form = e.currentTarget;
        e.preventDefault();
        if (validateData()||form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            setActivePage(1);            
            searchExams(0);
        }
        setValidatedForm(true); 
    }

    function searchExams(page){
        const criteria = {};
        for (var member in params) if (params[member]!=='') criteria[member]=params[member];      
        criteria.pageNumber=page;
        criteria.pageSize=pageSize;
        criteria.course = course;

        searchExam(criteria)
        .then(
            function(data){ 
                setExams(data);
                if (criteria.pageNumber===0) setPages(firstPageArray(data.totalPages));
                setIsLoading(false);
                console.log(data);
                scrollToBottom();
            },
            function(err) {
                Promise.resolve(err).then(err=>{console.error(err.msg)/*setSaveError(err.toString())*/})
            }
        )
    }

    function validateData(){ 
        if ((!validatedForm)||(params.startDate === '')||(params.endDate === '')){            
            return false; //isInvalid=false
        }            
        else if (params.startDate>params.endDate){
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
                                                <Form.Check type="radio" name="type" value="INDIVIDUAL"
                                                            onChange={handleChange} inline label="Plantilla individual" />
                                                <Form.Check type="radio" name="type" value="GROUP" 
                                                            onChange={handleChange} inline label="Plantilla grupal" />
                                            </Form.Group>
                                        </fieldset>
                                        <fieldset className="border p-2">
                                            <legend className="float-none w-auto">Estado:</legend>
                                            <Form.Group>
                                                <Form.Check type="radio" name="published" value={true} onChange={handleChange} inline label="Publicada" />
                                                <Form.Check type="radio" name="published" value={false} onChange={handleChange} inline label="Sin Publicar" />
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
                            <Col><Button className="w-50 mt-2" type="submit" form="searchForm">Buscar</Button></Col>
                            </Row>
                        </Container>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        {(!isLoading && exams.totalElements>0)&&
        <>
        <ExamList
            pages={pages} exams={exams} activePage={activePage} 
            pageClicked={pageClick} pageFirst={pageFirst} pageLast={pageLast} pagePrev={pagePrev} pageNext={pageNext}
            publishExam={publishExam} modifyExam={modifyExam} deleteExam={deleteExam} >
        </ExamList>      
        <ToastContainer  className="position-fixed" style={{zIndex: "1000"}} position="middle-center">        
            <CustomToastMsg show={showToast} onClose={closeSaveToast} delay={3000} header={toastHeader} body={toastBody} bg={toastBg}/>
        </ToastContainer>  
        </>
        }
        {(!isLoading && exams.totalElements===0)&&
        <Alert className="mt-2" variant="info"> 
            La búsqueda no ha encontrado ningún examen para la asignatura {course.name} !
        </Alert>
        }

        <div ref={messagesEndRef} />
</>
    );

}

export default ExamSearchForm;