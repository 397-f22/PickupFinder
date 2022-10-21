import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';

const Alert = ({alertId, alert, toggleEvent, uncheckAll}) => {
   const [checked, setChecked] = useState(false)
   const handleOnChange = () => {
      setChecked(!checked)
      toggleEvent(alertId)
   }
         return (
            <Row>
                  <Form.Check className='col-1 my-auto'
                     id = {alertId}
                     type='checkbox'
                     checked = {uncheckAll===null? null: (checked && uncheckAll)}
                     onChange= {() => handleOnChange()}
                  /> 
                 <ListGroup.Item className='mb-3 col bg-light'>
                  <Row>
                     {alert.title && <h5 className='col-3 my-auto py-2 bg-white text-center'> {alert.title} </h5>}
                     <div className='col'> {alert.message} </div>
                  </Row>
                  
                  </ListGroup.Item>
            </Row>
         );
       }

export default Alert