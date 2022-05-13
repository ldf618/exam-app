import { Table, Dropdown, DropdownButton, Pagination } from 'react-bootstrap';
import {getExams, getPageExams} from './../examData.js';

function ExamList() {

    let exams = getPageExams(1,5);//getExams();

    return (
        <>
        <Table className="mt-3" striped bordered responsive>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Creado</th>
                    <th>Modificado</th>
                    <th>Tipo</th>
                    <th>Publ</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {exams
                    .map((exam, index) => {
                        return (
                            <tr key={index}>
                                <td>{exam.title}</td>
                                <td>{exam.consultant}</td>
                                <td>{exam.creationDate}</td>
                                <td>{exam.changeDate}</td>
                                <td>{exam.type}</td>
                                <td>{exam.publised}</td>
                                <td>
                                    <DropdownButton title=" " drop="start" size="sm" >
                                        <Dropdown.Item >Publicar</Dropdown.Item>
                                        <Dropdown.Item >Modificar</Dropdown.Item>
                                    </DropdownButton >
                                </td>
                            </tr>)}
                    )
                }
                </tbody>
        </Table>
        <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>    
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item> 
            <Pagination.Next />
      </Pagination>
      </>
    );
}

export default ExamList;