import React, { useState } from "react";
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import EventDetailsModal from "../eventDetails/eventDetails";

const EventCard = ({ event, users, eventId, toggleEvent, currentUser }) => {
    const [isEventDetailsModalVisible, setIsEventDetailsModalVisible] = useState(false);
    const openEventDetailsModal = () => { setIsEventDetailsModalVisible(true) };
    const closeEventDetailsModal = () => { setIsEventDetailsModalVisible(false) };
    const isEventAtCapacity = event.size === event.cap;
    const isCurrentUserInEvent = event.attendees.includes(currentUser.uid);
    const isCurrentUserOrganizer = event.organizer === currentUser.uid;
    return (
        <div>
            <EventDetailsModal event={event} users={users} isVisible={isEventDetailsModalVisible} closeEventDetailsModal={closeEventDetailsModal} />
            <Card style={{ width: '18rem' }} className="m-1">
                <Card.Header><Card.Title>{event.title}</Card.Title></Card.Header>
                <Card.Body>
                    <Card.Text>
                        Location: {event.location}
                    </Card.Text>
                    <Card.Text>
                        Date & Time: {event.datetime}
                    </Card.Text>
                    <Card.Text>
                        Capacity: {event.size} / {event.cap}
                    </Card.Text>
                    <hr></hr>
                    <Button variant="primary" onClick={() => {
                        openEventDetailsModal();
                    }}>See attendees</Button>
                    {currentUser.uid !== 'guest' &&
                    (<Button variant={`${isCurrentUserInEvent ? (isCurrentUserOrganizer ? "danger" : "danger") : "primary"} ms-3`}
                        disabled={isEventAtCapacity}
                        onClick={() => {
                            toggleEvent(event, eventId, isCurrentUserOrganizer);
                        }}>{isCurrentUserInEvent ? (isCurrentUserOrganizer ? "Discard" : "Unjoin") : "Join Event"}</Button>)
                    }
                </Card.Body>
            </Card >
        </div>
    );
};

export default EventCard;
