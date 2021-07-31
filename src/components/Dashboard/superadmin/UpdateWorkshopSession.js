import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
// import { getCoordinators } from './helper/coordinatorApiCalls';
import { getworkshops } from './helper/workshopApiCalls';
import { getWorkshopSession, updateWorkshopSession } from './helper/workshopSessionApiCalls';


const UpdateWorkshopSession = ({ match }) => {
    // const ref = useRef();

    const { user, token } = isAuthenticated();
    const [workshops, setWorkshops] = useState([]);
    const [values, setValues] = useState({
        workshopSessionName: "",
        dateTime: "",
        scheduledLink: "",


        workshopId: "",

        loading: false,
        error: "",
        updatedWorkshopSession: "",


    });



    const {
        workshopSessionName,
        dateTime,
        scheduledLink,


        workshopId,
        // loading,
        error, updatedWorkshopSession
    } = values;


    const handleInputs = (e) => {
        let name = e.target.name;
        var value = e.target.value;


        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        updateWorkshopSession(user._id, match.params.workshopSessionId, token, {
            workshopSessionName,
            dateTime,
            scheduledLink,


            workshopId,
        })
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {

                    setValues({
                        ...values,
                        workshopSessionName: data.workshopSessionName,
                        dateTime: data.dateTime,
                        scheduledLink: data.scheduledLink,


                        workshopId: data.workshopId?._id,

                        updatedWorkshopSession: data.workshopSessionName,
                        loading: false,
                        error: ""
                    });


                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const workshopSessionForm = () => {
        return (
            <form>


                WorkshopSession Name:
                <input type="text" placeholder="Enter your name" name="workshopSessionName" value={workshopSessionName} onChange={handleInputs} />
                Date Time:
                <input type="datetime-local" placeholder="Enter datae of event" name="dateTime" value={moment.utc(dateTime).format('YYYY-MM-DD[T]HH:mm:ss')} onChange={handleInputs} />
                scheduledLink:

                <input type="text" placeholder="Enter meeting url" name="scheduledLink" value={scheduledLink} onChange={handleInputs} />



                <label for="workshopId">Worshops</label>

                <select name="workshopId" id="workshopId" value={workshopId} onChange={handleInputs}>
                    <option value="">Select a workshop</option>
                    {workshops &&
                        workshops.map((workshop, index) => {

                            return (
                                <option key={index} value={workshop._id}>
                                    {workshop.workshopName}
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
            style={{ display: updatedWorkshopSession ? "" : "none" }}
        >
            <h4>{updatedWorkshopSession} updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>WorkshopSession creation failed</h4>
        </div>
    );





    const preload = () => {
        getworkshops().then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setWorkshops(data)



            }

        });
    };

    const preloadWorkshopSession = (workshopSessionId) => {
        getWorkshopSession(workshopSessionId).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,

                    workshopSessionName: data.workshopSessionName,
                    dateTime: data.dateTime,
                    scheduledLink: data.scheduledLink,


                    workshopId: data.workshopId?._id,


                });


            }
        });

    }


    useEffect(() => {
        preload();
        preloadWorkshopSession(match.params.workshopSessionId);
    }, []);
    return (
        <Base title="workshopSession updation page">


            {successMessage()}
            {errorMessage()}
            {workshopSessionForm()}


        </Base>
    )

}



export default UpdateWorkshopSession;
