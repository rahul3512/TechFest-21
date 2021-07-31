import moment from 'moment';

import React, { useState, useRef, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
import { getCoordinators } from './helper/coordinatorApiCalls';
import { getdomains } from './helper/domainApiCalls';
import { getEvent, updateEvent } from './helper/eventApiCalls';


const UpdateEvent = ({ match }) => {

    const ref = useRef();
    const { user, token } = isAuthenticated();
    const [coordinators, setCoordinators] = useState([])
    const [eventCoordinatorVal, setEventCoordinatorVal] = useState([])
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
        updatedEvent: "",
        formData: new FormData()

    });



    const {
        eventName,
        // photo,
        domainRefId,
        eventDate,

        regEndDate,

        participantCountMin,
        participantCountMax,
        // eventCoordinator,

        eventLink,
        // prize,


        eventDescription,
        // loading,
        error, updatedEvent, formData
    } = values;


    const handleInputs = (e) => {
        let name = e.target.name;

        var value;
        if (name === "prize1") {
            // console.log("sdahhfgh")
            let a = prizes
            a[0] = e.target.value
            value = a;
            name = "prize"
            setPrizes(a);

        } else if (name === "prize2") {
            let a = prizes
            a[1] = e.target.value
            value = a;
            name = "prize"
            setPrizes(a);

        } else if (name === "prize3") {
            let a = prizes
            a[2] = e.target.value
            value = a;
            name = "prize"
            setPrizes(a);

        } else if (name === "photo") {
            value = e.target.files[0];
        }

        else if (name === "eventCoordinator1") {
            let a = eventCoordinatorVal
            a[0] = e.target.value
            value = a;
            setEventCoordinatorVal(a)
            name = "eventCoordinator"
            // setValues({ ...setValues, studentCoordinatorVal: e.target.value })
        } else if (name === "eventCoordinator2") {
            let a = eventCoordinatorVal
            a[1] = e.target.value
            value = a;
            setEventCoordinatorVal(a)
            name = "eventCoordinator"
            // setValues({ ...setValues, studentCoordinatorVal: e.target.value })
        }

        else {
            value = e.target.value;
        }


        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        updateEvent(user._id, match.params.eventId, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        eventName: data.event1.eventName,
                        photo: data.event1.photo,
                        domainRefId: data.event1.domainRefId?._id,
                        eventDate: data.event1.eventDate,

                        regEndDate: data.event1.regEndDate,

                        participantCountMin: data.event1.participantCountMin,
                        participantCountMax: data.event1.participantCountMax,
                        eventCoordinator: data.event1.eventCoordinator,

                        eventLink: data.event1.eventLink,
                        prize: data.event1.prize,


                        eventDescription: data.event1.eventDescription,
                        formData: new FormData(),
                        updatedEvent: data.event1.eventName,
                        loading: false,
                        error: ""
                    });
                    setEventCoordinatorVal([data.event1.eventCoordinator[0]._id, data.event1.eventCoordinator[1]?._id])
                    let tt = data.event1.prize[0].split(",")
                    setPrizes([tt[0], tt[1], tt[2]])

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
                <input type="datetime-local" placeholder="Enter datae of event" name="eventDate" value={moment.utc(eventDate).format('YYYY-MM-DD[T]HH:mm:ss')} onChange={handleInputs} />
                regEndDate:
                <input type="datetime-local" placeholder="Enter datae of event" name="regEndDate" value={moment.utc(regEndDate).format('YYYY-MM-DD[T]HH:mm:ss')} onChange={handleInputs} />
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

                <label for="eventCoordinator">Event Coordinator1 </label>

                <select name="eventCoordinator1" id="eventCoordinator1" value={eventCoordinatorVal[0]} onChange={handleInputs}>
                    <option value="">Select a event coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Student") {
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                            }
                        })}
                </select>
                <label for="eventCoordinator">Event Coordinator2 </label>

                <select name="eventCoordinator2" id="eventCoordinator2" value={eventCoordinatorVal[1]} onChange={handleInputs}>
                    <option value="">Select a event coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Student") {
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                            }
                        })}
                </select>


                <input type="submit" name="submit" onClick={onSubmit} />

            </form>

        )
    }

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedEvent ? "" : "none" }}
        >
            <h4>{updatedEvent} created successfully</h4>
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


    const preloadEvent = (eventId) => {
        getEvent(eventId).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,

                    eventName: data.eventName,
                    photo: data.photo,
                    domainRefId: data.domainRefId?._id,
                    eventDate: data.eventDate,

                    regEndDate: data.regEndDate,

                    participantCountMin: data.participantCountMin,
                    participantCountMax: data.participantCountMax,
                    eventCoordinator: data.eventCoordinator,

                    eventLink: data.eventLink,
                    prize: data.prize,


                    eventDescription: data.eventDescription,


                });
                setEventCoordinatorVal([data.eventCoordinator[0]._id, data.eventCoordinator[1]?._id])
                let tt = data.prize[0].split(",")
                setPrizes([tt[0], tt[1], tt[2]])

            }
        });
    }

    useEffect(() => {
        preload();
        preloadEvent(match.params.eventId);
    }, []);
    return (
        <Base title="event update page">


            {successMessage()}
            {errorMessage()}

            {eventForm()}
        </Base>
    )

}



export default UpdateEvent;
