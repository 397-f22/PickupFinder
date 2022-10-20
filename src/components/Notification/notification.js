import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup } from 'react-bootstrap';


const Notification = ({alerts}) => {
 
  return (
    <Row>
      <Col md={6} className="mb-2">
          <ListGroup>
               {Object.entries(alerts).map(([id, alert])=> <ListGroup.Item action>{alert}</ListGroup.Item>)}
          </ListGroup>
      </Col>
    </Row>
  );
}

export default Notification;