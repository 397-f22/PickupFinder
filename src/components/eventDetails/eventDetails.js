import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EventDetailsModalAttendeesCard = ({ attendee, variant }) => (
    <div>
        <Badge pill bg={variant}>
            {attendee.firstName} {attendee.lastName}
        </Badge>{' '}
    </div>
);
const EventDetailsModal = ({ event, users, isVisible, closeEventDetailsModal }) => (
    <Modal
        show={isVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                <h4>{event.title}</h4>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="vertical" gap={2}>
                <h5>Details</h5>
                <div>
                    <h6>Date & Time</h6>
                    {event.datetime}
                </div>
                <div>
                    <h6>Location</h6>
                    {event.location}
                </div>
                <div>
                    <h6>Capacity</h6>
                    {`${event.size} / ${event.cap}`}
                </div>
                <hr></hr>
                <h5>Participants</h5>
                <div>
                    <h6>Organizer</h6>
                    <EventDetailsModalAttendeesCard attendee={users[event.organizer]} variant={"primary"} />
                </div>
                <div>
                    <h6>Attendees</h6>
                    <Row xs="auto">{event.attendees.map((userId) => <Col><EventDetailsModalAttendeesCard attendee={users[userId]} variant={"secondary"} /></Col>)}</Row>
                </div>
                <hr></hr>
                <h5>Notes</h5>
                <div>
                    <h6>Description</h6>
                    {event.description}
                </div>
            </Stack>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={closeEventDetailsModal}>Close</Button>
        </Modal.Footer>
    </Modal >
);

export default EventDetailsModal;