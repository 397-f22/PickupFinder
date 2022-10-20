import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

const Alert = ({alertId, alert, toggleEvent}) => {
         return (
            <>
                 <ListGroup.Item>
                  {alert}
                  <Form.Check 
                     type='checkbox'
                     onClick= {() => toggleEvent(alertId)}
                  />
                  </ListGroup.Item>
            </>
         );
       }

export default Alert