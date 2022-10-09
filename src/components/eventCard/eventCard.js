import React, { useState } from "react";
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import EventDetailsModal from "../eventDetails/eventDetails";
import { currentUser } from "../../mockData";

const EventCard = ({ event, users, eventId, toggleEvent }) => {
    const [isEventDetailsModalVisible, setIsEventDetailsModalVisible] = useState(false);
    const openEventDetailsModal = () => { setIsEventDetailsModalVisible(true) };
    const closeEventDetailsModal = () => { setIsEventDetailsModalVisible(false) };
    const isEventAtCapacity = event.size === event.cap;
    const isCurrentUserInEvent = event.attendees.includes(currentUser.id);
    const isCurrentUserOrganizer = event.organizer === currentUser.id;
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
                    <Button variant={`${isCurrentUserInEvent ? (isCurrentUserOrganizer ? "muted" : "danger") : "primary"} ms-3`}
                        disabled={isEventAtCapacity || isCurrentUserOrganizer}
                        onClick={() => {
                            toggleEvent(event, eventId);
                        }}>{isCurrentUserInEvent ? "Unjoin" : "Join Event"}</Button>
                </Card.Body>
            </Card >
        </div>
    );
};

export default EventCard;
