import React, { useState, useRef, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
import { getCoordinators } from './helper/coordinatorApiCalls';
import { getdomains } from './helper/domainApiCalls';
import { createEvent } from './helper/eventApiCalls';


const Event = () => {

    const ref = React.useRef();
    const { user, token } = isAuthenticated();
    const [coordinators, setCoordinators] = useState([])
    const [eventCoordinatorVal, setEventCoordinatorVal] = useState("")
    const [domains, setDomains] = useState([]);
    const [prizes, setPrizes] = useState([0, 0, 0])
    const [values, setValues] = useState({
        eventName: "",
        photo: "",
        domainRefId: "",
        eventDate: "",

        regEndDate: "",

        participantCountMin: "",
        participantCountMax: "",
        eventCoordinator: [],

        eventLink: "",
        prize: [],


        eventDescription: "",
        loading: false,
        error: "",
        createdEvent: "",
        formData: new FormData()

    });



    const {
        eventName,
        photo,
        domainRefId,
        eventDate,

        regEndDate,

        participantCountMin,
        participantCountMax,
        eventCoordinator,

        eventLink,
        prize,


        eventDescription,
        loading, error, createdEvent, formData
    } = values;


    const handleInputs = (e) => {
        let name = e.target.name;

        var value;
        if (name == "prize1") {
            // console.log("sdahhfgh")
            let a = [...prize]
            a[0] = e.target.value
            value = a;
            name = "prize"
            setPrizes(a);

        } else if (name == "prize2") {
            let a = [...prize]
            a[1] = e.target.value
            value = a;
            name = "prize"
            setPrizes(a);

        } else if (name == "prize3") {
            let a = [...prize]
            a[2] = e.target.value
            value = a;
            name = "prize"
            setPrizes(a);

        } else if (name == "photo") {
            value = e.target.files[0];
        } else if (name == "eventCoordinator") {
            let a = []
            a.push(e.target.value)
            value = a;
            setEventCoordinatorVal(e.target.value)
        } else {
            value = e.target.value;
        }


        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        createEvent(user._id, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        eventName: "",
                        photo: "",
                        domainRefId: "",
                        eventDate: "",

                        regEndDate: "",

                        participantCountMin: "",
                        participantCountMax: "",
                        eventCoordinator: [],

                        eventLink: "",
                        prize: [],


                        eventDescription: "",
                        formData: new FormData(),
                        createdEvent: data.event1.eventName,
                        loading: false,
                        error: ""
                    });
                    setEventCoordinatorVal("");
                    setPrizes([0, 0, 0])

                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const eventForm = () => {
        return (
            <form>
                Upload Image:
                <input
                    onChange={handleInputs}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="choose a file"
                    ref={ref}
                />

                Event Name:
                <input type="text" placeholder="Enter your name" name="eventName" value={eventName} onChange={handleInputs} />
                Event Description:
                <input type="text" name="eventDescription" value={eventDescription} onChange={handleInputs} />
                event Date Time:
                <input type="datetime-local" placeholder="Enter datae of event" name="eventDate" value={eventDate} onChange={handleInputs} />
                regEndDate:
                <input type="datetime-local" placeholder="Enter datae of event" name="regEndDate" value={regEndDate} onChange={handleInputs} />
                participantCountMin:
                <input type="number" placeholder="Enter datae of event" name="participantCountMin" value={participantCountMin} onChange={handleInputs} />
                participantCountMax:
                <input type="number" placeholder="Enter datae of event" name="participantCountMax" value={participantCountMax} onChange={handleInputs} />


                eventLink:

                <input type="text" placeholder="Enter meeting url" name="eventLink" value={eventLink} onChange={handleInputs} />

                prize1:
                <input type="number" name="prize1" value={prizes[0]} onChange={handleInputs} />
                prize2:
                <input type="number" name="prize2" value={prizes[1]} onChange={handleInputs} />
                prize3
                {/* <input type="number" name="prize3" value={prize[2]} onChange={handleInputs} /> */}
                <input type="number" name="prize3" value={prizes[2]} onChange={handleInputs} />

                <label for="domainRefId">Domains</label>

                <select name="domainRefId" id="domainRefId" value={domainRefId} onChange={handleInputs}>
                    <option value="">Select a domain</option>
                    {domains &&
                        domains.map((domain, index) => {

                            return (
                                <option key={index} value={domain._id}>
                                    {domain.domainName}
                                </option>
                            );
                        })}
                </select>

                <label for="eventCoordinator">Event Coordinator </label>

                <select name="eventCoordinator" id="eventCoordinator" value={eventCoordinatorVal} onChange={handleInputs}>
                    <option value="">Select a event coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Student")
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                        })}
                </select>


                <input type="submit" name="submit" onClick={onSubmit} />

            </form>

        )
    }

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdEvent ? "" : "none" }}
        >
            <h4>{createdEvent} created successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Event creation failed</h4>
        </div>
    );





    const preload = () => {
        getdomains().then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setDomains(data)



            }

        });

        getCoordinators().then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCoordinators(data)



            }

        });
    };


    useEffect(() => {
        preload();
    }, []);
    return (
        <Base title="event creation page">

            {eventForm()}


            {successMessage()}
            {errorMessage()}
        </Base>
    )

}



export default Event;
