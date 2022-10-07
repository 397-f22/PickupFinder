import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
    </div>
);

export const useFormData = (values = {}) => {
    const [state, setState] = useState(() => ({ values }));

    const change = (evt) => {
        const { id, value } = evt.target;
        const values = { ...state.values, [id]: value };
        setState({ values });
    };

    return [state, change];
};

const EventForm = ({ isVisible, closeEventForm, addEvent }) => {

    const [state, change] = useFormData({});
    return (
        <Modal
            show={isVisible}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>Create Event</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container pt-3">
                    <form>
                        <InputField name="title" text="Title" state={state} change={change} />
                        <InputField name="description" text="Description" state={state} change={change} />
                        <InputField name="location" text="Location" state={state} change={change} />
                        <InputField name="datetime" text="Time and Date" state={state} change={change} />
                        <InputField name="cap" text="Capacity" state={state} change={change} />
                        <InputField name="sport" text="Sport" state={state} change={change} />
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeEventForm}>Close</Button>
                <Button onClick={() => {
                    // Add some default values for events
                    addEvent({ ...state.values, size: 1, attendees: [] });
                    closeEventForm();
                }}>Submit</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EventForm;