import React, { useState} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup } from 'react-bootstrap';
import { alertNotification } from "../../mockData";
import Alert from './Alert';
import ConfirmAlertDelete from './confirmAlertDelete';


const Notification = () => {
     const [alerts, setAlerts] = useState(alertNotification)
     const [alToDel, setAlToDel] = useState(-1)
     const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);


     // const addAlert = (alert) => {
     //      setAlerts({ ...alerts, [Object.entries(alerts).length + 1]:alert }); 
     //      }
     
     const toggleEvent = (alertId) => {
          setAlToDel(alertId)
          setIsConfirmModalVisible(true);
     }

     const deleteAlert = () => {
          const newAlerts = { ...alerts };
          delete newAlerts[alToDel];
          setIsConfirmModalVisible(false);
          setAlToDel(-1);
          setAlerts(newAlerts);
     }
       
     
       
     return (
     <Row>
          <Col md={6} className="mb-2">
               <ListGroup>
                    {Object.entries(alerts).map(([id, alert])=> 
                    <div>
                    <Alert alertId={id} alert={alert}  toggleEvent={toggleEvent}/>
                    </div>
                    )}
               </ListGroup>
          </Col>
          <ConfirmAlertDelete
            del={deleteAlert}
            showModal={isConfirmModalVisible}
            hide={() => setIsConfirmModalVisible(false)}
          />
     </Row>
     );
}

export default Notification;