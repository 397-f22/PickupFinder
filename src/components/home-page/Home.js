import React, { useState } from "react";
import { pickupData } from "../../mockData";
import EventCard from "../eventCard/eventCard";
import Container from "react-bootstrap/Container"
import SportSelector from "../sportSelector/sportSelector";

const Home = () => {
  const { users, sports } = pickupData;
  const defaultSport = sports[0];
  const [currentSport, setCurrentSport] = useState(defaultSport);
  const events = pickupData.events[currentSport];
  return (
    <Container fluid="true">
      <h1>Pickup Finder</h1>
      <SportSelector sports={sports} currentSport={currentSport} setCurrentSport={setCurrentSport} />
      {Object.entries(events).map(([eventId, event]) =>
        <EventCard key={eventId} event={event} users={users} />
      )}
    </Container>
  );
};

export default Home;
