import React, { useState } from "react";
import { useProfile } from "../../utilities/useProfile";
import { useDbData, useDbUpdate } from "../../utilities/firebase";
import MenuBar from "../menuBar/menuBar";
import EventCard from "../eventCard/eventCard";
import ConfirmModal from "../home-page/confirm";
import { Container } from "react-bootstrap";


const UserPage = () => {
    const [profile, profileError, profileLoading] = useProfile();
    const [data, error] = useDbData("/");
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [evToDel, setEvToDel] = useState(-1);
    const [updateEvent, result] = useDbUpdate("/");



    // data
    if (error) return <h1>Error loading data: {`${error}`}</h1>;
    if (data === undefined) return <h1>Loading data...</h1>;
    if (!data) return <h1>No data found</h1>;

    // user
    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;
    if (!profile) return <h1>No profile data</h1>;  
    
    const { events, sports, users } = data;
    const currentUser = profile.user.uid

    const toggleEvent = (event, eventId, isCurrentUserOrganizer) => {
    if (isCurrentUserOrganizer) {
      setEvToDel(eventId);
      setIsConfirmModalVisible(true);
    } else {
      if (event.attendees.includes(currentUser.uid)) {
        event.size -= 1;
        event.attendees = event.attendees.filter((e) => e !== currentUser.uid);
      } else {
        event.size += 1;
        event.attendees.push(currentUser.uid);
      }
      updateEvent({ ["/events/" + eventId]: event });
    }
  };

    const deleteEvent = () => {
    const newEvents = { ...events };
    delete newEvents[evToDel];
    setIsConfirmModalVisible(false);
    setEvToDel(-1);
    console.log(newEvents);
    updateEvent({ "/events": newEvents });
    };

    

    return (
        <>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.entries(events)
            .filter(([_, event]) => event.sport === "Basketball")
            .map(([eventId, event]) => (
              <EventCard
                key={eventId}
                event={event}
                users={users}
                eventId={eventId}
                toggleEvent={toggleEvent}
                currentUser={currentUser}
              />
            ))}
          <ConfirmModal
            del={deleteEvent}
            showModal={isConfirmModalVisible}
            hide={() => setIsConfirmModalVisible(false)}
          />
        </Container>
        </>
    );
};

export default UserPage; 