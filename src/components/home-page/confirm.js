import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal= ({del, showModal, hide})=> {
    return (
        <Modal
          show={showModal}
          onHide={hide}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Delete Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <p>
              Are you sure you want to delete this event?
            </p>
          </Modal.Body>
          <Modal.Footer className="modal-footer border-0">
            <Button onClick={del} variant="danger">Confirm</Button>
            <Button onClick={hide} variant="secondary">Cancel</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default ConfirmModal;