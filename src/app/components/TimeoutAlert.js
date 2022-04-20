import { Alert } from 'react-bootstrap';
import React, { useState }    from 'react';

function TimeoutAlert({show, timeout, children, ...props}) {
    
    const [alertShow, setAlertShow] = useState(show);
    /*
    var myProps=Object.assign({},props);
    delete myProps.show;
    */
    
    if  (typeof timeout !='undefined' && show){
        setTimeout(() => {setAlertShow(false)}, timeout);
    }

    return (
        <Alert show={alertShow} {...props} >{children}</Alert>
    );
}

export default TimeoutAlert;