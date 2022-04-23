import { Button, Stack, Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { useState } from 'react';
import OptionForm from './OptionForm';

const initOptions = [
    {id:1,text:'opcion 1',isTrue:true},
    {id:2,text:'opcion 2',isTrue:false},
    {id:3,text:'Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur enim, consectetur. Cumque deleniti temporibus',isTrue:false}
]

function OptionsForm() {

    
    const [options, setOptions] = useState(initOptions);

    function addOption (){
        setOptions([...options,{text:'',isTrue:false}])
    }

    function deleteOption (index){
        options.splice(index,1);
        setOptions([...options]);
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th className="text-center" width="5%">
                            <FontAwesomeIcon icon={solid('trash-can')} />
                        </th>
                        <th className="text-center" width="5%">
                            <FontAwesomeIcon icon={solid('pen')} />
                        </th>                        
                        <th width="70%">
                            Enunciado opción
                        </th>
                        <th width="10%" align="right">
                            ¿Verdadero?
                        </th>
                    </tr>
                </thead>
                <tbody>
                {options.map((option, index) => {return (<OptionForm onDelete={deleteOption} checkType="radio" option={option} key={index} index={index}/>)})}

                </tbody>
            </Table>

            <Button className="mt-2" onClick={addOption}>Añadir opción</Button></>
    );
}

export default OptionsForm;