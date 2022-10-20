import { ListGroup } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';

const Alert = ({alertId, alert, toggleEvent}) => {
         return (
            <>
                 <ListGroup.Item>
                  {alert}
                  <CloseButton aria-label="Hide" onClick= {() => toggleEvent(alertId)}/>
                  </ListGroup.Item>
            </>
         );
       }

export default Alert