import React, { useState } from "react";
import { pickupData, currentUser } from "../../mockData";
import EventCard from "../eventCard/eventCard";
import MenuBar from "../menuBar/menuBar";
import Container from "react-bootstrap/Container";
import SportSelector from "../sportSelector/sportSelector";
import { Row } from "react-bootstrap";
import EventForm from "../eventForm/eventForm";
import ConfirmModal from "./confirm";
import { useDbData, useDbUpdate } from "../../utilities/firebase";
import { useProfile } from "../../utilities/useProfile";

const Home = () => {
  const [data, error] = useDbData("/");
  const [currentSport, setCurrentSport] = useState("Basketball");
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [evToDel, setEvToDel] = useState(-1);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [updateEvent, result] = useDbUpdate(
    "/"
  );

  // user profile
  const [profile, profileError, profileLoading] = useProfile();
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;
  

  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const { events, sports, users } = data;

  const addEvent = (event) => {
    const uuid = Object.entries(events).length + 1;
    const event_data = {
      ...event,
      attendees: [currentUser.id],
      organizer: currentUser.id,
      size: 1,
    };
    updateEvent({["/events/"+uuid]:event_data});
  };

  const toggleEvent = (event, eventId, isCurrentUserOrganizer) => {
    if (isCurrentUserOrganizer) {
      setEvToDel(eventId);
      setIsConfirmModalVisible(true);
    } else {
      if (event.attendees.includes(currentUser.id)) {
        event.size -= 1;
        event.attendees = event.attendees.filter((e) => e !== currentUser.id);
      } else {
        event.size += 1;
        event.attendees.push(currentUser.id);
      }
    }
  };
  const openEventForm = () => {
    setIsEventFormVisible(true);
  };
  const closeEventForm = () => {
    setIsEventFormVisible(false);
  };

  const deleteEvent = () => {
    const newEvents = { ...events };
    delete newEvents[evToDel];
    setIsConfirmModalVisible(false);
    setEvToDel(-1);
    console.log(newEvents);
    updateEvent({"/events":newEvents});
  };
  return (
    <Container fluid="true">
      <EventForm
        isVisible={isEventFormVisible}
        closeEventForm={closeEventForm}
        addEvent={addEvent}
      />
      <Row className="mb-3">
        <MenuBar openEventForm={openEventForm} user={profile} />
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
          {Object.entries(events)
            .filter(([_, event]) => event.sport === currentSport)
            .map(([eventId, event]) => (
              <EventCard
                key={eventId}
                event={event}
                users={users}
                eventId={eventId}
                toggleEvent={toggleEvent}
              />
            ))}
          <ConfirmModal
            del={deleteEvent}
            showModal={isConfirmModalVisible}
            hide={() => setIsConfirmModalVisible(false)}
          />
        </Container>
      </Row>
    </Container>
  );
};

export default Home;
