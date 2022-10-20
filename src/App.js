import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { useProfile } from "./utilities/useProfile";
import MenuBar from "./components/menuBar/menuBar";
import EventForm from "./components/eventForm/eventForm";
import { v4 as uuidv4 } from "uuid";
import { useDbUpdate } from "./utilities/firebase";
import Pages from "./components/Pages/pages";

function App() {
  const [profile, profileError, profileLoading] = useProfile();
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [updateEvent, result] = useDbUpdate("/");

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  const currentUser = profile.user ?? { uid: "guest" };

  const addEvent = (event) => {
    const uuid = uuidv4();
    const event_data = {
      ...event,
      attendees: [currentUser.uid],
      organizer: currentUser.uid,
      size: 1,
    };
    updateEvent({ ["/events/" + uuid]: event_data });
  };

  const openEventForm = () => {
    setIsEventFormVisible(true);
  };

  const closeEventForm = () => {
    setIsEventFormVisible(false);
  };

  return (
    <>
      <Row className="mb-3 p-0 w-100 m-0">
        <MenuBar openEventForm={openEventForm} user={profile} />
      </Row>
      <div className="container mb-5">
        <EventForm
          isVisible={isEventFormVisible}
          closeEventForm={closeEventForm}
          addEvent={addEvent}
        />
        <Pages profile={profile} />
      </div>
    </>
  );
}

export default App;
