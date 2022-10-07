import React, { useState } from "react";
import { pickupData } from "../../mockData";
import EventCard from "../eventCard/eventCard";
import MenuBar from "../menuBar/menuBar"
import Container from "react-bootstrap/Container";
import SportSelector from "../sportSelector/sportSelector";
import { Row } from "react-bootstrap";
import EventForm from "../eventForm/eventForm";

const Home = () => {

  const { users, sports } = pickupData;
  const defaultSport = sports[0];
  const [currentSport, setCurrentSport] = useState(defaultSport);
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [events, setEvents] = useState(pickupData.events);
  const addEvent = (event) => {
    // Todo: replace with a better uuid() function for events
    setEvents({ ...events, [Object.entries(events).length + 1]: event });
  };
  const openEventForm = () => { setIsEventFormVisible(true) };
  const closeEventForm = () => { setIsEventFormVisible(false) };

  return (
    <Container fluid="true" >
      <EventForm isVisible={isEventFormVisible} closeEventForm={closeEventForm} addEvent={addEvent} />
      <Row className="mb-3">
        <MenuBar openEventForm={openEventForm} />
      </Row>
      <Row className="pb-3">
        <SportSelector
          sports={sports}
          currentSport={currentSport}
          setCurrentSport={setCurrentSport}
        />
      </Row>
      <Row>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.entries(events).filter(([_, event]) => event.sport === currentSport).map(([eventId, event]) => (
            <EventCard key={eventId} event={event} users={users} />
          ))}
        </Container>
      </Row>
    </Container>

  );
};

export default Home;
