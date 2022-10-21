import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ListGroup } from "react-bootstrap";
import Alert from "./Alert";
import ConfirmAlertDelete from "./confirmAlertDelete";
import Button from "react-bootstrap/Button";
import { useDbData, useDbUpdate } from "../../utilities/firebase";

const Notification = ({ uid }) => {
  const [data, error] = useDbData(`/notifications/`);
  const [alToDel, setAlToDel] = useState(-1);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [updateNotifications, resultNotification] =
    useDbUpdate("/notifications/");
  const [uncheckAll, setUncheckAll] = useState(true);

  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  const alerts = data[uid];

  if (!alerts) return <h3 className="text-center"> All clear! </h3>;

  const handleOnClick = () => {
    setIsConfirmModalVisible(true);
    setUncheckAll(false);
  };

  const toggleEvent = (alertId) => {
    if (alToDel === -1) setAlToDel([alertId]);
    else if (alToDel.includes(alertId)) {
      const newAlToDel = [...alToDel];
      const idx = newAlToDel.indexOf(alertId);
      newAlToDel.pop(idx);
      if (newAlToDel.length === 0) setAlToDel(-1);
      else setAlToDel(newAlToDel);
    } else setAlToDel([...alToDel, alertId]);
  };

  const deleteAlert = () => {
    const newAlerts = { ...alerts };
    alToDel.forEach((a) => delete newAlerts[a]);
    setIsConfirmModalVisible(false);
    setAlToDel(-1);
    setUncheckAll(null);
    updateNotifications({ [`${uid}`]: newAlerts });
  };

  return (
    <>
      <ListGroup>
        {Object.entries(alerts).map(([id, alert]) => (
          <div>
            <Alert
              alertId={id}
              alert={alert}
              toggleEvent={toggleEvent}
              uncheckAll={uncheckAll}
            />
          </div>
        ))}
      </ListGroup>
      <Button
        className="text-center"
        variant="danger"
        disabled={alToDel === -1}
        onClick={() => handleOnClick()}
      >
        {" "}
        Delete{" "}
      </Button>
      <ConfirmAlertDelete
        del={deleteAlert}
        showModal={isConfirmModalVisible}
        hide={() => setIsConfirmModalVisible(false)}
      />
    </>
  );
};

export default Notification;
