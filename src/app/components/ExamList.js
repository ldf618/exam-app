import { Table, Dropdown, DropdownButton, Pagination, Popover, OverlayTrigger, Stack } from 'react-bootstrap';
import { getExams, getPageExams, getNumExams} from './../examData.js';
import { useState} from 'react';

function ExamList({pageSize}) {

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

    return (
        <>
            <div className="mt-3 d-flex align-items-center justify-content-center">
                <Pagination >
                    <Pagination.First disabled={activePage===1} onClick={()=>pageFirst()} />
                    <Pagination.Prev disabled={activePage===1} onClick={()=>pagePrev()} />
                    {
                    pages.map((page,index) =>{
                            return(
                                <Pagination.Item key={index} active={page === activePage}  onClick={()=>pageClicked(page)}>
                                {page}
                                </Pagination.Item>
                            )})
                    }
                    <Pagination.Next onClick={()=>pageNext(totalPages)} disabled={activePage===totalPages}/>
                    <Pagination.Last onClick={()=>pageLast()} disabled={activePage===totalPages}/>
                </Pagination>
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
                                                <td>{exam.publised?"Si":"No"}</td>
                                                </tr></tbody>
                                            </Table>                                           
                                        </Popover.Body>
                                      </Popover>}>                 
                                    <td>{exam.title}</td>
                                    </OverlayTrigger>                                    
                                    <td>{exam.consultant}</td>
                                    <td>
                                        <DropdownButton title=" " drop="start" size="sm" >
                                            <Dropdown.Item >Publicar</Dropdown.Item>
                                            <Dropdown.Item >Modificar</Dropdown.Item>
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
                <Pagination >
                    <Pagination.First />
                    <Pagination.Prev onClick={()=>pagePrev()} />
                    <Pagination.Item key={1} onClick={()=>pageClicked(1)}>{1}</Pagination.Item>
                    <Pagination.Item key={2} onClick={()=>pageClicked(2)}>{2}</Pagination.Item>
                    <Pagination.Item key={3} onClick={()=>pageClicked(3)}>{3}</Pagination.Item>
                    <Pagination.Item key={4} onClick={()=>pageClicked(4)}>{4}</Pagination.Item>
                    <Pagination.Item key={5} onClick={()=>pageClicked(5)}>{5}</Pagination.Item>
                    <Pagination.Next onClick={()=>pageNext()} />
                    <Pagination.Last/>
                </Pagination>
            </div>
        </>
    );
}

export default ExamList;