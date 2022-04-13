import { Card } from 'react-bootstrap';
import React,{useState} from 'react';
import ExamHeader from './ExamHeader';
import CreateExam from './CreateExam';
import {useNavigate} from "react-router-dom";

function Exam() {
    let navigate = useNavigate();
    const [editableHeader, setEditableHeader] = useState(true);

    var exam = sessionStorage.getItem('exam'); 
    
    function changeEditableHeader (value){
        setEditableHeader(value);
    }
    
    if (exam!=undefined){
        exam=JSON.parse(exam);
    } 
  
    return (
        <>
       {editableHeader&&<ExamHeader exam={exam} changeEditable={changeEditableHeader}/>}
       {!editableHeader&&<CreateExam exam={exam} changeEditable={changeEditableHeader}/>}
       </>
    );
}    

export default Exam;