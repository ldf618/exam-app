import { Table, Dropdown, DropdownButton, Popover, OverlayTrigger } from 'react-bootstrap';
import PaginationComponent from './PaginationComponent.js';

function ExamList({exams, pages, activePage, pageClicked, pageFirst, pageLast, pagePrev, pageNext, publishExam, modifyExam, deleteExam}) {

    return (
        <>
            <div className="mt-3 d-flex align-items-center justify-content-center">
            <PaginationComponent pages={pages} activePage={activePage} totalPages={exams.totalPages} 
                onPageClick={pageClicked} onPageFirst={pageFirst} onPageLast={pageLast} onPagePrev={pagePrev} onPageNext={pageNext} /> 
            </div> 
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th minwidth="75%">Título</th>
                        <th>Autor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style={{'height': '250px'}}>
                    {//(exams!==undefined) && 
                        exams.content.map((exam, index) => {
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
                                                <td>{exam.publicationDate!==null?"Si":"No"}</td>
                                                </tr></tbody>
                                            </Table>                                           
                                        </Popover.Body>
                                      </Popover>}>                 
                                    <td>{exam.name}</td>
                                    </OverlayTrigger>                                    
                                    <td>{exam.consultant.username}</td>
                                    <td>
                                        <DropdownButton title=" " drop="start" size="sm" >
                                            <Dropdown.Item disabled={exam.publicationDate!==null} onClick={()=>publishExam(index)} >Publicar</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>modifyExam(index)} >Modificar</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>deleteExam(index)} >Eliminar</Dropdown.Item>
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
            <PaginationComponent pages={pages} activePage={activePage} totalPages={exams.totalPages} 
                onPageClick={pageClicked} onPageFirst={pageFirst} onPageLast={pageLast} onPagePrev={pagePrev} onPageNext={pageNext} />
            </div>
        </>
    );
}

export default ExamList;