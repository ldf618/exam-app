import { Button, Stack, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState } from 'react';

function OptionForm({ option, checkType, index, onDelete, edited = false }) {

    const [showEdit, setShowEdit] = useState(edited); 
    const [text, setText] = useState(option.text); 
    const [isTrue, setIsTrue] = useState(option.isTrue); 

    return (
        <tr>
            <td>
                <Button size="sm" disabled={showEdit} onClick={()=>onDelete(index)}><FontAwesomeIcon icon={solid('trash-can')} /></Button>
            </td>            
            <td>
                <Button size="sm" disabled={showEdit} onClick={()=>setShowEdit(true)}><FontAwesomeIcon icon={solid('pen-to-square')} /></Button>
            </td>
            <td>
                {
                    showEdit &&
                    <Stack direction="horizontal" gap={2}>
                        <Form.Control as="textarea" rows={1} size="sm" value={text} onChange={(e)=>setText(e.target.value)}></Form.Control>
                        <Button size="sm" onClick={()=>setShowEdit(false)}><FontAwesomeIcon icon={solid('check')} /></Button>
                    </Stack>                    
                }
                {!showEdit && text}
            </td>
            <td align="center">
                <Form.Check type={checkType} name="true" checked={isTrue} onChange={()=>setIsTrue(!isTrue)}></Form.Check>
            </td>
        </tr>
    );
}

export default OptionForm;