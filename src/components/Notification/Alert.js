import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';

const Alert = ({alertId, alert, toggleEvent}) => {
         return (
            <Row>
                  <Form.Check className='col-1 my-auto'
                     type='checkbox'
                     onClick= {() => toggleEvent(alertId)}
                  />
                 <ListGroup.Item className='mb-3 col-6 bg-light'>
                  <Row> 
                     {alert.title && <h5 className='col-2 my-auto py-2 bg-white text-center'> {alert.title} </h5>}
                     <div className='col'> {alert.message} </div>
                  </Row>
                  
                  </ListGroup.Item>
            </Row>
         );
       }

export default Alert