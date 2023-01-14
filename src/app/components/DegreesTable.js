import { Table, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { findAllDegrees, saveDegree, existsByDegreeName } from '../apiCalls/api';

function DegreesTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [degrees, setDegrees] = useState([]);
    const [fetchError, setFetchError] = useState("");
    const [validatedForm, setValidatedForm] = useState(false);
    const [degreeName, setDegreeName] = useState("");
    const [saveError, setSaveError] = useState("");

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
                setDegrees(data);
                setIsLoading(false);
                console.log(degrees);
            })
            .catch((err) => {
                Promise.resolve(err).then(err=>{setFetchError(err.msg)})
                setIsLoading(false);
            });
    };


    useEffect(() => {
        buscarDatos();
    }, []);

    function save(data){
        saveDegree(data)
        .then(
            function(res){ 
                setDegrees([...degrees,res ])
                setDegreeName("")
                setSaveError("")
            },
            function(err) {
                //Promise.resolve(err) 'cause err can be a Promise or not
                Promise.resolve(err).then(err=>{setSaveError(err.msg)})
            }
        )
    }

    function test(data){
        existsByDegreeName(data)
        .then(
            function(res){ 
                if(!res){
                    save({/*"id":1,*/"name":degreeName.trim()})  
                    setValidatedForm(false)
                }
                else
                    setSaveError("La asignatura ya existe")
            },      
            function(err) {
                //Promise.resolve(err) 'cause err can be a Promise or not
                Promise.resolve(err).then(err=>{setSaveError(err.msg)})
            }
        )
    }

    function submit(e) {
        e.preventDefault();
        setValidatedForm(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{            
            //save({/*"id":1,*/"name":degreeName.trim()})        
            test(degreeName.trim())        
        }                
    }


    //    console.log("b:"+degrees)

    return (
        <>
            <Table>
                <thead>
                    <tr><th>Id</th><th>Degree Title</th></tr>
                </thead>
                {!isLoading && !fetchError &&
                    <tbody>
                        {degrees.map(degree => { return (<tr key={degree.id}><td>{degree.id}</td><td>{degree.name}</td></tr>) })}
                    </tbody>
                }
            </Table>
            {fetchError!=="" && <Alert variant="danger">Error al recuperar los datos ...{fetchError}</Alert>}
            {isLoading && <div>...cargando &nbsp; <Spinner animation="border" variant="primary" /></div>}
            {/*isLoading&&<Button onClick={buscarDatos}>cargar</Button>*/}
            <Form noValidate validated={validatedForm} onSubmit={submit} id="degreeForm">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre Asignatura</Form.Label>
                    <Form.Control type="text" maxLength={50} minLength={2} required placeholder="Teclea el nombre"
                                  value ={degreeName} onChange={(e)=>setDegreeName(e.target.value)} />
                    <Form.Text className="text-muted">
                        Mínimo 2 caracteres y Máximo 50.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">Debe escribir un nombre de asignatura con al menos 2 caracteres</Form.Control.Feedback>
                </Form.Group>
                {saveError!==""&&<Alert  variant="danger">Error, no se ha podido guardar la asignatura: {saveError}</Alert>}                
                <Button type="submit" form="degreeForm">añadir</Button>
            </Form>

        </>
    )

};

export default DegreesTable;