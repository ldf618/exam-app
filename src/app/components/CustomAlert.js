import { Alert } from 'react-bootstrap';
import React, { useState }    from 'react';

function CustomAlert(props) {

    const [alertShow, setAlertShow] = useState(props.show);
    const timeout=props.timeout;
    var myProps=Object.assign({},props);

    console.log(myProps)
    delete myProps.show;
    console.log(myProps)
    const properties = Object
        .entries(props)
        .map(([key, value])=>{
            if (key !='children') return (`${key}=${value}`)})
        //.join(' ').toString();
        console.log(properties.toString())
    
    //console.log(timeout)
    if  (typeof timeout !='undefined'){
        setTimeout(() => {setAlertShow(false)}, timeout);
    }

    return (
        <Alert show={alertShow} {...myProps} ></Alert>
    );
}

export default CustomAlert;