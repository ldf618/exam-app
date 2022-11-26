import { searchExam } from '../apiCalls/api';
import { Table } from 'react-bootstrap';
import { useEffect, useState } from "react";

/*
private String name;
private Exam.ExamType type; 
private Boolean published; 
private Boolean notPublished; 
private LocalDate startDate; 
private LocalDate endDate;
*/

const criteria = {
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
        searchExam(criteria)
        .then(
            function(data){ 
                setExams(data);
                setIsLoading(false);
            },
            function(err) {
                Promise.resolve(err).then(err=>{console.error(err.toString())/*setSaveError(err.toString())*/})
            }
        )
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Table>
            <thead>
                <tr><th>id</th><th>Exam Title</th></tr>
            </thead>
            {!isLoading &&
            <tbody>
                {exams.content.map(exam => { return (<tr key={exam.id}><td>{exam.id}</td><td>{exam.name}</td></tr>) })}
            </tbody>
            }
        </Table>
    );

}

export default Test;