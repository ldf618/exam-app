import {Table, Spinner, Alert, Button} from 'react-bootstrap';
import { useEffect, useState} from "react";
import {findAllDegrees, findAllDegrees2} from '../apiCalls/api';

function DegreesTable (){
    const [isLoading, setIsLoading] = useState(true);
    const [degrees, setdegrees] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    /*
    const checkError = response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      };

    const buscarDatos = () => {
 
        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          };
        
        let controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 5000);
        console.log("inicio")
        fetch("http://localhost:8080/api/degrees",{signal})
            .then(checkError)
            .then((data) => {  
                console.log("data")            
                setdegrees(data);
                setIsLoading(false)
//                console.log(degrees);
            })
            .catch((error)=> {
                console.log(error);
            });  
            console.log("fin")
    };
    */

    const buscarDatos = () => {
         findAllDegrees()
             .then((data) => {  
                 setdegrees(data);
                 setIsLoading(false);
                 console.log(degrees);
             })
             .catch((error)=> {
                 console.log(error.name);
                 console.log(error);
                 setFetchError(true);
                 setIsLoading(false);
             });            
     };
      

    useEffect(() => {
        buscarDatos();
      }, []);

    
//    console.log("b:"+degrees)

    return (
        <>
        <Table>
            <thead>
                <tr><th>Id</th><th>Degree Title</th></tr>
            </thead>
            {!isLoading&&!fetchError&&
            <tbody>
                {degrees.map(degree=>{return(<tr key={degree.id}><td>{degree.id}</td><td>{degree.name}</td></tr>) })}
            </tbody>
            }
        </Table>
        {fetchError&&<Alert variant="danger">Error al recuperar los datos ...</Alert>}
        {isLoading&&<div>...cargando &nbsp; <Spinner animation="border" variant="primary" /></div>}
        {/*isLoading&&<Button onClick={buscarDatos}>cargar</Button>*/}
        </>
    )

};

export default DegreesTable;