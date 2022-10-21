import React, { useState } from "react";
import { useProfile } from "../../utilities/useProfile";
import { useDbData, useDbUpdate } from "../../utilities/firebase";
import EventCard from "../eventCard/eventCard";
import ConfirmModal from "../home-page/confirm";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserPage = () => {
  const [profile, profileError, profileLoading] = useProfile();
  const [data, error] = useDbData("/");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [evToDel, setEvToDel] = useState(-1);
  const [updateEvent, result] = useDbUpdate("/");

  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  const { events, sports, users } = data;
  const currentUser = profile.user;

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
    updateEvent({ "/events": newEvents });
  };

  const userEvents = Object.entries(events).filter(([_, evt]) =>
    evt.attendees.includes(currentUser.uid)
  );

  return (
    <>
      <div className="p-5 text-center">
        <h1 className="mb-3">{currentUser.displayName}</h1>
        <i className="mb-3 text-success">{currentUser.email}</i>
      </div>
      <h4 className="p-2 text-center">
        {" "}
        Welcome back! Keep track of your events here.
      </h4>
      <Container>
        <Row>
          <Col xs={6}>
            <h5
              className="rounded-4 p-3 text-center"
              style={{ background: "#fae5cf" }}
            >
              {" "}
              Events Joined{" "}
            </h5>
            {userEvents
              .filter(([_, event]) => event.organizer !== currentUser.uid)
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
          </Col>
          <Col xs={6}>
            <h5
              className="rounded-4 p-3 text-center"
              style={{ background: "#ffe5e3" }}
            >
              {" "}
              Events Organized{" "}
            </h5>
            {userEvents
              .filter(([_, event]) => event.organizer === currentUser.uid)
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
          </Col>
        </Row>
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
