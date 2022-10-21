import React, { useState} from 'react';
import { alertNotification } from "../mockData";

export const useAddAlert = ({alert}) => {
     const [alerts, setAlerts] = useState(alertNotification)
     setAlerts({ ...alerts, [Object.entries(alerts).length + 1]:alert }); 
          
     return ([alerts])
}