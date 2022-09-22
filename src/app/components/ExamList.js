import { Table, Dropdown, DropdownButton, Popover, OverlayTrigger } from 'react-bootstrap';
import PaginationComponent from './PaginationComponent.js';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { searchExam } from '../apiCalls/api';

function ExamList({pageSize, initExams, searchCriteria}) {
    const navigate = useNavigate();

    //Exams shown in Table
    const [exams,setExams]=useState(initExams);

    //Max visible pages in pagination component
    const paginationPages = 5;

    //total pages searched
    const totalPages = exams.totalPages>paginationPages?paginationPages:exams.totalPages;

    //[1,2, ... paginationPages]
    const initPages = Array.from({length: totalPages}, (v, i) => i+1);
   
    //active page in pagination component
    const [activePage,setActivePage]=useState(1);

    //visible pages in pagination component
    const [pages, setPages]=useState(initPages);

    function searchExams(){
        searchExam(searchCriteria)
        .then(
            function(data){ 
                setExams(data);
//                setIsLoading(false);
            },
            function(err) {
                Promise.resolve(err).then(err=>{console.error(err.toString())/*setSaveError(err.toString())*/})
            }
        )
    }
      
    function pageClicked(page){
        setActivePage(page)
        searchCriteria.pageNumber=page-1;
        searchExams();
    }

    function pageNext(){
        pageClicked(activePage+1);
    }

    function pagePrev(){
        pageClicked(activePage-1);
    }

    function pageFirst(){
        pageClicked(1);
    }

    function pageLast(){
        pageClicked(totalPages);
    }

    function publish(index){
        let newExams =[...exams]
        newExams[index].published=true;
        //Here it should be persisted
        setExams(newExams);        
    }

    function modify(index){
        sessionStorage.setItem('exam', JSON.stringify(exams[index]));
        navigate("/app/exam");
    }


    return (
        <>
            <div className="mt-3 d-flex align-items-center justify-content-center">
            <PaginationComponent pages={pages} activePage={activePage} totalPages={totalPages} 
                onPageClick={pageClicked} onPageFirst={pageFirst} onPageLast={pageLast} onPagePrev={pagePrev} onPageNext={pageNext} /> 
            </div>        
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th minwidth="75%">Título</th>
                        <th>Autor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.content
                        .map((exam, index) => {
                            return (

                                <tr key={index}>
                                <OverlayTrigger delay={{ show: 250, hide: 400 }}  placement="auto" 
                                overlay={
                                        <Popover style={{ maxWidth: "100%" }}>                                                   
                                        <Popover.Body>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Creado</th>
                                                        <th>Modificado</th>
                                                        <th>Tipo</th>
                                                        <th>Publicado</th>
                                                    </tr>
                                                </thead>
                                                <tbody><tr>
                                                <td>{exam.creationDate}</td>
                                                <td>{exam.changeDate}</td>
                                                <td>{exam.type}</td>
                                                <td>{exam.published?"Si":"No"}</td>
                                                </tr></tbody>
                                            </Table>                                           
                                        </Popover.Body>
                                      </Popover>}>                 
                                    <td>{exam.name}</td>
                                    </OverlayTrigger>                                    
                                    <td>{exam.consultant.username}</td>
                                    <td>
                                        <DropdownButton title=" " drop="start" size="sm" >
                                            <Dropdown.Item disabled={exam.published} onClick={()=>publish(index)} >Publicar</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>modify(index)} >Modificar</Dropdown.Item>
                                        </DropdownButton >
                                    </td>                                    
                                </tr>                              
                                )
                        }
                        )
                    }
                </tbody>
            </Table>
            <div className="d-flex align-items-center justify-content-center">
            <PaginationComponent pages={pages} activePage={activePage} totalPages={totalPages} 
                onPageClick={pageClicked} onPageFirst={pageFirst} onPageLast={pageLast} onPagePrev={pagePrev} onPageNext={pageNext} />
            </div>
        </>
    );
}

export default ExamList;