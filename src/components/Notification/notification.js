import React, { useState} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup } from 'react-bootstrap';
import { alertNotification } from "../../mockData";
import Alert from './Alert';
import ConfirmAlertDelete from './confirmAlertDelete';
import Button from 'react-bootstrap/Button';


const Notification = () => {
     const [alerts, setAlerts] = useState(alertNotification)
     const [alToDel, setAlToDel] = useState(-1)
     const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
     
     
     const toggleEvent = (alertId) => {
          if (alToDel === -1) {
               setAlToDel([alertId])
               console.log("First item added")
          }
          
          else if (alToDel.includes(alertId)) {
               const newAlToDel = [ ...alToDel]
               const idx = newAlToDel.indexOf(alertId)
               newAlToDel.pop(idx)
               console.log(newAlToDel)
               if (newAlToDel.length === 0) setAlToDel(-1)
               else setAlToDel(newAlToDel)
               console.log(alToDel)
               
          }
          else setAlToDel([...alToDel, alertId])
     }

     const deleteAlert = () => {
          const newAlerts = { ...alerts };
          alToDel.forEach((a) => delete newAlerts[a]);
          setIsConfirmModalVisible(false);
          setAlToDel(-1);
          setAlerts(newAlerts);
     }
       
     console.log(alToDel)
       
     return (
     <>
               <ListGroup>
                    {Object.entries(alerts).map(([id, alert])=> 
                    <div>
                    <Alert alertId={id} alert={alert}  toggleEvent={toggleEvent}/>
                    </div>
                    )}
               </ListGroup>
          <Button
               disabled = {alToDel === -1}
               onClick= {() => setIsConfirmModalVisible(true)}> Delete </Button>
          <ConfirmAlertDelete
            del={deleteAlert}
            showModal={isConfirmModalVisible}
            hide={() => setIsConfirmModalVisible(false)}
          />
     </>
     );
}

export default Notification;