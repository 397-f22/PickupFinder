import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup } from 'react-bootstrap';


const Notification = () => {
 
  return (
    <Row>
      <Col md={6} className="mb-2">
          <ListGroup>
               <ListGroup.Item action>
               Secondary
               </ListGroup.Item>
               <ListGroup.Item action>
               Success
               </ListGroup.Item>
          </ListGroup>
        
      </Col>
    </Row>
  );
}

export default Notification;