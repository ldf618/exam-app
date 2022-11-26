import { searchExam } from '../apiCalls/api';
import { Table } from 'react-bootstrap';
import { useEffect, useState } from "react";
import ExamList from '../consultant/ExamList';

/*
private String name;
private Exam.ExamType type; 
private Boolean published; 
private Boolean notPublished; 
private LocalDate startDate; 
private LocalDate endDate;
*/

const criteria = {
    "id":1,
    "name": "Exam"
   // ,"type": "INDIVIDUAL"//"GROUP"
   // ,"startDate": "2022-08-02"
   // ,"endDate": "2022-09-02"
   // ,"published": true
//      ,"pageNumber":0
//      ,"pageSize":2
      
  }

function Test (){
    
    const [exams,setExams]=useState();
    const [isLoading, setIsLoading] = useState(true);

    function loadData(){
        const options = {
            method: "POST",
            headers:{
              "Content-Type": "application/json", 
              "Accept":"application/json",
              "Access-Control-Allow-Origin": "*",
              "X-Requested-With": "XMLHttpRequest",
            },
            mode:"cors",
            credentials: 'include',
            body:JSON.stringify(criteria)//, signal:signal
        };
    
        fetch('http://localhost:8080/api/exam/test',options)
        .then(response => response.text())
        .then(text => {            
            try {
                console.log("antes de json")
                const data = JSON.parse(text);
                // Do your JSON handling here
                console.log("despues de json")
            } catch(err) {
                console.log("catch")
            }
            setExams(criteria);
            setIsLoading(false);            
          });

        
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            {exams?.id}
            {exams?.name}
        </div>
    );

}

export default Test;