import { Button, Stack, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState, useContext } from 'react';
import { OptionsContext } from './OptionsForm';

function OptionForm({ /*option,*/ checkType, index, onDelete, edited = false }) {

    /*
    const [text, setText] = useState(option.text); 
    const [isTrue, setIsTrue] = useState(option.isTrue); 
    */

    const [showEdit, setShowEdit] = useState(edited); 
    const [initialText, setInitialText] = useState(''); 

    const { options, setOptions } = useContext(OptionsContext);


    function setText(value){
        options[index].text=value;
        setOptions(options);
    }
    
    function setIsTrue(){        
        if (checkType=='radio'){
            options.forEach(option=>option.isTrue=false)
            options[index].isTrue=true;
        }
        setOptions(...options);
    }

    function modifyQuestion (){
        setInitialText(options[index].text);
        setShowEdit(true);
    }

    function cancelModify (){   
        setShowEdit(false);
        options[index].text=initialText;        
    }

    return (
        <tr>
            <td>
                <Button size="sm" disabled={showEdit} onClick={()=>onDelete(index)}><FontAwesomeIcon icon={solid('trash-can')} /></Button>
            </td>            
            <td>
                <Button size="sm" disabled={showEdit} onClick={modifyQuestion}><FontAwesomeIcon icon={solid('pen-to-square')} /></Button>
            </td>
            <td>
                {
                    showEdit &&
                    <Stack direction="horizontal" gap={2}>
                        <Form.Control as="textarea" rows={1} size="sm" value={options[index].text/*text*/} onChange={(e)=>setText(e.target.value)}></Form.Control>
                        <Button size="sm" variant="secondary" onClick={cancelModify}><FontAwesomeIcon icon={solid('xmark')} /></Button>
                        <Button size="sm" onClick={()=>setShowEdit(false)}><FontAwesomeIcon icon={solid('check')} /></Button>                        
                    </Stack>                    
                }
                {!showEdit && options[index].text /*text*/}
            </td>
            <td align="center">
                <Form.Check type={checkType} name="true" checked={options[index].isTrue /*isTrue*/} onChange={()=>setIsTrue(/*!isTrue*/)}></Form.Check>
            </td>
        </tr>
    );
}

export default OptionForm;