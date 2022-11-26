import {useState} from 'react';
import { Table, Dropdown, DropdownButton, Popover, OverlayTrigger } from 'react-bootstrap';
import PaginationComponent from '../components/PaginationComponent.js';
import ConfirmDialog from '../components/ConfirmDialog';

function ExamList({exams, pages, activePage, pageClicked, pageFirst, pageLast, pagePrev, pageNext, publishExam, modifyExam, deleteExam}) {

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedExam, setSelectedExam] = useState();

    function handleConfirm() {
        setShowConfirm(false);
        setSelectedExam();
        deleteExam(selectedExam); //dispatch({ type: actions.REMOVE, payload: selectedQuestion });        
    }

    function handleCancel() {
        //console.log("handleCancel");
        setSelectedExam();
        setShowConfirm(false);
    }

    function showDeleteConfirm(index) {
        //show confirm
        setSelectedExam(index);
        setShowConfirm(true);
    }

    return (
        <>
            <div className="mt-3 d-flex align-items-center justify-content-center">
            <PaginationComponent pages={pages} activePage={activePage} totalPages={exams.totalPages} 
                onPageClick={pageClicked} onPageFirst={pageFirst} onPageLast={pageLast} onPagePrev={pagePrev} onPageNext={pageNext} /> 
            </div> 
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th width="75%">Título</th>
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
                                                <td>{new Date (exam.creationDate).toLocaleDateString()}</td>
                                                <td>{new Date (exam.changeDate).toLocaleDateString()}</td>
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
                                            <Dropdown.Item onClick={()=>showDeleteConfirm(index)} >Eliminar</Dropdown.Item>
                                            <ConfirmDialog show={showConfirm} message="¿Seguro que desea eliminar la plantilla?" onConfirm={handleConfirm} onCancel={handleCancel} />
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