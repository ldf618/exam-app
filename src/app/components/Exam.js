import { Card } from 'react-bootstrap';
import React from 'react';
import ExamHeader from './ExamHeader';

function Exam() {

    var exam = sessionStorage.getItem('exam');    
    
    if (exam!=undefined){
        exam=JSON.parse(exam);
    } 
  
    alert (exam);
    return (
        <ExamHeader exam={exam}/>
    );
}    

export default Exam;