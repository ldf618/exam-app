import {Table, Spinner, Button} from 'react-bootstrap';
import { useEffect, useState} from "react";

function FetchExample (){
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const checkError = response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      };

    const buscarDatos = () => {
       /* 
        const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          };
        */
        
        let controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 5000);

        //https://restcountries.eu/rest/v2/all/
        fetch("https://jsonplaceholder.typicode.com/posts",{signal})
            .then(checkError)
            .then((data) => {              
                setUsers(data);
                setIsLoading(false)
//                console.log(users);
            })
            .catch((error)=> {
                console.log(error);
            });  
    };
      

    useEffect(() => {
        buscarDatos();
      }, []);

    
//    console.log("b:"+users)

    return (
        <>
        <Table>
            <thead>
                <tr><th>userId</th><th>id</th><th>title</th><th>body</th></tr>
            </thead>
            {!isLoading&&
            <tbody>
                {users.map(user=>{return(<tr key={user.id}><td>{user.userId}</td><td>{user.id}</td><td>{user.title}</td><td>{user.body}</td></tr>) })}
            </tbody>
            }
        </Table>
        {isLoading&&<div>...cargando &nbsp; <Spinner animation="border" variant="primary" /></div>}
        {/*isLoading&&<Button onClick={buscarDatos}>cargar</Button>*/}
        </>
    )

};

export default FetchExample;