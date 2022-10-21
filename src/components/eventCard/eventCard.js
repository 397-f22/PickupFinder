import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EventDetailsModal from "../eventDetails/eventDetails";

const EventCard = ({ event, users, eventId, toggleEvent, currentUser }) => {
  const [isEventDetailsModalVisible, setIsEventDetailsModalVisible] =
    useState(false);
  const openEventDetailsModal = () => {
    setIsEventDetailsModalVisible(true);
  };
  const closeEventDetailsModal = () => {
    setIsEventDetailsModalVisible(false);
  };
  const isEventAtCapacity = event.size == event.cap;
  const isCurrentUserInEvent = event.attendees.includes(currentUser.uid);
  const isCurrentUserOrganizer = event.organizer === currentUser.uid;
  const cardwidth = window.location.pathname === "/" ? "19rem" : "";
  const bt2text = isCurrentUserInEvent
    ? isCurrentUserOrganizer
      ? " Discard"
      : " Unjoin"
    : " Join";
  const bt2icon = isCurrentUserInEvent
    ? isCurrentUserOrganizer
      ? "bi bi-trash3-fill"
      : "bi bi-box-arrow-right"
    : "bi bi-box-arrow-in-left";

  return (
    <div>
      <EventDetailsModal
        event={event}
        users={users}
        isVisible={isEventDetailsModalVisible}
        closeEventDetailsModal={closeEventDetailsModal}
      />
      <Card style={{ width: `${cardwidth}` }} className="m-1">
        <Card.Header>
          <Card.Title>{event.title}</Card.Title>
        </Card.Header>
        <Card.Body style={{ height: "15rem" }}>
          <Card.Text>Location: {event.location}</Card.Text>
          <Card.Text>Date & Time: {event.datetime}</Card.Text>
          <Card.Text>
            Capacity: {event.size} / {event.cap}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="bi bi-people-fill"
            variant="primary"
            onClick={() => {
              openEventDetailsModal();
            }}
          >
            <p className="d-none d-lg-inline"> See attendees</p>
          </Button>
          {currentUser.uid !== "guest" && (
            <Button
              className={bt2icon}
              variant={`${
                isCurrentUserInEvent
                  ? isCurrentUserOrganizer
                    ? "danger"
                    : "danger"
                  : "primary"
              } ms-3`}
              disabled={isEventAtCapacity}
              onClick={() => {
                toggleEvent(event, eventId, isCurrentUserOrganizer);
              }}
            >
              <p className="d-none d-lg-inline">{bt2text}</p>
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default EventCard;
