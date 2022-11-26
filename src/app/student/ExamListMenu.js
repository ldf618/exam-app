import { Dropdown, DropdownButton } from 'react-bootstrap';

function ExamListMenu({index, viewExam, createExamAnswers}){
    return (
    <DropdownButton title=" " drop="start" size="sm" >
        <Dropdown.Item onClick={()=>viewExam(index)} >Ver examen</Dropdown.Item>
        <Dropdown.Item onClick={()=>createExamAnswers(index)} >Responder examen</Dropdown.Item>
    </DropdownButton >
    )
}

export default ExamListMenu;