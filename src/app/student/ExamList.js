import {useState} from 'react';
import { Table, Popover, OverlayTrigger } from 'react-bootstrap';
import PaginationComponent from '../components/PaginationComponent.js';
import ExamListMenu from './ExamListMenu';

function ExamList({exams, pages, activePage, pageClicked, pageFirst, pageLast, pagePrev, pageNext, viewExam, createExamAnswers}) {

    const [selectedExam, setSelectedExam] = useState();

    return (
        <>
            <div className="mt-3 d-flex align-items-center justify-content-center">
            <PaginationComponent pages={pages} activePage={activePage} totalPages={exams.totalPages} 
                onPageClick={pageClicked} onPageFirst={pageFirst} onPageLast={pageLast} onPagePrev={pagePrev} onPageNext={pageNext} /> 
            </div> 
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th width="90%" >Título</th>
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
                                                        <th>Tipo</th>
                                                    </tr>
                                                </thead>
                                                <tbody><tr>
                                                <td>{new Date (exam.creationDate).toLocaleDateString()}</td>
                                                <td>{exam.type}</td>
                                                </tr></tbody>
                                            </Table>                                           
                                        </Popover.Body>
                                      </Popover>}>                 
                                    <td>{exam.name}</td>
                                    </OverlayTrigger>                                    
                                    <td>
                                        <ExamListMenu index={index} viewExam={viewExam} createExamAnswers={createExamAnswers}/>
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