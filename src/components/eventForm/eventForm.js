import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Calendar from "react-calendar";

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

const SelectBasicExample = ({ name, text, state, change }) => (
    <div>
        <label htmlFor={name} className="form-label">{text}</label>
        <Form.Select id={name} onChange={change}>
            <option>Select the sport you want to play</option>
            <option value="Basketball">Basketball</option>
            <option value="Soccer">Soccer</option>
        </Form.Select>
    </div>
);

const EventForm = ({ isVisible, closeEventForm, addEvent }) => {

    const [state, change] = useFormData({});
    const [value, onChange] = useState(new Date());
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
                        <Calendar onChange={onChange} value={value} />
                        {/* <InputField name="cap" text="Capacity" state={state} change={change} /> */}
                        {/* <InputField name="sport" text="Sport" state={state} change={change} /> */}
                        <SelectBasicExample name="sport" text="Sport" state={state} change={change} />
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeEventForm}>Close</Button>
                <Button onClick={() => {
                    // Add some default values for events
                    addEvent({ ...state.values });
                    closeEventForm();
                }}>Submit</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EventForm;