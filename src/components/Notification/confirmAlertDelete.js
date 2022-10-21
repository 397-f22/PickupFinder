import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmAlertDelete= ({del, showModal, hide})=> {
    return (
        <Modal
          show={showModal}
          onHide={hide}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          
          <Modal.Footer className="modal-footer border-0">
            <Button onClick={del} variant="danger">Confirm</Button>
            <Button onClick={hide} variant="secondary">Cancel</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default ConfirmAlertDelete;