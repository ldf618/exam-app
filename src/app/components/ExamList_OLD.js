import { Table, Dropdown, DropdownButton, Popover, OverlayTrigger } from 'react-bootstrap';
import {getPageExams, getNumExams} from './../examData.js';
import PaginationComponent from './PaginationComponent.js';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';

function ExamList({pageSize}) {
    const navigate = useNavigate();

    //Number of visible pages in pagination component
    const paginationPages = 5;

    //total pages searched
    const totalPages = getNumExams()/pageSize;//getExams();

    //[1,2, ... paginationPages]
    const initPages = Array.from({length: paginationPages}, (v, i) => i+1);

    //Exams shown in Table
    const [exams,setExams]=useState(getPageExams(1, pageSize));
    
    //active page in pagination component
    const [activePage,setActivePage]=useState(1);

    //visible pages in pagination component
    const [pages, setPages]=useState(initPages);
      
    function pageClicked(page){
        setActivePage(page)
        setExams(getPageExams(page, parseInt(pageSize)));
    }

    function pageNext(){
        if(pages.at(-1)!==totalPages){
            //array shift to the right
            let newPages = [...pages]
            newPages.push(newPages.at(-1)+1); //add last+1
            newPages.shift(); //delete first
            setPages(newPages);
        }
        pageClicked(activePage+1);
    }

    function pagePrev(){
        if(pages.at(0)!==1){
            let newPages = [...pages]
            newPages.pop(); //delete last        
            newPages.splice(0,0,newPages[0]-1); //add on first position first value-1
            setPages(newPages);
        }
        pageClicked(activePage-1);
    }

    function pageFirst(){
        setPages(initPages)
        pageClicked(1);
    }

    function pageLast(){
        let newPages = Array(paginationPages).fill().map((_, i) => (totalPages-4) + i);
        console.log(newPages);
        console.log(totalPages);
        console.log(getNumExams());
        setPages(newPages)
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
                    {exams
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
                                                        <th>Moficado</th>
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
                                    <td>{exam.consultant}</td>
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