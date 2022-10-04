import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EventDetailsModal = ({ event, users, isVisible, closeEventDetailsModal }) => (
    <Modal
        show={isVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                {event.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Organizer: {users[event.organizer].firstName} {users[event.organizer].lastName}</h4>
            <ul>
                {event.attendees.map((userId) => <li key={userId}>{users[userId].firstName} {users[userId].lastName}</li>)}
            </ul>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={closeEventDetailsModal}>Close</Button>
        </Modal.Footer>
    </Modal>
);

export default EventDetailsModal;